import winston from "winston";
import { ElasticsearchTransport } from "winston-elasticsearch";
import DailyRotateFile from "winston-daily-rotate-file";

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    // new ElasticsearchTransport({
    //   level: "info",
    //   index: "logs",
    //   clientOpts: {
    //     node: "http://localhost:9200/",
    //   },
    // }),

    // new DailyRotateFile({
    //   level: "info", // Log level for file transport
    //   filename: "logs/file.log", // Log file name pattern
    //   dirname: "./logs", // Directory to store log files
    //   //   maxFiles: "5d", // Maximum log files to keep
    //   //   zippedArchive: true, // Archive rotated log files
    // }),
    new winston.transports.File({ filename: "logs/server.log" }),

  ],
});
