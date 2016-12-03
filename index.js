'use strict';
const aug = function() {
  const args = Array.prototype.slice.call(arguments);
  let org = args.shift();
  let type = '';
  if (typeof org === 'string' || typeof org === 'boolean') {
    type = (org === true) ? 'deep' : org;
    org = args.shift();
    if (type === 'defaults') {
      org = aug({}, org); //clone defaults into new object
      type = 'strict';
    }
  }
  args.forEach((prop) => {
    for (const propName in prop) {
      const propValue = prop[propName];
      // console.log('prop is %s, %s', propName, propValue)
      if (type === 'deep' && typeof propValue === 'object' && typeof org[propName] !== 'undefined') {
        aug(type, org[propName], propValue);
      } else if (type !== 'strict' || (type === 'strict' && typeof org[propName] !== 'undefined')) {
        org[propName] = propValue;
      }
    }
  });
  return org;
};
module.exports = aug;
