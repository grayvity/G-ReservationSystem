## configuration

config .env file. Also you can see example on .env-sample file.

## start

- create new instance
```sh
pm2 start ./src/index.js --name "app"
```


- commands
```sh
pm2 list
pm2 stop app
pm2 restart app
pm2 delete app
pm2 start app
```