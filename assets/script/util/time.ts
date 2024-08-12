

import { Logger } from '../log/logger';
import * as strings from './strings';

export namespace time {

    /**
     * 获取时间
     * @param timeSec 指定时间戳(秒)
     * @returns Date
     */
    export function time(timeSec?: number): Date {
        var ti = new Date();
        if (typeof timeSec == "number" && timeSec > 0) {
            ti.setTime(timeSec * 1000)
        }
        return ti
    }
    /**
     * 获取当前时间戳(s)
     * @returns 时间戳(秒)
     */
    export function sec(now?: Date): number {
        now = now || new Date();
        return Math.floor(now.getTime() / 1000)
    }

    /**
     * 获取当前时间戳(ms)
     * @returns 时间戳(毫秒)
     */
    export function ms(): number {
        return Date.now()
    }

    /**
     * 时间格式化输出
     * @param timeSec 指定时间戳(秒)
     * @returns "year-month-day hour:min:sec" e.g. "2024-07-08 13:39:53"
     */
    export function timeString(now?: Date): string {
        now = now || new Date();
        var year = strings.lengthFormatString(now.getFullYear().toString(), 4, true, "0");
        var month = strings.lengthFormatString((now.getMonth() + 1).toString(), 2, true, "0");
        var day = strings.lengthFormatString(now.getDate().toString(), 2, true, "0");
        var hour = strings.lengthFormatString(now.getHours().toString(), 2, true, "0");
        var min = strings.lengthFormatString(now.getMinutes().toString(), 2, true, "0");
        var sec = strings.lengthFormatString(now.getSeconds().toString(), 2, true, "0");
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }

    // 1分钟的秒数
    export const MIN_SECS: number = 60
    // 1小时的秒数
    export const HOUR_SECS: number = MIN_SECS * 60
    // 1天的秒数
    export const DAY_SECS: number = HOUR_SECS * 24
    // 1周的秒数
    export const WEEK_SECS: number = DAY_SECS * 7
    // 时间基点： 2024-01-01 00:00:00 (星期一)
    export const baseSysTime = time(1704038400)

    /**
     * 当前第N年
     * @param now 指定时间
     * @returns  第N年
     */
    export function year(now?: Date): number {
        now = now || new Date();
        return now.getFullYear()
    }

    /**
     * 当年第N月
     * @param now 指定时间
     * @returns 第N月[1, 12]
     */
    export function month(now?: Date): number {
        now = now || new Date();
        return now.getMonth() + 1
    }

    /**
     * 本月的第N天
     * @param now 指定时间
     * @returns 本月的第N天[1, 31]
     */
    export function day(now?: Date): number {
        now = now || new Date();
        return now.getDate()
    }

    /**
     * 本月有多少天
     * @param mon 指定月份[1,12]
     * @returns  本月的第N天[28, 31]
     */
    export function monthMaxDay(mon?: number): number {
        mon = mon || month()
        var monthZeroTimeSec = 0 // todo 月0点时间
        for (var lastDay of [31, 30, 29, 28]) {
            var lastDayMonth = month(time(monthZeroTimeSec + lastDay * DAY_SECS - 1))
            if (lastDayMonth = mon) {
                return lastDay
            }
        }
    }
    /**
     * 本年有多少天
     * @param year 指定年份
     * @returns 本年的第N天[385, 366]
     */
    // export function yearMaxDay(year?: number): number {
    // }
    // 今年的第N天
    // 今天周几

    /**
     * 今天的第N小时[0,23]
     * @param now 指定时间
     * @returns 第N小时[0,23]
     */
    export function hour(now?: Date): number {
        now = now || new Date();
        return now.getHours()
    }

    /**
     * 小时内第N分钟[0,59]
     * @param now 指定时间
     * @returns 第N分钟[0,59]
     */
    export function min(now?: Date): number {
        now = now || new Date();
        return now.getMinutes()
    }

    /**
     * 分钟内内第N秒[0,59]
     * @param now 指定时间
     * @returns 第N秒[0,59]
     */
    export function second(now?: Date): number {
        now = now || new Date();
        return now.getSeconds()
    }

    /**
     * 当天第N秒[0,59]
     * @param now 指定时间
     * @returns 第N秒[0,59]
     */
    export function daySecond(now?: Date): number {
        now = now || new Date();
        return hour(now) * HOUR_SECS + min(now) * MIN_SECS + second(now)
    }

    /**
     * 当天0点时间
     * @param now 指定时间
     * @returns Date
     */
    export function dayZeroTime(now?: Date): Date {
        now = now || new Date();
        return time(sec(now) - daySecond(now))
    }
    // 当周零点时间(周一)
    // 当月0点时间(N月1日)
    export function monthZeroTime(now?: Date): Date {
        now = now || new Date();
        var mDay = day(now)
        return time(sec(now) - mDay * DAY_SECS)
    }

    // 下月0点时间(N+1月1日)
    // export function nextMonthZeroTime(now?: Date): Date {
    // 设置月+1后计算
    // }

    // 时间标记(以时间基点为计算起点)

    /**
     * 以起点为基准，当前时第N分钟
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N分钟
     */
    export function minNo(now?: Date): number {
        var diff = sec(now) - sec(baseSysTime)
        return Math.floor(diff / MIN_SECS) + 1
    }

    /**
     * 以起点为基准，当前时第N个5分钟
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N个5分钟
     */
    export function fiveMinNo(now?: Date): number {
        var diff = sec(now) - sec(baseSysTime)
        return Math.floor(diff / (MIN_SECS * 5)) + 1
    }

    /**
     * 以起点为基准，当前时第N个15分钟(1刻钟)
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N个15分钟(1刻钟)
     */
    export function quarterHourNo(now?: Date): number {
        var diff = sec(now) - sec(baseSysTime)
        return Math.floor(diff / (MIN_SECS * 15)) + 1
    }

    /**
     * 以起点为基准，当前时第N个30分钟(半小时)
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N个30分钟(半小时)
     */
    export function halfHourNo(now?: Date): number {
        var diff = sec(now) - sec(baseSysTime)
        return Math.floor(diff / (MIN_SECS * 30)) + 1
    }

    /**
     * 以起点为基准，当前时第N个小时
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N个小时
     */
    export function hourNo(now?: Date): number {
        var diff = sec(now) - sec(baseSysTime)
        return Math.floor(diff / HOUR_SECS) + 1
    }

    /**
     * 以起点为基准，当前时第N天
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N天
     */
    export function dayNo(now?: Date): number {
        var diff = sec(now) - sec(baseSysTime)
        return Math.floor(diff / DAY_SECS) + 1
    }

    /**
     * 以起点为基准，当前时第N周
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N周
     */
    export function weekNo(now?: Date): number {
        var diff = sec(now) - sec(baseSysTime)
        return Math.floor(diff / WEEK_SECS) + 1
    }
    // 月
    export function monthNo(now?: Date): number {
        now = now || new Date();
        //-- todo
        return 0
    }

    // 当前年数

    // 比较
    // 同秒
    // 同分钟
    // 同小时
    // 同天
    // 同周
    // 同月
    // 同年
}
