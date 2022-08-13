/*
 * server.js
 */
let express = require('express')();
let http = require('http').createServer(express);
let fs = require('fs').promises;
//var ent = require('ent');

let socketServer = require('socket.io')(http);
let registeredSockets = {};


express.get('/', (request, response) => {
  fs.readFile('./index.html')
    .then((content) => {
      // Writes response header
      response.writeHead(200, { 'Content-Type': 'text/html' });
      // Writes response content
      response.end(content);
    })
    .catch((error) => {
      // Returns 404 error: page not found
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Page not found.');
    });
});

express.use('/', (request, response) => {
    fs.readFile('./client.js')
      .then((content) => {
        // Writes response header
        response.writeHead(200, { 'Content-Type': 'application/javascript' });
        // Writes response content
        response.end(content);
      })
      .catch((error) => {
        // Returns 404 error: page not found
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Page not found.');
      });
});
express.use('/', (request, response) => {
    fs.readFile('./client.js')
      .then((content) => {
        // Writes response header
        response.writeHead(200, { 'Content-Type': 'text/css' });
        // Writes response content
        response.end(content);
      })
      .catch((error) => {
        // Returns 404 error: page not found
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Page not found.');
      });
});

// Server listens on port 8080
http.listen(8080);

socketServer.on('connection', function (socket) {
    console.log("user is connect");
    console.log(socket)

    socket.on('disconnect', ()=>{
        console.log("user is disconnected")
    })


    /**
     * a supprimé juste pour tester
     */
    socket.on("jeu", jeu => {
        console.log(socket)
        console.log(jeu)
    })


});