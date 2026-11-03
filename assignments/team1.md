# Team 1: Your First Commit

**Level:** Beginner | **Goal:** Practise status, staging, commits, and ignored files.

Work in your own clone. Do not commit to shared `main`.

## Steps

Create a branch from the latest `main`:

```sh
git switch main
git pull --ff-only origin main
git switch -c team1/first-commit
git status --short --branch
```

In VS Code, create `training-lab/team1-notes.md` with a short paragraph about what Git tracks. Also create `training-lab/team1-debug.log` with temporary text. Save both, then inspect:

```sh
git status --short
git check-ignore -v training-lab/team1-debug.log
```

The notes should show as untracked (`??`). The log should be ignored because this repo ignores `*.log`. Stage only the notes, inspect the staged version, unstage it without deleting it, then stage and commit:

```sh
git add training-lab/team1-notes.md
git diff --staged
git restore --staged training-lab/team1-notes.md
git status --short
git add training-lab/team1-notes.md
git commit -m "docs: add team 1 Git notes"
git show --stat --oneline HEAD
git status --short --branch
```

## Submit

- Your branch name and commit ID.
- Output or a screenshot of the final `git status`.
- Explain the difference between `git add` and `git commit`.
- Confirm the `.log` file was not committed.