import {CWork} from "./work"
import * as Types from "services/workflow/types";

export class CWorkCallRule extends CWork {
  inputs: number;
  outputs: number;
  type: Types.FlowCatagory;

  constructor(name: string)
  {
    super(name);
    this.inputs = 1;
    this.outputs = 1;
    this.type = Types.FlowCatagory.RULE;
  }

  run() {
    console.log("CallRule running")
  }
}
