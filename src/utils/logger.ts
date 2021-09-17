import * as winston from "winston";

// create winston logger
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  level: "debug",
  transports: [],
});

// development Environment specific config
if (process.env.NODE_ENV === "development") {

  // add console transports in winston logger
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// production Environment specific config
if (process.env.NODE_ENV === "production") {
  // TODO:  add third party logging services like prometheus etc..

}

export default logger;
