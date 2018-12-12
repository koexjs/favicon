import { readFileSync, statSync } from 'fs';
import { Context } from 'koa';

export type Next = () => Promise<any>;

export interface Options {
  path: string;
  maxAge?: number;
}

export default (options: Options) => {
  const { path, maxAge = 31536000 } = options;
  const cacheControl = `max-age=${maxAge}, public`;
  let icon: Buffer;
  let lastModified;

  return (ctx: Context, next: Next) => {
    if (ctx.path !== '/favicon.ico') {
      return next();
    }

    if ('GET' !== ctx.method && 'HEAD' !== ctx.method) {
      ctx.status = 'OPTIONS' === ctx.method ? 200 : 405;
      ctx.set('Allow', 'GET, HEAD, OPTIONS');
    } else {
      if (!icon) {
        icon = readFileSync(path);
        lastModified = statSync(path).mtime;
      }

      ctx.set('Cache-Control', cacheControl);
      ctx.set('Last-Modified', lastModified);
      ctx.type = 'image/x-icon';
      ctx.body = icon;
    }
  };
};
