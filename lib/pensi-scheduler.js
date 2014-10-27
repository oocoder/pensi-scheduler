// pensi-scheduler.js - is a simple scheduler to execute a task recurrently base on 
// a defined period. 

var events = require('events')
	, util = require('util');
    
var TICKS_ONE_DAY = 24 * 60 * 60 * 1000;

function Builder() {}

Builder.prototype.create = function( config ){
	return new PensiScheduler({
		period : config ? (config.period || TICKS_ONE_DAY) : TICKS_ONE_DAY
	});
}

function PensiScheduler( config ) {	
	if(config == undefined) throw new Error('config cannot be undefined');
	events.EventEmitter.call(this);
	
    this.tasks = [];
    this.tasksQueue = new Enumerator();
    this.period = config.period;
}

// Use the following method if you want to share the events list, otherwise
//
//		PensiScheduler.prototype = new events.EventEmitter();
//
// use the util.inherits method to set each object created to its own event
// list.  
util.inherits(PensiScheduler, events.EventEmitter);

PensiScheduler.prototype.__updateTaskQueue = function(){
	var self = this;
	var period = this.period;
	//TODO: You only need to sort the task list once. 
	this.tasksQueue = new Enumerator(this.tasks.sort(function(a, b){ 
		return calcDelayTicks(a.start, period) > calcDelayTicks(b.start, period);
	}));
	
	return this.tasksQueue.next();
}

PensiScheduler.prototype.__schedTask = function(){
	if(!this.isRunning) return;
	    
    var task = this.tasksQueue.next();
    if(task == undefined) task = this.__updateTaskQueue();
	
    var self = this;
    var time = calcDelayTicks(task.start, this.period);	

    this.clearId = setTimeout(function(){
		if(self.isRunning){ 
			self.emit('interval', task); 
			self.__schedTask(); 
		}
	}, time);
    
}

PensiScheduler.prototype.addTask = function(name, time, metaInfo){
    this.tasks.push({name: name, start : time, meta : metaInfo});
}

PensiScheduler.prototype.start = function(){
	this.isRunning = true;
	this.__schedTask();
}

PensiScheduler.prototype.stop = function(){
	if(this.isRunning){
		this.isRunning = false;
		clearTimeout(this.clearId);
		this.tasksQueue = undefined;
	}
}

// Calculate delay offset ticks from current time
function calcDelayTicks( startDate, period ){
    if(!isDate(startDate)) throw new Error('startDate must be a date');
    if(!isInteger(period)) throw new Error('period must be an integer');
    
	var diff = startDate.getTime() - new Date().getTime();

	return (diff < 0 ? period - Math.abs(diff) % period : diff) % (period + 1);
}

function isDate( date ){
	return date instanceof Date && !isNaN(date.valueOf());
}

function isInteger( nVal ) {
    return typeof nVal === "number" && isFinite(nVal) && nVal > -9007199254740992 && 
		nVal < 9007199254740992 && Math.floor(nVal) === nVal;
};

function Enumerator( array, flags ) {
	this.array = array || [];
	this.ccValue = flags ? (flags.isCyclical || 0) : 0;
	this.idx = -1;
	this.length = this.array.length;
}

Enumerator.prototype.next = function(){
	this.idx = ++this.idx >= this.length ? this.ccValue : this.idx; 
	return this.array[this.idx];
}

module.exports = new Builder();