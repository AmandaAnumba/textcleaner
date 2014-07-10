// function for autosaving draft versions of the 
// text that is edited in the editor


var timer;

function submitthis() {
	var text = $('#textarea').html();
    // console.log(text);
    $('#box').val(text);
}

function clear() {
	$('#textarea').empty();
    $('.froala-element').empty();
}

// for the save modal
function savethis() {
	var name = $('#name').val().replace(/[^\w\s\/]/gi, '').replace(/\//g, "-");
    console.log(name);
    $('#draftname').empty().html(name);
    saveDraft(name);
    $('#saveModal').modal('hide');
    $('#save').hide();
    $('#save3').show();
}

// for the delete modal
function deletethis() {
    var name = $('#draftname').text();
    console.log("deleted");
    localStorage.removeItem(name);
    console.log(localStorage);
    $('#textarea').empty();
    $('.froala-element').empty();
    $('#deleteModal').modal('hide');
    stop();
}

window.onload=function(){
	getDrafts2();
    $('.links>ul>li>a').click(function() {
        var key = $( this ).attr("draftname");
        console.log(key);
        window.location = "/edits/"+key;   
    });
};

function saveDraft(name) {
	var editted = $('.froala-element').html();
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
	var edit = $('.froala-element').html();
	var orig = $('#textarea').html();
	var timestamp = new Date().getTime();
	var content = [orig, edit, timestamp];

	var time = showTime();
	var msg = 'Draft Saved at ' + time;
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

function getDrafts2() {
	console.log('Getting Draft...');
	localStorage.removeItem("");
	$('.links>ul').empty();

	for (var i = 0, len = localStorage.length; i < len; ++i) {
		var name = localStorage.key(i);
		var count = i+1;
		var retrieved = localStorage.getItem(name);
		var content = JSON.parse(retrieved);
		var date = new Date(content[2]);
		var html = '<li><a href="#" draftname="'+name+'">'+name+'<p>'+date.customFormat( "#DDD#, #MMMM# #D#, #YYYY# #h#:#mm# #ampm#" )+'</p></a></li>';
		$('.links>ul').append(html);
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




// old stuff
// $(".froala-element").children().each(function() {
        //     $( this ).append( "<br><br>" );
        // });
        // $('#edit').editable({inlineMode: false, inverseSkin: true});
        // if (localStorage.length == 0) {
        //     console.log("nothing in storage so loading the content");
        //     load();
        // }

        // else {
        //     console.log("checking the strings");
        //     var key = localStorage.key(0);
        //     var retrieved = localStorage.getItem(key);
        //     var content = JSON.parse(retrieved);
        //     var orig = content[0]; // in html format
        //     var out = content[1];
        //     var timestamp = content[2];
        //     var original = $('#textarea').text();
        //     var output = $('#output').text();

        //     $('#box').append(orig);
        //     var newOrig = $('#box').text();
        //     $('#box').append(orig);
        //     var newOrig = $('#box').text();


        //     if (newOrig == )
        //     $('#textarea').append(original);

            
        //     // console.log(output);
        //     $('#output').empty();
        //     $('#output').append(output);
        //     $('#save2').hide();

        //     var now = new Date();
            
        //     console.log("now: "+now.getTime());
        //     console.log("timestamp: "+timestamp);

        //     if (now.getTime() > timestamp) {
        //         // if the current time is newer than the time of 
        //         console.log('adding saved content');
        //         load();
        //     }

        //     else {
        //         console.log('getting saved content');
        //         $('#save').hide();
        //         $('#output').append(content[1]);
        //         $('#textarea').append(content[0]);
        //         $('#draftname').html(key);
        //     }
            
        // }