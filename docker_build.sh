#!/bin/bash
npm run build api-gateway
npm run build user
npm run build board
npm run build auth
npm run build redis-cache
npm run build graphql-gateway

sed -i 's/microservice-name/api-gateway/g' Dockerfile
docker build -t api-gateway .

sed -i 's/api-gateway/user/g' Dockerfile
docker build -t user .

sed -i 's%user/%board/%g' Dockerfile
docker build -t board .

sed -i 's%board/%auth/%g' Dockerfile
docker build -t auth .

sed -i 's/auth/redis-cache/g' Dockerfile
docker build -t redis-cache .

sed -i 's/redis-cache/graphql-gateway/g' Dockerfile
docker build -t graphql-gateway .

sed -i 's/graphql-gateway/microservice-name/g' Dockerfile