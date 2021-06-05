package main

import (
	"context"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
)

var client *redis.Client
var ctx = context.Background()

type Schema struct {
	Number int    `form:"number" binding:"required"`
	String string `form:"string" binding:"required,min=5"`
}

func fib(n int) int {
	if n == 0 {
		return 0
	} else if n == 1 {
		return 1
	} else {
		return fib(n-1) + fib(n-2)
	}
}

func staticRoute(c *gin.Context) {
	c.JSON(200, gin.H{
		"ok": true,
	})
}

func fibRoute(c *gin.Context) {
	c.JSON(200, gin.H{
		"res": fib(23),
	})
}

func redisRoute(c *gin.Context) {
	val, err := client.Get(ctx, "counter").Result()
	if err != nil {
		panic(err)
	}
	c.JSON(200, gin.H{
		"value": val,
	})
}

func errorRoute(c *gin.Context) {
	value, _ := strconv.Atoi(c.Param("id"))
	c.JSON(200, gin.H{
		"value": 1 / (value - 1),
	})
}

func validationRoute(c *gin.Context) {
	var schema Schema
	err := c.Bind(&schema)
	if err == nil {
		c.JSON(200, gin.H{
			"ok": true,
		})
	} else {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
	}
}

func main() {
	r := gin.Default()

	client = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	r.GET("/static", staticRoute)
	r.GET("/redis", redisRoute)
	r.GET("/fib", fibRoute)
	r.GET("/error/:id", errorRoute)
	r.GET("/validation", validationRoute)

	r.Run(":3000")
}
