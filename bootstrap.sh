#!bin/bash

nohub python3 ./tag_extractor/server.py

cd rss_batch_crawler 
nohub yarn dev 
cd ..

cd api_server
nohub yarn dev 
cd ..

cd front
yarn build
nohub yarn start
cd ..
