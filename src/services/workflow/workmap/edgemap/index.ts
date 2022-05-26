import * as Types from "../../types";
import { v4 as uuidv4 } from 'uuid';

export class CEdgeMap<T extends {id:string}> {

  private _hashmap: Map<string, T>;
  constructor(...values: T[]) {

    this._hashmap = new Map();
    values.forEach((value) => {
      this.append(value);
    });
  }

  getMap() {
    return this._hashmap;
  }

  get(id: string): T | null {
    return this._hashmap.get(id) ?? null;
  }

  get size(): number {
    return this._hashmap.size;
  }

  // Adds the element at the end of the linked list
  append(val: T): T {

    let newItem = val;
    if( !newItem || newItem.id === undefined || newItem.id === null) {
      newItem.id = uuidv4();
    }

    this._hashmap.set(newItem.id, newItem);
    return newItem;
  }

  remove(id: string | undefined): boolean {
    if(id) return this._hashmap.delete(id);
    return false;
  }

  getFirst(): T | null {
    console.log("edgemap first");
    if(this.size == 0) return null;

    const first = this._hashmap.entries().next();
    return first.value;
  }

  getSecond(): T | null {
    if(this.size < 2) return null;

    const second = this._hashmap.entries()[1];
    return second.value;
  }
}
  
  