from flask import Flask
from flask import jsonify, abort, request
import redis
app = Flask(__name__)

#import logging
#log = logging.getLogger('werkzeug')
#log.setLevel(logging.ERROR)

def fib(n):
   if n <= 1:
       return n
   else:
       return(fib(n-1) + fib(n-2))

def redis_connect() -> redis.client.Redis:
    try:
        client = redis.Redis(
            host="localhost",
            port=6379,
            db=0,
            socket_timeout=5,
        )
        ping = client.ping()
        if ping is True:
            return client
    except redis.AuthenticationError:
        print("AuthenticationError")
        exit(1)

client = redis_connect()

@app.route('/static')
def static_route():
    return jsonify(ok=True)

@app.route('/fib')
def fib_route():
    return jsonify(res=fib(23))

@app.route('/redis')
def redis_route():
    val = client.get("counter")
    return jsonify(value=val)

@app.route('/validation')
def validation_route():
    string = request.args.get('string')
    try:
        number = int(request.args.get('number'))
    except ValueError:
        abort(400, description="Wrong input")
    if len(string) < 5:
        abort(400, description="Wrong input")
    return jsonify(ok=True)
    

@app.route('/error/<int:id>')
def error_route(id):
    return jsonify(value=(1/(id-1)))