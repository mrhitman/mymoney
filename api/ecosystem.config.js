module.exports = {
  apps: [{
    name: 'mymoney-api',
    script: 'dist/server.js',
    watch: ['dist'],
    instances: 2,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};