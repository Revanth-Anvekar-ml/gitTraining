# Team 3: Resolve a Merge Conflict

**Level:** Beginner to moderate | **Goal:** Create a conflict, understand Git's paused merge, resolve it, and complete the merge.

The prepared branches both edit `training-lab/config/app.ini`: one selects dark theme and one selects blue.

## Steps

Fetch the branches and create a clean practice branch from `main`:

```sh
git fetch origin
git switch main
git status --short --branch
git switch -c team3/conflict-practice
```

Merge dark first; it should finish normally. Then merge blue; a conflict is expected:

```sh
git merge origin/workshop/conflict-left
git merge origin/workshop/conflict-right
git status
git diff -- training-lab/config/app.ini
```

Open `training-lab/config/app.ini` in VS Code. Keep `theme=dark` and remove the other value and Git's conflict markers. Save the file, then stage and commit the resolution:

```sh
git diff
git diff --check
git add training-lab/config/app.ini
git status
git commit -m "merge: resolve team 3 theme conflict"
git log --oneline --decorate --graph -5
```

If you want to cancel the second merge instead, run `git merge --abort` before committing. It cancels the blue merge but keeps the earlier dark merge.

## Submit

- The final theme value and merge commit ID.
- Output or screenshots showing the conflict and the final clean status.
- Explain why Git could not choose a value automatically.