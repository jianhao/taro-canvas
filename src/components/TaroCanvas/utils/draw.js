/* eslint-disable no-underscore-dangle */
import { getLinearColor, getTextX } from './tools'

/**
  * 绘制圆角矩形
  * @param { object } drawData - 绘制数据
  * @param { number } drawData.x - 左上角x坐标
  * @param { number } drawData.y - 左上角y坐标
  * @param { number } drawData.w - 矩形的宽
  * @param { number } drawData.h - 矩形的高
  * @param { number } drawData.r - 圆角半径
  * @param { object } drawOptions - 绘制对象
  * @param { object } drawOptions.ctx - ctx对象
  * @description arcTo 比 arc 更加简洁，三点画弧，但是比较难理解 参考资料：http://www.yanghuiqing.com/web/346
  */
export function _drawRadiusRect (drawData, drawOptions) {
  const { x, y, w, h } = drawData
  let { r } = drawData
  const { ctx } = drawOptions
  const minSize = Math.min(w, h)
  if (r > minSize / 2) r = minSize / 2
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r) // 绘制当前端点、端点1、端点2三点形成的两条切线与半径r的圆相切的小圆弧
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/**
 * 计算文本长度
 * @param { Array | Object } text 数组 或者 对象
 * @param { object } drawOptions - 绘制对象
 * @param { object } drawOptions.ctx - ctx对象
 * @param { function } drawOptions.toPx - toPx方法
 * @param { function } drawOptions.toRpx - toRpx方法
 */
export function _getTextWidth (text, drawOptions) {
  const { ctx, toPx, toRpx } = drawOptions
  let texts = []
  if (Object.prototype.toString.call(text) === '[object Object]') {
    texts.push(text)
  } else {
    texts = text
  }
  let width = 0
  // eslint-disable-next-line no-shadow
  texts.forEach(({ fontSize, text, marginLeft = 0, marginRight = 0 }) => {
    ctx.setFontSize(toPx(fontSize))
    width += ctx.measureText(text).width + marginLeft + marginRight
  })
  return toRpx(width)
}

/**
  * 渲染一段文字
  * @param { object } drawData - 绘制数据
  * @param { number } drawData.x - x坐标 rpx
  * @param { number } drawData.y - y坐标 rpx
  * @param { number } drawData.fontSize - 文字大小 rpx
  * @param { number } [drawData.color] - 颜色
  * @param { string } [drawData.baseLine] - 基线对齐方式 top| middle|bottom|...
  * @param { string } [drawData.textAlign='left'] - 对齐方式 left|center|right
  * @param { string } drawData.text - 当Object类型时，参数为 text 字段的参数，marginLeft、marginRight这两个字段可用
  * @param { number } [drawData.opacity=1] - 1为不透明，0为透明
  * @param { string } [drawData.textDecoration='none']
  * @param { number } [drawData.width] - 文字宽度 没有指定为画布宽度
  * @param { number } [drawData.lineNum=1] - 根据宽度换行，最多的行数
  * @param { number } [drawData.lineHeight=0] - 行高
  * @param { string } [drawData.fontWeight='normal'] - 'bold' 加粗字体，目前小程序不支持 100 - 900 加粗
  * @param { string } [drawData.fontStyle='normal'] - 'italic' 倾斜字体
  * @param { string } [drawData.fontFamily="sans-serif"] - 小程序默认字体为 'sans-serif', 请输入小程序支持的字体
  *
  * @param { object } drawOptions - 绘制对象
  * @param { object } drawOptions.ctx - ctx对象
  * @param { function } drawOptions.toPx - toPx方法
  * @param { function } drawOptions.toRpx - toRpx方法
  */
export function _drawSingleText (drawData, drawOptions) {
  const {
    x,
    y,
    text,
    color,
    width,
    fontSize,
    baseLine = 'top',
    textAlign = 'left',
    opacity = 1,
    textDecoration = 'none',
    lineNum = 1,
    lineHeight = 0,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = 'sans-serif',
  } = drawData
  const { ctx, toPx } = drawOptions
  ctx.save()
  ctx.beginPath()
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
  ctx.globalAlpha = opacity
  ctx.fillStyle = color
  ctx.textBaseline = baseLine
  ctx.textAlign = textAlign
  let textWidth = ctx.measureText(text).width // 测量文本宽度
  const textArr = []
  // 文本宽度 大于 渲染宽度
  if (textWidth > width) { // 如果超出一行 ，则判断要分为几行
    let fillText = ''
    let line = 1
    for (let i = 0; i <= text.length - 1; i++) { // 将文字转为数组，一行文字一个元素
      fillText += text[i]
      const nextText = (i + 1) <= text.length ? fillText + text[i + 1] : fillText
      if (ctx.measureText(nextText).width >= width) { // 如果到了当前这个字超出宽度则添加换行或者省略号
        if (line === lineNum) {
          if (i !== text.length - 1) {
            fillText = `${fillText.substring(0, fillText.length - 1)}...`
          }
        }
        if (line <= lineNum) {
          textArr.push(fillText)
        }
        line++
        fillText = ''
      } else if (line <= lineNum) {
        if (i === text.length - 1) {
          textArr.push(fillText)
        }
      }
    }
    textWidth = width
  } else {
    textArr.push(text)
  }

  textArr.forEach((item, index) => ctx.fillText(item,
    getTextX(textAlign, x, width), y + (lineHeight || fontSize) * index))
  ctx.restore()
  // textDecoration
  if (textDecoration !== 'none') {
    let lineY = y
    if (textDecoration === 'line-through') { // 目前只支持贯穿线
      lineY = y
    }
    ctx.save()
    ctx.moveTo(toPx(x), toPx(lineY))
    ctx.lineTo(toPx(x) + toPx(textWidth), toPx(lineY))
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.restore()
  }
  return textWidth
}

