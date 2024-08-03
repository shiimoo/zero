import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

import { TimeMgr } from './time/timerMgr';
import { TIME } from './constant/time';

@ccclass('test')
export class test extends Component {
    private tc: TimeMgr = new TimeMgr();
    private count: number = 1;
    @property(Label)
    public label: Label = null;


    start() {
        this.label.string
        console.log("test");
        this.tc.startMsTimer("test", TIME.TIME_TIMER_TYPE.LOOP, 1000, () => {
            this.label.string = this.count.toString()
            this.count += 1
        }, this.count);
    }

    update(deltaTime: number) {
    }
}
