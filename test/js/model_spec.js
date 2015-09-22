(function() {
  describe('model', function() {
    beforeEach(function() {
      return this.record = {
        'name': 'taro',
        'first_name': 'yamada',
        '_Age_when_child': 18,
        'first_second_three_fourFive': 3
      };
    });
    describe('constructor', function() {
      describe('when no options', function() {
        it('defines property', function() {
          var model;
          model = new Model(this.record);
          expect(model.name).toBe('taro');
          expect(model.firstName).toBe('yamada');
          expect(model._ageWhenChild).toBe(18);
          return expect(model.firstSecondThreeFourFive).toBe(3);
        });
        it('defines writable property', function() {
          var model;
          model = new Model(this.record);
          model.name = 'ziro';
          expect(model.name).toBe('ziro');
          model.firstName = 'suzuki';
          expect(model.firstName).toBe('suzuki');
          model._ageWhenChild = 30;
          expect(model._ageWhenChild).toBe(30);
          model.firstSecondThreeFourFive = -1;
          return expect(model.firstSecondThreeFourFive).toBe(-1);
        });
        return it('defines columnNames', function() {
          var actual, model;
          model = new Model(this.record);
          actual = model.columnNames;
          return expect(actual).toEqual(['name', 'firstName', '_ageWhenChild', 'firstSecondThreeFourFive']);
        });
      });
      return describe('when option writable is false', function() {
        it('defines not writeable property', function() {
          var model;
          model = new Model(this.record, false);
          model.name = 'ziro';
          expect(model.name).toBe('taro');
          model.firstName = 'suzuki';
          expect(model.firstName).toBe('yamada');
          model._ageWhenChild = 30;
          expect(model._ageWhenChild).toBe(18);
          model.firstSecondThreeFourFive = -1;
          return expect(model.firstSecondThreeFourFive).toBe(3);
        });
        return it('defines not writeable deep property', function() {
          var model;
          model = new Model({
            hp: {
              start: 10,
              glow: 5
            }
          }, false);
          model.hp.start = 100;
          model.hp.glow = 200;
          expect(model.hp.start).toBe(10);
          return expect(model.hp.glow).toBe(5);
        });
      });
    });
    return describe('#fSnakeToCamel', function() {
      it('convert a snake case into a camel case', function() {
        var actual, i, len, model, pattern, patterns, results;
        patterns = [['foo_bar', 'fooBar'], ['foobar', 'foobar'], ['FooBar_piyo', 'fooBarPiyo'], ['foo__Bar', 'fooBar']];
        model = new Model;
        results = [];
        for (i = 0, len = patterns.length; i < len; i++) {
          pattern = patterns[i];
          actual = model.fSnakeToCamel(pattern[0]);
          results.push(expect(actual).toBe(pattern[1], pattern));
        }
        return results;
      });
      it('leaves a prifix under score', function() {
        var actual, i, len, model, pattern, patterns, results;
        patterns = [['_foo_bar', '_fooBar'], ['_FooBar_piyo', '_fooBarPiyo']];
        model = new Model;
        results = [];
        for (i = 0, len = patterns.length; i < len; i++) {
          pattern = patterns[i];
          actual = model.fSnakeToCamel(pattern[0]);
          results.push(expect(actual).toBe(pattern[1], pattern));
        }
        return results;
      });
      return it('convert prifix successive under score into a one', function() {
        var actual, i, len, model, pattern, patterns, results;
        patterns = [['__FooBar_piyo', '_fooBarPiyo']];
        model = new Model;
        results = [];
        for (i = 0, len = patterns.length; i < len; i++) {
          pattern = patterns[i];
          actual = model.fSnakeToCamel(pattern[0]);
          results.push(expect(actual).toBe(pattern[1], pattern));
        }
        return results;
      });
    });
  });

}).call(this);
