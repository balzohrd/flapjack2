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

var contributors = [
    {name: "Gal Azencot",
    image_path: "images/gal_a.png",
    position: "Co-founder",
    soundcloud: "galaznct",
    link: "https://dng.io/",},

    {name: "Nicholas Byron",
    image_path: "images/nick_b.jpg",
    position: "Co-founder",
    soundcloud: "nbyronn",
    instagram: "byrons_life",},

    {name: "Mauricio Medina",
    image_path: "images/mauricio_m.png",
    position: "Co-founder",
    soundcloud: "mauricemedina-1",},


    {name: "Sebastian Medina",
    image_path: "images/seb_m.png",
    position: "Contributor",
    soundcloud: "sebastian-medina-33",
    twitter: "sebocuban09",},

    {name: "Andre Tufenkjian",
    image_path: "images/andre_t.png",
    position: "Contributor",
    soundcloud: "atuf25",},

    {name: "Nairi Mardirossian",
    image_path: "images/nairi_m.jpg",
    position: "Contributor",
    soundcloud: "nairi-mardirossian",
    instagram: "nairi_talar",},

    {name: "Daniella Azencot",
    image_path: "images/dan.png",
    position: "Contributor",
    twitter: "webremedies",
    link: "https://dng.io/",},

    {name: "Pamela Camacho",
    image_path: "images/pam_c.jpg",
    position: "Contributor",
    soundcloud: "pacamacho",},

    {name: "Wendi Spielman",
    image_path: "images/wendi_s.jpg",
    position: "Contributor",
    instagram: "wendi.spielman",},

    {name: "Chris Yun",
    image_path: "images/chris_y.jpg",
    position: "Contributor",
    soundcloud: "chrisyun12",},

    {name: "Satine Iskandaryan",
    image_path: "images/satine.jpg",
    position: "Contributor",
    twitter: "sunbummm",},

    {name: "David Shaumyan",
    image_path: "images/david_s.jpg",
    position: "Contributor",
    twitter: "davoASAP",},

    {name: "Zaid Moreno",
    image_path: "images/zaid_m.jpg",
    position: "Contributor",
    soundcloud: "zaid-moreno",
    twitter: "MorenoZaid",
    instagram: "zaidmoreno",},

    {name: "Justin Nazerian",
    image_path: "images/justin_n.jpg",
    position: "Contributor",
    soundcloud: "juniorpersian",},

    {name: "Loris Keshishyan",
    image_path: "images/loris_k.jpg",
    position: "Contributor",
    twitter: "loriskeshishyan",},

    {name: "Alisher Baibussinov",
    image_path: "images/alisher_b.png",
    position: "Contributor",
    twitter: "4lisherr",
    instagram: "4lisher",},


];

new Vue({
  el: '#team',
  data: {contributors}
})




// Wait for jQuery to load properly

$(function() {
  $(document).pjax('a[data-pjax]', '#main', {
      fragment: '#main',
      timeout: 3000
  });
  soundManager.onready(function() {});



});
