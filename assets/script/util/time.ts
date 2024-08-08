

import * as strings from './strings';

export namespace time {

    export function sec() :number {
        return Math.floor(Date.now() / 1000)
    }

    export function ms() :number {
        return Date.now()
    }

    export function timeString(): string {
        var now = new Date();
        var year = strings.lengthFormatString(now.getFullYear().toString(), 4, true, "0");
        var month = strings.lengthFormatString((now.getMonth()+1).toString(), 2, true, "0");
        var day = strings.lengthFormatString(now.getDate().toString(), 2, true, "0");
        var hour = strings.lengthFormatString(now.getHours().toString(), 2, true, "0");
        var min = strings.lengthFormatString(now.getMinutes().toString(), 2, true, "0");
        var sec = strings.lengthFormatString(now.getSeconds().toString(), 2, true, "0");
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }
}
