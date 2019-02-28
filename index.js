#!/usr/bin/env node

const fetch = require('node-fetch');
const cli = require('cli');
const chalk = require('chalk');

const downloadColor = chalk.blueBright;
const finishColor = chalk.green;
const log = console.log;

const {
  GET_SERIES_ENDPOINT,
  GET_SERIES_SEASONS_ENDPOINT,
} = process.env;
const [,, ...args] = process.argv;
const serieName = args.join(' ');

if (!serieName) {
  log('Provide a name pls...');
  process.exit(1);
}

const toJson = (res) => res.json();


const handleError = ({message}) => log(message);


const seriesByTitle = (title) => ({title: serieTitle}) =>
  RegExp(title, 'i').test(serieTitle);


const filterJson = (series) =>
  series.filter(seriesByTitle(serieName))[0];


const fetchAllSeasons = ({_id}) =>
  fetch(`${GET_SERIES_SEASONS_ENDPOINT}/${_id}`)
      .then(toJson);


cli.spinner(downloadColor('Fetching...'));
fetch(GET_SERIES_ENDPOINT)
    .then(toJson)
    .then(filterJson)
    .then(fetchAllSeasons)
    .then(log)
    .catch(handleError)
    .finally(() => {
      cli.spinner(finishColor('Fetching... done!'), true);
    });
