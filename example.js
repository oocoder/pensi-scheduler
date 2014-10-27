// example.js 
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

