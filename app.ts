interface Change {
  name: String;
  route: String;
}

const volumeUp: Change = {
  name: 'Volume Up',
  route: 'audio/volume/up'
}

const volumeDown: Change = {
  name: 'Volume Down',
  route: 'audio/volume/down'
}

const inputToslink: Change = {
  name: 'Input Toslink',
  route: 'audio/input/toslink'
}

const inputAnalog: Change = {
  name: 'Input Down',
  route: 'audio/input/analog'
}

function video(setting: number) {
  return {
    name: 'Video ' + setting,
    route: 'video/input/' + setting,
  }
}

interface Source {
  name: String;
  changes: Change[];
}

const appleTV: Source = {
  name: 'AppleTV',
  changes: [
    inputToslink,
    video(4)
  ]
}

const recordPlayer: Source = {
  name: 'Record Player',
  changes: [ inputAnalog ]
}

const hdmi: Source = {
  name: 'HDMI',
  changes: [
    inputToslink,
    video(1)
  ]
}

const wii: Source = {
  name: 'Wii',
  changes: [
    inputToslink,
    video(3)
  ]
}
