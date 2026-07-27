# Git & GitHub — Complete Notes (Part 2: Advanced Topics)
*Written for a true beginner going into fresher/intermediate interviews*

> This is Part 2 of the series. It assumes you've already gone through Part 1 (basics — lifecycle, common commands, workflows, remotes). Nothing here refers to any specific college syllabus, so anyone reading it from scratch can follow it. Part 3 will be the hands-on practical lab.

--- 

## 0. Quick Recap Before We Go Further

In Part 1 you learned that Git moves a file through four stages — Working Directory → Staging Area → Local Repository → Remote Repository — using `add`, `commit`, and `push`. You also learned what a **branch** is: an independent line of work, separate from the main project, where you can experiment without affecting the stable version.

Part 2 goes deeper into exactly *how* branches are created, combined, and cleaned up — plus a set of powerful tools (rebasing, stashing, tagging, cherry-picking) that real teams use every day, and that interviewers specifically use to check if you've gone beyond "I just know `add`, `commit`, `push`."

---

## 1. Source Code Management With Git — What's Actually Happening Underneath

**Source Code Management (SCM)** is just the general term for the practice of tracking, organizing, and controlling changes to code over time — Git is one specific tool that implements SCM.

Here's a detail that trips people up: older tools like SVN store history as a series of **differences (diffs)** between one version and the next — like a stack of sticky notes, each one saying "here's what changed since the last note." Git works differently: every single commit stores a **full snapshot** of your entire project at that moment — like taking a complete photograph of your whole desk, not just a note about what moved.

You might think this sounds wasteful (a full photo every time?), but Git is smart about it internally — if a file didn't change between two commits, Git doesn't waste space storing it twice; it just points both snapshots to the same stored copy of that unchanged file. This is why Git is both thorough (full snapshots) and efficient (no needless duplication) at the same time.

