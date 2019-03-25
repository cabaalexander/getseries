const showHelp = () => {
  console.log(`
USAGE
    $ getseries <NAME> [PATTERN]

PATTERN
    s<number>       Season
    e<number>       Episode

EXAMPLES
    $ getserie arrow
        Get the last episode from the last season

    $ getserie arrow s1
        Get the last episode from season 1

    $ get serie arrow s1 e2
        Get the second episode from season 1
`);
};

exports.parseArgs = (args) => {
  const re = new RegExp([
    /^/,
    /\s*(?<name>(?:\s*[a-zA-Z])+)\s*/,
    /(?:\s*[sS](?<season>\d+)\s*)?/,
    /(?<episodes>(?:[eE]\d+\s*)*)?/,
    /$/,
  ].map((r) => r.source).join(''));

  const match = args.join(' ').match(re);

  if (!match) {
    showHelp();
    return;
  }
  const {name, season, episodes: unformattedEpisodes = ''} = match.groups;
  const episodes = unformattedEpisodes.split('e').filter(Boolean).map(Number);

  return [name.trim(), Number(season), episodes];
};

exports.capitalize = (text) =>
  text
      .split(' ')
      .map((s) => s[0].toUpperCase() + s.slice(1,) );
