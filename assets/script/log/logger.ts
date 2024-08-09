

import * as strings from '../util/strings';
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
    private static now(): string {
        var now = new Date();
        var year = strings.lengthFormatString(now.getFullYear().toString(), 4, true, "0")
        var month = strings.lengthFormatString((now.getMonth()+1).toString(), 2, true, "0")
        var day = strings.lengthFormatString(now.getDate().toString(), 2, true, "0")
        var hour = strings.lengthFormatString(now.getHours().toString(), 2, true, "0")
        var min = strings.lengthFormatString(now.getMinutes().toString(), 2, true, "0")
        var sec = strings.lengthFormatString(now.getSeconds().toString(), 2, true, "0")
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`
    }
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
        var time = Logger.now()// 时间
        var lvStr = Logger.logLvToString(lv) // 2日志级别
        // 数据组装
        console.log(`[${time}] | ${lvStr}: `, ...datas)
    }

    // private outputf(lv:LogLv, format:string, ...datas:unknown[]) {
    // }

    static info(...datas: unknown[]) {
        Logger.output(LogLv.Info, ...datas)
    }
}