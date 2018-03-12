import Tlogger from 'ptz-log';
import { curry } from 'ramda';

const loggerFactory = curry((color, name, ...args) => {
  if (__DEV__) {
    return console.log(`%c ${name}=>`, `background: #222; color: ${color}`, ...args); // eslint-disable-line no-console
  }
  return null;
});

const greenLogger = loggerFactory('#bada55');

const unilogger = process.title === 'browser' ? greenLogger : Tlogger;

export default unilogger;
