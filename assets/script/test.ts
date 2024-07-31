import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { TimeCtrl } from './time/TimeCtrl';

@ccclass('test')
export class test extends Component {
    private tc: TimeCtrl = new TimeCtrl();
    start() {
        console.log("test");
        this.tc.start();
    }

    update(deltaTime: number) {

    }
}
