/**
 * @module TimeCtrl 定时器控制
 */

import { AddSelf } from "../idgen/AddSelf";
import { Timer } from "./Timer";

export class TimeMgr {

    // 定时器管理
    private timers: Map<number, Timer> = new Map<number, Timer>;
    // id生成器
    private idGen: AddSelf = new AddSelf(0);

    /**
    * 定时器构造方法 todo 设置全部继承于基类 ctor
    * @param delayMs 延时时间(毫秒)
    */
    constructor() {
    }

    // 创建定时器
    createMsTimer() {
        var timerObj = new Timer(this.idGen.uuid(), 1000, () => {
            console.log("timerObj start", timerObj.id)
        }); // todo 默认1秒延时
        console.log("createMsTimer", timerObj.id, timerObj.getCreateTime(), timerObj.getExpiredTime())
    }
    // 销毁定时器
    // 定时器检查
}
