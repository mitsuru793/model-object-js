(function() {
  describe('character', function() {
    return describe('constructor', function() {
      beforeEach(function() {
        return this.characterStatus = {
          hp: {
            start: 20,
            glow: 5
          },
          mp: {
            start: 3,
            glow: 2
          }
        };
      });
      describe('defines property', function() {
        beforeEach(function() {
          this.characters = [];
          this.characters.push(new Character(this.characterStatus));
          this.characters.push(new Character(this.characterStatus, 'taro'));
          return this.characters.push(new Character(this.characterStatus, 'taro', false));
        });
        it('defines status setting property has underscore prefix', function() {
          var character, i, len, ref, results;
          ref = this.characters;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            character = ref[i];
            expect(character._hp.start).toBe(20);
            expect(character._hp.glow).toBe(5);
            expect(character._mp.start).toBe(3);
            results.push(expect(character._mp.glow).toBe(2));
          }
          return results;
        });
        return it('defines current status property with all kyes of an argument', function() {
          var character, i, len, ref, results;
          ref = this.characters;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            character = ref[i];
            character.level = 3;
            expect(character.hp).toBe(20 + (5 * 2));
            results.push(expect(character.mp).toBe(3 + (2 * 2)));
          }
          return results;
        });
      });
      return describe('status writable', function() {
        beforeEach(function() {
          console.log("before");
          this.characters = [];
          this.characters.push(new Character(this.characterStatus));
          return this.characters.push(new Character(this.characterStatus, 'taro'));
        });
        it('has no writable current status', function() {
          var character, i, len, ref, results;
          ref = this.characters;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            character = ref[i];
            character.hp = 100;
            character.mp = 200;
            expect(character.hp).toBe(20);
            results.push(expect(character.mp).toBe(3));
          }
          return results;
        });
        it('is writable default and arg3 is true', function() {
          var character, i, len, ref, results;
          console.log("aaa");
          this.characters.push(new Character(this.characterStatus, 'taro', true));
          ref = this.characters;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            character = ref[i];
            character.level = 3;
            character._hp.start = 100;
            character._hp.glow = 200;
            character._mp.start = 300;
            character._mp.glow = 400;
            expect(character._hp.start).toBe(100);
            expect(character._hp.glow).toBe(200);
            expect(character._mp.start).toBe(300);
            results.push(expect(character._mp.glow).toBe(400));
          }
          return results;
        });
        it('is not writable when arg3 is false', function() {
          var character;
          character = new Character(this.characterStatus, 'taro', false);
          character.level = 3;
          character._hp.start = 100;
          character._hp.glow = 200;
          character._mp.start = 300;
          character._mp.glow = 400;
          expect(character._hp.start).toBe(20);
          expect(character._hp.glow).toBe(5);
          expect(character._mp.start).toBe(3);
          return expect(character._mp.glow).toBe(2);
        });
        return it('applies setting status when get current status', function() {
          var character, i, len, ref, results;
          this.characters.push(new Character(this.characterStatus, 'taro', true));
          ref = this.characters;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            character = ref[i];
            character.level = 3;
            character._hp.start = 100;
            character._hp.glow = 200;
            character._mp.start = 300;
            character._mp.glow = 400;
            expect(character.hp).toBe(100 + (200 * 2));
            results.push(expect(character.mp).toBe(300 + (400 * 2)));
          }
          return results;
        });
      });
    });
  });

}).call(this);
