export const setStateMany = (fn: Function, d: Object) => {
  if (d && typeof d === 'object') {
    // console.log('[state] setMany', d);
    fn((p) => ({ ...p, ...d }));
  }
};