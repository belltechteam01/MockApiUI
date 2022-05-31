const isObject = (obj) => obj != null && obj.constructor.name === "Object";

let data = [
  { name: "Apple",     id: 1, alt: [{ name: "fruit1", description: "tbd1" }] },
  { name: "Banana",    id: 2, alt: [{ name: "fruit2", description: "tbd2" }] },
  { name: "Blueberry", id: 3, alt: [{ name: "fruit3", description: "tbd3" }] }
];

function getKeys(obj, keepObjKeys, skipArrays, keys=[], scope=[]) {

  if (Array.isArray(obj)) {
    if (!skipArrays) scope.push('[' + obj.length + ']');
    obj.forEach((o) => getKeys(o, keepObjKeys, skipArrays, keys, scope), keys);
  } else if (isObject(obj)) {
    Object.keys(obj).forEach((k) => {
      if ((!Array.isArray(obj[k]) && !isObject(obj[k])) || keepObjKeys) {
        let path = scope.concat(k).join('.').replace(/\.\[/g, '[');
        if (!keys.includes(path)) keys.push(path);
      }
      getKeys(obj[k], keepObjKeys, skipArrays, keys, scope.concat(k));
    }, keys);
  }
  return keys;
}

console.log(getKeys(data, false, false));
console.log(getKeys(data, true, true));
console.log(Object.keys(data[0].alt[0]));



