# spordle

A music guessing game based off [Heardle](https://www.heardle.app/) using Typescript, React and the Spotify API.

To get started make sure you have installed node and yarn and then run `yarn` to install required packages.

Live site: https://spordle.onrender.com

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn lint`

Style and type checking.

### `yarn fmt`

Automated style formatting.

### `yarn ci`

Start the Github Runner container for processing CI jobs.

## CI Setup

Make sure you have docker installed (instructions found [here](https://docs.docker.com/get-docker/)).

Create a Github Personal Access Token with the following scopes listed [here](https://github.com/myoung34/docker-github-actions-runner/wiki/Usage#token-scope).

Create a `.env` file and store the token in it under the following environment variable:

`ACCESS_TOKEN = github_token_here`

Run `docker compose up` to run the docker compose file and pull the relevant `github-runner` image.
