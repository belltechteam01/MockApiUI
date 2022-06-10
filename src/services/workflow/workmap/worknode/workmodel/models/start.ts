import {CWork} from "./work"
import * as Types from "services/workflow/types";

export class CWorkStart extends CWork {
    inputs: number;
    outputs: number;
    type: Types.FlowCatagory;
  
    constructor(name: string)
    {
      super(name);
      this.inputs = 0;
      this.outputs = 1;
      this.type = Types.FlowCatagory.START;
    }
    run() {
      console.log("starting")
    }
}
