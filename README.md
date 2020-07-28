# MazingMaps

## Table of Contents

- [About](https://github.com/contexD/mazingMaps-client#About)
- [Demo](https://github.com/contexD/mazingMaps-client#Demo)
- [Learning Goals](https://github.com/contexD/mazingMaps-client#learning-goals)
- [Tech](https://github.com/contexD/mazingMaps-client#Tech)
  - [Frontend](https://github.com/contexD/mazingMaps-client#frontend)
  - [Backend](https://github.com/contexD/mazingMaps-client#backend)
- [User Stories](https://github.com/contexD/mazingMaps-client#user-stories)
- [Data Model](https://github.com/contexD/mazingMaps-client#data-model)
- [Wireframes](https://github.com/contexD/mazingMaps-client#wireframes)
- [Server Repo](https://github.com/contexD/mazingMaps-client#server-repo)
- [Scripts](https://github.com/contexD/mazingMaps-client#available-scripts)

## About

MazingMaps is an app for creating mind maps with KaTeX (LaTeX) support. I love to organize new concepts I'm learning with the help of mind maps and I like learning about math. Since none of the apps I use support LaTeX (for entering mathematical expressions), I decided to code my own.

__Note__: This is a MVP and a work in progress.
Currently I am in the process of implementing __local state management with _reactive variables___ instead of _local resolvers_. For more details on cache policies and reactive variables (introduced with Apollo Client 3), see [this blog post](https://www.apollographql.com/blog/local-state-management-with-reactive-variables/).

## Demo

![alt text](https://github.com/contexD/mazingMaps-client/blob/master/latexNodesDemo.gif "creating nodes")


![alt text](https://github.com/contexD/mazingMaps-client/blob/master/deleteNodesDemo.gif "deleting nodes")

## Learning Goals

My goal was to build a full stack app with a _clean_, _simple_ and _intuitive_ user interface. Besides applying learned concepts during the bootcamp, I also wanted to __dive deeper into new tools__ and libraries. 
For this reason I chose to build my _backend architecture_ with __GraphQL and Apollo Server__. I designed a GraphQL schema and wrote the corresponding resolvers. On the _frontend_, __Apollo client__ handles state management.
__React Flow__ was used to build the mind map. I wrote __custom nodes__ to enable inline editing and realize LaTeX support.
Next, I plan to add extensive testing to this project.

## Tech

### Frontend

- [React](https://reactjs.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL](https://graphql.org/)
- [React Flow](https://github.com/wbkd/react-flow)
- [React Latex](https://www.npmjs.com/package/react-latex)
- [KaTeX](https://katex.org/)
- [React Helmet](https://github.com/nfl/react-helmet)
- [MaterialUI](https://material-ui.com/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

### Backend

- [Node.js](https://nodejs.org/en/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL](https://graphql.org/)
- [Express](http://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)

## User Stories

Take a look at my [user stories](https://github.com/contexD/mazingMaps-client/projects/1).

## Data Model

[Here](https://github.com/contexD/mazingMaps-client/blob/master/ER_MazingMapper_wBG.png) you can find my DB model.

## Wireframes

[This](https://github.com/contexD/mazingMaps-client/tree/master/wireframe) is how I envisioned my app.

## Server Repo

[Here's](https://github.com/contexD/mazingMaps-server) my server repo.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
