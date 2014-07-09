// function for autosaving draft versions of the 
// text that is edited in the editor


var timer;


function saveDraft(name) {
	var editted = $('#edit').html();
	var orig = $('#textarea').html();
	var timestamp = new Date().getTime();
	var content = [orig, editted, timestamp];

	var time = showTime();
	console.log(time);
	var msg = 'Draft Autosaved at ' + time;
	$('#message').empty().html(msg);
	$('#message').show();
	setTimeout( "jQuery('#message').hide();", 7000 );

	// store the content
	localStorage.setItem(name, JSON.stringify(content));

	// save every 60 secs by calling the function
	timer = window.setInterval(autosave, 60000);	
}


function autosave() {
	var name = $('#draftname').text();
	var edit = $('#edit').html();
	var orig = $('#textarea').html();
	var timestamp = new Date().getTime();
	var content = [orig, edit, timestamp];

	var time = showTime();
	var msg = 'Draft Autosaved at ' + time;
	$('#message').empty().html(msg);
	$('#message').show();
	setTimeout( "jQuery('#message').hide();", 7000 );
	localStorage.setItem(name, JSON.stringify(content));
	if (timer === 'undefined') {
		timer = window.setInterval(autosave, 60000);
	}
	else {
		return
	}
}


function openDraft(key) {
	console.log('Opening Draft...');
	localStorage.removeItem("");
	$('#output').empty();
	$('#textarea').empty();
	$('#draft').empty();

	var retrieved = localStorage.getItem(key);
	var content = JSON.parse(retrieved);
	$('#output').append(content[1]);
	$('#textarea').append(content[0]);
	$('#draftname').html(key);

	// if (localStorage.length == 1) {
		// var key = localStorage.key(0);
		// console.log("draft name : "+key);
		// var retrieved = localStorage.getItem(key);
		// // console.log(retrieved);

		// var content = JSON.parse(retrieved);
		// $('#output').append(content[1]);
		// $('#textarea').append(content[0]);
		// $('#draft').append(content[1]);
		// $('#draftname').html(key);
	// }

	// else {
	// 	for (var i = 0, len = localStorage.length; i < len; ++i) {
	// 		var key = localStorage.key(i);
	// 		console.log(key);
	// 		// var content = localStorage.getItem(key);
	// 		// console.log(content);
	// 		// $('#output').append(content);
	// 		// $('#draftname').html(key);
	// 	}
	// }	
}


function getDrafts() {
	console.log('Getting Draft...');
	localStorage.removeItem("");

	for (var i = 0, len = localStorage.length; i < len; ++i) {
		var name = localStorage.key(i);
		var count = i+1;
		var retrieved = localStorage.getItem(name);
		var content = JSON.parse(retrieved);
		var date = new Date(content[2]);
		var btn1 = '<td class="btn1" draftname="'+name+'"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil"></span></button></td>';
		var btn2 = '<td class="btn2" draftname="'+name+'"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash"></span></button></td>';
		var html = '<tr><td class="active space">'+name+'</td><td class="space">'+date.customFormat( "#DDD#, #MMMM# #D#, #YYYY# #h#:#mm# #ampm#" )+'</td>'+btn1+btn2+'</tr>';
		$('.table').append(html);
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


Date.prototype.customFormat = function(formatString){
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    var dateObject = this;
    YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
    MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=dateObject.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

    h=(hhh=dateObject.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=dateObject.getMinutes())<10?('0'+m):m;
    ss=(s=dateObject.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
}

