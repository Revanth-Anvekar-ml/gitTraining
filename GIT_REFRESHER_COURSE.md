# Git Refresher: Theory and Practice

Audience: software engineering interns. Suggested format: a 3-4 hour guided
session, with the capstone completed individually. All commands are intended to
run from the repository root unless a step says otherwise.

## 1. Version Control Before Git

Version control records named, reviewable states of files and lets a team
compare, share, and recover changes. It answers practical questions: what
changed, who changed it, why, when, and which other work depended on it. It is
not a backup by itself; valuable work still needs a remote and the team's
backup and access-control practices.

Git is a distributed version control system (DVCS). A commit is a snapshot plus
metadata and parent commit references. A clone normally contains the repository
history, so many operations work offline. A branch is a lightweight movable
reference to a commit, not a second copy of every file. Git's working tree,
staging area (index), and commit history are distinct places:

1. Edit files in the working tree.
2. Select the next snapshot with `git add` in the index.
3. Record that snapshot and its message with `git commit`.
4. Share commits with a remote using `git push`; receive remote history with
   `git fetch` or `git pull`.

### A short history

The Linux kernel project used patches and archived files early on, then adopted
the proprietary distributed system BitKeeper in 2002. In 2005, the relationship
between the kernel community and BitMover broke down and BitKeeper's free-of-charge
use was withdrawn. Linus Torvalds, Linux's creator, and other kernel developers
built Git in response, drawing on lessons from BitKeeper. The initial goals
included speed, simple design, strong non-linear development, distributed use,
and the ability to handle a project as large as the Linux kernel. Git is not
Linux and is not owned by Linus; it is an open-source project maintained by a
broader community.

### Git and alternatives

No version-control system is best for every workload. Git is a strong default
for application and infrastructure code because it is distributed, fast for
ordinary branch-and-merge work, works offline, has inexpensive local branches,
and has broad hosting, editor, CI, review, and hiring-market support. Those
network effects make it easy for companies and open-source projects to
collaborate. Git can still need extra tooling for very large monorepos, huge
binary assets, fine-grained permissions, or extremely high-volume automation.

| System | Where it can fit | Tradeoffs to understand |
| --- | --- | --- |
| Git | General software development; broad ecosystem and hosted workflows | Large monorepos and binary assets may need sparse/partial clones, LFS, caches, or custom infrastructure |
| Mercurial | Distributed workflows with a consistent command set and a focus on approachable defaults | Smaller ecosystem and fewer hosted integrations than Git in many markets |
| Subversion (SVN) | Centralized workflows where a central server and path-level permissions are useful | Network connection is central to many workflows; branching and offline work differ from DVCS habits |
| Perforce Helix Core | Game, media, and hardware teams with large binary assets, file locking, and centralized controls | Server administration and licensing/commercial product choices; different collaboration model from Git |
| Jujutsu (`jj`) | A newer VCS with a simpler change model and Git-compatible repository workflows | Smaller ecosystem and team adoption; Git knowledge remains useful |
| Sapling | Meta's user-friendly, scalable source-control tooling; it can work with Git repositories | Some large-scale server and filesystem components are not generally available as a turnkey public service |

### Two current industry examples

**Anthropic and Scion.** The example you may have heard about is Scion, not a
switch to Jujutsu. In an October 13, 2026 engineering post, Anthropic said it
built Scion and migrated its monorepo from Git over five months. Anthropic
described an unusually high-throughput, agent-heavy environment: its reported
merge volume rose from about 2,500 changes per day in May 2026 to more than
30,000 in September. Scion is designed around mostly online agents and jobs:
source-control operations are server-backed, clients use bounded caches and
sparse/on-demand working copies, and CI can ask source-control questions through
an API rather than maintaining a full clone. Anthropic reported much lower
infrastructure use and faster checkouts for its own workload. Treat those as
the company's measurements, not a general benchmark. Anthropic explicitly says
Scion is not a suitable general replacement for Git; the workload and operating
costs are exceptional.

