#!/bin/bash
docker run -d --rm --network mynet --name api-gateway -p 3000:3000 api-gateway
docker run -d --rm --network mynet --name graphql-gateway -p 4000:3000 graphql-gateway
docker run -d --rm --network mynet --name user user
docker run -d --rm --network mynet --name board board
docker run -d --rm --network mynet --name auth auth
docker run -d --rm --network mynet --name redis-cache redis-cache

sleep 3s

docker ps -a