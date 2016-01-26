pensi-scheduler is simple scheduler for nodejs.  You can create recurrent tasks with different 
periods.  

Note: the period is arbitrary, but I have only tested for hourly and daily tasks.

Sample Usage: 

	var sched = require('./lib/pensi-scheduler');
	
	var TICKS_TWO_SECS = 2 * 1000;
	
	// create a scheduler with one minute period.
	var sm = sched.create({period: TICKS_TWO_SECS});	
	sm.addTask('A', new Date(), {name : 'my task'}); // execute a minute from now.
	
	sm.once('interval', function(task){
	    console.log('Running Task', task.name, '...');
		sm.stop();
	});
	
	sm.start();

[![Build Status](https://secure.travis-ci.org/oocoder/pensi-scheduler.png?branch=master)](http://travis-ci.org/oocoder/pensi-scheduler)
[![Code Climate](https://codeclimate.com/github/oocoder/pensi-scheduler.png)](https://codeclimate.com/github/oocoder/pensi-scheduler)
