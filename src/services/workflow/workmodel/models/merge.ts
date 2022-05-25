import {CWork} from "./work"
import * as Types from "../../types";

export class CWorkMerge extends CWork {
    inputs: number;
    outputs: number;
    type: Types.FlowCatagory;
  
    constructor(name: string)
    {
      super(name);
      this.inputs = 2;
      this.outputs = 1;
      this.type = Types.FlowCatagory.MERGE;
    }

    run() {
    console.log("Merge running")
    }
}

  