/**
 * Created by pacman29 on 20.02.17.
 */

'use strict';

const express = require('express');
const parser = require('body-parser');
const app = express();

const routes = [
    '/',
    '/signin',
    '/signup',
    '/menu',
    '/play',
    '/aboutus',
    '/rules',
    '/scorelist',
    '/lobby',
    '/game',
    '/gameFake',
];

routes.forEach(path => {
    app.use(path, express.static('public/static'));
});
app.use(express.static('public/static'));

module.exports = app;
