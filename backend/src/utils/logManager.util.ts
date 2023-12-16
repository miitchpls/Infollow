import fs, { WriteStream } from "fs";

const logDir: string = "./logs";

export class LogManager {
  static getLogStream(): WriteStream {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    return fs.createWriteStream(
      `${logDir}/${new Date().toISOString().slice(0, 10)}.log`,
      {
        flags: "a+",
      }
    );
  }
}
