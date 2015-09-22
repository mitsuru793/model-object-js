describe 'character', ->
  describe 'constructor', ->
    beforeEach(->
      @characterStatus = {
        hp: { start: 20, glow: 5 }
        mp: { start: 3, glow: 2 }
      }
    )

    describe 'defines property', ->
      beforeEach(->
        @characters = []
        @characters.push(new Character(@characterStatus))
        @characters.push(new Character(@characterStatus, 'taro'))
        @characters.push(new Character(@characterStatus, 'taro', false))
      )

      it 'defines status setting property has underscore prefix', ->
        for character in @characters
          expect(character._hp.start).toBe(20)
          expect(character._hp.glow).toBe(5)
          expect(character._mp.start).toBe(3)
          expect(character._mp.glow).toBe(2)

      it 'defines current status property with all kyes of an argument', ->
        for character in @characters
          character.level = 3
          expect(character.hp).toBe(20 + (5 * 2))
          expect(character.mp).toBe(3 + (2 * 2))

      it 'defines columnNames', ->
        for character in @characters
          expect(character.columnNames).toEqual(['_hp', '_mp'])

      it 'defines statusNames', ->
        for character in @characters
          expect(character.statusNames).toEqual(['hp', 'mp'])

    describe 'status writable', ->
      beforeEach(->
        @characters = []
        @characters.push(new Character(@characterStatus))
        @characters.push(new Character(@characterStatus, 'taro'))
      )

      it 'has no writable current status', ->
        for character in @characters
          character.hp = 100
          character.mp = 200
          expect(character.hp).toBe(20)
          expect(character.mp).toBe(3)

      it 'is writable default and arg3 is true', ->
        @characters.push(new Character(@characterStatus, 'taro', true))
        for character in @characters
          character.level = 3
          character._hp.start = 100
          character._hp.glow = 200
          character._mp.start = 300
          character._mp.glow = 400
          expect(character._hp.start).toBe(100)
          expect(character._hp.glow).toBe(200)
          expect(character._mp.start).toBe(300)
          expect(character._mp.glow).toBe(400)

      it 'is not writable when arg3 is false', ->
        character = new Character(@characterStatus, 'taro', false)
        character.level = 3
        character._hp.start = 100
        character._hp.glow = 200
        character._mp.start = 300
        character._mp.glow = 400
        expect(character._hp.start).toBe(20)
        expect(character._hp.glow).toBe(5)
        expect(character._mp.start).toBe(3)
        expect(character._mp.glow).toBe(2)

      it 'applies setting status when get current status', ->
        @characters.push(new Character(@characterStatus, 'taro', true))
        for character in @characters
          character.level = 3
          character._hp.start = 100
          character._hp.glow = 200
          character._mp.start = 300
          character._mp.glow = 400
          expect(character.hp).toBe(100 + (200 * 2))
          expect(character.mp).toBe(300 + (400 * 2))
