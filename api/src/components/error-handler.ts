import Koa from 'koa';

async function error_handler(ctx: Koa.Context, next: Koa.Next) {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = err.body || err.message;
    ctx.app.emit('error', err, ctx);
  }
}

export default error_handler;
