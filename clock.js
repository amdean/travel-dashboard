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

function startClock() {
    if(null != $('#clock')) {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      m = checkTime(m);
      s = checkTime(s);
      $('#clockTime').html(h + ":" + m + ":" + s);
      var t = setTimeout(startClock, 500);
    }
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i}; 
    return i;
  }
