$(function() {
  var handleWeatherResponse = function(data) {
    console.log(data);
    console.log(JSON.stringify(data));
    
    // Put your code here. Don't change any other code in this file. You will be sad.
    var markup = "The weather report... " + "will be here when I finish my homework.";
    // End of your code

    $('.weather-report').html(markup);
  }
  $('a.get-the-weather').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      type: 'GET',
      url: 'https://api.forecast.io/forecast/6dbe98374cc5b8f9ea63d5ec73de9c04/42.056459,-87.675267?callback=?',
      dataType: 'jsonp',
      contentType: "application/json",
      success: handleWeatherResponse
    });
  });
});





$(function() {
  var fetchTracks = function(albumId, callback) {
    $.ajax({
      url: 'https://api.spotify.com/v1/albums/' + albumId,
      success: function(response) {
        callback(response);
      }
    });
  };
  var searchAlbums = function(query) {
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: query,
        type: 'album'
      },
      success: function(response) {
        // Set a window-level variable so we can use it in the console
        window.response = response;

        // Write the response from Spotify to the console, in pretty collapsible way
        console.log(response);

        // See all the guts
        console.log(JSON.stringify(response));

        // Empty the existing album list
        $('.album-list').show().empty()

        // Fill the album list with each album in the response
        $.each(response.albums.items, function(index, album) {
          var markup = '<img src="' + album.images[0].url +'" data-album-id="' + album.id + '">';
          $('.album-list').append(markup);
        });
      }
    });
  };
  $('form').on('submit', function(event) {
    event.preventDefault();
    searchAlbums($('#artist').val());
  });
  $(document).on('click', '.album-list img', function(event) {
    fetchTracks($(this).data('album-id'), function(data) {
      if (window.audioObject !== undefined) {
        window.audioObject.pause();
      }
      window.audioObject = new Audio(data.tracks.items[0].preview_url);
      window.audioObject.play();
    });
  });
  $(document).on('click', '.stop-it', function(event) {
    event.preventDefault();
    if (window.audioObject !== undefined) {
      window.audioObject.pause();
    }
  });
});