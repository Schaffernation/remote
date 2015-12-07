const express = require('express');
const path = require('path');
const fs = require('fs');
const _ = require('underscore');

const app = express();

// allow hrefs to see the /public directory
app.use(express.static(path.join(__dirname, 'public')))

// assign /public directory as view location
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');


const colorPalette = [ "#CDA9A4", "#7DBCFD", "#7F6463", "#25387F" ];

var sourceMap = JSON.parse(fs.readFileSync('map.json'));
var deviceMap = _.indexBy(sourceMap.devices, 'path');

app.get('/', function (req, res) {
    sourceMap = JSON.parse(fs.readFileSync('map.json'));
    deviceMap = _.indexBy(sourceMap.devices, 'path');

    sourceMap.presets = _.map(sourceMap.presets, function (preset, index) {
        preset.color = colorPalette[index % colorPalette.length];
        return preset;
    })

    res.render('index', sourceMap);
});

app.post('/api/*', function (req, res) {
    const settings = urlToSet(res, req.params[0]);
    const signals = _.map(settings, function (setting, device) {
        return deviceMap[device].settings[setting];
    });

    res.send(signals);
});

const server = app.listen(80, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

function urlToSet(res, url) {
    const deviceSetArray = url.split('/');
    if (deviceSetArray.length % 2 !== 0) {
        res.status(404).send('Uneven device settings');
        return;
    }

    const odds = _.filter(deviceSetArray, function(v, i) { return i % 2 === 0 });
    const eves = _.filter(deviceSetArray, function(v, i) { return i % 2 !== 0 });

    return _.object(odds, eves);
}