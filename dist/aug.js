/*!
  * aug.js - A javascript library to extend existing objects and prototypes 
  * v0.0.1
  * https://github.com/jgallen23/aug
  * copyright JGA 2011
  * MIT License
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('aug', function() {

var aug = function() {
  var args = Array.prototype.slice.call(arguments);
  var org = args.shift();
  if (typeof org === "function") org = org.prototype;
  for (var i = 0, c = args.length; i < c; i++) {
    var prop = args[i];
    for (var name in prop) {
      org[name] = prop[name];
    }
  }
  return org;
};

return aug;
});
