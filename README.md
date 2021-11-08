# MAP675 Exercise 2 - Geoprocessing with Node
## 2021 Virginia General & Special Election

### Mission Statement
In this project I am going to produce a choropleth map of the recent Virginia gubernatorial elections. I'm going to display it per county and impliment visual hierarchies. I'm also going to use the CARTO color scheme that was introduced in the lesson.

### Data Sources
*Election Data* - Virginia Department of Elections: https://www.elections.virginia.gov/
*Vector State Data* - Virginia Geographic Information Network: https://gismaps.vdem.virginia.gov/arcgis/rest/services/VA_Base_Layers/VA_Admin_Boundaries/FeatureServer/1

### Process Outline
1. Now that I have the data, the county boundary is too large of a file (36MB) so I'll need a script to decrease the complexity. I'll use Mapshaper's command line syntax: ```mapshaper va_counties.json -simplify dp 20% -o format=geojson va_counties_simp.json```. This produced a file that is 4.6MB.
2. Now I need to create a file that has both geographic and election data. This file is called ```countymapgenerator.js```.
3. Now it's time to make the map and symbolize it based on the winner using the CARTO color scheme. 