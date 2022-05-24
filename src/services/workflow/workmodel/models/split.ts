import {CWork} from "./work"

export class CWorkSplit extends CWork {
    inputs: number;
    outputs: number;
  
    constructor(name: string)
    {
      super(name);
      this.inputs = 1;
      this.outputs = 2;
    }
    run() {
    console.log("Split running")
    }
}
