#!/usr/bin/env node

const fetch = require('node-fetch');
const cli = require('cli');
const chalk = require('chalk');
const utils = require('./utils');

const downloadColor = chalk.blueBright;
const finishColor = chalk.green;
const log = console.log;

const {
  GET_SERIES_ENDPOINT,
  GET_SERIES_SEASONS_ENDPOINT,
} = process.env;
const [,, ...args] = process.argv;
const PARSED_ARGS = utils.parseArgs(args);

if (!PARSED_ARGS) {
  process.exit(1);
}

const [SERIE_NAME, SERIE_SEASON, SERIE_EPISODE] = PARSED_ARGS;


const toJson = (res) => res.json();


const handleError = ({message}) => log(`[error]\n${message}`);


const seriesByTitle = (title) => ({title: serieTitle}) =>
  RegExp(title, 'i').test(serieTitle);


const filterSeries = (series) =>
  series.filter(seriesByTitle(SERIE_NAME))[0];


const fetchAllSeasonsEpisodes = ({_id}) =>
  fetch(`${GET_SERIES_SEASONS_ENDPOINT}/${_id}`)
      .then(toJson)
      .then(({episodes}) => episodes);


const filterSeasons = (allSeasonEpisodes) =>
  allSeasonEpisodes.filter(({season}) => season == SERIE_SEASON);


const filterEpisodes = (episodes) => {
  if (!SERIE_EPISODE) {
    return episodes;
  }
  return episodes
      .filter(({episode}) => episode == SERIE_EPISODE);
};


cli.spinner(downloadColor('Fetching...'));
fetch(GET_SERIES_ENDPOINT)
    .then(toJson)
    .then(filterSeries)
    .then(fetchAllSeasonsEpisodes)
    .then(filterSeasons)
    .then(filterEpisodes)
    .then(log)
    .catch(handleError)
    .finally(() => {
      cli.spinner(finishColor('Fetching... done!'), true);
    });
