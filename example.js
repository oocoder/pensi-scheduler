// EXAMPLE.JS - Sample use of pensi scheduler 
var sched = require('./lib/pensi-scheduler');

// Period to cycle scheduled events
var ONE_DAY_PERIOD = 1000*60*60*24;

// Create a daily period scheduler. 
var sm = sched.create({period: ONE_DAY_PERIOD});	

// Run a task only once at 8a (local) time.
sm.addTask('A', '08:00', {url: 'http://localhost:3000/_ah/start'}); 
sm.once('interval', function(task){
    console.log('Sending request to ', task.meta.url);
	sm.stop();
});

sm.start();

