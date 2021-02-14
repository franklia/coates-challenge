# How to run on local

These instructions will get you a copy of the api up and running on your local machine for development and testing purposes.

## Prerequisites

- NPM
- React.js
- Node version 14.15.4 or higher
- Google Chrome or Firefox

## Installation

Clone the repo and install dependencies:

- Clone the repo git clone https://github.com/franklia/coates-challenge.git
- Navigate into the repo: cd coates-challenge
- Run npm install to install the node modules

## Set up your environment variables:

Create a .env file in the root directory using the template below

- PORT=3001
- CORS_ORIGIN=http://localhost:3000
- LOCAL_PATH=[enter your local path - you can find this by typing `pwd` in the terminal of the root directory]

Launch app:

- Run `npm run build` to build your app
- Run `npm run dev` to start your local server, and check the test route on http://localhost:3001/api/test

## Set up the frontend app:

You can set up the frontend for this project by following the README file here: https://github.com/franklia/coates-challenge-ui.git
