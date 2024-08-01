/**
 * @module Timer 定时器(毫秒级别)
 */

export class Timer {
    public id: number = null; // 唯一id

    private tag: number = null; // 定时器标签
    private createTime: number = null; // 创建/启动时间
    private expiredTime: number = null; // 过期/触发时间
    // todo 回调函数

    /**
    * 定时器构造方法 todo 设置全部继承于基类 ctor
    * @param id 唯一id
    * @param delayMs 延时时间(毫秒)
    */
    constructor(id: number, delayMs: number, callback: Function) {
        this.id = id
        this.createTime = Date.now();
        this.expiredTime = this.createTime
        if (delayMs > 0) {
            this.expiredTime += delayMs
        }
        // setTimeout 单次定时器
        // setInterval 循环定时器
        this.tag = setInterval(() => {
            callback();
        }, this.expiredTime - Date.now())
    }

    // 设置id
    setId(id: number) {
        this.id = id
    }

    // 获取启动时间
    getCreateTime(): number {
        return this.createTime
    }

    // 获取结束时间
    getExpiredTime(): number {
        return this.expiredTime
    }

    // 执行回调
}
