/*
 * server.js
 */
var express = require('express');
let indexRouter = require('./routes/index.route')
var path = require('path');
//var ent = require('ent');
let registeredSockets = {};


var app = express();
let http = require('http').createServer(app);
let socketServer = require('socket.io')(http);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

app.use(function(req, res, next) {
    next(createError(404));
  });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// Server listens on port 8080
http.listen(8000);

socketServer.on('connection', function (socket) {
    console.log("user is connect");
    //console.log(socket)

    socket.on('disconnect', ()=>{
        console.log("user is disconnected")
    })


    /**
     * a supprimé juste pour tester
     */
    socket.on("jeu", (jeu) => {
        //console.log(socket)
        console.log(jeu)
    })


});


module.exports = { app };