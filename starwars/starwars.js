function setup()
{
    document.getElementById("button").addEventListener('click',function(){
	run(gen).catch(function(err){
	    alert(err.message);
	});
    })
    var sst = document.getElementById('shipselector');
    var ss1 = document.getElementById('selectship1');
    var ss2 = document.getElementById('selectship2');
    ss1.appendChild(sst.content.cloneNode(true));
    ss2.appendChild(sst.content.cloneNode(true));

    var t = ss1.getElementsByTagName('select');
    t[0].id = 'ship1';

    t = ss2.getElementsByTagName('select');
    t[0].id = 'ship2';
}

function run(genFunc){
    const genObject= genFunc(); //creating a generator object

    function iterate(iteration){ //recursive function to iterate through promises
        if(iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
        .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
        .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
    }

    try {
        return iterate(genObject.next()); //starts the recursive loop
    } catch (ex) {
        return Promise.reject(ex); //returns a rejected promise if an exception is caught
    }
}

function *gen(){

    //fetch the ships
    var s1Response = yield fetch("http://swapi.co/api/starships/" + 
	                           document.getElementById("ship1").value);
    var s1 = yield s1Response.json();

    var s2Response = yield fetch("http://swapi.co/api/starships/" + 
	                           document.getElementById("ship2").value);
    var s2 = yield s2Response.json();


    //display ship data
//    document.getElementById("filmsText").innerHTML = "Film: <br>" + film.title;
//    document.getElementById("peopleText").innerHTML = characterString;

    document.getElementById("s1name").innerHTML = s1.name; 
    document.getElementById("s2name").innerHTML = s2.name; 

    
    var cost1 = document.getElementById("s1cost");
    cost1.innerHTML = s1.cost_in_credits;
    if (Number(s1.cost_in_credits) > Number(s2.cost_in_credits))
	cost1.className = 'max';
	else cost1.className = '';
    var cost2 = document.getElementById("s2cost");
    cost2.innerHTML = s2.cost_in_credits; 
    if (Number(s2.cost_in_credits) > Number(s1.cost_in_credits))
	cost2.className = 'max';
	else cost2.className = '';

    var speed1 = document.getElementById("s1speed");
    speed1.innerHTML = s1.max_atmosphering_speed;
    if (Number(s1.max_atmosphering_speed) > Number(s2.max_atmosphering_speed))
	speed1.className = 'max';
	else speed1.className = '';
    var speed2 = document.getElementById("s2speed");
    speed2.innerHTML = s2.max_atmosphering_speed; 
    if (Number(s2.max_atmosphering_speed) > Number(s1.max_atmosphering_speed))
	speed2.className = 'max';
	else speed2.className = '';

    var size1 = document.getElementById("s1size");
    size1.innerHTML = s1.cargo_capacity;
    if (Number(s1.cargo_capacity) > Number(s2.cargo_capacity))
	size1.className = 'max';
	else size1.className = '';
    var size2 = document.getElementById("s2size");
    size2.innerHTML = s2.cost_in_credits; 
    if (Number(s2.cargo_capacity) > Number(s1.cargo_capacity))
	size2.className = 'max';
	else size2.className = '';

    var pass1 = document.getElementById("s1pass");
    pass1.innerHTML = s1.passengers;
    if (Number(s1.passengers) > Number(s2.passengers))
	pass1.className = 'max';
	else pass1.className = '';
    var pass2 = document.getElementById("s2pass");
    pass2.innerHTML = s2.passengers; 
    if (Number(s2.passengers) > Number(s1.passengers))
	pass2.className = 'max';
	else pass2.className = '';

}

