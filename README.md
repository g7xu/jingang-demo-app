# jingang-demo-app

A small Express app that pins lodash 4.17.4 and deep-merges request data into settings. It exists to be patched by [Jingang](https://github.com/vibhutirp/jingang): several real lodash advisories match the pinned version, but only the `merge` call in `app.js` is reachable.

```bash
npm install
npm test
```

Do not upgrade lodash by hand. Jingang opens the pull request.
