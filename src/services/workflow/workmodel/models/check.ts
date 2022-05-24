import {CWork} from "./work"

export class CWorkCheck extends CWork {
  inputs: number;
  outputs: number;

  constructor(name: string)
  {
    super(name);
    this.inputs = 1;
    this.outputs = 2;
  }

  run() {
    console.log("Check running")
  }
}

  