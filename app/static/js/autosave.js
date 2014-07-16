// function for autosaving draft versions of the 
// text that is edited in the editor


var timer;

function submitthis() {
	var text = $('#textarea').html();
    $('#box').val(text);
}

function clear() {
    $('.froala-element').empty();
    console.log("cleared");
}

// for the save modal
function savethis() {
	var draft = $('#name').val().replace(/[^\w\s\/]/gi, '').replace(/\//g, "-");
    var user = $('#username').val();
    saveDraft(draft, user);
    $('#draftname').empty().html(draft);
    $('#saveModal').modal('hide');
    $('#save').hide();
    $('#save2, #delete, #comment').show();
    getDrafts2();
}

// for the delete modal
function b4delete() {
    var name = $('#draftname').text();
    deletethis(name);
}
function deletethis(name) {
    $('#textarea').empty();
    $('.froala-element').empty();
    var draft = Parse.Object.extend("drafts");
    var query = new Parse.Query(draft);
    query.equalTo("draftname", name);
    query.first({
        success: function(result) {
            result.destroy({});
            console.log("deleted");
        },
        error: function(myObject, error) {
            console.log("Save failed with error: ", error);
        }
    });
    $('#deleteModal').modal('hide');
    stop();
    getDrafts2();
}

// for the comments modal
function add_comment() {
    
}

function saveDraft(name, user) {
    // get the content to save
	var orig = $('#textarea').html(),
        editted = $('.froala-element').html(),
        timestamp = new Date().getTime(),
        content = [orig, editted, timestamp],
        time = showTime(),
        msg = 'Draft saved at ' + time;
	$('#message').empty().html(msg).show();
	setTimeout( "jQuery('#message').hide();", 7000 );

	// store the content
    var draft = Parse.Object.extend("drafts");
    var x = new draft();
    x.save({
        content: JSON.stringify(content),
        draftname: name,
        name: user
    }, {
        success: function(x) {
            console.log("Save succeeded");
        },
        error: function(model, error) {
            console.log("Save failed with error: ", error);
        }
    });

	// save every 60 secs by executing the function
    if (!timer) {
        timer = window.setInterval(function() {
            var name = $('#draftname').text(),
                orig = $('#textarea').html(),
                edit = $('.froala-element').html(),
                timestamp = new Date().getTime(), 
                content = [orig, edit, timestamp],
                time = showTime(),
                msg = 'Draft saved at ' + time;
            $('#message').empty().html(msg).show();
            setTimeout( "jQuery('#message').hide();", 7000 );
            
            x.save(null, {
                success: function(x) {
                    x.set("content", JSON.stringify(content));
                    x.save();
                }, 
                error: function(model, error) {
                    console.log("autosave failed with error: ", error);
                }
            });
        }, 60000);
    }
    else { return } 
}


function selfsave() {
	var name = $('#draftname').text(),
        edit = $('.froala-element').html(),
        orig = $('#textarea').html(),
        timestamp = new Date().getTime(),
        content = [orig, edit, timestamp],
        time = showTime(),
        msg = 'Draft Saved at ' + time;
	$('#message').empty().html(msg).show();
	setTimeout( "jQuery('#message').hide();", 7000 );
    
    var draft = Parse.Object.extend("drafts");
    var query = new Parse.Query(draft);
    query.equalTo("draftname", name);
    query.first({
        success: function(result) {
            result.set("content", JSON.stringify(content));
            result.save();
        },
        error: function(myObject, error) {
            console.log("Save failed with error: ", error);
        }
    });
}


function getDrafts() {
	console.log('getting drafts for draft table ...'); 
    $('.table > tbody > th').empty();
    var query = new Parse.Query('drafts');
    query.ascending("updatedAt");
    query.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) {
                var name = results[i].get('draftname');
                var retrieved = results[i].get('content');
                var user = results[i].get('name');
                var content = JSON.parse(retrieved);
                var date = new Date(content[2]);
                var btn1 = '<td class="btn1" draftname="'+name+'"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil"></span></button></td>';
                var btn2 = '<td class="btn2" draftname="'+name+'"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash"></span></button></td>';
                var html = '<tr><td class="active space">'+name+'</td><td class="space">'+date.customFormat( "#DDD#, #MMMM# #D#, #YYYY# #h#:#mm# #ampm#" )+'</td><td>'+user+'</td>'+btn1+btn2+'</tr>';
                $('.table').append(html);
            }
        },
        error: function(error) {
            console.log('error')
        }
    });
}


function getDrafts2() {
	console.log('getting drafts for panel ...');
	$('.links>ul').empty();
    var query = new Parse.Query('drafts');
    query.ascending("updatedAt");
    query.find({
        success: function(results) {
            if (results.length == 0) {
                var html = '<p style="color:#40A1D3;"><small>There aren\'t any available drafts.</small></p>';
                $('.links>ul').append(html);
            }
            
            else {
                for (var i = 0; i < results.length; i++) {
                    var name = results[i].get('draftname'),
                        author = results[i].get('name'),
                        retrieved = results[i].get('content'),
                        content = JSON.parse(retrieved),
                        date = new Date(content[2]);
                    var html = '<li><a href="#" draftname="'+name+'" class="draft_link">'+name+'<p>Author: '+ author +'</p><p>'+date.customFormat( "#DDD#, #MMMM# #D#, #YYYY# #h#:#mm# #ampm#" )+'</p></a></li>';
                    $('.links>ul').append(html);
                }
            }
        },
        error: function(error) {
            console.log('error')
        }
    });	
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