**Meta, Mercurial, and Sapling.** Meta's large-scale source-control history is
associated with Mercurial, but its current tooling is more accurately described
as Sapling: it began as a Mercurial-derived effort and has evolved into its own
system. Sapling's public client supports Git repositories, while some of the
server and virtual-filesystem pieces used at Meta are not publicly available as
a complete service. Meta's 2025 description of directory branching shows one
reason for custom tooling: whole-repository branches can create expensive graph
and merge behavior in a huge monorepo, so Sapling supports workflows that branch
and merge selected directories while keeping the repository-level history
linear. That is a specialized response to Meta's scale, not a reason to avoid
Git for normal team repositories.

## 2. Install Git

Use the approved package manager or company software catalog on managed
machines. Do not bypass execution policy or device-management controls. If an
install is blocked, ask IT for the approved installation path.

### Linux

Use the package manager for your distribution:

```sh
# Debian or Ubuntu
sudo apt update
sudo apt install git

# Fedora
sudo dnf install git

# Arch Linux
sudo pacman -S git

# openSUSE
sudo zypper install git

git --version
```

### Windows

1. On a company-managed PC, first check Software Center or the approved
   developer portal. Otherwise, use the official Git for Windows installer or
   an approved `winget` source.
2. In the installer, the default editor and PATH options are fine for most
   interns. Git Bash is included; Git also works from PowerShell and Windows
   Terminal.
3. Open a new terminal and verify:

```powershell
git --version
```

Optional install command when `winget` is permitted:

```powershell
winget install --id Git.Git -e --source winget
```

## 3. Configure Your Identity and Defaults

Git stores the configured name and email in commit metadata. Use your work
identity when required by your team; do not put credentials or access tokens in
Git configuration.

```sh
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global pull.ff only
git config --global --list --show-origin
```

Line-ending preference for a personal machine:

```powershell
# Windows
git config --global core.autocrlf true
```

```sh
# Linux or macOS
git config --global core.autocrlf input
```

The repository's `.gitattributes` is the project-level source of truth for its
text files. Do not change global settings to fix a single project's line-ending
problem without checking its conventions.

## 4. Clone and Inspect the Lab

Use `git clone`, not the hosting site's ZIP download. A ZIP has files but no Git
history or branch references.

```sh
git clone https://github.com/Revanth-Anvekar-ml/gitTraining.git
cd gitTraining
git status --short --branch
git remote -v
git branch --all --verbose
git log --oneline --decorate --graph --all
```

`origin` is the remote created by `clone`. A remote-tracking ref such as
`origin/main` is your last fetched view of the server; it is not the live server
and it is not your local `main` branch. Prepared branches include:

| Branch | Exercise |
| --- | --- |
| `workshop/feature-profile` | Inspect and merge a small feature |
| `workshop/feature-report` | Inspect and cherry-pick one commit |
| `workshop/rebase-demo` | Rebase topic work onto a newer `main` |
| `workshop/conflict-left` | First side of a same-line theme conflict |
| `workshop/conflict-right` | Competing theme change for the conflict lab |

Fetch updated remote refs and check out a remote branch for inspection:

```sh
git fetch --all --prune
git switch --track origin/workshop/feature-profile
git switch main
```

Do experiments on `lab/...` or `intern/...` branches. Keep shared `main`
protected, and only push to a personal fork or an instructor-approved sandbox.

## 5. Working Tree, Index, and Commits

Run these before changing anything:

```sh
git status
git diff
git diff --staged
```

Make and stage a small edit to `training-lab/docs/usage.md`, then inspect exactly
what will be committed:

```sh
git add training-lab/docs/usage.md
git diff --staged
git commit -m "docs: clarify sample app usage"
git show --stat --oneline HEAD
```

`git add -p` stages selected hunks. To unstage without discarding the working
copy, use `git restore --staged <path>`. `git restore <path>` discards unstaged
edits to that path, so inspect `git diff` first. Use one focused change per
commit and a message that says what changed and why.

