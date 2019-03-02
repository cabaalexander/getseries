const showHelp = () => {
  console.log(`
Usage:
    $ getseries <name> [PATTERN...]

Pattern:
    s<number>       Season
    e<number>       Episode

Examples:
    $ getserie some cool serie s01
        This brings all episodes from season 1

    $ getserie some cool serie s01 e02
        This gets episode two from season one
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
