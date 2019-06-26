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

const forecast7WeatherUrl = 'https://forecast7.com/en/41d88n87d63/chicago/?unit=us';

function Weather() {
  this.initializeWeather();
}

Weather.prototype.initializeWeather = function() {
  $('#weather').html('<a id="weatherAnchor" class="weatherwidget-io" href="' + forecast7WeatherUrl + '" data-label_1="LOCAL" data-label_2="WEATHER" data-days="3" data-theme="gray" >LOCAL WEATHER</a><script></script>');
  this.initializeWeatherWidget(document,'script','weatherwidget-io-js');
}

Weather.prototype.initializeWeatherWidget =function(d,s,id){
  var js;
  var weatherwidget = $('#'+id);

  fjs=$('#weather').find('script')[0];
  if(null != weatherwidget)
    {
      js=d.createElement(s);
      js.id=id;
      js.src='https://weatherwidget.io/js/widget.min.js';
      fjs.parentNode.insertBefore(js,fjs);
    }
  };