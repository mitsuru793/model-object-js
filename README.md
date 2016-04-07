# model-object-js
ハッシュを引数に、オブジェクトのプロパティを自動で定義してくれるライブラリです。DBから受け取ったレコードをオブジェクトに変換する際に使います。

```coffee
describe 'constructor', ->
  describe 'when no options', ->
    it 'defines property', ->
      model = new Model({
        'name': 'taro'
        'first_name': 'yamada'
        '_Age_when_child': 18
        'first_second_three_fourFive': 3
      })
      expect(model.name).toBe('taro')
      expect(model.firstName).toBe('yamada')
      expect(model._ageWhenChild).toBe(18)
      expect(model.firstSecondThreeFourFive).toBe(3)
```

Modelクラスを継承したCharacterクラスを使えば、成長値とレベルを元に自動でステータスを計算してくれるモデルを作成してくれます。

```coffee
describe 'defines property', ->
  beforeEach(->
    characterStatus = {
      hp: { start: 20, glow: 5 }
      mp: { start: 3, glow: 2 }
    }
    @character = new Character(characterStatus, 'taro')
  )

  it 'defines status setting property has underscore prefix', ->
    expect(@character._hp.start).toBe(20)
    expect(@character._hp.glow).toBe(5)
    expect(@character._mp.start).toBe(3)
    expect(@character._mp.glow).toBe(2)

  it 'defines current status property with all kyes of an argument', ->
    @character.level = 3
    expect(@character.hp).toBe(20 + (5 * 2))
    expect(@character.mp).toBe(3 + (2 * 2))
```

このライブラリはbowerで公開しています。
