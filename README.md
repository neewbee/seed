# 前端开发种子工程

## 主要框架
* [antd] - UI framework
* [dva] - data management
* [bookshelf] - ORM
* [knex] - query string builder
* [Express] - fast node.js network app framework

----

## Getting Started
Install dependencies.

```bash
$ npm install
```

Start server.

```bash
$ npm run dev
```

## known issues

* install sqlite@3.1.11 in CentOS6 will give error `GLIBC_2.14 not found` install sqlite3@3.1.10 instead
* 开发环境会出现[页面闪烁](https://github.com/dvajs/dva/issues/1131)

## TODO

- [ ] Tests and coverage report
- [ ] jwt Auth
- [ ] TypeScript
- [ ] mongoose
- [ ] strip out dva&roadhog

## License

MIT

[antd]: <https://github.com/ant-design/ant-design>
[dva]: <https://github.com/dvajs/dva>
[bookshelf]: <https://github.com/bookshelf/bookshelf>
[knex]: <https://github.com/tgriesser/knex>
[express]: <http://expressjs.com>
