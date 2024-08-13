

import { util } from '../util/util';
/**
 * logger 日志模块
 */

enum LogLv {
    Fatal,  // 灾难：将导致程序退出，程序无法自行恢复
    Error,  // 错误：运行报错，不影响运行
    Warn,   // 警告：存在隐患
    Info,   // 信息：关键过程的信息记录
    Debug,  // 调试：开发期间的信息
}

export class Logger {
    /**
     * 日志等级标识获取
     * @param lv 日志等级
     * @returns 日志等级标识
     */
    private static logLvToString(lv: LogLv): string {
        switch (lv) {
            case LogLv.Fatal:
                return "FATAL"
            case LogLv.Error:
                return "ERROR"
            case LogLv.Warn:
                return "WARN"
            case LogLv.Info:
                return "INFO"
            case LogLv.Debug:
                return "DEBUG"
            default:
                return "UNKNOWN"
        }
    }

    private static output(lv: LogLv, ...datas: unknown[]) {
        // 数据组装
        var outHandler = Logger.getOutFunc(lv)
        outHandler(`[${util.time.timeString()}] | ${Logger.logLvToString(lv)}: `, ...datas)
    }

    static debug(...datas: unknown[]) {
        Logger.output(LogLv.Debug, ...datas)
    }

    static info(...datas: unknown[]) {
        Logger.output(LogLv.Info, ...datas)
    }
    static warn(...datas: unknown[]) {
        Logger.output(LogLv.Warn, ...datas)
    }

    static error(...datas: unknown[]) {
        Logger.output(LogLv.Error, ...datas)
    }

    static fatal(...datas: unknown[]) {
        Logger.output(LogLv.Fatal, ...datas)
    }
    
    private static getOutFunc(lv: LogLv):(...data: any[])=> void|null {
       switch (lv) {
           case LogLv.Fatal:
               return console.trace;
           case LogLv.Error:
               return console.error;
           case LogLv.Warn:
               return console.warn;
           case LogLv.Info:
               return console.log;
           case LogLv.Debug:
               return console.debug;
           default:
            Logger.warn(`unknown LogLv:${lv}`)
            return console.log
       }
   }
}