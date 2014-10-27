pensi-scheduler is simple scheduler for nodejs.  You can create recurrent tasks with different 
periods.  

Note: the period is arbitrary, but I have only tested for hourly and daily tasks.

Sample Usage: 

	var sched = require('pensi-scheduler');

	var TICKS_ONE_MIN = 60 * 1000;	

	// create a scheduler with one minute re-occurant period.
	var sm = sched.create({period: TICKS_ONE_MIN});	
	sm.addTask('A', new Date()); // execute a minute from now.

	sm.once('interval', function(task){
		console.log('Running Task', task.name, '...');
		sm.stop();
	});

	sm.start();

[![Build Status](https://secure.travis-ci.org/oocoder/pensi-scheduler.png?branch=master)](http://travis-ci.org/oocoder/pensi-scheduler)
[![Code Climate](https://codeclimate.com/github/oocoder/pensi-scheduler.png)](https://codeclimate.com/github/oocoder/pensi-scheduler)
