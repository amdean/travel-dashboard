#Travel Dashboard
**The Travel Dashboard provides a dashboard showing**:
- Real-time departures from your specified train station
- The driving time between 2 specified locations based on current traffic conditions 
- The local weather

The data refreshes automatically so that you can leave the browser open and always see the latest travel times.

There's a mobile webpage as well as a full screen page. There are lots of use-cases but this was originally built to run on a FireTV connected to a projector in a garage to display the morning commute times. With some integration with the FireTV, motion sensors and SmartThings it can be triggered to display when you enter the garage.

Real-time traffic and real-time train times are source from HERE Developer APIs and you will require a free HERE API account and credentials to use the dashboard.

##Step 1 - Get a HERE developer account
This allows you to use the HERE Traffic, Geocoder and Transit APIs which are used.
Sign up here, create an app ID and app Code.<br/>
Once signed in, click on your name at the top right and go to projects. Create a new "Fremium project" and then generate an App ID and App Code for Javascript / REST APIs.<br/>
https://developer.here.com/documentation/traffic/topics/what-is.html?create=Freemium-Basic&keepState=true&step=account

##Step 2 - Sign up with Weather Widget IO
Create a weather dashboard and enter the URL into the weather.js file in the forecast7WeatherUrl attribute.
Set the width to 366px on the Weather Widget IO site
In the options section you can specify the number of days

#Specify locations

All locations are set using a WGS84 latitude and longitude comma separated pair. Eg. 41.8867539,-87.8253367 as query attributes in the URL.
If you need to lookup the latitude and longitude for a location, you can do that here:

https://wego.here.com

When scrolling around the map, the lat/lon of the center of the screen will be shown in the URL. You can also click on "See More Info" in the search results to get the lat/long.

#Create the URL

Once you've got your HERE app ID and app code, the lat/lon of the start and end of your drive and the lat/lon of your train station then you're ready to form the URL.

**Enter the following parameters into the URL**

http://{YOUR-WEBSERVER}/dashboard.html?<br/>
stationLatlon={LAT,LON of the train station}<br/>
&stationRadius={Distance to search for the station from the specified point}<br/>
&maxPerTransport={max number of trains to return}<br/>
&trafficEndLatlon={LAT/LON of route destination}<br/>
&trafficStartLatlon={LAT/LON of route start}<br/>
&debug={true or false if you want to see the API responses on screen}<br/>
&app_id={YOUR_HERE_DEVELOPER_APP_ID}<br/>
&app_code={YOUR_HERE_DEVELOPER_APP_CODE}<br/>

**Example**

http:///{YOURWEBSERVER}/dashboard.html?stationLatlon=41.8867539,-87.8253367&stationRadius=50&maxPerTransport=10&trafficEndLatlon=41.8787,-87.63598&trafficStartLatlon=41.8881625,-87.8203776&debug=true&app_id={YOUR_HERE_DEVELOPER_APP_ID}&app_code={YOUR_HERE_DEVELOPER_APP_CODE}

**Mobile site**

http://{YOURWEBSERVER}/mobile.html?stationLatlon=41.8867539,-87.8253367&stationRadius=50&maxPerTransport=10&trafficEndLatlon=41.8787,-87.63598&trafficStartLatlon=41.8881625,-87.8203776&debug=true&app_id={YOUR_HERE_DEVELOPER_APP_ID}&app_code={YOUR_HERE_DEVELOPER_APP_CODE}