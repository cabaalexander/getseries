# getseries

Package to fetch series from a not so random `API` ¯\\_(ツ)_/¯

Note: This get the last season or last episode or both latest if you don't specify any.

## Prerequisite

In order for this script to work you must have these environment variables in your `${shell_profile}rc`

```bash
GET_SERIES_ENDPOINT=<some-endpoint>
GET_SERIES_SEASONS_ENDPOINT=<another-endpoint>
```

## USAGE

```bash
$ getseries <NAME> [PATTERN]
```

## PATTERN

```bash
s<number>       season
e<number>       episode
```

## EXAMPLE
```bash
$ getserie arrow
    Get the last episode from the last season

$ getserie arrow s1
    Get the last episode from season 1

$ get serie arrow s1 e2
    Get the second episode from season 1
```

## Hey!

Commits on this PR are made with [commitizen](https://www.npmjs.com/package/commitizen) ;)
