# Git & GitHub — Hands-On Practical Lab
*File 3 of the series — save as: 03_practical_hands_on.md*

> How to use this file: Don't read this passively — open a terminal side by side and type every command as you go. Each lab builds on the last one using ONE running project, so do them in order. By the end you'll have personally caused and fixed a merge conflict, a bad reset, and a fake secret leak — the exact stories interviewers want to hear.

**Setup (do this once):**
```bash
mkdir git-practice-lab
cd git-practice-lab
git init
git config user.name "Your Name"
git config user.email "you@example.com"
```

---

## Lab 1 — The Basic Lifecycle (Unit III)

**Goal:** Feel the difference between untracked → staged → committed with your own hands.

```bash
echo "# My Practice Project" > README.md
git status                      # notice README.md is "Untracked"
git add README.md
git status                      # now it's "Changes to be committed" (staged)
git commit -m "Initial commit: add README"
git log --oneline
```

Now create two files, but stage only one — this is the exercise that actually teaches you *why* staging exists:
```bash
echo "console.log('bug fix')" > app.js
echo "TODO: remove before commit" > debug_notes.txt
git add app.js
git status                     # app.js staged, debug_notes.txt still untracked
git commit -m "Add app logic"
```

**Checkpoint question to ask yourself:** What would have happened if you'd run `git add .` instead? (You'd have committed `debug_notes.txt` too — exactly the mistake staging is designed to prevent.)

---

## Lab 2 — .gitignore and the "Leaked Secret" Simulation

**Goal:** Actually experience why `.env` leaks are dangerous, safely, on a fake repo.

```bash
echo "DB_PASSWORD=supersecret123" > .env
echo "API_KEY=fake_key_abcxyz" >> .env
git add .env
git commit -m "oops, added env file"
```

You just did the classic mistake on purpose. Now let's see the problem:
```bash
git log --oneline               # your secret commit is right there, permanently, in history
git show HEAD --stat            # proves .env is tracked
```

**Now fix it properly (the real remediation steps):**
```bash
echo ".env" > .gitignore
git rm --cached .env             # remove from tracking, but KEEP the file on disk
git add .gitignore
git commit -m "Remove .env from tracking, add to gitignore"
```

Notice: even now, `.env` with the fake password is STILL visible in an old commit:
```bash
git show HEAD~1:.env             # the "leaked" secret is still recoverable from history!
```

This proves the real lesson: **removing a file doesn't erase it from history.** In a real leak, this is exactly why you must rotate the actual credential immediately — deleting the file is not enough. (We won't do the full history-rewrite with `git filter-repo` here since it's overkill for a practice repo, but now you've *seen* why it's necessary in real incidents.)

---

## Lab 3 — Branching, Merging, and a REAL Merge Conflict

**Goal:** Deliberately cause and resolve a merge conflict — the single most useful exercise in this whole file.

```bash
git checkout -b feature/homepage
echo "Welcome to our site!" > homepage.txt
git add homepage.txt
git commit -m "Add homepage greeting"
```

Now switch back to main and change the SAME file differently:
```bash
git checkout main
echo "Welcome, valued customer!" > homepage.txt
git add homepage.txt
git commit -m "Add different homepage greeting on main"
```

Now merge and watch it break:
```bash
git merge feature/homepage
```

You'll see:
```
CONFLICT (content): Merge conflict in homepage.txt
```

Open `homepage.txt` — you'll see conflict markers:
```
<<<<<<< HEAD
Welcome, valued customer!
=======
Welcome to our site!
>>>>>>> feature/homepage
```

**Resolve it:** manually edit the file to keep whichever line (or combine both), delete the `<<<<<<<`, `=======`, `>>>>>>>` markers, then:
```bash
git add homepage.txt
git commit -m "Merge feature/homepage, resolve greeting conflict"
git log --oneline --graph --all      # see the merge commit with two parent lines
```

**You can now genuinely say in an interview:** *"Yes, I've resolved a merge conflict before"* — because you have.

---

## Lab 4 — Rebasing (and why it rewrites history)

**Goal:** See a linear history vs a merge-commit history, side by side.

```bash
git checkout -b feature/footer
echo "Contact us at info@example.com" > footer.txt
git add footer.txt
git commit -m "Add footer contact info"

echo "Copyright 2026" >> footer.txt
git add footer.txt
git commit -m "Add copyright to footer"
```

Meanwhile pretend main moved on:
```bash
git checkout main
echo "Now with dark mode!" >> homepage.txt
git add homepage.txt
git commit -m "Announce dark mode on main"
```

Now rebase your feature branch on top of the new main:
```bash
git checkout feature/footer
git rebase main
git log --oneline --graph --all
```

