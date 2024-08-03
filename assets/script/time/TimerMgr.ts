/**
 * @module TimeCtrl 定时器控制
 */

import { AddSelf } from "../idgen/addSelf";
import { Timer } from "./timer";

export class TimeMgr {

    // 定时器管理
    private timers: Map<number, Timer> = new Map<number, Timer>;
    // id生成器
    private idGen: AddSelf = new AddSelf(0);

    /**
     * @description 创建毫秒级定时器
     * @param key 定时器归类标识
     * @param delayMs 延迟毫秒数
     */
    createMsTimer(key:string, delayMs:number, callback:(...)=>void) {
        var timerObj = new Timer(this.idGen.uuid(), key, delayMs, () => {
            console.log("timerObj start", timerObj.id)
        });
    }
    // 销毁定时器
    // 定时器检查
}

// 140.82.114.3 github.com
// 185.199.108.153 assets-cdn.github.com
// 199.232.69.194 github.global.ssl.fastly.net