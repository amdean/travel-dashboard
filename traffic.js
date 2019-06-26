/** Copyright 2019 Andrew Dean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/

var trafficStartLatlon;
var trafficEndLatlon;
var app_id;
var app_code;

function Traffic(app_id, app_code) {
    this.trafficStartLatlon = urlParams.get('trafficStartLatlon');
    this.trafficEndLatlon = urlParams.get('trafficEndLatlon');
    
    this.app_id = app_id;
    this.app_code = app_code;
    this.getTraffic();
}

Traffic.prototype.getTraffic = function() { 
    $.ajax({
    url: 'https://route.api.here.com/routing/7.2/calculateroute.json',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    data: {
      waypoint0: this.trafficStartLatlon,
      waypoint1: this.trafficEndLatlon,
      mode: 'fastest;car;traffic:enabled',
      app_id: this.app_id,
      app_code: this.app_code,
      departure: 'now'
    },
    success: function (data) {
      if(isDebugMode()) {
          $("#debug").html($("#debug").html() + JSON.stringify(data, undefined, 2));
        }
      
      try {
        var trafficTravelTime = data.response.route[0].summary.travelTime / 60;
        var baseTravelTime = data.response.route[0].summary.baseTime / 60;
        $('#trafficTravelTime').html(trafficTravelTime.toFixed());
        $('#trafficDelay').html((trafficTravelTime - baseTravelTime).toFixed())
      }
      catch(err) {
          $("#debug").html($("#debug").html() + "Error parsing response: " + err + "<br/>" + JSON.stringify(data, undefined, 2));
        }
    }
  });
}