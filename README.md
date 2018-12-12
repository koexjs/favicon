# favicon

[![NPM version](https://img.shields.io/npm/v/@koex/favicon.svg?style=flat)](https://www.npmjs.com/package/@koex/favicon)
[![Coverage Status](https://img.shields.io/coveralls/koexjs/favicon.svg?style=flat)](https://coveralls.io/r/koexjs/favicon)
[![Dependencies](https://img.shields.io/david/koexjs/favicon.svg)](https://github.com/koexjs/favicon)
[![Build Status](https://travis-ci.com/koexjs/favicon.svg?branch=master)](https://travis-ci.com/koexjs/favicon)
![license](https://img.shields.io/github/license/koexjs/favicon.svg)
[![issues](https://img.shields.io/github/issues/koexjs/favicon.svg)](https://github.com/koexjs/favicon/issues)

> favicon for koa extend.

### Install

```
$ npm install @koex/favicon
```

### Usage

```javascript
// See more in test
import { join } from 'path';
import favicon from '@koex/favicon';

import * as Koa from 'koa';
const app = new Koa();

app.use(favicon({
  path: join(__dirname, 'assets', 'favicon.ico'),
}));

app.use(ctx => {
  ctx.body = 'Hello, Koex!';
});

app.listen(8000, '0.0.0.0', () => {
  console.log('koa server start at port: 8000');
});
```

### Related
* [koa-favicon](https://github.com/koajs/favicon)