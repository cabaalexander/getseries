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

const [SERIE_NAME, SERIE_SEASON, SERIE_EPISODES] = PARSED_ARGS;


const toJson = (res) => res.json();


const handleError = ({message}) => log(`\n[error]${message}`);


const seriesByTitle = (title) => ({title: serieTitle}) =>
  RegExp(title, 'i').test(serieTitle);


const filterSeries = (series) =>
  series.filter(seriesByTitle(SERIE_NAME))[0];


const fetchAllSeasonsEpisodes = ({_id}) =>
  fetch(`${GET_SERIES_SEASONS_ENDPOINT}/${_id}`)
      .then(toJson)
      .then(({episodes}) => episodes);


const filterSeasons = (allSeasonEpisodes) => {
  const lastSeason = allSeasonEpisodes.pop().season;
  const seasonEpisodes = allSeasonEpisodes
      .filter(({season}) => season == ( SERIE_SEASON || lastSeason ));

  if (!seasonEpisodes.length) {
    throw new Error(`
    ${utils.capitalize(SERIE_NAME)} does not have a season ${SERIE_SEASON}`);
  }
  return seasonEpisodes;
};


const filterEpisodes = (episodes) => {
  if (!SERIE_EPISODES.length) {
    return [episodes.pop()];
  }

  const filtered = episodes.filter(({episode}) => SERIE_EPISODES.includes(episode));

  if (!filtered.length) {
    throw new Error(`
    The season ${SERIE_SEASON} of ${utils.capitalize(SERIE_NAME)}
    \t\t does not have the episode ${SERIE_EPISODES}`
    );
  }

  return filtered;
};


const filterContent = (episodes) =>
  episodes.map(({
    title,
    episode,
    season,
    content: [{link}],
  }) => ({
    title,
    season,
    episode,
    link,
  }));


const logFinalResult = (data) => {
  log(`\n${JSON.stringify(data, null, 2)}`);
};

cli.spinner(downloadColor('Fetching...'));
fetch(GET_SERIES_ENDPOINT)
    .then(toJson)
    .then(filterSeries)
    .then(fetchAllSeasonsEpisodes)
    .then(filterSeasons)
    .then(filterEpisodes)
    .then(filterContent)
    .then(logFinalResult)
    .catch(handleError)
    .finally(() => {
      cli.spinner(finishColor('Fetching... done!'), true);
    });
