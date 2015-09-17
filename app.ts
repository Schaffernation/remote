interface Change {
  name: string;
  route: string;
}

interface Source {
  name: string;
  changes: Change[];
}

enum Direction { up, down }

function upperCaseFirst (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function volume(direction: Direction) {
  const dirString = Direction[direction];
  return {
    name: 'Video ' + upperCaseFirst(dirString),
    route: 'audio/volume/' + dirString
  }
}

function brightness(direction: Direction) {
  const dirString = Direction[direction];
  return {
    name: 'Brightness ' + upperCaseFirst(dirString),
    route: 'audio/brightness/' + dirString
  }
}

function audio(setting: string) {
  return {
    name: 'Video ' + upperCaseFirst(setting),
    route: 'audio/input/' + setting
  }
}

function video(setting: number) {
  return {
    name: 'Video ' + setting,
    route: 'video/input/' + setting
  }
}

const sourceList: Source[] = [
  {
    name: 'Apple TV',
    changes: [
      audio('toslink'),
      video(4)
    ]
  }, {
    name: 'Record Player',
    changes: [ audio('analog') ]
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

const sources = sourceList.reduce((obj, source) => {
  var name = source.name;
  obj[name] = source.changes;
  return obj;
}, {}) 

function attachListenerForClass (className: string, listener: EventListener)  {
  const elements = document.getElementsByClassName(className);
  Array.prototype.forEach.call(elements, element => {
    element.addEventListener('click', listener);
  }
}

document.addEventListener("DOMContentLoaded", () =>  {
  attachListenerForClass('source', event => {
    console.log(event.target.title);
    console.log(sources[event.target.title]);
  });
});