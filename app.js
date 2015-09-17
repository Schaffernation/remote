var Direction;
(function (Direction) {
    Direction[Direction["up"] = 0] = "up";
    Direction[Direction["down"] = 1] = "down";
})(Direction || (Direction = {}));
function upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function volume(direction) {
    var dirString = Direction[direction];
    return {
        name: 'Video ' + upperCaseFirst(dirString),
        route: 'audio/volume/' + dirString
    };
}
function brightness(direction) {
    var dirString = Direction[direction];
    return {
        name: 'Brightness ' + upperCaseFirst(dirString),
        route: 'audio/brightness/' + dirString
    };
}
function audio(setting) {
    return {
        name: 'Video ' + upperCaseFirst(setting),
        route: 'audio/input/' + setting
    };
}
function video(setting) {
    return {
        name: 'Video ' + setting,
        route: 'video/input/' + setting
    };
}
var sourceList = [
    {
        name: 'Apple TV',
        changes: [
            audio('toslink'),
            video(4)
        ]
    }, {
        name: 'Record Player',
        changes: [audio('analog')]
    }, {
        name: 'HDMI',
        changes: [
            audio('toslink'),
            video(1)
        ]
    }, {
        name: 'Wii',
        changes: [
            audio('toslink'),
            video(3)
        ]
    }
];
var sources = sourceList.reduce(function (obj, source) {
    var name = source.name;
    obj[name] = source.changes;
    return obj;
}, {});
function attachListenerForClass(className, listener) {
    var elements = document.getElementsByClassName(className);
    Array.prototype.forEach.call(elements, function (element) {
        element.addEventListener('click', listener, false);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    attachListenerForClass('source', function (event) {
        console.log(event.currentTarget.title);
        console.log(sources[event.currentTarget.title]);
    });
});
