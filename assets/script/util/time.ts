import { util } from './util';

export namespace UtilTime {

    // 毫秒偏移量：该一辆用于时间对其
    var msOffset: number = 0

    /**
     * 设置时间便宜
     * @param ms 偏移量(毫秒)
     */
    export function setMsOffset(ms: number) {
        msOffset = ms
    }

    /**
     * 获取当前时间偏移量
     * @returns 偏移量(毫秒)
     */
    export function getMsOffset(): number {
        return msOffset
    }

    /**
     * 获取时间
     * @param timeSec 指定时间戳(秒)
     * @returns Date
     */
    export function time(timeSec: number = 0): Date {
        var ti = new Date();
        if (timeSec > 0) {
            ti.setTime(timeSec * 1000)
        } else {
            // 非指定时，进行时间偏移矫正
            ti.setTime(ti.getTime() + msOffset)
        }
        return ti
    }

    /**
     * 获取当前时间戳(s)
     * @returns 时间戳(秒)
     */
    export function timeStamp(now?: Date): number {
        return Math.floor(msTimeStamp(now) / 1000)
    }

    /**
     * 获取当前时间戳(ms)
     * @returns 时间戳(毫秒)
     */
    export function msTimeStamp(now?: Date): number {
        now = now || time();
        return now.getTime();
    }

    /**
     * 时间格式化输出
     * @param timeSec 指定时间戳(秒)
     * @returns "year-month-day hour:min:sec" e.g. "2024-07-08 13:39:53"
     */
    export function timeString(now?: Date): string {
        now = now || time();
        var year = util.strings.lengthFormatString(now.getFullYear().toString(), 4, true, "0");
        var month = util.strings.lengthFormatString((now.getMonth() + 1).toString(), 2, true, "0");
        var day = util.strings.lengthFormatString(now.getDate().toString(), 2, true, "0");
        var hour = util.strings.lengthFormatString(now.getHours().toString(), 2, true, "0");
        var min = util.strings.lengthFormatString(now.getMinutes().toString(), 2, true, "0");
        var sec = util.strings.lengthFormatString(now.getSeconds().toString(), 2, true, "0");
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
        now = now || time();
        return now.getFullYear()
    }

    /**
     * 当年第N月
     * @param now 指定时间
     * @returns 第N月[1, 12]
     */
    export function month(now?: Date): number {
        now = now || time();
        return now.getMonth() + 1
    }

    /**
     * 本月的第N天
     * @param now 指定时间
     * @returns 本月的第N天[1, 31]
     */
    export function day(now?: Date): number {
        now = now || time();
        return now.getDate()
    }

    /**
     * 今年的第N天
     * @param now 指定时间
     * @returns 今年的第N天[1, 366]
     */
    export function yearDay(now?: Date) {
        now = now || time();
        return now.getDate()
    }

    /**
     * 今天周几[1,7]
     * @param now 指定时间
     * @returns 周N
     */
    export function weekDay(now?: Date) {
        now = now || time();
        return now.getDay()
    }

    /**
     * 今天的第N小时[0,23]
     * @param now 指定时间
     * @returns 第N小时[0,23]
     */
    export function hour(now?: Date): number {
        now = now || time();
        return now.getHours()
    }

    /**
     * 小时内第N分钟[0,59]
     * @param now 指定时间
     * @returns 第N分钟[0,59]
     */
    export function min(now?: Date): number {
        now = now || time();
        return now.getMinutes()
    }

    /**
     * 分钟内内第N秒[0,59]
     * @param now 指定时间
     * @returns 第N秒[0,59]
     */
    export function second(now?: Date): number {
        now = now || time();
        return now.getSeconds()
    }

    /**
     * 当天第N秒[0,59]
     * @param now 指定时间
     * @returns 第N秒[0,59]
     */
    export function daySecond(now?: Date): number {
        now = now || time();
        return hour(now) * HOUR_SECS + min(now) * MIN_SECS + second(now)
    }

    /**
     * 当天0点时间
     * @param now 指定时间
     * @returns Date
     */
    export function dayZeroTime(now?: Date): Date {
        now = now || time();
        return time(timeStamp(now) - daySecond(now))
    }

    /**
     *  当周零点时间(周一)
     * @param now 指定时间
     * @returns Date
     */
    export function weekZeroTime(now?: Date): Date {
        now = now || time();
        var nowWeekDay = weekDay(now)
        var dayDifff = nowWeekDay - 1
        return dayZeroTime(time(timeStamp(now) - dayDifff * DAY_SECS))
    }

    /**
     *  当月0点时间(N月1日)
     * @param now 指定时间
     * @returns Date
     */
    export function monthZeroTime(now?: Date): Date {
        now = now || time();
        var mDay = day(now) - 1
        return dayZeroTime(time(timeStamp(now) - mDay * DAY_SECS))
    }

