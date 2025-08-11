
const colors = {
  info: "36",
  error: "31;1",
  warn: "33",
  debug: "90",
};

type LogFn = (msg: string, level: string) => void;

export type Log = LogFn & {
  error: (...p: any[]) => void;
  warn: (...p: any[]) => void;
  info: (...p: any[]) => void;
  debug: (...p: any[]) => void;
};

type LogLevel = keyof typeof colors;

const formatDate = (date: Date) => {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((n) => n.toString().padStart(2, "0"))
    .join(":");
};

export const makeLog = function () {
  function log(msg: string, level: LogLevel) {
    msg = color(formatDate(new Date()), "30") + " " + msg;
    const c = colors[level.toLowerCase() as LogLevel] || "32";
    console.log("[" + color(level.toUpperCase(), c) + "] " + msg);
  }

  function color(s: string, c: string) {
    return "\x1B[" + c + "m" + s + "\x1B[0m";
  }

  log.debug = function (...p: any[]) {
    log(String(...p), "debug");
  };
  log.info = function (...p: any[]) {
    log(String(...p), "info");
  };

  log.warn = function (...p: any[]) {
    log(String(...p), "warn");
  };

  log.error = function (...p: any[]) {
    log(String(...p), "error");
  };

  return log as Log;
};