**Content-addressable storage** — this is a technical term meaning: every single thing Git stores (a file's content, a folder structure, a commit) gets identified by a unique code called a **hash** (specifically, a SHA-1 hash), which is generated purely from the *content itself*. This has a neat side effect: if the exact same file content appears twice anywhere in your project's entire history, Git recognizes it's identical and only stores it once — saving space automatically.

**Where does all of this actually live?** Inside a hidden folder called `.git`, sitting at the root (top level) of your project folder. This folder contains everything — every commit, every branch pointer, every setting — for that project. If you ever delete the `.git` folder, your regular files stay exactly as they are on your disk, but you permanently lose the entire Git history for that project — there's no more "Git" there anymore, just plain files.

You don't need to memorize Git's internal object types in deep detail for a fresher/intermediate interview, but it's worth knowing they exist, in case you're asked "how does Git store things internally":
- A **blob** stores the raw content of one file.
- A **tree** is like a folder listing — it maps filenames to blobs (files) or other trees (subfolders).
- A **commit** is a snapshot — it points to one tree (representing the whole project at that moment), plus a pointer to its parent commit(s), plus the author, date, and message.

---

## 2. Comparison Commands — "What's Actually Different?"

These commands all answer some version of the question: *"show me exactly what's different between two things."*

```bash
git diff
```
**What it does:** shows you the exact line-by-line differences between your current, unstaged changes and your last commit. Think of it as Git highlighting, in red and green, exactly which lines you added or removed since your last saved snapshot — similar to how Word's "Track Changes" feature highlights edits.

```bash
git diff --staged
```
**What it does differently:** shows the same kind of line-by-line difference, but specifically for changes you've already staged (put in the packing box), comparing them against the last commit.

```bash
git diff <branch1> <branch2>
```
**What it does:** compares two entire branches against each other, showing you every difference between them — useful when you want to know exactly how much a feature branch has diverged from the main branch before merging.

```bash
git log --oneline branch1..branch2
```
**What it does:** shows you the list of commits that exist on `branch2` but are missing from `branch1` — in other words, "what new work happened over here that hasn't made it over there yet."

```bash
git show <commit>
```
**What it does:** as covered in Part 1, this shows the full details of one specific commit — but it's worth repeating here because it's technically also a comparison command: it's really showing you the difference between that commit and the one right before it.

```bash
git blame <file>
```
**What it does:** goes through a file line by line and tells you exactly which commit (and therefore which person) last changed each individual line, and when.

**A common misunderstanding to clear up:** the name "blame" makes it sound like you're trying to accuse a teammate of causing a bug. In real teams, this is almost never the actual purpose — it's genuinely used to understand *context*: if a strange-looking line of code confuses you, `git blame` lets you find the exact commit that introduced it, read that commit's message, and understand *why* it was written that way, before you consider changing it.

---

## 3. Branching and Merging — Going Deeper

### What Is a Branch, Really?

Here's a detail that genuinely impresses interviewers when you explain it correctly: a branch in Git is **not** a separate copy of all your files sitting somewhere. A branch is just a small, lightweight **pointer** — basically a label — that points at one specific commit. When you add a new commit while "on" a branch, Git simply moves that pointer forward to point at the new commit instead.

**Analogy:** imagine your project's history is a single long hiking trail marked with numbered flags (commits). A "branch" is just a sticky note you place on one particular flag, labeled with a name like "feature-idea." When you keep walking forward and place new flags, Git just moves your sticky note along to the newest flag you've reached. Creating a brand-new branch is as simple and cheap as writing a new sticky note and sticking it onto whichever flag you're currently standing at — this is exactly why creating branches in Git is instant, and why developers create new branches constantly without hesitation.

Even `main` (sometimes still called `master` in older projects) is not technically special to Git internally — it's just the conventional name for the default sticky note/branch that exists when you start a project.

```bash
git branch                # lists all branches that exist locally
git branch <name>          # creates a new branch (a new sticky note), but doesn't move you onto it
git checkout <name>        # switches you onto an existing branch
git checkout -b <name>     # creates a new branch AND switches onto it, in one step
git switch <name>          # a newer, clearer command that does the same thing as checkout, for switching branches
git switch -c <name>       # a newer, clearer command that does the same thing as checkout -b
git branch -d <name>       # deletes a branch, but only if it's already been safely merged elsewhere
git branch -D <name>       # force-deletes a branch even if its work was never merged anywhere (be careful!)
```

> **Why do both `checkout` and `switch` exist for the same purpose?** `checkout` is the older command and it does several different, sometimes-confusing things (switching branches, restoring files, and more) depending on how you use it. `switch` (along with `restore`, which you saw in Part 1) was introduced later specifically to make each command's purpose clearer and less error-prone. You'll see both used in real workplaces, so it's worth recognizing both, but `switch` is generally the more beginner-friendly one going forward.

### Merging — Combining Two Branches Back Together

```bash
git checkout main
git merge feature-branch
```
**What this does:** takes all the commits that exist on `feature-branch` but not yet on `main`, and brings them into `main`.

There are two different outcomes, depending on the situation:

**a) Fast-forward merge**
This happens when `main` hasn't had any new commits added since you branched off from it — meaning there's no actual "conflict" of separate work to combine. Git simply moves the `main` pointer forward to match the feature branch's latest commit. No new special commit is created; it's a clean, simple move-forward.

**Analogy:** you and a friend were both standing at flag #10 on the trail. Your friend kept walking and placed flags #11, #12, #13. You never moved. To "catch up," you don't need to do anything complicated — you just walk forward to flag #13 too. That's a fast-forward.

**b) Three-way merge (creates a merge commit)**
This happens when **both** branches have moved forward with new, different commits since they split apart — meaning the two branches have genuinely "diverged." Git can't just move a pointer forward this time, because there are two different paths of work to reconcile. Instead, Git creates a brand new special commit — called a **merge commit** — which has **two parent commits** instead of the usual one, representing the point where both paths of work officially joined back together.

**Analogy:** you and your friend both started at flag #10, but then walked in two different directions, each placing your own new flags. To combine your journeys, you can't just "walk forward" to catch up to one path — instead, you both meet at a new spot and place one final flag that acknowledges both separate journeys led here. That new flag is the merge commit.

