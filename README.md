# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Serve build with a static server
```
npm install -g serve
npx serve -s build
```

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run lint`

Uses eslint for code style validation. The path for the files to be checked is specified in package.json (`"lint": "eslint ./src"`).
Use .eslintignore for ignore files (files are searched in `./src`).

```
npx eslint ./src/App.tsx

npx eslint --fix ./src/App.tsx
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Problems

To work a linter with a typescript (adds to .eslintrc.json)
```
"parserOptions": {
  ...
  "project": "tsconfig.json"
},
```

Error during test rendering
```
console.error
  react-beautiful-dnd
  
  A setup problem was encountered.
  
  > Invariant failed: 
  provided.innerRef has not been provided with a HTMLElement.
  
  You can find a guide on using the innerRef callback functions at:
  https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/using-inner-ref.md
  
  👷‍ This is a development only message. It will be removed in production builds.

    at log (node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.cjs.js:46:30)
    at node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.cjs.js:5533:9
    at commitHookEffectListMount (node_modules/react-test-renderer/cjs/react-test-renderer.development.js:12999:26)
    at commitPassiveMountOnFiber (node_modules/react-test-renderer/cjs/react-test-renderer.development.js:14422:11)
    at commitPassiveMountEffects_complete (node_modules/react-test-renderer/cjs/react-test-renderer.development.js:14382:9)
    at commitPassiveMountEffects_begin (node_modules/react-test-renderer/cjs/react-test-renderer.development.js:14369:7)
    at commitPassiveMountEffects (node_modules/react-test-renderer/cjs/react-test-renderer.development.js:14357:3)
```