const express = require('express');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./configure-middleware.js');
const restricted = require('../auth/restricted-middleware.js');
const knex = require('../data/dbConfig.js');

const server = express();

configureMiddleware(server);

const sessionConfig = {
    name: 'monster',
    secret: 'keep it secret, keep it safe!',
    resave: false,
    saveUninitialied: true,
    cookie: {
      maxAge: 1000 * 60 * 10,
      secure: false,
      httpOnly: true,
    },
    store: new KnexStore({
      knex,
      tablename: 'sessions',
      createtable: true,
      sidfieldname: 'sid',
      clearInterval: 1000 * 60 * 15,
    })
  }
  

server.use(session(sessionConfig))
server.use('/api', restricted, apiRouter);

module.exports = server;