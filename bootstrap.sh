#!bin/bash

nohub python3 ./tag_extractor/server.py

cd rss_batch_crawler 
nohup yarn dev 
cd ..

cd api_server
nohup yarn dev 
cd ..

cd front
yarn build
nohup yarn start
cd ..
