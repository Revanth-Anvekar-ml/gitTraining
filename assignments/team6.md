# Team 6: Stash, Revert, and Recovery

**Level:** Moderate | **Goal:** Save unfinished edits, undo a commit safely, and inspect the reflog.

Use only your own clone and branches. Do not use `git reset --hard`.

## Part A: Stash and pop

Create a branch and a small tracked file:

```sh
git switch main
git switch -c team6/recovery-practice
```

In VS Code, create `training-lab/docs/team6-checklist.md` with two checklist items. Save and commit it:

```sh
git add training-lab/docs/team6-checklist.md
git commit -m "docs: add team 6 checklist"
```

Edit the checklist and create `training-lab/team6-temp.txt`. Save both, then stash tracked and untracked changes:

```sh
git status --short
git stash push -u -m "team6: unfinished checklist edit"
git status --short
git stash list
git stash show -p "stash@{0}"
```

The working tree should be clean. Restore the changes:

```sh
git stash pop
git status --short
```

`-u` includes untracked files. `pop` applies the saved changes and removes the stash entry if it succeeds. Stashes stay in your clone; they are not pushed.

Before Part B, use VS Code to remove only the temporary line you added and delete `training-lab/team6-temp.txt`. Keep the committed checklist unchanged. Confirm the working tree is clean:

```sh
git status --short
```

## Part B: Revert a commit

Create a separate branch and reverse the checklist commit:

```sh
git switch -c team6/revert-practice team6/recovery-practice
git revert --no-edit HEAD
git log --oneline -3
git status --short
```

Revert creates a new commit that reverses an earlier change. The original stays in history, which is why revert is usually suitable for shared work.

## Part C: Reflog

The reflog shows where your local branches and `HEAD` recently pointed:

```sh
git reflog --oneline -10
```

Copy the checklist commit ID from the output and replace `COMMIT_ID` below:

```sh
git switch -c team6/rescue COMMIT_ID
git show --stat HEAD
```

## Submit

- Output showing the stash before and after `pop`.
- Revert commit ID and the commit it reverses.
- Rescue branch name and the commit it points to.
- Explain why revert is safer than rewriting shared history.