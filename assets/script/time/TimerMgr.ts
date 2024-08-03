/**
 * @module TimeCtrl 定时器控制
 */

import { AddSelf } from "../idgen/addSelf";
import { Timer } from "./timer";
import * as util from '../util'
import { TIME } from '../constant/time';

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
    createMsTimer(key: string, tType: TIME.TIME_TIMER_TYPE, delayMs: number, callback: (...params: any[]) => void, ...params: any[]) {
        var tid = this.idGen.uuid()
        var timerObj = new Timer(tid, tType, delayMs, callback, ...params);
        this.addTimer(timerObj)
        if (timerObj.getExpiredTime() <= Date.now()) {
            this.trigerTimer(timerObj.getId())
        } else {
            this.startTimer(timerObj)
        }
    }

    /**
     * 触发定时器
     * @param id 定时器id
     * @returns Timer|null, null时即不存在
     */
    getTimer(id: number): Timer | null {
        if (this.timers.has(id)) {
            return this.timers.get(id)
        }
        return null
    }

    /**
     * 添加定时器
     * @param Timer 定时器对象
     */
    addTimer(timerObj: Timer) {
        this.timers.set(timerObj.getId(), timerObj)
    }

    /**
     * 删除定时器
     * @param id 定时器id
     */
    delTimer(id: number) {
        if (!this.timers.has(id)) {
            return
        }
        this.timers.delete(id)
    }

    /**
     * 启动定时器
     * @param Timer 定时器对象
     */
    startTimer(timerObj: Timer) {
        var nowDelayMs = timerObj.getExpiredTime() - Date.now()
        if (timerObj.getType() == TIME.TIME_TIMER_TYPE.ONCE) {
            timerObj.session = setTimeout(
                this.trigerTimer.bind(this),
                nowDelayMs,
                timerObj.getId()
            );
        } else {
            timerObj.session = setInterval(
                this.trigerTimer.bind(this),
                nowDelayMs,
                timerObj.getId()
            );
        }
    }

    // 销毁定时器
    // closeTimer(timerObj: Timer) {
    /**
     * 触发定时器
     * @param id 定时器id
     */
    trigerTimer(id: number) {
        var timerObj = this.getTimer(id)
        if (timerObj == null) {
            return
        }
        var res = util.SandBox(timerObj.callback, ...timerObj.callParams)
        if (!res.isSucc()) {
            console.error("timer callback err", timerObj.getId(), res.err)
        }
    }
}