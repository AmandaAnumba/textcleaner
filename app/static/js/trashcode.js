// old stuff


// $('input[name="options"]').change( function() {
//     var name = $('#draftname').text(),
//         status = $('input[name=options]:checked').val();
//     console.log(status);
//     var draft = Parse.Object.extend("drafts");
//     var query = new Parse.Query(draft);
//     query.equalTo("draftname", name);
//     query.first({
//         success: function(result) {
//             result.set("status", status);
//             result.save();
//             console.log("status changed and saved");
//         },
//         error: function(myObject, error) {
//             console.log("Save failed with error: ", error);
//         }
//     });
// });
// localStorage.setItem(name, JSON.stringify(content));
// for (var i = 0; i < len; ++i) {
    //  var name = localStorage.key(i);
    //  var count = i+1;
    //  var retrieved = localStorage.getItem(name);
    //  var content = JSON.parse(retrieved);
    //  var date = new Date(content[2]);
    //  var btn1 = '<td class="btn1" draftname="'+name+'"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil"></span></button></td>';
    //  var btn2 = '<td class="btn2" draftname="'+name+'"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-trash"></span></button></td>';
    //  var html = '<tr><td class="active space">'+name+'</td><td class="space">'+date.customFormat( "#DDD#, #MMMM# #D#, #YYYY# #h#:#mm# #ampm#" )+'</td>'+btn1+btn2+'</tr>';
    //  $('.table').empty().append(html);
    // } 

    // for (var i = 0, len = localStorage.length; i < len; ++i) {
    //  var name = localStorage.key(i);
    //  var count = i+1;
    //  var retrieved = localStorage.getItem(name);
    //  var content = JSON.parse(retrieved);
    //  var date = new Date(content[2]);
    //  var html = '<li><a href="#" draftname="'+name+'">'+name+'<p>'+date.customFormat( "#DDD#, #MMMM# #D#, #YYYY# #h#:#mm# #ampm#" )+'</p></a></li>';
    //  $('.links>ul').append(html);
    // }  

    // if ($('.froala-element > p').children().last().prop("tagName") == "BR") {
            //     $('.froala-element > p').children().last().remove();
            //     breaks();
            // }

    // function breaks() {
    //     $('.froala-element').children().each(function(i) {
    //         if ($(this).last().prop("tagName") == "BR") {
    //             $(this).last().remove();
    //             breaks();
    //         }
    //     });
    // } 
    
// var query = new Parse.Query('drafts');
        // query.find({
        //     success: function(results) {
        //         if (results.length == 0) {
        //             console.log("there's nothing in the database");
        //             $('#wrapper_draft, #alert1').hide();
        //             $('#wrapper_form').show();
        //             return
        //         }

        //         else {
        //             $('#wrapper_form').hide();
        //             $('#wrapper_draft, #alert1').show();
        //             getDrafts();
        //         }
        //     },
        //     error: function(error) {
        //         console.log('error')
        //     }
        // });

        // if (localStorage.length == 0){
        //     // it does not exist
        //     console.log("there's nothing in the localStorage");
        //     $('#wrapper_draft, #alert1').hide();
        //     $('#wrapper_form').show();
        //     return
        // } 

        // if (localStorage.length == 1 && localStorage.getItem(localStorage.key(0)) === "") {
        //     // it does not exist
        //     console.log("there's nothing in the localStorage");
        //     $('#wrapper_draft, #alert1').hide();
        //     $('#wrapper_form').show();
        //     return
        // }

        // else {
        //     // a draft does exist
        //     $('#wrapper_form').hide();
        //     $('#wrapper_draft').show();
        //     console.log(localStorage);
        //     $('#alert1').show();
        //     getDrafts();
        // }
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


            // $( '#edit' ).one( "click", function() {
    //     $(".froala-element").children().each(function() {
    //         $( this ).append( "<br><br>" );
    //     });
    // });