var aug = require('../dist/aug');

module.exports = {
  testOverride: function(t) {
    var a = { a: 1 };
    var b = { a: 2 };
    aug(a, b);
    t.equal(a.a, 2);
    t.done();
  },
  testExtend: function(t) {
    var a = { a: 1 };
    var b = { b: 2 };

    aug(a, b);
    t.equal(a.a, 1);
    t.equal(a.b, 2);
    t.done();
  },
  testOverrideTwice: function(t) {
    var a = { a: 1 };
    var b = { a: 2 };
    var c = { a: 3 };

    aug(a, b, c);
    t.equal(a.a, 3);
    t.done();
  },
  testExtendTwice: function(t) {
    var a = { a: 1 };
    var b = { b: 2 };
    var c = { c: 3 };

    aug(a, b, c);
    t.equal(a.a, 1);
    t.equal(a.b, 2);
    t.equal(a.c, 3);
    t.done();
  },
  testReturn: function(t) {
    var a = { a: 1 };
    var b = { b: 2 };

    var c = aug({}, a, b);
    t.equal(c.a, 1);
    t.equal(c.b, 2);
    t.done();
  },
  testExtendPrototype: function(t) {
    var Class1 = function() {
    };
    Class1.prototype.test = function() {
      return true;
    };

    aug(Class1, {
      test: function() {
        return false;
      },
      test2: function() {
        return true;
      }
    });
    var c = new Class1();
    t.equal(c.test(), false);
    t.equal(c.test2(), true);
    Class1.prototype.test3 = function() {
      return true;
    };
    t.equal(c.test3(), true);
    t.done();
  }
};
