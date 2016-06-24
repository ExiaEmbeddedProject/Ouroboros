require('datejs');
var fs = require('fs');
var direction = require('google-maps-direction');
var polyline = require('polyline');
var config = require('./config.json');
var variation = require('./variation.js');
var date = Date.parse(config.startDate);

direction({
    origin: config.origin,
    destination: config.destination
})
.then(function(result) {
    var coords = polyline.decode(result.routes[0].overview_polyline.points);
    var data = { DATA: [] };

    for (var i=0; i < coords.length; i++) {
        date = date.add(config.dateIncrement).second();

        var item = {
            latitude: coords[i][0],
            latitude: coords[i][1],

            accelX: variation(2.8900000000000001243, 10), // TODO put these values to config the file
            accelY: variation(-9.0600000000000004974, 10),
            accelZ: variation(-3.8799999999999998934, 10),

            gyroX: variation(-1.3100000000000000533, 10),
            gyroY: variation(-0.02999999999999999889, 10),
            gyroZ: variation(-0.11000000000000000056, 10),

            temperature: variation(25 + 273.15, 50),
            humidity: variation(16, 60),
            dateTime: date.toISOString(),

            journey: config.journey
        };

        data.DATA.push(item);
    };

    if (!fs.existsSync('./gen')){
        fs.mkdirSync('./gen');
    }

    fs.writeFile('gen/output.js', JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was generated!");
    });
});