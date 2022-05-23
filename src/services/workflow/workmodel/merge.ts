import {CWork} from "./work"

export class CWorkMerge extends CWork {
    inputs: number;
    outputs: number;
  
    constructor(name: string)
    {
      super(name);
      this.inputs = 2;
      this.outputs = 1;
    }

    run() {
    console.log("Merge running")
    }
}

  