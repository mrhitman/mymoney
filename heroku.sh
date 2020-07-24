#!/bin/bash

if [ -n "$1" ]
then
    echo "\deploy to heroky"
    docker build -t mymoney-api .
    docker tag mymoney-api registry.heroku.com/mymoney-server-api/web
    docker push registry.heroku.com/mymoney-server-api/web
    heroku container:push web -a=mymoney-server-api
    heroku container:release web -a=mymoney-server-api
else
    heroku run -a mymoney-server-api sh
fi