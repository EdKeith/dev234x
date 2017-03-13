// stopwatch demo
/**
The user should be able to do the following:

Start and stop the timer by pressing the "Start/Stop" button.
Start and stop the timer by pressing the 's' key.
Record the current timer count into the Past Times section by pressing the "Record Time" button
Record the current timer count into the Past Times section by pressing the 't' key.
Reset the timer count to 0 and wipe all previously recorded times in the Past Times section by pressing the "Reset" button.
Reset the timer count to 0 and wipe all previously recorded times in the Past Times section by pressing the 'r' key.
*/

var etime = 0;
var running = false;
var timedisplay;
var timelist;

function togleTimer(){
    running = !running; 
}

function recordTime(){
    // add curent etime to tlist in a <li>
    var e = document.createElement('li');
    e.innerHTML = etime.toFixed(2);
    timelist.appendChild(e);
    // 
}

function reset(){
    running = false;
    etime = 0;
    timedisplay.innerHTML = etime.toFixed(2); 
    clearTimes();
}

function clearTimes(){
    //??? remove all <li> from tlist
    timelist.innerHTML = '';

}

function tick(){
    if (running){
	etime += 0.01;
	// display new time in curtime
	timedisplay.innerHTML = etime.toFixed(2); 
        //console.log('tick');
    }
    // console.log('tock');
}

function setupStopwatchDemo(){
    var interval = setInterval(function(){
	tick();
    },10); //executes callback every  1/100 second
                //<div id="disptime">Display Time Here</div>
                //document.getElementById("demo")
    timedisplay = document.getElementById('disptime');

    console.log( timedisplay);
    console.log("interHTML = " + timedisplay.innerHTML);
    timedisplay.innerHTML = 0;
    timelist = document.getElementById('tlist');

    document.getElementById('togle' ).addEventListener('click', togleTimer);
    document.getElementById('record').addEventListener('click', recordTime);
    document.getElementById('reset' ).addEventListener('click', reset);

    document.addEventListener('keypress', function(event){
	var k = event.key;
	console.log("key = " + k);
        if (k == 's' || k == 'S') togleTimer();
	else if (k == 't' || k == 'T') recordTime();
	else if (k == 'r' || k == 'R') reset();
    }); 
    console.log('SetUp');
}

