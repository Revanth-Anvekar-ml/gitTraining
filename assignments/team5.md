# Team 5: Rebase and Cherry-Pick

**Level:** Moderate | **Goal:** Rebase a private branch and cherry-pick one commit by ID.

These are separate exercises. Each starts from its own branch based on `main`.

## Part A: Rebase

Fetch the prepared branches, create a practice branch from the older rebase example, and inspect the graph:

```sh
git fetch origin
git switch main
git switch -c team5/rebase-practice origin/workshop/rebase-demo
git log --oneline --decorate --graph --all
```

Replay your topic commit on top of `main`:

```sh
git rebase main
git log --oneline --decorate --graph --all
```

This should finish without conflicts. Rebase replays commits, so the replayed commit gets a new ID. Do not rebase work that teammates may already have based their changes on.

If Git stops for a conflict, edit and save the named file, then continue:

```sh
git status
git add <the-file-you-resolved>
git rebase --continue
```

To cancel an unfinished rebase, run `git rebase --abort`.

## Part B: Cherry-pick by commit ID

The prepared report commit is `9ed7221`. Create a separate branch, inspect that commit, and apply it:

```sh
git switch main
git switch -c team5/cherry-pick-practice
git show --stat 9ed7221
git cherry-pick 9ed7221
git log --oneline --decorate -5
```

The report change should now be on your practice branch under a new commit ID. If a cherry-pick conflicts, edit and save the file, then stage it and continue:

```sh
git add <the-file-you-resolved>
git cherry-pick --continue
```

To cancel an unfinished cherry-pick, run `git cherry-pick --abort`.

## Submit

- Old and new rebase commit IDs.
- Source and new cherry-pick commit IDs.
- Explain when you would rebase and when you would cherry-pick.