const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// allow hrefs to see the /public directory
app.use(express.static(path.join(__dirname, 'public')))

// assign /public directory as view location
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');



app.get('/', function (req, res) {
    const keyMap = JSON.parse(fs.readFileSync('map.json'));

    const source = {
        title: 'Remote',
        presets: keyMap.presets
    };

    res.render('index', source);
});

const server = app.listen(80, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});