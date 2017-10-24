# 前端开发种子工程

针对中后台CRUD业务的种子工程，api使用nodejs搭配ORM框架，前端技术栈为dva+andt+roadhog。

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

global install knex
```bash
$ npm install knex -g
```
generate and populate the database
```bash
$ knex migrate:latest && knex seed:run
```

Start project and happy hacking :beer:

```bash
$ npm run dev
```

### 接入指南（WIP）
当前项目有三个布局放在一起，实际开发的时候要去掉其他两个。关于路由的使用方法请参考[react-router](https://reacttraining.com/react-router/web/guides/philosophy)
 
 `route/index.js` 

```jsx
<Switch>
  <Route exact path="/"
    render={props => {
      return (
        <Redirect
          to={{
            pathname: '/nav1',
            state: { from: props.location },
          }}
        />
      )
    }}
  />
  <AuthRoute path="/nav1" component={Nav1} />
  <AuthRoute path="/nav2" component={Nav2} />
  <AuthRoute path="/nav3" component={Nav3} />
  <Route component={NoMatch} />
</Switch>
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
