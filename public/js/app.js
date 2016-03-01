var consumer_key = "9809ced65feee46c5449d5a8ee5ea31b";


var ddplaylist = new Vue({
  el: '#main',
  data: {},
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

new Vue({
  el: '#listOfPlayLists',
  data: {
    playlists: $dataModel
  },
  // ready: function(){
  //   $('.clickLoadTrack').on('click', function(e){
  //     $that = $(this).attr('data-playlist');
  //     getTracks($that);
  //     e.preventDefault;
  //         Vue.nextTick(function () {

  //   });
  //   })
  // }
})


function getTracks(url) {
  console.log('Called with %s', url)
  $.getJSON('http://api.soundcloud.com/resolve?url=' + url + '&format=json&consumer_key=' + consumer_key + '&callback=?', function(playlist) {

    var $data = {
      playlistdxs: playlist,
      dateCreated: moment(playlist.created_at, "YYYYMMDD").format("MMM Do"),
    }

    ddplaylist.$set('haha', $data);
    console.log(ddplaylist.$get('haha').playlistdxs.title)
  });
}


var whatever = _.sortBy($dataModel, 'volume_number')
var dd = whatever.reverse();
getTracks(dd[1].playlist_url);



new Vue({
  el: '#team',
  data: {
    contributors: $contributors
  }
})



// Wait for jQuery to load properly

$(function() {
  $(document).pjax('a[data-pjax]', '#main', {
      fragment: '#main',
      timeout: 3000
  });
  soundManager.onready(function() {});
});
