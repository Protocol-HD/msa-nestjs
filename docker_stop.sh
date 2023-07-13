#!/bin/bash
docker stop api-gateway
docker stop graphql-gateway
docker stop user
docker stop board
docker stop auth
docker stop redis-cache

sleep 1s

docker ps -a