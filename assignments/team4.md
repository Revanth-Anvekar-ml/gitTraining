# Team 4: Push, Fetch, and Pull

**Level:** Beginner to moderate | **Goal:** Push a branch to a remote, fetch it from a second clone, and pull a later commit.

This exercise uses a pretend remote on your computer. It does not push to GitHub. Start in your course clone and run this setup once:

```sh
git switch main
git pull --ff-only origin main
git init --bare ../team4-remote.git
git --git-dir=../team4-remote.git symbolic-ref HEAD refs/heads/main
git remote add team4 ../team4-remote.git
git remote -v
git push -u team4 main
git clone ../team4-remote.git ../team4-peer
```

The bare repository is the pretend server. `team4` is its nickname in the first clone. In VS Code, create `training-lab/docs/team4-message.md` with a short message to a teammate. Commit and push a new branch:

```sh
git switch -c team4/share-message main
git add training-lab/docs/team4-message.md
git commit -m "docs: add team 4 message"
git push -u team4 team4/share-message
```

In the second clone, fetch and check out that branch:

```sh
git -C ../team4-peer fetch origin
git -C ../team4-peer branch --remotes
git -C ../team4-peer switch --track origin/team4/share-message
git -C ../team4-peer log --oneline -3
```

In the first clone, add a second sentence to the message file, save, commit, and push:

```sh
git add training-lab/docs/team4-message.md
git commit -m "docs: reply to team 4 message"
git push
```

In the second clone, fetch, check status, and pull the new commit:

```sh
git -C ../team4-peer fetch origin
git -C ../team4-peer status --short --branch
git -C ../team4-peer pull --ff-only
git -C ../team4-peer log --oneline -3
```

Fetch updates the second clone's view of the server but does not change its checked-out files. Pull brings the fetched commit into the current branch.

## Submit

- Both commit IDs and the branch name.
- Output of `git remote -v` from the first clone.
- Explain what changed after `fetch` and after `pull`.