    /**
     *  下月0点时间:即本月最后一天24点
     * @param now 指定时间
     * @returns Date
     */
    export function nextMonthZeroTime(now?: Date): Date {
        now = now || time();
        now.setMonth(month(now))
        return monthZeroTime(now)
    }

    /**
     *  当年0点时间(N月1日)
     * @param now 指定时间
     * @returns Date
     */
    export function yearZeroTime(now?: Date): Date {
        now = now || time();
        var mDay = day(now) - 1
        return dayZeroTime(time(timeStamp(now) - mDay * DAY_SECS))
    }

    // 时间标记(以时间基点为计算起点)

    /**
     * 以起点为基准，当前时第N分钟
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N分钟
     */
    export function minNo(now?: Date): number {
        var diff = timeStamp(now) - timeStamp(baseSysTime)
        return Math.floor(diff / MIN_SECS) + 1
    }

    /**
     * 以起点为基准，当前时第N个5分钟
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N个5分钟
     */
    export function fiveMinNo(now?: Date): number {
        var diff = timeStamp(now) - timeStamp(baseSysTime)
        return Math.floor(diff / (MIN_SECS * 5)) + 1
    }

    /**
     * 以起点为基准，当前时第N个15分钟(1刻钟)
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N个15分钟(1刻钟)
     */
    export function quarterHourNo(now?: Date): number {
        var diff = timeStamp(now) - timeStamp(baseSysTime)
        return Math.floor(diff / (MIN_SECS * 15)) + 1
    }

    /**
     * 以起点为基准，当前时第N个30分钟(半小时)
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N个30分钟(半小时)
     */
    export function halfHourNo(now?: Date): number {
        var diff = timeStamp(now) - timeStamp(baseSysTime)
        return Math.floor(diff / (MIN_SECS * 30)) + 1
    }

    /**
     * 以起点为基准，当前时第N个小时
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N个小时
     */
    export function hourNo(now?: Date): number {
        var diff = timeStamp(now) - timeStamp(baseSysTime)
        return Math.floor(diff / HOUR_SECS) + 1
    }

    /**
     * 以起点为基准，当前时第N天
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N天
     */
    export function dayNo(now?: Date): number {
        var diff = timeStamp(now) - timeStamp(baseSysTime)
        return Math.floor(diff / DAY_SECS) + 1
    }

    /**
     * 以起点为基准，当前时第N周
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N周
     */
    export function weekNo(now?: Date): number {
        var diff = timeStamp(now) - timeStamp(baseSysTime)
        return Math.floor(diff / WEEK_SECS) + 1
    }

    /**
     * 以起点为基准，当前时第N月
     * @param now 指定时间, 不传时默认当前时间
     * @returns 第N月 
     */
    export function monthNo(now?: Date): number {
        now = now || time();
        var yearDiff = year(now) - year(baseSysTime)
        var monthDiff = month(now) - month(baseSysTime)
        return yearDiff * 12 + monthDiff + 1
    }


    // 比较

    /**
     * 是否同秒
     * @param t1 比较时间1
     * @param t2 比较时间2
     * @returns true:同秒
     */
    export function isSameSecond(t1: Date, t2: Date): boolean {
        return timeStamp(t1) == timeStamp(t2)

    }

    /**
     * 是否同分钟
     * @param t1 比较时间1
     * @param t2 比较时间2
     * @returns true:同分钟
     */
    export function isSameMinute(t1: Date, t2: Date): boolean {
        return minNo(t1) == minNo(t2)
    }

    /**
     * 是否同小时
     * @param t1 比较时间1
     * @param t2 比较时间2
     * @returns true:同小时
     */
    export function isSameHour(t1: Date, t2: Date): boolean {
        return hourNo(t1) == hourNo(t2)
    }

    /**
     * 是否同天
     * @param t1 比较时间1
     * @param t2 比较时间2
     * @returns true:同天
     */
    export function isSameDay(t1: Date, t2: Date): boolean {
        return dayNo(t1) == dayNo(t2)
    }

    /**
     * 是否同周
     * @param t1 比较时间1
     * @param t2 比较时间2
     * @returns true:同周
     */
    export function isSameWeek(t1: Date, t2: Date): boolean {
        return weekNo(t1) == weekNo(t2)
    }

    /**
     * 是否同月
     * @param t1 比较时间1
     * @param t2 比较时间2
     * @returns true:同月
     */
    export function isSameMonth(t1: Date, t2: Date): boolean {
        return monthNo(t1) == monthNo(t2)
    }

    /**
     * 是否同年
     * @param t1 比较时间1
     * @param t2 比较时间2
     * @returns true:同年
     */
    export function isSameYear(t1: Date, t2: Date): boolean {
        return year(t1) == year(t2)
    }
}