### Merge Conflicts — What They Are and How to Actually Resolve Them

A **merge conflict** happens specifically when the *same lines* of the *same file* were changed *differently* on both branches being merged — Git genuinely cannot know which version you want to keep, so it stops and asks you to decide.

When this happens, Git edits the conflicting file directly, inserting special markers to show you both competing versions side by side:

```
<<<<<<< HEAD
your version of the code (whichever branch you're currently on)
=======
the incoming branch's version of the same lines
>>>>>>> feature-branch
```

**How to resolve it, step by step:**
1. Open the file in your editor. You'll see the markers above, wrapped around both conflicting versions.
2. Decide what the final, correct content should be — this might mean keeping your version, keeping the incoming version, combining both, or writing something new entirely. If you're unsure, this is a completely normal moment to message a teammate and ask which version is actually correct.
3. Delete the `<<<<<<<`, `=======`, and `>>>>>>>` marker lines completely — these are not part of your actual code, they're just Git's way of showing you the conflict.
4. Once the file looks exactly the way you want it, mark it as resolved and finish the merge:
```bash
git add <filename>
git commit
```

> **Interview angle: "Have you ever resolved a merge conflict?"** Even as a beginner, if you've genuinely worked through the practical lab exercises for this, you can honestly say yes — and you can describe the exact process above, which is precisely what happens in a real workplace too.

---

## 4. Rebasing — An Alternative Way to Combine Work

### What Is Rebasing?

**Rebasing** takes all the commits from your current branch and re-applies them, one by one, on top of a different branch's latest commit — as if you had started your work *later* than you actually did. The end result is a clean, **straight-line history**, instead of the "two paths joining together" shape that a merge commit creates.

```bash
git checkout feature-branch
git rebase main
```

**Analogy:** imagine you started your own hiking trail branching off from flag #10. Meanwhile, the main trail kept going and is now at flag #15. Merging would create a special "joining point" flag showing where your side-path met back up with the main trail. Rebasing instead **picks up your entire side-path and physically re-plants it**, starting from flag #15 instead of flag #10 — so afterward, it looks exactly as if you had walked straight down the single main trail the whole time, with no separate side-path ever having existed.

### Merge vs Rebase — The Single Most-Asked "Do You Really Understand Git" Question

| | Merge | Rebase |
|---|---|---|
| What happens to history | Preserves the true, exact history — including a visible record of when two branches diverged and rejoined | Rewrites history to look like a single, clean, straight line of commits |
| Is it safe on shared branches? | Yes, always safe | **No — never rebase a branch that other people have already downloaded/pulled** |
| Why the danger with rebase | Rebasing gives every "re-applied" commit a brand new unique ID (hash), even though the actual code change is the same. If someone else already has the old versions of those commits, their copy and your new copy will now disagree, causing confusing errors and duplicate-looking commits when they try to sync up again | N/A |
| What it's best for | Combining work that's already been shared with others | Cleaning up your *own*, *not-yet-shared* commits before you push or open a Pull Request |

**The one-line rule to say confidently in an interview:** *"I rebase my own local branches before pushing, to keep my commit history clean — but I never rebase a branch that's already been shared with others, because that rewrites history in a way that breaks things for anyone who already has the old commits. For shared branches, I use merge instead."*

### Interactive Rebase — Cleaning Up Messy Commits Before Sharing Them

```bash
git rebase -i HEAD~3
```
**What this does:** opens an editable list of your last 3 commits, and lets you choose what to do with each one:
- `pick` — keep this commit exactly as it is
- `reword` — keep the commit's changes, but let you edit its message
- `squash` (or `fixup`) — merge this commit's changes into the commit right before it, combining them into one
- `drop` — completely delete this commit and its changes

**Real-life scenario:** imagine you were building one feature, but along the way you made several messy, unpolished commits like `"WIP"`, `"fix typo"`, and `"ok actually works now"`. Before opening a Pull Request for your team to review, you probably don't want them seeing that messy trail. Using interactive rebase, you can `squash` all three of those small, messy commits into a single, clean, well-described commit like `"Add password reset feature"` — making your project's history far easier for anyone (including a future interviewer looking at your GitHub) to read and understand.

