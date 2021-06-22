#!/bin/bash

echo "AdonisJS"
cd adonis
npm i
node ace build --production

echo "Express"
cd ../express
npm i

echo "Fastify"
cd ../fastify
npm i

echo "Feathers.js"
cd ../feathers
npm i

echo "Golang - Gin"
cd ../go-gin
go build

echo "Hapi"
cd ../hapi
npm i

echo "NestJS - Express"
cd ../nest
npm i
npm run build

echo "NestJS - Fastify"
cd ../nest-fastify
npm i
npm run build

echo "Python - Flask"
cd ../py-flask
pip3 install -r requirements.txt
