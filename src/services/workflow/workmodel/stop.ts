import {CWork} from "./work"
export class CWorkStop extends CWork {
    inputs: number;
    outputs: number;
  
    constructor(name: string)
    {
      super(name);
      this.inputs = 1;
      this.outputs = 0;
    }
    run() {
      console.log("stopping")
    }
}