**If a rebase runs into a conflict** (the same-lines-changed-differently problem from the merging section), you resolve it exactly the same way — edit the file, remove the conflict markers, `git add` the fixed file — but instead of `git commit`, you continue the rebase process with:
```bash
git rebase --continue
```
And if you decide partway through that you want to cancel the whole rebase and go back to exactly how things were before you started:
```bash
git rebase --abort
```

---

## 5. Stashing — Temporarily Setting Aside Unfinished Work

**The problem stashing solves:** imagine you're in the middle of editing several files for a new feature — nothing is finished enough to commit yet — when suddenly you're told there's an urgent bug on the main, live version of the product that needs fixing *right now*. You can't easily switch to a different branch while you have messy, half-finished, uncommitted changes sitting around, because Git will generally stop you or carry those changes along awkwardly.

**Stashing** solves this by temporarily "putting away" all your current uncommitted changes into a safe holding spot, and returning your working folder to a clean state — as if you had made no changes at all — so you're free to switch branches, work on something else, and come back to your original half-finished work later, exactly as you left it.

```bash
git stash
```
**Analogy:** imagine you're halfway through cooking a meal, ingredients spread across the kitchen counter, when you suddenly need to rush out. Instead of leaving a mess, you quickly sweep everything into a labeled container, put it in the fridge, and clear the counter completely. Later, you take the container back out and continue cooking exactly where you left off.

```bash
git stash list          # shows every stash you've saved (you can save more than one)
git stash pop           # takes the most recent stash back out AND removes it from the stash list
git stash apply         # takes the most recent stash back out, but keeps a copy in the stash list too
git stash drop          # permanently deletes a specific stash without applying it back
git stash save "message" # saves a stash with a helpful description, so you remember what it contains later
git stash -u             # also includes brand-new, untracked files in the stash (by default, stash only handles already-tracked files)
```

---

## 6. Tagging — Permanently Marking a Specific Point

A **tag** is similar to a branch in that it's also a pointer to a specific commit — but with one crucial difference: **a tag never moves.** Once you tag a commit, that tag will point to that exact same commit forever, even as your project continues to grow with new commits elsewhere.

Tags are most commonly used to mark official release points — for example, `v1.0`, `v2.1.3` — so that anyone can instantly jump back to "exactly what the code looked like when we officially released version 1.0," no matter how much further the project has moved on since then.

**Analogy:** if a branch is a sticky note that keeps moving forward as you keep walking the trail, a tag is like a permanent engraved plaque nailed firmly into the ground at one specific flag — it will always mark that exact same spot, forever, regardless of how much further the trail is extended afterward.

```bash
git tag v1.0
```
**What this does:** creates a simple, "lightweight" tag — just a name pointing at your current commit, nothing more.

```bash
git tag -a v1.0 -m "First release"
```
**What this does differently:** creates an "annotated" tag, which — unlike the simple lightweight version — also stores extra information: who created the tag, when, and a message describing it. This extra information makes annotated tags the generally recommended choice for anything official, like a real product release.

```bash
git tag                          # lists every tag that exists
git push origin v1.0               # sends one specific tag up to the remote repository
git push origin --tags              # sends every tag you have up to the remote repository
git tag -d v1.0                     # deletes a tag from your own local computer
git push origin --delete v1.0        # deletes a tag from the remote repository too
```

---

## 7. GitHub-Specific Concepts You Will Be Asked About

These features aren't part of Git itself — they're features that GitHub (the hosting website) adds on top, but they come up constantly in interviews because they reflect how real teams actually collaborate.

**Pull Request (PR):** a formal request to merge your branch's changes into another branch (usually `main`), which teammates can review, comment on, and approve — or ask for changes — before the merge actually happens. Think of it as submitting a draft for review before it becomes official.

**Fork vs Clone:** a `clone` copies a repository down to your own local computer. A `fork` copies a repository into your *own separate GitHub account* online, creating your own independent version of the whole project that you fully control, typically used when you don't have direct permission to edit the original project (see the Forking Workflow from Part 1).

