import {CWork} from "./work"
import * as Types from "../../types";

export class CWorkCheck extends CWork {
  inputs: number;
  outputs: number;
  type: Types.FlowCatagory;

  constructor(name: string)
  {
    super(name);
    this.inputs = 1;
    this.outputs = 2;
    this.type = Types.FlowCatagory.CHECK;
  }

  run() {
    console.log("Check running")
  }
}

  