#!/bin/bash

if [[ "$1" == "deploy" ]]
then
    echo "\ndeploy to heroky"
    docker build -t mymoney-api .
    docker tag mymoney-api registry.heroku.com/mymoney-server-api/web
    docker push registry.heroku.com/mymoney-server-api/web
    heroku container:login
    heroku container:push web --app mymoney-server-api
    heroku container:release web --app mymoney-server-api
elif [[ "$1" == "migrate" ]]
then
    heroku run -a mymoney-server-api yarn migrate
elif [[ "$1" == "migrate:down" ]]
then
    heroku run -a mymoney-server-api yarn migrate:down
elif [[ "$1" == "seed" ]]
then
    heroku run -a mymoney-server-api yarn seed
elif [[ "$1" == "sh" ]]
then
    heroku run -a mymoney-server-api sh
fi