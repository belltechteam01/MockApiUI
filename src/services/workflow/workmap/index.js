"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWorkMap = void 0;
const worknode_1 = require("./worknode");
class CWorkMap {
    constructor(...values) {
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
    *iterator() {
        let currentItem = this._root;
        while (currentItem) {
            yield currentItem.value;
            switch (currentItem.type) {
                case worknode_1.ENM_FLOWTYPE.I0_O1:
                case worknode_1.ENM_FLOWTYPE.I2_O1:
                case worknode_1.ENM_FLOWTYPE.I1_O1: {
                    currentItem = currentItem.nexts[0];
                    break;
                }
                case worknode_1.ENM_FLOWTYPE.I1_O2: {
                    currentItem = currentItem.nexts[(currentItem.condition) ? 0 : 1];
                    break;
                }
            }
        }
    }
    [Symbol.iterator]() {
        return this.iterator();
    }
    get root() {
        return this._root ? this._root.value : null;
    }
    setFirst(id) {
        var _a;
        this._root = (_a = this._hashmap.get(id)) !== null && _a !== void 0 ? _a : null;
        return this._root !== undefined;
    }
    get size() {
        return this._hashmap.size;
    }
    // Adds the element at the end of the linked list
    append(val, nodeType) {
        let newItem = new worknode_1.CWorkNode(val, nodeType);
        this._hashmap.set(newItem.id, newItem);
        return true;
    }
    // Add the element at the beginning of the linked list
    prepend(val) {
        if (val.type == worknode_1.ENM_FLOWTYPE.I0_O1) {
            this._hashmap.set(val.id, val);
            this._root = val;
        }
        return false;
    }
    remove(id) {
        if (id)
            return this._hashmap.delete(id);
        else
            return this._cur ? this._hashmap.delete(this._cur.id) : false;
    }
    toArray() {
        return [...this];
    }
    first(id) {
        return this._root ? this._root.value : null;
    }
    isDuplicate(val) {
        let set = new Set(this.toArray());
        return set.has(val);
    }
}
exports.CWorkMap = CWorkMap;
