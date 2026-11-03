# Team 7: Review and Release Practice

**Level:** Moderate | **Goal:** Review a change, use a worktree, integrate one commit, and prepare a handoff.

Work in your own clone. Keep your work on `team7/...` branches.

## Part A: Review before integrating

Fetch the prepared branches and inspect the report change:

```sh
git fetch origin
git diff --stat main...origin/workshop/feature-report
git show --stat 9ed7221
git show --format=fuller --no-patch 9ed7221
```

Write down which files changed and what the commit message tells you. The sample app test is optional and requires Node.js 18 or newer; this assignment is about Git.

## Part B: Inspect in a worktree

Create a second working directory for the profile branch:

```sh
git worktree add --detach ../team7-profile-review origin/workshop/feature-profile
git worktree list
git -C ../team7-profile-review status --short --branch
git -C ../team7-profile-review log --oneline -3
```

Inspect the profile files in the new folder, then remove the clean worktree:

```sh
git worktree remove ../team7-profile-review
git worktree list
```

## Part C: Integrate one selected change

The request is to include the report, not every commit from its branch. Create a release-candidate branch and cherry-pick the report commit:

```sh
git switch main
git switch -c team7/release-candidate
git cherry-pick 9ed7221
git log --oneline --decorate -5
git status --short --branch
```

Add a local annotated tag:

```sh
git tag -a team7-v1 HEAD -m "Team 7 release candidate"
git show --stat team7-v1
```

## Part D: Handoff

In VS Code, create `training-lab/docs/team7-handoff.md`. State what was included, name the source commit, and list one thing a reviewer should verify. Save, then commit it:

```sh
git add training-lab/docs/team7-handoff.md
git commit -m "docs: add team 7 release handoff"
git log --oneline --decorate --graph -5
git status --short --branch
```

## Submit

- Source report commit ID and new cherry-pick commit ID.
- Tag and release-candidate branch names.
- `git worktree list` output before and after removal.
- Handoff file and an explanation of why cherry-pick fits this request better than merging the whole branch.