import {CWork} from "./work"
import * as Types from "services/workflow/types";

export class CWorkSplit extends CWork {
    inputs: number;
    outputs: number;
    type: Types.FlowCatagory;
  
    constructor(name: string)
    {
      super(name);
      this.inputs = 1;
      this.outputs = 2;
      this.type = Types.FlowCatagory.SPLIT;
    }
    run() {
    console.log("Split running")
    }
}
