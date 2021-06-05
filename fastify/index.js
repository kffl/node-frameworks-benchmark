const redis = require('redis')
const client = redis.createClient()
const fastify = require('fastify')({ logger: true })

const schema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          ok: {
            type: 'boolean'
          }
        }
      }
    }
  }
}

fastify.get('/static', schema, (req, res) => {
  res.send({ ok: true })
})

function fibo(n) {

            if (n < 2)
                return 1;
            else   return fibo(n - 2) + fibo(n - 1);
        }

fastify.get('/fib', (req, res) => {
  res.send({res: fibo(23)})
})

fastify.get('/redis', (req, res) => {
  client.get("counter", (err, val) => {res.send({value: val})})
})

const queryStringSchema = {
  number: { type: "integer" },
  string: { type: "string", minLength: 5 }
}

fastify.get('/validation', { schema: {querystring: queryStringSchema }}, (req, res) => {
  res.send({ ok: true })
})

fastify.get("/error/:id", (req, res) => {
    const val = parseInt(req.params.id)
    const x = val / (val - 1)
    if (!isFinite(x)) {
        throw new TypeError("Division by 0");
    }
    res.send({value: x})
})

fastify.listen(3000, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
  client.set("counter", 1)
})
