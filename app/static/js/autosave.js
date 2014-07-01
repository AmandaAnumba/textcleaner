// function for autosaving draft versions of the 
// text that is edited in the editor

$(function() {
    // check if a draft exists
    localStorage.removeItem("");

    if (localStorage.length == 0){
        // it does not exist
        console.log("there's nothing in the localStorage");
        return
    } 

    if (localStorage.length==1 && localStorage.getItem(localStorage.key(0))=="") {
        // it does not exist
        return
    }

    else {
        // a draft does exist
        $('#alert1').show();
    }   
});


var timer;


function saveDraft(name) {
	var content = $('#output').html();
	var time = showTime();
	console.log(time);
	var msg = 'Draft Autosaved at ' + time;
	$('#message').empty().html(msg);
	$('#message').show();
	setTimeout( "jQuery('#message').hide();", 5000 );
	localStorage.setItem(name, content);

	// save every 60 secs by calling the function
	timer = window.setInterval(autosave, 60000);	
}

function autosave() {
	var name = $('#draftname').text();
	var content = $('#output').html();
	var time = showTime();
	var msg = 'Draft Autosaved at ' + time;
	$('#message').empty().html(msg);
	$('#message').show();
	setTimeout( "jQuery('#message').hide();", 5000 );
	localStorage.setItem(name, content);
}

function openDraft() {
	console.log('here in function');
	localStorage.removeItem("");

	if (localStorage.length == 1) {
		var key = localStorage.key(0);
		console.log(key);
		var content = localStorage.getItem(key);
		console.log(content);
		$('#output').append(content);
		$('#draftname').html(key);
	}

	else {
		for (var i = 0, len = localStorage.length; i < len; ++i) {
			var key = localStorage.key(i);
			console.log(key);
			// var content = localStorage.getItem(key);
			// console.log(content);
			// $('#output').append(content);
			// $('#draftname').html(key);
		}
	}	
}

function showTime() {
	var timeNow = new Date();
	var hours = timeNow.getHours();
	var minutes = timeNow.getMinutes();
	var seconds = timeNow.getSeconds();
	var timeString = "" + ((hours > 12) ? hours - 12 : hours);
	timeString += ((minutes < 10) ? ":0" : ":") + minutes;
	timeString += ((seconds < 10) ? ":0" : ":") + seconds;
	timeString += (hours >= 12) ? " P.M." : " A.M.";
	return timeString;
}

function stop() {
	clearInterval(timer);
	console.log("timer stopped");
}



