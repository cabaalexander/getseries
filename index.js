#!/usr/bin/env node

const fetch = require('node-fetch');
const cli = require('cli');
const chalk = require('chalk');

const downloadColor = chalk.blueBright;
const finishColor = chalk.green;

const {GET_SERIES_ENDPOINT} = process.env;

cli.spinner(downloadColor('Fetching...'));

fetch(GET_SERIES_ENDPOINT)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .then((_) => {
      cli.spinner(finishColor('Fetching... done!'), true);
    });
