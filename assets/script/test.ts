import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { TimeMgr } from './time/TimerMgr';

@ccclass('test')
export class test extends Component {
    private tc: TimeMgr = new TimeMgr();
    start() {
        console.log("test");
        this.tc.start();
    }

    update(deltaTime: number) {

    }
}
