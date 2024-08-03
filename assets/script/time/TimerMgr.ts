/**
 * @module TimeCtrl 定时器控制
 */

import { AddSelf } from "../idgen/addSelf";
import { Timer } from "./timer";
import * as util from '../util'

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
    createMsTimer(key: string, delayMs: number, callback: (...params: any[]) => void, ...params: any[]) {
        var tid = this.idGen.uuid()
        console.log(this)
        var timerObj = new Timer(tid, delayMs, callback, ...params);
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
    getTimer(id: number): Timer|null {
        if (this.timers.has(id)) {
            return this.timers.get(id)
        }
        return null
    }
    
    /**
     * 添加定时器
     * @param Timer 定时器对象
     */
    addTimer(timerObj:Timer) {
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
    startTimer(timerObj:Timer) {
        // todo 类型指定
        var nowDelayMs = timerObj.getExpiredTime() - Date.now()
        // todo bind使得this重定义改为定时器放弃重写
        timerObj.session = setTimeout(this.trigerTimer.bind(this), nowDelayMs, timerObj.getId());
    }

    /**
     * 触发定时器
     * @param id 定时器id
     */
    trigerTimer(id: number) {
            console.log(typeof(this), "--", id)
        var timerObj = this.getTimer(id)
        if (timerObj == null) {
            return
        }
        var res = util.SandBox(timerObj.callback, ...timerObj.callParams)
        if (!res.isSucc()) {
            console.error("timer callback err", timerObj.getId())
        }
    }
    // 销毁定时器
    // 定时器检查
}

// 140.82.114.3 github.com
// 185.199.108.153 assets-cdn.github.com
// 199.232.69.194 github.global.ssl.fastly.net