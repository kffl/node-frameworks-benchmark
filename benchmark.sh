#!/bin/bash

for framework in express adonis fastify feathers hapi nest nest-fastify go-gin py-flask
do
    cd $framework
    echo "Starting $framework benchmark"

    echo "TEST 1 - static resource"
    for run in {1..10}
    do
        echo "Run $run/10..."
        timeout 9 ./start.sh &
        sleep 2
        ../wrk --duration=6000000 --threads=2 --connections=20 http://localhost:3000/static --latency -x > ../results/res_"$framework"_places_"$run"
        sleep 2
    done

    echo "TEST 2 - Fibonacci"
    for run in {1..10}
    do
        echo "Run $run/10..."
        timeout 9 ./start.sh &
        sleep 2
        ../wrk --duration=6000000 --threads=2 --connections=20 http://localhost:3000/fib --latency -x > ../results/res_"$framework"_fib_"$run"
        sleep 2
    done

    echo "TEST 3 - Redis"
    for run in {1..10}
    do
        echo "Run $run/10..."
        timeout 9 ./start.sh &
        sleep 2
        ../wrk --duration=6000000 --threads=2 --connections=20 http://localhost:3000/redis --latency -x > ../results/res_"$framework"_redis_"$run"
        sleep 2
    done

    echo "TEST 4 - Validation"
    for run in {1..10}
    do
        echo "Run $run/10..."
        timeout 9 ./start.sh &
        sleep 2
        ../wrk --duration=6000000 --threads=2 --connections=20 http://localhost:3000/validation\?number\=5\&string\=x1237 --latency -x > ../results/res_"$framework"_validation_"$run"
        sleep 2
    done

    echo "TEST 5 - Error"
    for run in {1..10}
    do
        echo "Run $run/10..."
        timeout 9 ./start.sh &
        sleep 2
        ../wrk --duration=6000000 --threads=2 --connections=20 http://localhost:3000/error/1 --latency -x > ../results/res_"$framework"_validation_"$run"
        sleep 2
    done

    cd ..
done