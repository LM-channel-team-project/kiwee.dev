#!bin/bash

git pull origin main

killall nodemon
killall python3
killall node

nohup python3 ./tag_extractor/server.py

cd rss_batch_crawler 
nohup yarn dev > log.out &
cd ..

cd api_server
nohup yarn dev > log.out &
cd ..

cd front
yarn build
nohup yarn start > log.out &
cd ..
