class CWork {
  id: string;
  obj: Object;
  constructor(id: string, obj: Object) {
    this.id = id;
    this.obj = obj;
  }
  run() {
    console.log('work run');
  }
}
export class LinkedList<T> {
  private _head: LinkedListItem<T> | null;
  private _tail: LinkedListItem<T> | null;
  private _length: number;

  constructor(...values: T[]) {
    this._head = this._tail = null;
    this._length = 0;

    if (values.length > 0) {
      values.forEach((value) => {
        this.append(value);
      });
    }
  }

  *iterator(): IterableIterator<T> {
    let currentItem = this._head;

    while (currentItem) {
      yield currentItem.value;
      currentItem = currentItem.next;
    }
  }

  [Symbol.iterator]() {
    return this.iterator();
  }

  get head(): T | null {
    return this._head ? this._head.value : null;
  }

  get tail(): T | null {
    return this._tail ? this._tail.value : null;
  }

  get length(): number {
    return this._length;
  }

  // Adds the element at a specific position inside the linked list
  insert(val: T, previousItem: T, checkDuplicates: boolean = false): boolean {
    if (checkDuplicates && this.isDuplicate(val)) {
      return false;
    }

    let newItem: LinkedListItem<T> = new LinkedListItem<T>(val);
    let currentItem: LinkedListItem<T> | null = this._head;

    if (!currentItem) {
      return false;
    } else {
      while (true) {
        if (currentItem.value === previousItem) {
          newItem.next = currentItem.next;
          newItem.prev = currentItem;
          currentItem.next = newItem;

          if (newItem.next) {
            newItem.next.prev = newItem;
          } else {
            this._tail = newItem;
          }
          this._length++;
          return true;
        } else {
          if (currentItem.next) {
            currentItem = currentItem.next;
          } else {
            // can't locate previousItem
            return false;
          }
        }
      }
    }
  }

  // Adds the element at the end of the linked list
  append(val: T, checkDuplicates: boolean = false): boolean {
    if (checkDuplicates && this.isDuplicate(val)) {
      return false;
    }

    let newItem = new LinkedListItem<T>(val);

    if (!this._tail) {
      this._head = this._tail = newItem;
    } else {
      this._tail.next = newItem;
      newItem.prev = this._tail;
      this._tail = newItem;
    }

    this._length++;
    return true;
  }

  // Add the element at the beginning of the linked list
  prepend(val: T, checkDuplicates: boolean = false): boolean {
    if (checkDuplicates && this.isDuplicate(val)) {
      return false;
    }

    let newItem = new LinkedListItem<T>(val);

    if (!this._head) {
      this._head = this._tail = newItem;
    } else {
      newItem.next = this._head;
      this._head.prev = newItem;
      this._head = newItem;
    }

    this._length++;
    return true;
  }

  remove(val: T): T | null {
    let currentItem = this._head;

    if (!currentItem) {
      return null;
    }

    if (currentItem.value === val) {
      this._head = currentItem.next;
      if (this._head) this._head.prev = null;
      currentItem.next = currentItem.prev = null;
      this._length--;
      return currentItem.value;
    } else {
      while (true) {
        if (currentItem.value === val) {
          if (currentItem.next) {
            // special case for last element
            if (currentItem.prev) currentItem.prev.next = currentItem.next;
            currentItem.next.prev = currentItem.prev;
            currentItem.next = currentItem.prev = null;
          } else {
            if (currentItem.prev) currentItem.prev.next = null;
            this._tail = currentItem.prev;
            currentItem.next = currentItem.prev = null;
          }
          this._length--;
          return currentItem.value;
        } else {
          if (currentItem.next) {
            currentItem = currentItem.next;
          } else {
            return null;
          }
        }
      }
    }
  }

  removeHead(): T | null {
    let currentItem = this._head;

    // empty list
    if (!currentItem) {
      return null;
    }

    // single item list
    if (!this._head?.next) {
      this._head = null;
      this._tail = null;

      // full list
    } else {
      this._head.next.prev = null;
      this._head = this._head.next;
      currentItem.next = currentItem.prev = null;
    }

    this._length--;
    return currentItem.value;
  }

  removeTail(): T | null {
    let currentItem = this._tail;

    // empty list
    if (!currentItem) {
      return null;
    }

    // single item list
    if (!this._tail?.prev) {
      this._head = null;
      this._tail = null;

      // full list
    } else {
      this._tail.prev.next = null;
      this._tail = this._tail.prev;
      currentItem.next = currentItem.prev = null;
    }

    this._length--;
    return currentItem.value;
  }

  first(num: number): T[] {
    let iter = this.iterator();
    let result: any[] = [];

    let n = Math.min(num, this.length);

    for (let i = 0; i < n; i++) {
      let val = iter.next();
      result.push(val.value);
    }
    return result;
  }

  toArray(): T[] {
    return [...this];
  }

  private isDuplicate(val: T): boolean {
    let set = new Set(this.toArray());
    return set.has(val);
  }
}

export class LinkedListItem<T> {
  value: T;
  next: LinkedListItem<T> | null;
  prev: LinkedListItem<T> | null;

  constructor(val: T) {
    this.value = val;
    this.next = null;
    this.prev = null;
  }
}

export class Workflow {
  public id: string = '123';
  public name: string;
  public type: string = 'COLLECTION';

  public worklist: LinkedList<CWork>;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;

    this.worklist = new LinkedList<CWork>(new CWork('1', { hello: 'world' }));
  }

  add() {
    console.log('workflow add');
    let mywork = new CWork('123', { name: 'test', type: 'apicall' });
    console.log(mywork);
    this.worklist.append(mywork);
    console.log('workflow size', this.worklist.length);
  }

  moveto(n: number) {
    console.log('workflow moveto');
    const bMoved = this.worklist.first(n);
    console.log(JSON.stringify(this.worklist.toArray));
  }

  excute() {
    console.log('workflow excute');
  }
}
