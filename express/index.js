const express = require("express");
const app = express();
const morgan = require('morgan');
const redis = require("redis");
const client = redis.createClient();
const { query, validationResult } = require("express-validator");

app.use(morgan('combined'))

function fibo(n) {
    if (n < 2) return 1;
    else return fibo(n - 2) + fibo(n - 1);
}

app.get("/static", function (req, res) {
    res.json({ ok: true });
});

app.get("/fib", (req, res) => {
    res.json({ res: fibo(23) });
});

app.get("/redis", (req, res) => {
    client.get("counter", (err, val) => {
        res.json({ value: val });
    });
});

app.get(
    "/validation",
    query("number").isNumeric(),
    query("string").isLength({ min: 5 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        res.json({ ok: true });
    }
);

app.get("/error/:id", (req, res) => {
    const val = parseInt(req.params.id)
    const x = val / (val - 1)
    if (!isFinite(x)) {
        throw new TypeError("Division by 0");
    }
    res.json({value: x})
})

app.listen(3000, () => {
    client.set("counter", 1);
});