/**
 * 渲染文字
 * @param { object } params - 绘制数据
 * @param { number } params.x - x坐标 rpx
 * @param { number } params.y - y坐标 rpx
 * @param { number } params.fontSize - 文字大小 rpx
 * @param { number } [params.color] - 颜色
 * @param { string } [params.baseLine] - 基线对齐方式 top| middle|bottom
 * @param { string } [params.textAlign='left'] - 对齐方式 left|center|right
 * @param { string } params.text - 当Object类型时，参数为 text 字段的参数，marginLeft、marginRight这两个字段可用
 * @param { number } [params.opacity=1] - 1为不透明，0为透明
 * @param { string } [params.textDecoration='none']
 * @param { number } [params.width] - 文字宽度 没有指定为画布宽度
 * @param { number } [params.lineNum=1] - 根据宽度换行，最多的行数
 * @param { number } [params.lineHeight=0] - 行高
 * @param { string } [params.fontWeight='normal'] - 'bold' 加粗字体，目前小程序不支持 100 - 900 加粗
 * @param { string } [params.fontStyle='normal'] - 'italic' 倾斜字体
 * @param { string } [params.fontFamily="sans-serif"] - 小程序默认字体为 'sans-serif', 请输入小程序支持的字体
 *
 * @param { object } drawOptions - 绘制对象
 * @param { object } drawOptions.ctx - ctx对象
 * @param { function } drawOptions.toPx - toPx方法
 * @param { function } drawOptions.toRpx - toRpx方法
 */
export function drawText (params, drawOptions) {
  // const { ctx, toPx, toRpx } = drawOptions;
  const {
    x,
    y,
    text,
    baseLine,
    // fontSize,
    // color,
    // textAlign,
    // opacity = 1,
    // width,
    // lineNum,
    // lineHeight
  } = params
  if (Object.prototype.toString.call(text) === '[object Array]') {
    const preText = { x, y, baseLine }
    text.forEach(item => {
      preText.x += item.marginLeft || 0
      const textWidth = _drawSingleText(Object.assign(item, {
        ...preText,
      }), drawOptions)
      preText.x += textWidth + (item.marginRight || 0) // 下一段字的 x 轴为上一段字 x + 上一段字宽度
    })
  } else {
    _drawSingleText(params, drawOptions)
  }
}

/**
 * @description 渲染线
 * @param  { number } startX - 起始坐标
 * @param  { number } startY - 起始坐标
 * @param  { number } endX - 终结坐标
 * @param  { number } endY - 终结坐标
 * @param  { number } width - 线的宽度
 * @param  { string } [color] - 线的颜色
 *
 * @param { object } drawOptions - 绘制对象
 * @param { object } drawOptions.ctx - ctx对象
 * @param { function } drawOptions.toPx - toPx方法
 * @param { function } drawOptions.toRpx - toRpx方法
 */
