exports = window
class exports.Model
  constructor: (record, writable=true) ->
    properties = {}
    for column, columnValue of record
      camelKey = @fSnakeToCamel(column)
      @deepFreeze(columnValue) if not writable
      properties[camelKey] = {
        value: columnValue
        writable: writable
      }

    Object.defineProperties(@, properties)

  fSnakeToCamel: (string) ->
    # アンダースコアが連続している場合は1つにする
    string = string.replace(/_{2,}/g,
      (word) ->
        return '_'
    )
    # 行頭のアンダースコアは残す
    string = string.replace(/(?!^)_./g,
      (word) ->
        return word.charAt(1).toUpperCase()
    )
    # 最初の単語の頭文字を小文字にする
    string = string.replace(/^_*[A-Z]/,
      (word) ->
        return word.toLowerCase()
    )
    string

  deepFreeze: (obj) ->
    Object.freeze(obj)
    for propKey in Object.keys(obj)
      prop = obj[propKey]
      if not obj.hasOwnProperty(propKey) or typeof prop isnt "object" or Object.isFrozen(prop)
        # オブジェクトがプロトタイプ上にある、オブジェクトではない、
        # すでに凍結されているのいずれかに当てはまる場合はスキップします。
        # 凍結されていないオブジェクトを含む凍結されたオブジェクトがすでにある場合には、
        # どこかに凍結されていない参照を残す可能性があることに注意してください。
        continue
      @deepFreeze(prop)