Amending changes the commit ID. It is appropriate for cleaning up your own
latest, unpublished commit, not for rewriting a commit teammates may already
have fetched:

```sh
git commit --amend
```

## 6. Read History and Compare Changes

```sh
git log --oneline --decorate --graph --all
git log --oneline main..workshop/feature-report
git show workshop/feature-report
git diff main...workshop/feature-profile
git blame training-lab/config/app.ini
```

`A..B` shows commits reachable from B but not A. `A...B` in `git diff` compares
the merge base with B. Use `git show <commit>` to inspect a commit before
cherry-picking or reverting it.

## 7. Branches, Merge, and Pull Requests

A branch lets you isolate work; `HEAD` identifies the checked-out branch or
commit. Create a disposable merge target and integrate the prepared profile
branch:

```sh
git switch -c lab/merge-target main
git merge --no-ff workshop/feature-profile
git log --oneline --graph --decorate --all
```

`--no-ff` asks Git to preserve a merge commit even when a fast-forward is
possible, making the branch integration visible in this exercise. In a team,
the usual workflow is a topic branch, tests, a pull request/code review, then
the project's approved merge strategy. Delete local practice branches only
after confirming their work is no longer needed.

## 8. Resolve an Intentional Merge Conflict

Both prepared conflict branches edit `training-lab/config/app.ini`'s `theme`
line differently. Use a throwaway target so the prepared refs remain intact:

```sh
git switch -c lab/conflict-target main
git merge --no-ff workshop/conflict-left
git merge --no-ff workshop/conflict-right
git status
git diff -- training-lab/config/app.ini
```

Open the file, choose the intended final theme, and remove every conflict
marker (`<<<<<<<`, `=======`, `>>>>>>>`). Then validate and finish:

```sh
git diff
git add training-lab/config/app.ini
git commit
```

To abandon only the in-progress merge and return to the state before that
merge, use `git merge --abort`. Do not resolve a conflict by blindly choosing
`--ours` or `--theirs`; understand both changes first.

## 9. Rebase a Private Topic Branch

The rebase exercise has a topic commit based on an older `main`. Rebase a new
lab branch so the published exercise branch stays unchanged:

```sh
git switch -c lab/rebase-target workshop/rebase-demo
git log --oneline --graph --decorate --all
git rebase main
git log --oneline --graph --decorate --all
```

Rebase replays commits onto a new base and creates new commit IDs. If a conflict
occurs, edit and stage the resolution, then run `git rebase --continue`; use
`git rebase --abort` to return to the pre-rebase state. Do not rebase commits
that teammates may have based work on. Use merge when preserving the exact
branch history matters or when the team requires it.

## 10. Cherry-Pick One Commit

Cherry-pick applies one selected commit on the current branch as a new commit:

```sh
git switch -c lab/cherry-target main
git show --stat workshop/feature-report
git cherry-pick workshop/feature-report
git log --oneline --decorate -5
```

If the change is not wanted after starting, use `git cherry-pick --abort`. If
there is a conflict, resolve and stage it, then use `git cherry-pick --continue`.
Cherry-pick is useful for targeted fixes, but repeated cherry-picking can make
history harder to understand than merging a branch.

## 11. Remotes: Fetch, Pull, and Push

`fetch` downloads objects and updates remote-tracking refs without integrating
them into the current branch. `pull` fetches and then integrates (by merge or
rebase, according to configuration). `push` publishes local commits and refs.
Inspect before synchronizing:

```sh
git remote -v
git fetch origin
git status -sb
git log --oneline --left-right main...origin/main
git pull --ff-only origin main
```

For a safe push exercise, create a local bare remote beside your clone; this
does not touch the hosted `origin`:

```sh
git init --bare ../gitTraining-demo-remote.git
git --git-dir=../gitTraining-demo-remote.git symbolic-ref HEAD refs/heads/main
git remote add classroom ../gitTraining-demo-remote.git
git push -u classroom main
git push classroom --all
git remote -v
```

Create a feature branch, make and commit a small edit, then publish only that
branch:

