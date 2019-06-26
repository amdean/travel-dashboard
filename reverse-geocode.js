var app_id;
var app_code;

function ReverseGeocode() {
    this.app_id = app_id;
    this.app_code = app_code;
}

ReverseGeocode.prototype.reverseGeocode = function(latLon, elementId) {
  var response;
  $.ajax({
    url: 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    data: {
      prox: latLon,
      mode: 'retrieveAddresses',
      app_id: this.app_id,
      app_code: this.app_code
    },
    success: function (data) {
      if(isDebugMode()) {
          $("#debug").html($("#debug").html() + JSON.stringify(data, undefined, 2));
        }
      
      try {
        $(elementId).html(data.Response.View[0].Result[0].Location.Address.City);
      }
      catch(err) {
          $("#debug").html($("#debug").html() + "Error parsing response: " + err + "<br/>" + JSON.stringify(data, undefined, 2));
        }
    }
  });
  return response;
}