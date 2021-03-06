/* 
@Author: Star
@Date: 2022-05-11 19:23:00
@Last Modified by:   Star
@Last Modified time: 2022-05-11 19:23:00
This module is a wrapper for store.
*/

export function validateEmail(elementValue) {
  var emailPattern = /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;///^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue);
}
export function compareByName(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

export default {
  validateEmail,
  compareByName,
};
