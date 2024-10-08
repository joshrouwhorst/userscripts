# Userscripts

## Links

- [All Sites](https://github.com/joshrouwhorst/userscripts/raw/main/userscripts/All%20Sites.user.js)
- [Bible Gateway](https://github.com/joshrouwhorst/userscripts/raw/main/userscripts/Bible%20Gateway.user.js)
- [BibleHub](https://github.com/joshrouwhorst/userscripts/raw/main/userscripts/BibleHub.user.js)
- [IMDB](https://github.com/joshrouwhorst/userscripts/raw/main/userscripts/IMDB.user.js)
- [Instagram](https://github.com/joshrouwhorst/userscripts/raw/main/userscripts/Instagram.user.js)
- [NYT Crossword](https://github.com/joshrouwhorst/userscripts/raw/main/userscripts/NYT%20Crossword.user.js)
- [Reddit](https://github.com/joshrouwhorst/userscripts/raw/main/userscripts/Reddit.user.js)
- [StackOverflow](https://github.com/joshrouwhorst/userscripts/raw/main/userscripts/StackOverflow.user.js)
- [Wikipedia](https://github.com/joshrouwhorst/userscripts/raw/main/userscripts/Wikipedia.user.js)
- [YouTube](https://github.com/joshrouwhorst/userscripts/raw/main/userscripts/Youtube.user.js)

## Debugging

If you want to have a debugger called for a specific script, just add the `debug=` param to your URL. The value should be one of these:

```text
debug=all.sites
```

```text
debug=bible.gateway
```

```text
debug=imdb
```

```text
debug=instagram
```

```text
debug=nyt.crossword
```

```text
debug=reddit
```

```text
debug=stack.overflow
```

```text
debug=wikipedia
```

```text
debug=youtube
```

## Maintenance

1. Make changes to the appropriate script files.
2. Update the version in package.json.
3. Run `npm run push` and the code will update to the git repository.
4. Go into ViolentMonkey (or whatever extension) and update scripts.

## Libraries

[Util.js](https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js)

```URL
https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
```
