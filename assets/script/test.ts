import { _decorator, Component, Label, log } from 'cc';
const { ccclass, property } = _decorator;

import { TimeMgr } from './timer/timerMgr';
import { EventMgr } from './event/eventMgr';
import { TIME_TIMER_TYPE } from './constant/time';
import { EVENT_NAME } from './constant/event';
import { Logger } from './log/logger';
import * as strings from './util/strings';
import { util } from './util/util';

@ccclass('test')
export class test extends Component {
    private tc: TimeMgr = new TimeMgr();
    private em: EventMgr = new EventMgr();
    private count: number = 1;
    @property(Label)
    public label: Label = null;

    start() {
        Logger.info("test", util.time.timeString(util.time.weekZeroTime()))
        // this.em.registerListener(EVENT_NAME.onTest, this)
        // this.tc.startMsTimer("test", TIME_TIMER_TYPE.LOOP, 1000, () => {
        //     this.label.string = this.count.toString()
        //     this.count += 1
        //     this.em.triggerEvent(EVENT_NAME.onTest, 3, 5, 6)
        // }, this.count);
    }

    onTest(a, b, c) {
        console.log("onTest", this.label.string, a, b, c);
    }

    update(deltaTime: number) {
    }
}
