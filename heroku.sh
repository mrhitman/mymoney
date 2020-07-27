#!/bin/bash

if [[ "$1" == "deploy" ]]
then
    echo "\ndeploy to heroky"
    docker build -t mymoney-api .
    docker tag mymoney-api registry.heroku.com/mymoney-server-api/web
    docker push registry.heroku.com/mymoney-server-api/web
    heroku container:push web -a=mymoney-server-api
    heroku container:release web -a=mymoney-server-api
elif [[ "$1" == "sh" ]]
then
    heroku run -a mymoney-server-api sh
fi