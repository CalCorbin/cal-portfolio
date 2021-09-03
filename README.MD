
# My Portfolio Website

This repo hosts the code for my portfolio site. This is always a constant work in progress.

## Install locally

1. Clone repo.
2. Setup firebase tools by running in terminal `npm install -g firebase-tools`
3. Set up chromedriver globally `npm install -g chromedriver`
4. Run `npm install` in root project directory.
5. Run `npm start`, if all goes well, the browser will open to `http://localhost:3000`

## Pull Requests

Do the following before creating a pull request.
1. If you're going to make a change, write at least one test for your change.
2. Run `npm run lint` and fix any errors
3. Run `npm run test` and fix any errors
4. Run `npm run test:e2e` and fix any errors

## Updating Firebase CI
1. In your terminal login to Firebase
   1. Enter `firebase login`
2. After logging in, create a ci token
   1. `firebase login:ci`
3. A browser will open, prompting you to login.
4. After logging in, go back to the terminal and copy the FIREBASE_TOKEN listed.

General rules for PRs
4. If you're going to make a change, write at least one test.
