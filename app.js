var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var route = require('./routes/route');
var path = require('path');

var app = express();

mongoose.connect(process.env.MONGO_URL, () => {
	console.log('Connected to mongodb');
});

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/', route);

const PORT = process.env.PORT || 1234
app.listen(PORT, () => { console.log(`Server running at port ${PORT}`)});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;