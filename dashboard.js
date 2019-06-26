const urlParams = new URLSearchParams(window.location.search);

var app_id;
var app_code;

function setAttributes() {
  app_id = urlParams.get('app_id');
  app_code = urlParams.get('app_code');
}

function setDynamicFields() {
  reverseGeoCoder.reverseGeocode(traffic.trafficStartLatlon, "#trafficStart");
  reverseGeoCoder.reverseGeocode(traffic.trafficEndLatlon, "#trafficDestination");
  reverseGeoCoder.reverseGeocode(trains.stationLatLon, "#trainOrigin");
}

setAttributes();
var weather = new Weather();
startClock();
//var t = setTimeout(clock, 500);
var traffic = new Traffic(app_id, app_code);
var trains = new Trains(app_id, app_code);
var reverseGeoCoder = new ReverseGeocode();
setDynamicFields();

window.setInterval(trains.loadTrains, 60000);
window.setInterval(traffic.getTraffic, 120000);

function isDebugMode() {
  return urlParams.get('debug') == 'true';
}
