const logSetting = {
  appenders: {
    console: {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%[%d{yyyy-MM-dd} %r %p %m %]",
      },
    },
    application: {
      type: "dateFile",
      filename: "../../tmp/log/application/app.log",
      pattern: "yyyyMMdd",
      alwaysIncludePattern: "true",
    },
    error: {
      type: "dateFile",
      filename: "../../tmp/log/error/err.log",
      pattern: "yyyyMMdd",
      alwaysIncludePattern: "true",
    },
  },
  categories: {
    default: {
      appenders: ["console", "application"],
      level: "all",
    },
    error: {
      appenders: ["console", "error"],
      level: "warn",
    },
  },
};

export { logSetting };
