/**
 * @module TimeCtrl 定时器控制
 */

import { Timer } from "./Timer";

export class TimeMgr {

    private timers: Map<number, Timer> = new Map<number, Timer>;
    private

    /**
    * 定时器构造方法 todo 设置全部继承于基类 ctor
    * @param delayMs 延时时间(毫秒)
    */
    constructor() {
    }

    // 创建定时器
    createMsTimer() {
        var timerObj = new Timer(1, 1000); // todo 默认1秒延时

    }
    // 销毁定时器
    // 定时器检查
}
