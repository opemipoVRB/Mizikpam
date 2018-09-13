var convertSeconds = function(sec) {
            var hrs = Math.floor(sec / 3600);
            var min = Math.floor((sec - (hrs * 3600)) / 60);
            var seconds = sec - (hrs * 3600) - (min * 60);
            seconds = Math.round(seconds * 100) / 100

            var result = (hrs < 10 ? "0" + hrs : hrs);
            result += ":" + (min < 10 ? "0" + min : min);
            result += ":" + (seconds < 10 ? "0" + seconds : seconds);
            return result;
         }

var audioTrack = document.getElementById("audiotrack");

// function getTrackDuration() {
//     var track_duration = convertSeconds(audioTrack.duration);
//     document.getElementById("track-length").innerHTML = track_duration;

// }






    // function getTrackDuration(src,cb) {
    //     var audio = new Audio();
    //     $(audio).on("loadedmetadata", function(){
    //         cb(audio.duration);
    //     });
    //     audio.src = src;
    // }
    // // var track_duration = convertSeconds(audioTrack.duration);
    // //This gets the value from the django variable with tag id "track"
    // var track = document.getElementById("my-track").value;
    // console.log('track path ' + track);
    // getTrackDuration(track, function(length){
    //     console.log('length is ' + length)
    //     document.getElementById("track-length").textContent = length;
    // });


//     function play_shuffle(){

//         alert("You button was pressed");
//         if (document.readyState == "complete"  || document.readyState == "loaded"      || document.readyState == "interactive") 
//         {
//             document.getElementById("start-browse").click();
//      // document has at least been parsed
// }

               
//         };
        


        // custom tweak to count number of times track played
        var a = document.getElementsByTagName("audio")[0];
        a.addEventListener("ended", function() {
          //  audio.play(); 
          console.log('Audio has been played ' + a.currentSrc);
        //   alert('Audio has been played ' + a.currentSrc); 
          var URL = stat_url;
          console.log("URL being posted to " + URL )
          console.log("csrf token" + csrftoken)


          var track = a.currentSrc;
        //   var headers = { 'X-CSRFToken': csrftoken  };
         var data = {'csrfmiddlewaretoken': csrftoken,
                "track": track
                };
          var type =  "POST"; 
          $.ajax({url: URL,
                type:  type,
                data: data,
                success: function(response){
                    if (response==='success'){
                        console.log('Updated stats ' + track);
                        // Update the 

                        $.ajax({
                            url: update_URL,
                            type: "GET",
                            data: {},
                            success: function(response){
                                console.log("attempting reflecting update")
                            // $('#view view-main').append(response);
                            // Swapping div content
                            // var main = document.getElementsByClassName('.pages'); //get div to be swapped
                            // while (main.firstChild)main.firstChild.remove(); // remove div
                            // main.append(response); // append new div
                            // $('.view view-main').append(response);
                            // $('.pages').remove(); //this works 
                            // console.log(" removing pages div")              
                            // $('#content').empty();
                            // var main = document.getElementsByClassName('.pages'); //get div to be swapped
                            // $('.pages').append(response);
                            // $('.pages').show();
                            // $('.pages').resize();
                            $('#content').replaceWith(response);
                            console.log('Html Tag', typeof('<div><h1>WTF</h1><h1>WTF</h1><h1>WTF</h1><h1>WTF</h1><h1>WTF</h1><h1>WTF</h1>s</div>'))
                            console.log('Response', typeof('<div>'+ response + '</div>'))

                            // console.log(" update successful")

                            }


                        });


                      }
                    else{
                        console.log('Failed to update');
                      }
                } });

          console.log('update attempt made');
        }, true);

     //   function update_most_and_recently_played(){
        //       var track = a.currentSrc;
        //       var data = {'track': track};
        //     //   var headers = { 'X-CSRFToken': csrftoken  };
        //     data = {'csrfmiddlewaretoken': csrftoken,
        //             "track": track
        //             }
        //       var type =  "POST"; 
        //       var response = function(response){
        //         if (response==='success'){
        //             console.log('Updated stats ' + track);
        //           }
        //         else{
        //             console.log('Failed to update');
        //           }
        //     }
        //       $.ajax({URL, type, data, response });

             
            
        //   }
        //   console.log('attempting update..');
        //   update_most_and_recently_played();
         

    // var _k = document.getElementById('start-browse-play');

    // _k.addEventListener('click', function(){
    //     console.log("i was clicked")
       
          
          

    // })
   
    // _k.onclick = function() {
    // console.log('Click just happened');
    // if(true){
        
    // }
//    document.getElementById('start-browse').click();


// Auto click
    // window.onload = function(){
    
    // }
// };




