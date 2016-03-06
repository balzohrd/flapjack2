var consumer_key = "9809ced65feee46c5449d5a8ee5ea31b";

// Load Contributors
new Vue({ el: '#team', data: { contributors: $contributors } })

// List Playlists
new Vue({
  el: '#listOfPlayLists',
  data: { playlists: $dataModel },
  ready: function() {
    $('.clickLoadTrack').on('click', function(e){
      e.preventDefault;
      getTracks($(this).attr('data-playlist'));
      Vue.nextTick(function () { });
    })
  }
})




var playlistUI = {
  clearIcons: function() {
    $('.active-track i')
      .removeClass('fa-pause')
      .addClass('fa-play');
  },
  addActiveIcon: function(){
    $('.active-track i').removeClass('fa-play').addClass('fa-pause');
  },
  removeActiveClass: function(){
    $('.active-track')
        .removeClass('active-track');
  },
  addActiveClass: function(elclass) {
    $('.trackItem '+ elclass)
      .addClass('active-track')
      .attr('data-playing', true);
  }

}

var player = {
  stopAll: function(){
    playlistUI.clearIcons();
    playlistUI.removeActiveClass();
    soundManager.stopAll();
  },
  play: function(track, $elem){
    $($elem).attr('data-playing', true)
    playlistUI.clearIcons();
    playlistUI.removeActiveClass();
    playlistUI.addActiveClass($elem)
    playlistUI.addActiveIcon()
    soundManager.play(track);
  },
  pause: function(track, $elem){
    $($elem).attr('data-playing', false)
    playlistUI.clearIcons();
    playlistUI.removeActiveClass();
    soundManager.togglePause(track);
  }
}



var ddplaylist = new Vue({
  el: '#main',
  data: {},
  ready: function(){},
    methods: {
      playMusic: function (index) {
        var $playlistId = this.$get('data').playlist.id;
        var $trackId = this.data.playlist.tracks[index].id;
        var $soundManagerTrack = 'playlist_'+$playlistId+'_track_' + $trackId;
        var $trackElementClass = '.track_' + index;

        if(window.currentTrack == $soundManagerTrack) {
          player.pause(window.currentTrack, $trackElementClass)
        } else {
          player.pause(window.currentTrack, $trackElementClass)
          window.currentTrack = $soundManagerTrack;
          player.play($soundManagerTrack, $trackElementClass)
        }

      }
    }
});

// Get Playlist Data From Soundcloud
function getTracks(url) {
  $.getJSON('http://api.soundcloud.com/resolve?url=' + url + '&format=json&consumer_key=' + consumer_key + '&callback=?', function(playlist) {
    _.map(playlist.tracks, function(v, k){
      soundManager.createSound({
        id: 'playlist_'+playlist.id+'_track_' + v.id,
        url: v.stream_url + '?consumer_key=' + consumer_key,
        onfinish: function() {
          var limiter = k+1;
          var az = 'playlist_'+playlist.id+'_track_' + playlist.tracks[limiter].id;
          player.play(az, '.track_' + limiter);
        }
      });
    })
    var fmtdate = moment(playlist.created_at, "YYYYMMDD").format("MMM Do");
    var $data = { playlist: playlist, dateCreated: fmtdate }
    ddplaylist.$set('data', $data);
  });
}

var whatever = _.sortBy($dataModel, 'volume_number')
var dd = whatever.reverse();
getTracks(dd[1].playlist_url);



// Wait for jQuery to load properly

$(function() {
  $(document).pjax('a[data-pjax]', '#main', {
      fragment: '#main',
      timeout: 3000
  });
  soundManager.onready(function() {});
});
