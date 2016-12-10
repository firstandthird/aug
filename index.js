'use strict';
const aug = function() {
  const args = Array.prototype.slice.call(arguments); //eslint-disable-line prefer-rest-params
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
    for (const propName in prop) { //eslint-disable-line
      const propValue = prop[propName];
      // just overwrite arrays:
      if (Array.isArray(propValue)) {
        org[propName] = propValue;
        continue;
      }
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
