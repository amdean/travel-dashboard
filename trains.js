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

var app_id;
var app_code;
var stationLatLon;

function Trains(app_id, app_code) {
    this.app_id = app_id;
    this.app_code = app_code;
    this.stationLatLon = urlParams.get('stationLatlon');
    this.loadTrains();
}

Trains.prototype.loadTrains = function() {
$.ajax({
    url: 'https://transit.api.here.com/v3/multiboard/by_geocoord.json',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'callbackFunc',
    data: {
      center: this.stationLatLon,
      radius: urlParams.get('stationRadius'),
      time: getCurrentDateTimeWithOffset(3600000),
      timespan: "120",
      maxPerTransport: urlParams.get('maxPerTransport'),
      modes: "regional_train",
      app_id: this.app_id,
      app_code: this.app_code
    },
    success: function (data) {
      if(isDebugMode()) {
        $("#debug").html($("#debug").html() + JSON.stringify(data, undefined, 2));
      }     
      var trains; 
      try {
          trains = data.Res.MultiNextDepartures.MultiNextDeparture[0].NextDepartures.Dep
          var insertedCount = 0;
          $('.secondary').remove();
          $.each(trains, function(elementCount, train) {
            //if RT time in future or schedule time in the future
            if(new Date(train.time) > new Date() || (train.RT && new Date(train.RT.dep) > new Date()) ) {
              if(insertedCount > 0) {
                $("#nextTrain0").clone().attr('id', 'nextTrain' + insertedCount).insertAfter("#nextTrain" + (insertedCount -1));
                $('#nextTrain' + insertedCount).addClass('secondary');
              }
              $("#nextTrain" + insertedCount + " .nextTrainDirection").html(train.Transport.dir);
              $("#nextTrain" + insertedCount + " .nextTrainName").html(train.Transport.name);
              $("#nextTrain" + insertedCount + " .nextTrainScheduleTime").html(train.time.substring(11,16));
              if(train.RT) {
                $("#nextTrain" + insertedCount + " .nextTrainActualTimeValue").html('<span id="expected">Expected:</span> ' + train.RT.dep.substring(11,16));
                $("#nextTrain" + insertedCount + " .noRealtime").html("");
              }
              else {  
                $("#nextTrain" + insertedCount + " .noRealtime").html("No realtime information");
                $("#nextTrain" + insertedCount + " .nextTrainActualTimeValue").html("");
              }
              insertedCount++;
            }
            
            
          });
      }
      catch(err) {
        $("#debug").html($("#debug").html() + "Error parsing response: " + err + "<br/>" + JSON.stringify(data, undefined, 2));
      }
      
    }
  })
}

function getCurrentDateTimeWithOffset(priorOffset) {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset - priorOffset)).toISOString().slice(0, 19);
    return localISOTime;
  }