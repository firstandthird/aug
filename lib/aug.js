(function(root) {

var aug = function __aug() {
  var args = Array.prototype.slice.call(arguments);
  var deep = false;
  var org = args.shift();
  var type = '';
  if (typeof org === 'string' || typeof org === 'boolean') {
    type = (org === true)?'deep':org;
    org = args.shift();
    if (type == 'defaults') {
      org = aug({}, org); //clone defaults into new object
      type = 'strict';
    }
  }
  for (var i = 0, c = args.length; i < c; i++) {
    var prop = args[i];
    for (var name in prop) {
      if (!prop.hasOwnProperty(name)) {
          continue;
      }
      if (type === 'deep' && typeof prop[name] === 'object' && typeof org[name] !== 'undefined') {
        aug(type, org[name], prop[name]);
      } else if (type !== 'strict' || (type === 'strict' && typeof org[name] !== 'undefined')) {
        org[name] = prop[name];
      }
    }
  }
  return org;
};

if (typeof module !== 'undefined') {
  module.exports = aug;
} else {
  if (typeof define === 'function' && define.amd) {
    define(function() {return aug;});
  }
  root.aug = aug;
}

}(this));
