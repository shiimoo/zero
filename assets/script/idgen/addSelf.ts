/**
 * @module AddSelf 自增id
 */

import { Gen } from "./gen";

export class AddSelf implements Gen {
    private id: number = 0;
    constructor(start: number) {
        this.id = start
    }

    uuid(): number {
        this.id += 1
        return this.id
    }

    uuidString(): string {
        return this.uuid.toString()
    }
}