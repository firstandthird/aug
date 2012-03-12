var expect = (typeof chai === 'undefined')?require('chai').expect:chai.expect;
if (typeof window === 'undefined') { //browser
  var aug = require('../lib/aug');
}

describe('aug', function() {

  it('should override', function() {
    var o1 = { a: 1 };
    var o2 = { a: 2 };
    var o = aug(o1, o2);
    expect(o.a).to.equal(2);
  });

  it('should extend', function() {
    var o1 = { a: 1 };
    var o2 = { b: 2 };
    var o = aug(o1, o2);
    expect(o.a).to.equal(1);
    expect(o.b).to.equal(2);
  });

  it('should change first param', function() {
    var o1 = { a: 1 };
    var o2 = { b: 2 };
    var o = aug(o1, o2);
    expect(o1.a).to.equal(1);
    expect(o1.b).to.equal(2);
    expect(o1).to.equal(o);
  });
  
  it('should take N number of objects', function() {
    var o1 = { a: 1, d: 7 };
    var o2 = { a: 2, b: 4 };
    var o3 = { a: 3, b: 5, c: 1 };

    aug(o1, o2, o3);

    expect(o1.a).to.equal(3);
    expect(o1.b).to.equal(5);
    expect(o1.c).to.equal(1);
    expect(o1.d).to.equal(7);
    
  });

  it('should extend prototypes', function() {
    var Class1 = function() {
    };
    Class1.prototype.test = function() {
      return true;
    };

    aug(Class1.prototype, {
      test: function() {
        return false;
      },
      test2: function() {
        return true;
      }
    });
    var c = new Class1();
    expect(c.test()).to.be.false;
    expect(c.test2()).to.be.true;
    Class1.prototype.test3 = function() {
      return true;
    };
    expect(c.test3()).to.be.true;
  });
  
  it('should extend a function', function() {
    var f = function() {};
    aug(f, {
      prop: 42
    });
    expect(f.prop).to.equal(42);
  });
  
  it('should extend prototypes', function() {
    Array.prototype.lulz = 42;
    var o = {};
    aug(o, []);
    expect(o.lulz).to.equal(42);
  });

  describe('deep', function() {
    it('should take in option for deep extend', function() {
      var o1 = { a: { b: 1, c: 3 }, d: 1 };
      var o2 = { a: { b: 2 } };
      aug(true, o1, o2);
      expect(o1.a.b).to.equal(2);
      expect(o1.a.c).to.equal(3);
      expect(o1.d).to.equal(1);
    });

    it('should handle deep extends if root doesn\'t exist', function() {
      var o1 = { };
      var o2 = { a: { b: 2 } };
      aug(true, o1, o2);
      expect(o1.a.b).to.equal(2);
    });

    it('should handled multiple levels', function() {
      var o1 = { a: { b: { c: 0, d: 1 } } };
      var o2 = { a: { b: { c: 1 } } };
      aug(true, o1, o2);
      expect(o1.a.b.c).to.equal(1);
      expect(o1.a.b.d).to.equal(1);
    });

    it('should take deep as a string', function() {
      var o1 = { a: { b: 1, c: 3 }, d: 1 };
      var o2 = { a: { b: 2 } };
      aug('deep', o1, o2);
      expect(o1.a.b).to.equal(2);
      expect(o1.a.c).to.equal(3);
      expect(o1.d).to.equal(1);
    });
  });

  describe('strict', function() {
    it('should only copy if the property exists', function() {
      var o1 = { a: 1 };
      var o2 = { b: 2, a: 2 };
      aug('strict', o1, o2);
      expect(o1.a).to.equal(2);
      expect(o1.b).to.not.exist;
    });
    
  });
  describe('defaults', function() {
    it('should overwrite only whats existing in defaults', function() {
      var defaults = { debug: false, path: __dirname, enable: true };
      var opt = { debug: true, path: '/tmp/woot', fakeThing: 123 };
      var options = aug('defaults', defaults, opt);
      expect(options.debug).to.be.true;
      expect(options.enable).to.be.true;
      expect(defaults.debug).to.be.false;
      expect(defaults.path).to.equal(__dirname);
      expect(options.path).to.equal('/tmp/woot');
      expect(options.fakeThing).to.not.exist;
    });

    it('should work with multiple objects', function() {
      var defaults = { debug: false, path: __dirname, enable: true };
      var o1 = { debug: true, path: '/tmp/woot', fakeThing: 123 };
      var o2 = { debug: false, path: '/tmp/woot2', fakeThing: 123 };
      var options = aug('defaults', defaults, o1, o2);
      expect(options.debug).to.be.false;
      expect(options.enable).to.be.true;
      expect(options.path).to.equal('/tmp/woot2');
      expect(options.fakeThing).to.not.exist;
    });
  });
  
});
