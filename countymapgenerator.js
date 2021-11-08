const mapdata = require('./data/va_counties_simp')
const electiondata = require('./data/va_election')
const fs = require('fs')

// begin by iterating over the geojson object
mapdata.features.forEach(element => {
    // then for each object in the geojson, iterate over the election data for matching results
    electiondata.Localities.forEach(i => {
        // I'm sure there's a more elegant way to do this but I split it up just as the election data has it in county/city to account for everything
        if (element.properties.JURISTYPE === 'CO') {
            if (element.properties.NAME.toUpperCase() + ' COUNTY' === i.Locality.LocalityName) {
                if (parseFloat(i.Candidates[0].Percentage) > parseFloat(i.Candidates[1].Percentage)) {
                    // once matched, write the winner to the county
                    element.properties.winner = i.Candidates[0].BallotName
                } else {
                    element.properties.winner = i.Candidates[1].BallotName
                }
            }
        } else if (element.properties.JURISTYPE === 'CI') {
            if (element.properties.NAME.toUpperCase() + ' CITY' === i.Locality.LocalityName) {
                if (parseFloat(i.Candidates[0].Percentage) > parseFloat(i.Candidates[1].Percentage)) {
                    element.properties.winner = i.Candidates[0].BallotName
                } else {
                    element.properties.winner = i.Candidates[1].BallotName
                }
            }
        }
    })
})

// after completion, write the results to a file
fs.writeFile('/home/mattupchurch/Projects/UKY/module2/MAP675-exercise2/data/va_counties_results.json', JSON.stringify(mapdata), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(mapdata));
    console.log('writing to ' + mapdata);
  });