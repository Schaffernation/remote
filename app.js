var volumeUp = {
    name: 'Volume Up',
    route: 'audio/volume/up'
};
var volumeDown = {
    name: 'Volume Down',
    route: 'audio/volume/down'
};
var inputToslink = {
    name: 'Input Toslink',
    route: 'audio/input/toslink'
};
var inputAnalog = {
    name: 'Input Down',
    route: 'audio/input/analog'
};
function video(setting) {
    return {
        name: 'Video ' + setting,
        route: 'video/input/' + setting
    };
}
var appleTV = {
    name: 'AppleTV',
    changes: [
        inputToslink,
        video(4)
    ]
};
