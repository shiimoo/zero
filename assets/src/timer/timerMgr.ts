/**
 * @module TimeCtrl 定时器控制
 */

import { AddSelf } from "../idgen/addSelf";
import { Timer } from "./timer";
import * as util from '../../script/util'
import { TIME_TIMER_TYPE } from '../constant/time';

export class TimeMgr {

    // 定时器管理
    private timers: Map<number, Timer> = new Map<number, Timer>;

    // id生成器
    private idGen: AddSelf = new AddSelf(0);


    /**
     * @description 开启毫秒级定时器
     * @param key 定时器归类标识
     * @param delayMs 延迟毫秒数
     */
    startMsTimer(key: string, tType: TIME_TIMER_TYPE, delayMs: number, callback: (...params: any[]) => void, ...params: any[]) {
        var tid = this.idGen.uuid()
        var timerObj = new Timer(tid, tType, delayMs, callback, ...params);
        this.addTimer(timerObj)
    }

    /**
     * 关闭定时器
     * @param id 定时器id
     */
    closeMsTimer(id: number) {
        var timerObj = this.getTimer(id)
        if (timerObj == null) {
            return
        }
        this.delTimer(id)
    }

    /**
     * 触发定时器
     * @param id 定时器id
     * @returns Timer|null, null时即不存在
     */
    private getTimer(id: number): Timer | null {
        if (this.timers.has(id)) {
            return this.timers.get(id)
        }
        return null
    }

    /**
     * 添加定时器
     * @param Timer 定时器对象
     */
    private addTimer(timerObj: Timer) {
        this.timers.set(timerObj.getId(), timerObj)
        this.onStartTimer(timerObj)
    }

    /**
     * 删除定时器
     * @param id 定时器id
     */
    private delTimer(id: number) {
        var timerObj = this.getTimer(id)
        if (timerObj == null) {
            return
        }
        this.timers.delete(id)
        this.onCloseTimer(timerObj)
    }

    /**
     * 启动定时器
     * @param Timer 定时器对象
     */
    private onStartTimer(timerObj: Timer) {
        if (timerObj.getExpiredTime() <= Date.now()) {
            this.trigerTimer(timerObj.getId())
            return
        }

        var nowDelayMs = timerObj.getExpiredTime() - Date.now()
        if (timerObj.getType() == TIME_TIMER_TYPE.ONCE) {
            timerObj.session = setTimeout(
                this.trigerTimer.bind(this),
                nowDelayMs,
                timerObj.getId()
            );
        } else if (timerObj.getType() == TIME_TIMER_TYPE.LOOP) {
            timerObj.session = setInterval(
                this.trigerTimer.bind(this),
                nowDelayMs,
                timerObj.getId()
            );
        }
    }

    /**
     * 关闭定时器
     * @param Timer 定时器对象
     */
    private onCloseTimer(timerObj: Timer) {
        if (timerObj.session != null) {
            if (timerObj.getType() == TIME_TIMER_TYPE.ONCE) {
                clearTimeout(timerObj.session)
            } else if (timerObj.getType() == TIME_TIMER_TYPE.LOOP) {
                clearInterval(timerObj.session)
            }
        }
    }

    /**
     * 触发定时器
     * @param id 定时器id
     */
    private trigerTimer(id: number) {
        var timerObj = this.getTimer(id)
        if (timerObj == null) {
            return
        }
        var res = util.SandBox(timerObj.callback, ...timerObj.callParams)
        if (!res.isSucc()) {
            console.log("timer callback err", timerObj.getId(), res.err)
        }
        if (timerObj.getType() == TIME_TIMER_TYPE.ONCE) {
            this.delTimer(id)
        }
    }
}