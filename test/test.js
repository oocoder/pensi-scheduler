// test.js - default test that mocha can run 
var sched = require('../lib/pensi-scheduler')
	, assert = require('assert');

describe('pensi-scheduler', function(){

	it('should be able to handle interval event', function(done){
		
		// create a scheduler with one sec period
		var sm = sched.create({period: 1000});	
		sm.addTask('A', new Date()); // execute execute task after one sec.

		sm.once('interval', function(task){
			sm.stop();			
			assert(task.name == 'A', 'Incorrect task');
			done();
		});

		sm.start();
	});

});


