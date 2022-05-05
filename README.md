# spordle

A music guessing game based off [Heardle](https://www.heardle.app/) using Typescript, React and the Spotify API.

To get started make sure you have installed node and yarn and then run `yarn` to install required packages.

Live site: https://spordle.herokuapp.com/

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

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

Style and type checking.

### `yarn fmt`

Automated style formatting.

## CI Setup

Make sure you have docker installed (instructions found [here](https://docs.docker.com/get-docker/)).

Run `docker compose up` to run the docker compose file and pull the relevant `gitlab-runner` image.

Then use the following command to begin registration of the gitlab runner:

`docker exec -it spordle-runner-1 gitlab-runner register --docker-privileged --docker-volumes "/var/run/docker.sock:/var/run/docker.sock"`

Enter the url and registration token found in the [CI/CD settings](https://gitlab.com/MrKren/spordle/-/settings/ci_cd#js-runners-settings).

Following the rest of the steps:

For executor: `docker`

For image: `docker:stable`
