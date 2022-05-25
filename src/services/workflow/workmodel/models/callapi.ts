import {CWork} from "./work"
import * as Types from "../../types";
  
export class CWorkCallApi extends CWork {
  
  inputs: number;
  outputs: number;
  type: Types.FlowCatagory;

  constructor(name: string)
  {
    super(name);
    this.inputs = 1;
    this.outputs = 1;
    this.type = Types.FlowCatagory.API;
  }
  run() {
    console.log("CallApi running")
  }
}

  