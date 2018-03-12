import Tlogger from 'ptz-log';
import { curry, values, isNil, reduce, last, map, keys } from 'ramda';
import * as R from 'ramda';

const colors = {
  green: '#A6E22E',
  cyar: 'cyan',
  red: '#F92672',
};

const colorArray = values(colors);

const loggerFactory = curry((color, name, ...args) => {
  if (__DEV__) {
    return console.log(`%c ${name}=>`, `background: #222; color: ${color}`, ...args); // eslint-disable-line no-console
  }
  return null;
});

const groupFactory = curry((color, ...args) => {
  if (__DEV__) {
    return console.log(`%c ${name}=>`, `background: #222; color: ${color}`, ...args); // eslint-disable-line no-console
  }
  return null;
});

let logGroupIndex = 0;

const greenLogger = loggerFactory('#bada55');

const ramdomLogger = (name, args) => {
  loggerIndex = ++loggerIndex % colorArray.length;

  return loggerFactory(colorArray[loggerIndex], name, args);
};

const getCharCode = (a, b) => {
  return b.charCodeAt(0) + a;
};

let logLength = 0;
const getColorIndex = () => Math.floor(logLength % (colorArray.length));

const getWaring = a => {
  if (isNil(a) || a === undefined) {
    return console.warn
  } else {
    return console.log
  }
}

let loggerList = {};
const logGroup = (name) => {

  const lasValues = () => {
    if (loggerList[name].args.length < 2) {
      return;
    }

    console.groupCollapsed('Last values');
    loggerList[name].args.map((b, i) => {
      if (loggerList[name].args.length > (i + 1)) {

        const log = getWaring(b);
        Array.isArray(b) ? map(log, b) : log(b);
      }
    });
    console.groupEnd();
  }

  const a = last(loggerList[name].args);

  console.group(`%c ${loggerList[name].size}: ${name} =>   `, `background: black; color: ${loggerList[name].color}`, ...a);

  lasValues();

  console.groupEnd();
};

let awaiting = false;

let logGrpupAsync;
const logger = (name, ...args) => {
  logGroupIndex++
  const colorIndex = getColorIndex(reduce(getCharCode, 0, ...name));

  const getName = () => {
    loggerList[name].args.push(args);
    loggerList[name].size++;
    loggerList[name].logGroupIndex = logGroupIndex;
  };

  const setName = () => {
    logLength++;
    loggerList[name] = {
      color: colorArray[colorIndex],
      args: [args],
      size: 1,
      logGroupIndex,
    };
  };

  if (!isNil(loggerList[name])) {
    getName();
  } else {
    setName();
  }

  if (awaiting === name) {
    clearTimeout(logGrpupAsync);
  }

  // loggerList = R.sortBy(R.path([name, 'logGroupIndex'], loggerList))
  // console.log(loggerList)
  awaiting = name;
  logGroup(name)
  // logGrpupAsync = setTimeout(() => {
  //   // console.clear();

  //   awaiting = false;
  //   // map(logGroup, keys(loggerList));
  // }, 100);
};

const unilogger = process.title === 'browser' ? greenLogger : Tlogger;
export default unilogger;
export { Tlogger, greenLogger, logger, loggerFactory };
