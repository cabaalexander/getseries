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
const SERIE_NAME = args.join(' ');
const SERIE_SEASON = 3;
const SERIE_EPISODE = 0;


if (!SERIE_NAME) {
  log('Provide a name pls...');
  process.exit(1);
}


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
      .filter(({episode}) => episode == SERIE_EPISODE)
      .map(({content}) => content);
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
