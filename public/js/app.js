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

// $(document).pjax('a[data-pjax]', '#main')

$(function() {
    $(document).pjax('a[data-pjax]', '#main', {
        fragment: '#main',
        timeout: 3000
    });
});


// var newPost = _.insert(db.posts, {title: 'foo'});
