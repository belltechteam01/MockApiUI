import * as Types from "../types";
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

  add(val: T): T {
    return this.append(val);
  }

  appendMany(values: T[]) {
    values.forEach((value) => {
      this.append(value);
    });
  }

  // Adds the element at the end of the linked list
  append(val: T): T {

    let newItem = val;
    if( !newItem || newItem.id === undefined || newItem.id === null || newItem.id == "") {
      newItem.id = uuidv4();
    }

    this._hashmap.set(newItem.id, newItem);
    return newItem;
  }

  remove(id: string | undefined): boolean {
    if(id) return this._hashmap.delete(id);
    return false;
  }

  removeAll() {
    this._hashmap.clear();
  }

  getFirst(): T | null {
    if(this.size == 0) return null;

    const first = this._hashmap.values()[0];
    return first;
  }

  getSecond(): T | null {
    if(this.size < 2) return null;

    return this._hashmap.values()[1];
  }
}
  
  