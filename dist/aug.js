/*!
  * aug.js - A javascript library to extend existing objects and prototypes 
  * v0.0.3
  * https://github.com/jgallen23/aug
  * copyright JGA 2011
  * MIT License
  */

var aug = function __aug() {
  var args = Array.prototype.slice.call(arguments);
  var deep = false;
  var org = args.shift();
  if (typeof org === 'boolean') {
    deep = true;
    org = args.shift();
  }
  for (var i = 0, c = args.length; i < c; i++) {
    var prop = args[i];
    for (var name in prop) {
      if (deep && typeof prop[name] === 'object')
        aug(org[name], prop[name]);
      else
        org[name] = prop[name];
    }
  }
  return org;
};
if (typeof window === 'undefined') module.exports = aug;