```sh
git switch -c intern/remote-practice
# edit a file
git add <path>
git commit -m "docs: practice publishing a branch"
git push -u classroom intern/remote-practice
```

`git push -u` sets the upstream so later `git push` and `git pull` know which
remote branch to use. Never force-push shared branches. If you truly need to
replace a branch you own, coordinate first and prefer `--force-with-lease` over
`--force`.

## 12. Stash and Pop

Stash is a local shelf for uncommitted tracked changes. Make a temporary edit,
then run:

```sh
git status
git stash push -m "intern: temporary experiment"
git stash list
git stash show -p "stash@{0}"
git stash pop
git status
```

`pop` applies the entry and removes it when application succeeds; `apply` keeps
the entry. A normal stash excludes untracked files. Include them with
`git stash push -u -m "..."`. Stashes are local and are not included in a clone
or normal push, so each intern should create their own.

## 13. Multiple Worktrees

Worktrees check out multiple branches from one local repository without making
another full clone. They share repository objects, but each has a separate
working directory:

```sh
git worktree add --detach ../gitTraining-profile-worktree workshop/feature-profile
git worktree list
git -C ../gitTraining-profile-worktree status --short --branch
git worktree remove ../gitTraining-profile-worktree
git worktree prune
```

Close editors and confirm the worktree is clean before removing it. A branch
normally cannot be checked out in two worktrees at once.

## 14. Tags, Undo, and Recovery

Tags name important commits, commonly releases:

```sh
git tag -a training-v1 -m "Git refresher baseline"
git show training-v1
git tag --list
```

`git revert <commit>` records a new commit that reverses an earlier change and
is usually the right choice for shared history. `git reset` moves the current
branch pointer: `--soft` keeps changes staged, the default `--mixed` keeps them
unstaged, and `--hard` also discards working-tree changes. Do not use
`reset --hard` on shared work; inspect status and diffs first.

If a branch or commit seems lost, inspect the local reflog and make a rescue
branch before further cleanup:

```sh
git reflog --date=local
git switch -c rescue/recovered <commit-id>
```

## 15. Ignore Files and Team Hygiene

`.gitignore` prevents selected untracked files (for example logs and local
secrets) from being added by accident; it does not untrack files already
committed. Never commit passwords, tokens, private keys, or production data.
Use the company's approved secret manager. Keep commits small, tests relevant,
and pull requests focused. A green local status means a clean working tree, not
that code has been pushed or backed up.

## 16. Capstone

On a personal clone:

1. Inspect every `workshop/*` branch and draw the commit graph.
2. Merge the profile branch into `lab/merge-target` and cherry-pick the report
   commit into `lab/cherry-target`.
3. Rebase `lab/rebase-target` onto `main` and compare the old and new commit IDs.
4. Reproduce and resolve the theme conflict on `lab/conflict-target`.
5. Create a staged edit, an unstaged edit, and an untracked file; inspect them,
   stash them, then pop the stash.
6. Publish only a practice branch to the local `classroom` remote and fetch it
   from a second clone.
7. Open a detached worktree for the profile branch, inspect it, and remove it.
8. Use `git log --oneline --decorate --graph --all` to explain the final graph.

Before finishing, run `git status --short --branch`, confirm no unintended
changes remain, and do not push practice branches to the shared course `main`.

## References

- [A Short History of Git](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git)
- [Git: About](https://git-scm.com/about)
- [Official Linux installation instructions](https://git-scm.com/install/linux)
- [Official Windows installation instructions](https://git-scm.com/install/windows)
- [Anthropic: Redesigning source control at Anthropic](https://www.anthropic.com/research/redesigning-source-control), October 13, 2026
- [Meta: Branching in a Sapling Monorepo](https://engineering.fb.com/2025/10/16/developer-tools/branching-in-a-sapling-monorepo/)
- [Sapling SCM introduction](https://sapling-scm.com/docs/introduction/)
- [Mercurial overview](https://www.mercurial-scm.org/about)
- [Perforce Helix Core](https://www.perforce.com/products/p4)