var consumer_key = "9809ced65feee46c5449d5a8ee5ea31b";

    // soundManager.createSound({
    //     id: 'track_' + playlist.tracks[0].id,
    //     url:  playlist.tracks[0].stream_url+"?consumer_key=" + consumer_key
    //     });
    //   soundManager.play('track_' + playlist.tracks[0].id);

function getTracks(url) {
  // var url = "https://soundcloud.com/that-never-fading-smile/sets/vol-29";
  $.getJSON('http://api.soundcloud.com/resolve?url=' + url + '&format=json&consumer_key=' + consumer_key + '&callback=?', function(playlist) {
    new Vue({
      el: '#main',
      data: {
        playlist: playlist,
        dateCreated: moment(playlist.created_at, "YYYYMMDD").format("MMM Do"),
      },
      ready: function(){
          $('.track-button').on('click', function() {
            $('.active-track i')
              .removeClass('fa-pause')
              .addClass('fa-play');
            $('.active-track')
              .removeClass('active-track')

            $(this).addClass('active-track');
            $('.active-track i').removeClass('fa-play').addClass('fa-pause')
            soundManager.stopAll();
              // console.log($(this).children('.trackerFun'));
            soundManager.createSound({
              id: 'track_' + $(this).attr('data-id'),
              url: $(this).attr('data-stream')+"?consumer_key=" + consumer_key
              });
            soundManager.play('track_' + $(this).attr('data-id'));
          })
        }
    });
  });
}

getTracks('https://soundcloud.com/that-never-fading-smile/sets/vol-21');



var tracks = {
  posts: []
}

var djs = [

];

var track_schema = {
  volume: Number,
  soundclound: String
}

var dj_schema = {

}


// Wait for jQuery to load properly

$(function() {
  $(document).pjax('a[data-pjax]', '#main', {
      fragment: '#main',
      timeout: 3000
  });
  soundManager.onready(function() {});



});
