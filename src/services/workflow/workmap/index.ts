  import {CWorkNode, ENM_FLOWTYPE} from "./worknode"

  export class CWorkMap<T extends {id:string}> {
  
      private _root: CWorkNode<T> | null;
      private _cur: CWorkNode<T> | null;
      private _length: number;
      private _hashmap: Map<string, CWorkNode<T>>;
    
      constructor(...values: T[]) {
    
        this._hashmap = new Map();
        this._length = 0;
        this._cur = null;
        this._root = null;
    
        if (values.length > 0) {
          values.forEach((value) => {
            this.append(value);
          });
        }
      }
  
      *iterator(): IterableIterator<T> {
        let currentItem = this._root;
    
        while(currentItem) {
          yield currentItem.value
  
          switch(currentItem.type) {
            case ENM_FLOWTYPE.I0_O1: 
            case ENM_FLOWTYPE.I2_O1: 
            case ENM_FLOWTYPE.I1_O1: {
              currentItem = currentItem.nexts[0];
              break;
            } 
            case ENM_FLOWTYPE.I1_O2: {
              currentItem = currentItem.nexts[(currentItem.condition) ? 0: 1];
              break;
            } 
            
          }
        }
      }
    
      [Symbol.iterator]() {
        return this.iterator();
      }
    
      get root(): T | null {
        return this._root ? this._root.value : null;
      }
      
      setFirst(id: string): boolean {
        this._root = this._hashmap.get(id) ?? null;
        return this._root !== undefined;
      }
    
      get size(): number {
        return this._hashmap.size;
      }
    
      // Adds the element at the end of the linked list
      append(val: T, nodeType?: ENM_FLOWTYPE): boolean {
  
        let newItem = new CWorkNode<T>(val, nodeType);
    
        this._hashmap.set(newItem.id, newItem);
        return true;
      }
    
      // Add the element at the beginning of the linked list
      prepend(val: CWorkNode<T>): boolean {
        if(val.type == ENM_FLOWTYPE.I0_O1) {
          this._hashmap.set(val.id, val);
          this._root = val;
        }
        return false;
      }
    
      remove(id: string | undefined): boolean {
        if(id)
          return this._hashmap.delete(id);
        else
          return this._cur ? this._hashmap.delete(this._cur.id) : false;
      }
    
      toArray(): T[] {
        return [...this];
      }
    
      first(id: string): T | null {
        return this._root ? this._root.value : null;
      }
  
      private isDuplicate(val: T): boolean {
        let set = new Set(this.toArray());
        return set.has(val);
      }
  }
  
  