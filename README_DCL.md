# Weather-Dashboard

## Created by Dion Leung

### Summary of this documentation

This .md document (README_DCL.md) will describe features on the webpage https://dionleung14.github.id/Weather-Dashboard/ in all supporting files. 
* Features of index.html 
* Features of style.css 
* Features of script.js 
* Known bugs and glitches
* Additional comments and notes

### Features of index.html
The index.html file serves as the main and only page of the weather dashboard. It utilizes jQuery to overwrite existing blank divs and populates them with weather info of a selected city. It also makes use of local storage for the user to quickly pull up weather information of previously searched locations.

### Features of style.css
The style.css file provides changes to the Tailwind CSS framework. At the time of writing, it isn't much, but it's honest work.

### Features of script.js
The script.js file contains the engine for the Weather Dashboard. It is commented within the file to provide context to different lines of code. It dynamically changes the content of the webpage to display different weather parameters of a given city in either imperial or metric units by using three different ajax requests from one api. At the time of this writing, the developer is still working on implementing individual clear buttons.

### Known bugs and glitches
Several bugs and glitches are present at the time of this writing. The list below is not an exhaustive and comprehensive list.
* A city must be spelled correctly for the information to populate.
* There is no way to distinguish different cities that have the same name.
* The unit selector between Imperial units and Metric units does not automatically update the information on the page, but will take effect into the next search/data call.
* Searching the same city multiple times adds it to the recently searched list, which is undesirable.
* There is no way to prevent a malicious user from spamming a search and rendering the api key useless.

### Additional comments and notes
The creation of this website is made possible by using Tailwind CSS Framework. Additional features are planned, such as the display of the 5 day forecast in cards, precipitation, and the times of sunrise and sunset. If the opportunity presents itself, time will be spent on making sure that different cities by the same name will be able to be identified.

> Collaborated in part with Louis.

```
Special thanks to my assigned tutor Jacob Metzinger and TAs Clint Brodar and Denis Molloy.
```

© 2020 DCL. Very Few Rights Reserved, but More Rights than the previous project.