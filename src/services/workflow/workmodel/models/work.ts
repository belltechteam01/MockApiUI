import * as Types from "../../types";
import {WorkflowSettings} from "../../settings";

export abstract class CWork{
    public id: string;
    public name: string;
    public color: string;
    public xPos: number;
    public yPos: number;
    public abstract type: Types.FlowCatagory;
    public abstract readonly inputs: number;
    public abstract readonly outputs: number;

    constructor(name: string) {
        this.id = "undefined";
        this.name = name;
        this.color = WorkflowSettings.NODE_COLOR_DEFAULT;
    }

    setPosition(x: number, y: number) {
        this.xPos = x;
        this.yPos = y;
    }

    run() {
        console.log("Work base running");
    }
}
