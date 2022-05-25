import * as Types from "../../types";
import {WorkflowSettings} from "../../settings";

export abstract class CWork{
    public id: string;
    public name: string;
    public width: number;
    public height: number;
    public color: string;
    public abstract type: Types.FlowCatagory;
    public abstract readonly inputs: number;
    public abstract readonly outputs: number;

    constructor(name: string) {
        this.id = "undefined";
        this.name = name;
        this.width = WorkflowSettings.NODE_WIDTH_DEFAULT;
        this.height = WorkflowSettings.NODE_HEIGHT_DEFAULT;
        this.color = WorkflowSettings.NODE_COLOR_DEFAULT;
    }

    run() {
        console.log("Work base running");
    }
}
