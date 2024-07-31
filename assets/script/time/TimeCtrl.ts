/**
 * @module TimeCtrl 定时器控制
 */

export class TimeCtrl {

    private timer: Map<number, string> = new Map<number, string>;

    // 定时器启动控制
    start() {
        console.log(this.timer);
    }
}