Notice: no merge commit, and your footer commits now sit cleanly *after* main's latest commit — a straight line. Compare this graph to Lab 3's graph (which had a merge commit with two parent branches joining). This visual difference is exactly what interviewers mean by "merge preserves history shape, rebase makes it linear."

**Try interactive rebase to squash your two footer commits into one:**
```bash
git rebase -i HEAD~2
```
In the editor that opens, change the second commit's `pick` to `squash` (or `s`), save, then write a combined commit message when prompted. Run `git log --oneline` again — your 2 messy commits are now 1 clean commit.

---

## Lab 5 — Stashing Under Pressure

**Goal:** Simulate the "drop everything, prod is broken" scenario.

```bash
git checkout main
echo "half finished feature..." >> homepage.txt
# DON'T commit yet - imagine you're mid-work
git stash save "WIP: homepage tweak"
git status                        # working directory is clean again
```

Now simulate the "urgent fix":
```bash
echo "URGENT HOTFIX APPLIED" > hotfix.txt
git add hotfix.txt
git commit -m "Hotfix: urgent production issue"
```

Now go back to your unfinished work:
```bash
git stash list
git stash pop
git status                         # your half-finished change is back
```

---

## Lab 6 — Tagging a "Release"

**Goal:** Practice marking a release point, the way real teams do.

```bash
git add .
git commit -m "Finalize v1 of practice project" --allow-empty
git tag -a v1.0 -m "First release of practice project"
git tag
git show v1.0
```

---

## Lab 7 — Cherry-pick a Single Fix

**Goal:** Practice pulling in just ONE commit from another branch without merging everything.

```bash
git checkout -b develop
echo "New experimental feature (not ready)" > experiment.txt
git add experiment.txt
git commit -m "WIP experimental feature"

echo "Fixed a real typo in footer" >> footer.txt
git add footer.txt
git commit -m "Fix typo in footer text"
```

Grab the hash of just that last commit:
```bash
git log --oneline -2
```
Copy the hash next to "Fix typo in footer text", then:
```bash
git checkout main
git cherry-pick <that-commit-hash>
```
Notice `main` now has the typo fix but NOT the unfinished experimental feature — exactly what cherry-pick is for.

---

## Lab 8 — The Panic Button: git reflog

**Goal:** Recover from your own "disaster," so you're not scared of it in real life.

```bash
git log --oneline                  # note how many commits exist right now
git reset --hard HEAD~2            # simulate an "oops, I deleted 2 commits"
git log --oneline                  # they're gone!
```

Now recover them:
```bash
git reflog                         # find the commit hash from BEFORE your reset
git reset --hard <that-hash>
git log --oneline                  # your commits are back
```

**This is the single most reassuring thing you can practice** — knowing `reflog` exists means you never need to panic about a bad reset again, in practice or in an interview answer.

---

## Lab 9 — Working with an Actual Remote (GitHub)

**Goal:** Practice the full local-to-GitHub flow at least once end-to-end.

1. Create a new **empty** repository on github.com (don't initialize with a README, to avoid conflicts).
2. Connect and push:
```bash
git remote add origin https://github.com/<your-username>/git-practice-lab.git
git branch -M main
git push -u origin main
git push origin --tags             # push your v1.0 tag too
```
3. Make a change directly on GitHub's web editor (edit README.md in the browser, commit).
4. Pull it down:
```bash
git pull origin main
```
5. **Practice the PR workflow:**
```bash
git checkout -b feature/about-page
echo "About our company" > about.txt
git add about.txt
git commit -m "Add about page"
git push -u origin feature/about-page
```
Then go to GitHub → you'll see a prompt to open a Pull Request. Open it, review the diff yourself, and click "Merge." Then locally:
```bash
git checkout main
git pull origin main
git branch -d feature/about-page          # clean up local branch
git push origin --delete feature/about-page   # clean up remote branch
```

**You have now done, with your own hands, the exact daily workflow of a working developer.**

---

## Final Self-Check — Can You Do These Without Looking?

Try each one from memory before checking the labs above:
- [ ] Initialize a repo and make your first commit
- [ ] Create a `.gitignore` and stop tracking a file that was already committed
- [ ] Create a branch, cause a merge conflict on purpose, and resolve it
- [ ] Rebase a feature branch onto an updated main
- [ ] Squash 2 commits into 1 using interactive rebase
- [ ] Stash a change, do something else, then pop it back
- [ ] Create an annotated tag
- [ ] Cherry-pick one specific commit onto another branch
- [ ] Recover a commit after a `reset --hard` using reflog
- [ ] Push a branch, open a PR on GitHub, merge it, then delete both local and remote branch

If you can do all 10 without opening this file, you're genuinely interview-ready on the practical side — most fresher candidates can only *talk about* half of these; you'll have actually done all of them.