export function drawLine (drawData, drawOptions) {
  const { startX, startY, endX, endY, color, width } = drawData
  const { ctx } = drawOptions
  if (!width) return
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

/**
* 渲染矩形
* @param  { number } x - x坐标
* @param  { number } y - y坐标
* @param  { number } height -高
* @param  { string|object } [text] - 块里面可以填充文字，参考texts字段
* @param  { number } [width=0] - 宽 如果内部有文字，由文字宽度和内边距决定
* @param  { number } [paddingLeft=0] - 内左边距
* @param  { number } [paddingRight=0] - 内右边距
* @param  { number } [borderWidth] - 边框宽度
* @param  { string } [backgroundColor] - 背景颜色
* @param  { string } [borderColor] - 边框颜色
* @param  { number } [borderRadius=0] - 圆角
* @param  { number } [opacity=1] - 透明度
*
* @param { object } drawOptions - 绘制对象
* @param { object } drawOptions.ctx - ctx对象
* @param { function } drawOptions.toPx - toPx方法
* @param { function } drawOptions.toRpx - toRpx方法
*/
export function drawBlock (data, drawOptions) {
  const {
    x,
    y,
    text,
    width = 0,
    height,
    opacity = 1,
    paddingLeft = 0,
    paddingRight = 0,
    borderWidth,
    backgroundColor,
    borderColor,
    borderRadius = 0,
  } = data || {}
  const { ctx } = drawOptions
  let blockWidth = 0 // 块的宽度
  let textX = 0
  let textY = 0

  // 判断是否块内有文字
  if (typeof text !== 'undefined') {
    // 如果有文字并且块的宽度小于文字宽度，块的宽度为 文字的宽度 + 内边距
    const textWidth = _getTextWidth(typeof text.text === 'string' ? text : text.text, drawOptions)
    blockWidth = textWidth > width ? textWidth : width
    blockWidth += paddingLeft + paddingLeft

    const {
      textAlign = 'left',
      // text: textCon,
    } = text
    textY = height / 2 + y // 文字的y轴坐标在块中线
    if (textAlign === 'left') {
      // 如果是右对齐，那x轴在块的最左边
      textX = x + paddingLeft
    } else if (textAlign === 'center') {
      textX = blockWidth / 2 + x
    } else {
      textX = x + blockWidth - paddingRight
    }
  } else {
    blockWidth = width
  }

  // 画矩形
  if (backgroundColor) {
    ctx.save()
    ctx.globalAlpha = opacity
    const grd = getLinearColor(ctx, backgroundColor, x, y, blockWidth, height)
    ctx.fillStyle = grd
    if (borderRadius > 0) {
      // 画圆角矩形
      const drawData = { x, y, w: blockWidth, h: height, r: borderRadius }
      _drawRadiusRect(drawData, drawOptions)
      ctx.fill()
    } else {
      ctx.fillRect(x, y, blockWidth, height)
    }
    ctx.restore()
  }

  // 画边框
  if (borderWidth) {
    ctx.save()
    ctx.globalAlpha = opacity
    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderWidth
    if (borderRadius > 0) {
      // 画圆角矩形边框
      const drawData = {
        x, y, w: blockWidth, h: height, r: borderRadius,
      }
      _drawRadiusRect(drawData, drawOptions)
      ctx.stroke()
    } else {
      ctx.strokeRect(x, y, blockWidth, height)
    }
    ctx.restore()
  }

  if (text) {
    drawText(Object.assign(text, { x: textX, y: textY }), drawOptions)
  }
}

/**
 * @description 渲染图片
 * @param { object } data
 * @param { number } x - 图像的左上角在目标 canvas 上 x 轴的位置
 * @param { number } y - 图像的左上角在目标 canvas 上 y 轴的位置
 * @param { number } w - 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
 * @param { number } h - 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
 * @param { number } sx - 源图像的矩形选择框的左上角 x 坐标
 * @param { number } sy - 源图像的矩形选择框的左上角 y 坐标
 * @param { number } sw - 源图像的矩形选择框的宽度
 * @param { number } sh - 源图像的矩形选择框的高度
 * @param { number } [borderRadius=0] - 圆角
 * @param { number } [borderWidth=0] - 边框
 *
 * @param { object } drawOptions - 绘制对象
 * @param { object } drawOptions.ctx - ctx对象
 * @param { function } drawOptions.toPx - toPx方法
 * @param { function } drawOptions.toRpx - toRpx方法
 */
export const drawImage = (data, drawOptions) => new Promise(resolve => {
  const { canvas, ctx, toPx } = drawOptions
  const {
    x,
    y,
    w,
    h,
    sx,
    sy,
    sw,
    sh,
    imgPath,
    borderRadius = 0,
    borderWidth = 0,
    borderColor,
  } = data
  ctx.save()
  if (borderRadius > 0) {
    _drawRadiusRect({ x, y, w, h, r: borderRadius }, drawOptions)
    ctx.clip() // 从原始画中剪切任意形状和尺寸
    ctx.fill()
    const img = canvas.createImage() // 创建图片对象
    img.src = imgPath
    img.onload = () => {
      ctx.drawImage(img, toPx(sx), toPx(sy), toPx(sw), toPx(sh), x, y, w, h)
      if (borderWidth > 0) {
        ctx.strokeStyle = borderColor
        ctx.lineWidth = borderWidth
        ctx.stroke()
      }
      resolve()
      ctx.restore()
    }
  } else {
    const img = canvas.createImage() // 创建图片对象
    img.src = imgPath
    img.onload = () => {
      ctx.drawImage(img, toPx(sx), toPx(sy), toPx(sw), toPx(sh), x, y, w, h)
      resolve()
      ctx.restore()
    }
  }
})
