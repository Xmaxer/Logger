import chalk from 'chalk';
import dayjs from 'dayjs';

chalk.level = 1;

type logObjectType =
  | string
  | number
  | boolean
  | Record<never, unknown>
  | undefined
  | null;

export enum LogType {
  LOG = 'LOG',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

function baseLog(
  message: logObjectType,
  logType: LogType,
  ...extraMessages: logObjectType[]
) {
  if (typeof message === 'object') {
    message = JSON.stringify(message, null, 2);
  }
  if (extraMessages) {
    for (let i = 0; i < extraMessages.length; i++) {
      if (typeof extraMessages[i] === 'object') {
        extraMessages[i] = JSON.stringify(extraMessages[i], null, 2);
      }
    }
  }

  let outputColour;
  let consoleFunction;

  switch (logType) {
    case LogType.WARN:
      outputColour = chalk.yellow;
      consoleFunction = console.warn;
      break;
    case LogType.ERROR:
      outputColour = chalk.red;
      consoleFunction = console.error;
      break;
    default:
      outputColour = chalk.blue;
      consoleFunction = console.log;
  }

  consoleFunction(
    chalk.green(`[${dayjs().format('HH:mm:ss.SSSS')}]:`),
    outputColour(message),
    outputColour(...extraMessages),
  );
}

export function log(message: logObjectType, ...extraMessages: logObjectType[]) {
  baseLog(message, LogType.LOG, ...extraMessages);
}

export function warn(
  message: logObjectType,
  ...extraMessages: logObjectType[]
) {
  baseLog(message, LogType.WARN, ...extraMessages);
}

export function error(
  message: logObjectType,
  ...extraMessages: logObjectType[]
) {
  baseLog(message, LogType.ERROR, ...extraMessages);
}
