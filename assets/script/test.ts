import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { TimeMgr } from './time/TimerMgr';
// import {constant} from './constant/constant';

@ccclass('test')
export class test extends Component {
    private tc: TimeMgr = new TimeMgr();
    start() {
        console.log("test");
        this.tc.createMsTimer("test", 1000, (a, b, c, d, e, f)=>{
            console.log("a, b, c", a, b, c, d, e, f)
        }, 1,2,3,4,5);
        console.log("getTimer", this.tc.getTimer(111))
    }

    update(deltaTime: number) {
    }
}
