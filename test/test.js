// test.js - default test that mocha can run 
var sched = require('../lib/pensi-scheduler')
	, assert = require('assert');

describe('pensi-scheduler', function(){

	it('should be able to handle interval events', function(done){
		// create a two secs period scheduler
        var sm = sched.create({period: 1000});	
		sm.addTask('work-queue/gmail'); 
		sm.once('interval', function(task){
			sm.stop();			
			assert(task.name == 'work-queue/gmail', 'Incorrect task');
			done();
		});

		sm.start();
	});

});


