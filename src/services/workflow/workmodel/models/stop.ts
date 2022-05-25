import {CWork} from "./work"
import * as Types from "../../types";

export class CWorkStop extends CWork {
    inputs: number;
    outputs: number;
    type: Types.FlowCatagory;
  
    constructor(name: string)
    {
      super(name);
      this.inputs = 1;
      this.outputs = 0;
      this.type = Types.FlowCatagory.STOP;
    }
    run() {
      console.log("stopping")
    }
}
