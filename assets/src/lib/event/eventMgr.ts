/**
 * 事件管理器
 */

import { EVENT_NAME } from '../constant/event';
import { util } from '../util/util';

export class EventMgr {
    private events: Map<EVENT_NAME, Map<Object, boolean>> = new Map<EVENT_NAME, Map<Object, boolean>>;

    /**
     * 获取某一事件的全部监听对象
     * @param eventName 事件名称
     * @returns 监听对象列表
     */
    private getListeners(eventName: EVENT_NAME): Map<Object, boolean> {
        if (this.events.has(eventName)) {
            return this.events.get(eventName)
        }
        return null
    }

    /**
     * 注册监听
     * @param eventName 事件名称
     * @param listener 注册监听对象
     */
    registerListener(eventName: EVENT_NAME, listener: Object) {
        var listeners = this.getListeners(eventName)
        if (listeners == null) {
            listeners = new Map<Object, boolean>;
            this.events.set(eventName, listeners)
        }
        if (listeners.has(listener)) {
            return
        }
        listeners.set(listener, true)
    }

    /**
     * 注销监听
     * @param eventName 事件名称
     * @param listener 注销监听的对象
     */
    cancelListener(eventName: EVENT_NAME, listener: Object) {
        var listeners = this.getListeners(eventName)
        if (listeners == null) {
            return
        }
        if (listeners.has(listeners)) {
            listeners.delete(listener)
        }
    }

    /**
     * 触发事件
     * @param eventName 事件名称
     * @param params 事件携带参数
     */
    triggerEvent(eventName: EVENT_NAME, ...params: any[]) {
        var listeners = this.getListeners(eventName)
        if (listeners == null) {
            return
        }
        for (var listener of listeners.keys()) {
            var handler = listener[eventName]
            if (typeof handler == "function") {
                var res = util.sandBox.SandBox(handler.bind(listener), ...params)
                if (!res.isSucc()) {
                    // todo 日志
                    console.log("event err:", eventName, res.err)
                }
            }
        }
    }
}