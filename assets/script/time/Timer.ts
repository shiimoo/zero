/**
 * @module Timer 定时器(毫秒级别)
 */

import { TIME } from '../constant/time';

export class Timer {
	session: number = null;								// 定时器标记
	private id: number = null; 							// 唯一id
	private tType: TIME.TIME_TIMER_TYPE = null; 		// 定时器类型
	private createTime: number = null; 					// 创建/启动时间
	private expiredTime: number = null; 				// 过期/触发时间
	callback: (...params: any[]) => void = null			// 回调函数
	callParams: any[] = null							// 回调函数所需参数

	/**
	 * 定时器构造方法 todo 设置全部继承于基类 ctor
	 * @param id 唯一id
	 * @param delayMs 延时时间(毫秒)
	 */
	constructor(id: number, tType: TIME.TIME_TIMER_TYPE, delayMs: number, callback: (...params: any[]) => void, ...params: any[]) {
		this.id = id;
		this.tType = tType
		this.createTime = Date.now();
		this.expiredTime = this.createTime;
		this.callback = callback;
		this.callParams = params;
		if (delayMs > 0) {
			this.expiredTime += delayMs;
		}
		// setTimeout 单次定时器
		// setInterval 循环定时器
		// this.session = setTimeout(() => {
		// 	callback(...this.callParams);
		// }, this.expiredTime - Date.now());
	}

	// 获取id
	getId(): number {
		return this.id
	}

	// 获取id
	getType(): TIME.TIME_TIMER_TYPE {
		return this.tType
	}

	// 获取启动时间
	getCreateTime(): number {
		return this.createTime;
	}

	// 获取结束时间
	getExpiredTime(): number {
		return this.expiredTime;
	}
}
