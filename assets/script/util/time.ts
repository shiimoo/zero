

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
    export function timeString(timeSec?:number): string {
        var now = new Date();
        if (typeof timeSec == "number" ) {
            now.setTime(timeSec*1000)
        }
        var year = strings.lengthFormatString(now.getFullYear().toString(), 4, true, "0");
        var month = strings.lengthFormatString((now.getMonth()+1).toString(), 2, true, "0");
        var day = strings.lengthFormatString(now.getDate().toString(), 2, true, "0");
        var hour = strings.lengthFormatString(now.getHours().toString(), 2, true, "0");
        var min = strings.lengthFormatString(now.getMinutes().toString(), 2, true, "0");
        var sec = strings.lengthFormatString(now.getSeconds().toString(), 2, true, "0");
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }

    const startTime = new Date().setTime(1704038400)
    // export function 
    
}
