$(function() {
  var handleWeatherResponse = function(data) {
    console.log(data);
    console.log(JSON.stringify(data));
    
    // Put your code here. Don't change any other code in this file. You will be sad.
    var markup = "Today's temperature is " + data.currently.apparentTemperature + " degrees F!  Wow! "+
    "   Tomorrow's high will be " + data.daily.data[1].temperatureMax + " degrees F and tomorrow's low will be " + data.daily.data[1].temperatureMin + " degrees F. " + data.daily.data[1].summary +
    "   The day after tomorrow's high will be " + data.daily.data[2].temperatureMax + " degrees F and the low will be " + data.daily.data[2].temperatureMin + " degrees F. " + data.daily.data[2].summary +
    "   Day 3's high will be " + data.daily.data[3].temperatureMax + " degrees F and the low will be " + data.daily.data[3].temperatureMin + " degrees F. " + data.daily.data[3].summary +  
    "   Day 4's high will be " + data.daily.data[3].temperatureMax + " degrees F and the low will be " + data.daily.data[3].temperatureMin + " degrees F. " + data.daily.data[3].summary;



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