**Issues:** GitHub's built-in system for tracking bugs, feature requests, and tasks — think of it like a shared, structured to-do list attached to the project, where each item can be discussed and assigned to someone. Pull Requests can be linked to Issues — for example, writing "Fixes #12" in a Pull Request description will automatically close Issue number 12 the moment that Pull Request is merged.

**GitHub Actions:** GitHub's built-in automation system, often used for **CI/CD** — this stands for **Continuous Integration / Continuous Deployment**, meaning: automatically running tests, building the project, or deploying it, every time someone pushes new code or opens a Pull Request, without a human needing to manually trigger it.

**Branch Protection Rules:** settings a team can turn on to stop people from pushing directly onto important branches like `main` — instead requiring changes to go through a reviewed Pull Request, and often requiring automated tests to pass first. Mentioning this in an interview signals that you understand how real production teams actually protect their live code, beyond just working solo.

**SSH vs HTTPS (two ways to connect to GitHub):** HTTPS connects using a username and a token (a special auto-generated password-like code) each time. SSH instead uses a matched pair of cryptographic keys set up once on your computer, after which you're never prompted for a password again for daily work. Most companies set developers up with SSH keys for convenience. (Note: GitHub stopped accepting plain account passwords for these operations back in 2021, specifically to push everyone toward these more secure options.)

### Cherry-picking — Grabbing Just One Specific Commit

```bash
git cherry-pick <commit-hash>
```
**What it does:** takes one single, specific commit from a different branch, and applies just that one commit's changes onto your current branch — without pulling in any of that other branch's *other*, unrelated commits.

**Analogy:** imagine a friend's hiking trail has 10 new flags, but you only want to copy the exact discovery marked at flag #7 onto your own trail, without dragging along flags #1 through #6 and #8 through #10 as well. Cherry-picking lets you copy across just that one single point.

**Real-life scenario:** suppose there's a critical, urgent bug fix sitting in a `develop` branch that also contains a bunch of other unfinished, half-built features you don't want yet. But you need that one specific bug fix live on `main` right now. `git cherry-pick` lets you grab just that one fix commit and apply it directly onto `main`, without bringing along any of `develop`'s unfinished, unrelated work.

### Reflog — Your Safety Net for Undoing Almost Anything

```bash
git reflog
```
**What it does:** shows you a running log of every single place `HEAD` (remember, this is the pointer to wherever you currently are) has pointed to recently — including commits that seem to have completely "disappeared" after something like an aggressive `reset --hard`, or even after accidentally deleting a whole branch.

**Why this matters so much:** many beginners are genuinely afraid of commands like `git reset --hard`, worried that one mistake could permanently destroy hours of work. `reflog` is the reassuring answer to that fear — Git actually keeps a hidden record of almost everywhere you've recently been, for a good while after the fact, specifically so you can recover from exactly this kind of accident.

**Real-life scenario:** suppose you run `git reset --hard HEAD~5`, intending to undo just one recent mistake, but you miscounted and accidentally erased 5 commits' worth of real, needed work. Panic aside, here's the fix:
```bash
git reflog                         # find the commit hash from right before your mistaken reset
git reset --hard <that-hash>       # jump back to exactly that point, recovering everything
```

