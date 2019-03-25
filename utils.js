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
  const re = /^(\w+)+\s*(?:[sS](\d+))?\s*(?:[eE](\d+))?$/;
  const match = args.join(' ').match(re);
  if (!match) {
    showHelp();
    return;
  }
  const [, serieName, serieSeason, serieEpisode = 0] = match;
  return [serieName.trim(), Number(serieSeason), serieEpisode];
};

exports.capitalize = (text) =>
  text
      .split(' ')
      .map((s) => s[0].toUpperCase() + s.slice(1,) );
