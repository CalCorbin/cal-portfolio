# Cal Corbin's Developer Website

This repo hosts the code for my personal developer site. This is always a constant work in progress.

## Table of Contents
- [Install locally](#setting-up-local-environment)
- [Pull Request](#pull-requests)
- [Testing](#testing)
- [End to End Testing on Pull Requests](#end-to-end-testing-on-pull-requests)
- [Updating Firebase CI](#updating-firebase-ci)

## Setting up local environment

1. Clone repo.
2. Install firebase tools `npm install -g firebase-tools`
3. Run `npm install` in root project directory.
4. Run `npm run dev`.
5. If everything went well, you should be able to open `http://localhost:3000` in your browser and see the site. 

## Pull Requests

Do the following before creating a pull request.
1. If you're going to make a change, write at least one test for your change.
2. Run `npm run lint` and fix any errors
3. Run `npm run test` and fix any errors

## Testing

1. To run all the tests for react components, run `npm run test`
2. To run tests on a specific component, run `npm run test componentName`
3. To run e2e tests, run `npm run test:e2e`. Local server must be running. [See below](#end-to-end-testing-on-pull-requests) for more information.

## End to End Testing on Pull Requests
- To test locally, run `npm run test:e2e`. These will run on your running local server.
- These are true end to end tests, they should cover a very basic user path.
    - If you think a test belongs in a component or unit test, then it probably does. These e2e should be used sparingly.
- Each pull request will trigger an end to end test on the PR. This test will run on the PR's preview URL.
- The test will check to ensure all pages are loading correctly.
- These are ephemeral environments generated in Firebase and will be deleted after the PR is closed.
- If the test fails:
    - Check the logs in the PR to see what failed.
    - If the test failed due to a bug in the code, fix the bug and push the changes to the PR.
    - Github might be down. These are true e2e tests and rely on Github to be up and running.

## Updating Firebase CI

1. In your terminal login to Firebase
   1. Enter `firebase login`
2. After logging in, create a ci token
   1. `firebase login:ci`
3. A browser will open, prompting you to login.
4. After logging in, go back to the terminal and copy the FIREBASE_TOKEN listed.
