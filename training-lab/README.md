# Training Lab

A deliberately small project used to make Git history visible. The app has no
third-party dependencies; its tests use Node.js's built-in test runner (Node.js
18 or newer).

```sh
node training-lab/src/app.js
node --test training-lab/tests/app.test.js
```

The prepared branches add a profile, add a report, introduce a rebase exercise,
and make competing theme edits for a merge-conflict exercise. See the root
course guide for safe, step-by-step commands.