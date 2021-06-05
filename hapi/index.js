const Hapi = require("@hapi/hapi");
const redis = require("redis");
const client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const Joi = require("joi");

function fibo(n) {
    if (n < 2) return 1;
    else return fibo(n - 2) + fibo(n - 1);
}

const schema = {};

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
    });

    server.route({
        method: "GET",
        path: "/static",
        handler: (request, h) => {
            return { ok: true };
        },
    });

    server.route({
        method: "GET",
        path: "/fib",
        handler: (request, h) => {
            return { res: fibo(23) };
        },
    });

    server.route({
        method: "GET",
        path: "/redis",
        handler: async (request, h) => {
            const val = await getAsync("counter");
            return { value: val };
        },
    });

    server.route({
        method: "GET",
        path: "/validation",
        handler: async (request, h) => {
            const val = await getAsync("counter");
            return { value: val };
        },
        options: {
            validate: {
                query: Joi.object({
                    number: Joi.number(),
                    string: Joi.string().min(5),
                }),
            },
        },
    });

    server.route({
        method: "GET",
        path: "/error/{id}",
        handler: async (request, h) => {
            const val = parseInt(request.params.id);
            const x = val / (val - 1);
            if (!isFinite(x)) {
                throw new TypeError("Division by 0");
            }
            return { value: val };
        },
    });

    await server.start();
    console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();
