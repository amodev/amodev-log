import Tlogger from 'ptz-log';
import { values, isNil, reduce } from 'ramda';

const colors = {
  green: '#A6E22E',
  cyar: 'cyan',
  red: '#F92672',
};

const colorArray = values(colors);

const getCharCode = (a, b) => {
  return b.charCodeAt(0) + a;
};

let logLength = 0;
const getColorIndex = () => Math.floor(logLength % (colorArray.length));


const loggerList = {};
const logGroup = (name, args) => {
  console.group(`%c ${loggerList[name].logGroupIndex}: ${name} =>   `, `background: black; color: ${loggerList[name].color}`, ...args);
  console.groupEnd();
};

const logCounter = (name, ...args) => {

  const colorIndex = getColorIndex(reduce(getCharCode, 0, ...name));

  const getName = () => {
    loggerList[name].size += 1;
  };

  const setName = () => {
    logLength += 1;
    loggerList[name] = {
      color: colorArray[colorIndex],
      logGroupIndex: logLength,
    };
  };

  if (isNil(loggerList[name])) {
    setName();
  }
  // getName();
  // } else {
  // }

  logGroup(name, args);
};

const unilogger = process.title === 'browser' ? logCounter : Tlogger;
export default unilogger;
