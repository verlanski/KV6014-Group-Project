# KV6014

This is the codebase for the KV6014 module group project.

*A full project description will be added once the solution is finalised.*

---

##  Read This First

**Your code must be checked by a teammate (peer assessed) BEFORE it is merged into `main`.**

- Never work directly on `main`
- Never merge your own work without a teammate approving it
- Never commit `.env` files. This shouldn't be a problem as they will be in `.gitignore`, but double-check before you push.

---

## Step 0: Get the project (first time only)

```bash
git clone <repository-url>
cd <repository-name>
```

Copy the URL from the green **Code** button on GitHub.

---

## Step 1: Create your own branch

A branch is your own safe copy of the project. Whatever you do here won't affect `main`.

First, get the latest version of `main`:

```bash
git checkout main
git pull
```

Then create your branch (pick a name that describes your work):

```bash
git checkout -b your-name/what-you-are-doing
```

Example: `git checkout -b dylan/add-login-page`

---

## Step 2: Add your files

Make your changes, then tell Git which files you want to save.

```bash
git add filename.txt     # add one file
git add .                # add everything you changed
```

Not sure what changed? Run `git status` to see.

---

## Step 3: Commit your files

A commit saves your changes with a short message describing what you did.

```bash
git commit -m "Add login page"
```

Good messages are short and clear, like `Fix typo in header`. Avoid messages like `stuff` or `changes`.

---

## Step 4: Push your files

This uploads your branch to GitHub.

```bash
git push -u origin your-name/what-you-are-doing
```

(After the first time, you can just type `git push`.)

---

## Step 5: Ask a teammate to review your work

1. Go to the repo on GitHub
2. Click **Compare & pull request**
3. Write a short description of what you did
4. Choose a teammate under **Reviewers**
5. Wait for them to approve 
6. Once approved, the work can be merged into `main`

---

## What is `.gitignore`?

It's a file that tells Git which files and folders to leave out of the repository, such as `node_modules`, environment files and build files.

This keeps the repo clean and stops large or personal files from being uploaded to GitHub.

I will set it up with `node_modules` and `.env` at the start of the project. If you ever have sensitive information (like passwords or API keys) and aren't sure whether it's safe to commit, ask a teammate before you push.

---

## Cheat Sheet

```bash
git checkout main                 # go to main
git pull                          # get the latest changes
git checkout -b my-branch         # create your branch
git status                        # see what changed
git add .                         # stage your changes
git commit -m "My message"        # save your changes
git push -u origin my-branch      # upload to GitHub
```
