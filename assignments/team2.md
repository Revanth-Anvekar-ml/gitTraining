# Team 2: Branches and a Clean Merge

**Level:** Beginner | **Goal:** Create a feature branch, commit a change, merge it, and read the history.

## Steps

Start from an up-to-date `main` and make a feature branch:

```sh
git switch main
git pull --ff-only origin main
git switch -c team2/profile-docs
git branch --show-current
```

In VS Code, create `training-lab/docs/team2-profile.md` with a made-up intern's name, role, and two interests. Save it, then inspect and commit it:

```sh
git status --short
git diff -- training-lab/docs/team2-profile.md
git add training-lab/docs/team2-profile.md
git diff --staged
git commit -m "docs: add team 2 sample profile"
git log --oneline --decorate -3
```

Create a separate integration branch from `main` and merge the feature into it:

```sh
git switch main
git switch -c team2/merge-practice
git merge --no-ff team2/profile-docs
git status --short --branch
git log --oneline --decorate --graph -5
```

`--no-ff` asks Git to record a merge commit even if it could move the branch pointer forward. Confirm the profile file exists on `team2/merge-practice`. Switch to `main` and confirm the file is not there:

```sh
git switch main
git status --short --branch
```

## Submit

- Feature and integration branch names.
- Feature commit ID and merge commit ID.
- Output or screenshot of the graph.
- Explain why the new file is on the integration branch but not `main`.