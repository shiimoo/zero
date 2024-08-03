import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { TimeMgr } from './time/TimerMgr';
import {constant} from './constant/constant';

@ccclass('test')
export class test extends Component {
    private tc: TimeMgr = new TimeMgr();
    start() {
        console.log("test");
        this.tc.createMsTimer();
        console.log(constant.time.TIME_TIMER_TYPE.LOOP)
    }

    update(deltaTime: number) {
    }
}
