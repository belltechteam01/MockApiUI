import {CWork} from "./work"
export class CWorkStart extends CWork {
    inputs: number;
    outputs: number;
  
    constructor(name: string)
    {
      super(name);
      this.inputs = 0;
      this.outputs = 1;
    }
    run() {
      console.log("starting")
    }
}
