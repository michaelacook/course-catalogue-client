# Course Catalogue Client 
This project is a React-based client application for a [course catalogue API](https://github.com/michaelacook/course-catalogue-api). Full Stack JavaScript project 10.
The application allows users to create an account, then create, read, update and delete courses.

## Running Locally 
To run the project locally, clone to your local machine and run

`$ npm install`

Then run 

`$ npm run seed`

Then run 

`$ npm start`

Then change into the `/client` directory and run

`$ npm install` 

Then run

`$ npm start`

## Software Design 
This project uses a mixed approach that emphasizes pragmatism. All components are functional, and some use context and hooks for simplicity and ease where access to history, url parameters and multiple props are required. However, a few more simple components do not use context. A single class `Service` encapsulates static methods for handling interaction with the API. These methods are static because they do not need any local variables stored on an object. The `signIn` and `signOut` functions in the `App` component use `Service` methods, but exist on `App` because they perform other program logic not related to interacting with the API. Error handling cascades down the component hierarchy originating from `Service`. `Service` methods implement basic error handling based on server response, and then individual components further handle errors and set error messages where appropriate.