var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var validURL = require('validator');

var URL = require('../models/urlSchema');
var randomURL = require('../common/randomURL');

var router = express.Router();

var baseURL = 'https://urlmin.herokuapp.com/';

router.route('/')
	.get((req, res) => {
		res.set({'Content-Type': 'text/html'});
	    res.sendFile(path.join(__dirname, '../views/index.html'));
	})
	.post((req, res) => {
		var curr_url = req.body.url;
		var minurl = randomURL.url();
		minurl = baseURL + minurl
		var response = {url: curr_url, minurl: minurl};
		URL.create(response, (err, urls) => {
			if(err)
			{
				res.status(500).send('Internal Server Error');
			}
			else
			{
				res.status(200).json(response);
			}
		});
	});

router.route('/:id')
	.get((req, res) => {
		var minurl = {minurl: baseURL + req.params.id};
		URL.findOne(minurl, (err, urls) => {
			if(urls == null) {
				res.status(500).send('Minified URL not found')
			}
			else
			{
				res.redirect(urls.url);
			}
		});
	});

module.exports = router;