**`git bisect`** is another advanced recovery-style tool worth knowing exists (though you don't need to master its full workflow right now): it helps you efficiently binary-search through your project's commit history to pinpoint the *exact* commit that first introduced a particular bug, by repeatedly testing "was the bug present here?" at different points in history.

---

## 8. Topics Deliberately Left Out (Skip These For Now)

At a fresher-to-intermediate level, you don't need to spend study time on the following. If one comes up in an interview, it's completely fine to simply say "I know that exists, but I haven't needed to use it yet":
- Git's internal file storage details at the byte/compression level
- Writing custom Git hooks (automated scripts that run at specific Git events, like right before a commit) in real depth
- Submodules and subtrees (techniques for embedding one Git repository inside another) — just know the terms exist
- `git worktree` (having multiple separate working folders linked to one single repository)
- Deep `.gitattributes` configuration and custom merge drivers
- Signing commits cryptographically with GPG

---

## 9. Rapid Fire Interview Q&A — With Full Answers

**Q1: What is the difference between `git merge` and `git rebase`?**
**A:** Merge combines two branches by creating a new commit that has two parents, preserving the exact, true history of how the branches diverged and rejoined. Rebase instead re-applies your branch's commits on top of another branch, rewriting history into a single clean, straight line. Merge is always safe, even on shared branches. Rebase is only safe on your own local commits that haven't been shared with anyone else yet, because it changes each commit's unique ID.

**Q2: What actually causes a merge conflict?**
**A:** A merge conflict happens when the same lines within the same file have been changed differently on the two branches being merged, so Git has no way to automatically decide which version is correct — it needs a human to manually choose or combine the correct final version.

**Q3: How do you resolve a merge conflict, in practice?**
**A:** I'd open the affected file, look at the section wrapped in the conflict markers showing both competing versions, decide on the correct final content (keeping one side, the other, or a combination), delete the conflict markers themselves, then run `git add` on the resolved file followed by `git commit` to complete the merge.

**Q4: What is `git stash` used for?**
**A:** It temporarily saves your current uncommitted changes into a safe holding spot and returns your working folder to a clean state, so you can switch to something else — like an urgent fix — without needing to commit unfinished work. You can later bring those changes back exactly as they were using `git stash pop`.

**Q5: What is the difference between a lightweight tag and an annotated tag?**
**A:** A lightweight tag is just a simple name pointing at a specific commit, with no extra information attached. An annotated tag additionally stores metadata like who created it, when, and a message — making it the recommended choice for marking official releases.

**Q6: What is cherry-picking, and when would you use it?**
**A:** Cherry-picking applies one single, specific commit from a different branch onto your current branch, without bringing along that branch's other unrelated commits. A common real use case is pulling one urgent bug-fix commit directly onto a production branch, without merging in a bunch of other unfinished, unrelated work sitting on the same source branch.

**Q7: What is `git reflog`, and why is it useful?**
**A:** It's a log of every place `HEAD` has recently pointed to, including commits that appear to have vanished after something like a `reset --hard` or a deleted branch. It acts as a safety net — if you make a destructive mistake, `reflog` usually lets you find and recover the commit you were at right before the mistake happened.

**Q8: What's the difference between a fast-forward merge and a three-way merge?**
**A:** A fast-forward merge happens when the target branch hasn't changed at all since you branched off from it — Git simply moves the branch pointer forward with no special new commit needed. A three-way merge happens when both branches have new, different commits since they diverged — Git then creates a special merge commit with two parent commits, representing where the two separate paths of work rejoined.

**Q9: What is the difference between a branch and a tag?**
**A:** Both are pointers to a specific commit, but a branch is designed to keep moving forward automatically as new commits are added on top of it, while a tag is permanently fixed to one exact commit forever, typically used to mark an official release point.

**Q10: What is a Pull Request, and why does it matter in a team?**
**A:** A Pull Request is a formal request, made on a platform like GitHub, to merge one branch's changes into another — usually into `main`. It gives teammates a structured place to review the actual code changes, leave comments, request adjustments, and only approve the merge once everyone is satisfied, which is central to how real teams maintain code quality.

**Q11: Why should you generally avoid rebasing a branch that others are already working from?**
**A:** Because rebasing gives every commit it re-applies a brand new unique commit ID, even though the underlying code change is unchanged. If someone else already has the old versions of those commits downloaded, their copy of history will now disagree with yours, which typically causes duplicate-looking commits and confusing sync errors when they try to update.

**Q12: What would you do if you ran a `git reset --hard` and immediately realized you'd made a mistake?**
**A:** I'd run `git reflog` to find the commit hash Git was pointing to right before I ran the reset, and then run `git reset --hard` again targeting that specific hash, which effectively undoes my mistake and restores the commits I'd accidentally removed.

---

*(Part 3 — the hands-on practical lab, where you'll actually run these commands yourself — is the next file in this series.)*