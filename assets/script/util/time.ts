

import { Logger } from '../log/logger';
import * as strings from './strings';

export namespace time {

    /**
     * 获取当前时间戳(s)
     * @returns 时间戳(秒)
     */
    export function sec() :number {
        return Math.floor(Date.now() / 1000)
    }

    /**
     * 获取当前时间戳(ms)
     * @returns 时间戳(毫秒)
     */
    export function ms() :number {
        return Date.now()
    }

    /**
     * 时间格式化输出
     * @param timeSec 指定时间戳(秒)
     * @returns "year-month-day hour:min:sec" e.g. "2024-07-08 13:39:53"
     */
    export function timeString(now?:Date): string {
        now = now || new Date();
        var year = strings.lengthFormatString(now.getFullYear().toString(), 4, true, "0");
        var month = strings.lengthFormatString((now.getMonth()+1).toString(), 2, true, "0");
        var day = strings.lengthFormatString(now.getDate().toString(), 2, true, "0");
        var hour = strings.lengthFormatString(now.getHours().toString(), 2, true, "0");
        var min = strings.lengthFormatString(now.getMinutes().toString(), 2, true, "0");
        var sec = strings.lengthFormatString(now.getSeconds().toString(), 2, true, "0");
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }

    // 时间基点： 2024-01-01 00:00:00 (星期一)
    export const baseSysTime = new Date().setTime(1704038400 * 1000)

    // 时间标记(以时间基点为计算起点)

    // 1 分钟
    export function minNo(time?:Date) {
        time = time || new Date();
        console.log(time.toString())
    }
    // 5 分钟
    // 15 分钟: 一刻
    // 30 分钟: 半小时
    // 小时
    // 天
    // 周
    // 月
    
    // 当前年数

}
