# Movie Screen

React and Express Application

## Introduction

This is a simple application with a ReactJS based frontend and ExpressJS Backend

## Setup

Setting up can be done as shown below

```cmd
$ npm install
```

The npm install command installs the dependencies for both the frontend and backend application.

## Usage

To use the application simply follow the description below

```cmd
$ npm run start:backend
```

This command starts the backend application, by default this application would listen on port 5000, you can also specify a port by taking advantage of the process.env.PORT

```cmd
$ npm run start:frontend
```

This command starts the frontend application, before starting it it also runs the build script. On default the frontend application listens on port 3000

## Usage

This application can be tested using the commands described below

```cmd
$ npm run test:backend
```

This command runs the test scripts for the backend application.

```cmd
$ npm run test:frontend
```

This command runs the test scripts for the frontend application

## Technologies Used

A few tools and technologies were involved in the building of this application. Some of them are described below:

1. ExpressJS: Because of it's simplicity, unopinionated yet very powerful nature.
2. FortAwesome: Because of the need for font based icons in the frontend application.
3. Enzyme: Enzyme a JS testing utility for React was used because of the need to mount, manipulate and assert the properties, states and outputs of react components.
4. Nock: This was really helpful with mocking network calls and fetch requests.
5. Mocha, Jest and Chai: Mocha was very helpful as the test framework used in the backend application, Jest on the frontend and chai served as the assertion library.


## Possible Improvements

A lot of improvements could be made to this application, from writing more tests to watching test coverage and code quality. Using ESLint to maintain code quality and pattern. Also, adjustments to the user interface and design could be made.

## What could be done differently

1. Using one test framework, either of Jest or Chai
2. Using Lerna https://lernajs.io/ to manage multiple packages such as the frontend and backend
