require('./model')
exports = window
class exports.Character extends Model
  @digitDecimal = 1
  constructor: (heroStatus, @name=null, writable=true) ->
    @level = 1
    @statusNames = []
    # モデルのカラム名の接頭辞アンダーバーをつける
    statusSetting = []
    for statusName, value of heroStatus
      statusSetting["_" + statusName] = value
    super(statusSetting, writable)

    # 現在のレベルのステータス
    properties = []
    for statusName in Object.keys(heroStatus)
      do =>
        camelStatus = @fSnakeToCamel(statusName)
        @statusNames.push(camelStatus)
        statusSettig = @['_' + camelStatus]
        properties[camelStatus] = {
          get: ->
            getStatus.call(@, statusSettig)
        }
    Object.defineProperties(@, properties)

  getStatus = (status) ->
    if status is undefined
      return
    current_status = status.start + (status.glow * (@level - 1))
    current_status *= Math.pow(10, Character.digitDecimal)
    current_status = Math.floor(current_status)
    current_status /= Math.pow(10, Character.digitDecimal)
    current_status
