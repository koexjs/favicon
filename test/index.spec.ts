import { join } from 'path';
import { readFileSync } from 'fs';
import * as Koa from 'koa';
import * as request from 'supertest';
import 'should';

import favicon from '../src';

describe('koa favicon', () => {
  const path = join(__dirname, 'fixtures', 'favicon.ico');

  const app = new Koa();

  app.use(favicon({
    path,
  }));

  app.use(ctx => {
    ctx.get('Content-Type').should.equal('');
    ctx.body = 'hello';
  });

  it('should only respond on /favicon.ico', async () => {
    await request(app.callback())
      .get('/')
      .expect(200, 'hello');
  });

  it('should accept OPTIONS requests', async () => {
    await request(app.callback())
      .options('/favicon.ico')
      .expect('Allow', 'GET, HEAD, OPTIONS')
      .expect(200);
  });

  it('should not accept POST requests', async () => {
    await request(app.callback())
      .post('/favicon.ico')
      .expect('Allow', 'GET, HEAD, OPTIONS')
      .expect(405);
  });

  it('should send the favicon', async () => {
    const body = readFileSync(path);

    await request(app.callback())
      .get('/favicon.ico')
      .expect('Content-Type', 'image/x-icon')
      .expect('Cache-Control', 'max-age=31536000, public')
      .expect(200, body);
  });

  it('should send the cached favicon', async () => {
    const body = readFileSync(path);

    await request(app.callback())
      .get('/favicon.ico')
      .expect('Content-Type', 'image/x-icon')
      .expect('Cache-Control', 'max-age=31536000, public')
      .expect(200, body);
  });

  it('should reactive to maxAge', async () => {
    const body = readFileSync(path);
    const maxAge = 5;

    const _app = new Koa();
    _app.use(favicon({
      path,
      maxAge,
    }));

    await request(_app.callback())
      .get('/favicon.ico')
      .expect('Content-Type', 'image/x-icon')
      .expect('Cache-Control', `max-age=${maxAge}, public`)
      .expect(200, body);
  });
});
