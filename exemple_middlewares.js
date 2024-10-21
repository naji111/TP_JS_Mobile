// Express.js:
// Express.js is a minimal and flexible Node.js web application framework.
// It provides a robust set of features for building web and mobile applications.
// With Express.js, you can create web applications, RESTful APIs, and single-page applications.
// It simplifies server-side development by offering routing and middleware capabilities.
// Express.js allows for easy integration with databases and supports various templating engines.

// Middlewares in Express.js:
// Middlewares are functions that have access to the request, response, and next middleware function.
// They can execute code, modify request and response objects, end the request-response cycle, or call the next middleware.






// -------------------------------------- Exemple 1 ---------------------------------

const express = require('express');
const app = express();

// Middleware to log a message for each incoming request
function simpleLogger(req, res, next) {
    console.log('A request has been received');
    // Pass control to the next middleware or route handler
    next();
}

// Apply the middleware to all routes
app.use(simpleLogger);

app.get('/', (req, res) => {
    res.send('Home page');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});




// --------------------------------------- Exemple 2 -----------------------------------



// const express = require('express');
// const app = express();

// // Middleware to add a welcome message to the response
// function addWelcomeMessage(req, res, next) {
//     // Replace the original send method to add a message
//     const originalSend = res.send;
//     res.send = function (body) {
//         body = 'Welcome! ' + body; // Adds 'Welcome!' to the beginning of the response
//         originalSend.call(this, body); // Sends the modified response
//     };
//     next();
// }

// // Add the middleware for all routes
// app.use(addWelcomeMessage);

// app.get('/', (req, res) => {
//     res.send('This is the home page.');
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


