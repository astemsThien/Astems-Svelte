import winston from 'winston'
import winstonDaily from 'winston-daily-rotate-file'
const {combine, timestamp, printf, colorize} = winston.format
const logDir = 'logs';

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
}

winston.addColors(colors);

const format = combine(
    timestamp({ format: ' YYYY-MM-DD HH:MM:SS ||' }),
    colorize({ all: true }),
    printf(
        (info) => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`,
    ),
)
const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({

    format,
    level: level(),
    transports: [
        // new winston.transports.DailyRotateFile({
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            zippedArchive: true,
            handleExceptions: true,
            maxFiles: 30,
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            zippedArchive: true,
            maxFiles: 30,
        }),
        new winston.transports.Console({
            handleExceptions: true,
        })
    ]
});


// module.exports = logger;
export default logger
// export {logger}
