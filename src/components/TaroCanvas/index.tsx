/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { Canvas } from '@tarojs/components'
import {
  toPx,
  toRpx,
  getRandomId,
  getHeight,
  downloadImageAndInfo,
  getLinearColor,
  getImageInfo,
} from './utils/tools'
import {
  drawImage,
  drawText,
  drawBlock,
  drawLine,
} from './utils/draw'
import './index.css'

interface Props {
  config?: any
  width?: string
  height?: string
  debug?: boolean
  noTaroToast?: boolean
  onCreateSuccess?: (result: any) => void
  onCreateFail?: (result: any) => void
}

let count = 1
const canvasId = getRandomId() // 唯一id

const CanvasDrawer: React.FC<Props> = ({
    config,
    width = 300,
    height = 500,
    debug,
    noTaroToast,
    onCreateSuccess,
    onCreateFail,
  }) => {
  const [drawArr, setDrawArr] = useState<any>(null)

  /**
   * @description 获取图片参数
   * @param  {} images=[]
   */
  const getImagesParameter = images => {
    const imagesTemp = images.filter(item => item.url)
    console.log('获取图片参数', imagesTemp)
    const drawList = imagesTemp.map((item, index) => downloadImageAndInfo(item, index))
    console.log('绘图任务1', drawList)
    return Promise.all(drawList)
  }

  /**
   * @description 初始化 canvas
   * @param  {} w
   * @param  {} h
   * @param  {} debug
   */
  const initCanvas = () => new Promise<any>(resolve => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery().in(CanvasDrawer)
      query.select(`#${canvasId}`).fields({ node: true, size: true }).exec(res => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        resolve({ ctx, canvas })
      })
    }, 300)
  })

  /**
   * @description 初始化 canvas实例 && 下载图片资源
   * @param  { boolean }
   */
  const onCreate = () => {

    if (!noTaroToast) Taro.showLoading({ mask: true, title: '生成中...' })
    if (config.images && config.images.length) {
      getImagesParameter(config.images).then(result => { // 1. 下载图片资源
        setDrawArr(result) // 将处理好的图片放进待绘制数组中
        create()
      }).catch(err => {
        Taro.hideLoading()
        Taro.showToast({ icon: 'none', title: err.errMsg || '下载图片失败' })
        onCreateFail && onCreateFail(err)
      })
    } else {
      create()
    }
  }

  useEffect(() => {
    onCreate()
  })

    /**
   * @description 保存绘制的图片
   * @param  { object } config
   */
     const getTempFile = canvas => {
      Taro.canvasToTempFilePath({
        canvas,
        success: result => {
          getImageInfo(result.tempFilePath)
          if (!onCreateSuccess)console.warn('缺少必传参数 onCreateSuccess')
          onCreateSuccess && onCreateSuccess(result)
        },
        fail: error => {
          const { errMsg } = error
          console.log(errMsg)
          if (errMsg === 'canvasToTempFilePath:fail:create bitmap failed') {
            count += 1
            if (count <= 3) {
              getTempFile(canvas)
            } else {
              Taro.hideLoading()
              Taro.showToast({ icon: 'none', title: errMsg || '绘制海报失败' })
              if (!onCreateFail) console.warn('缺少必传参数 onCreateFail')
              onCreateFail && onCreateFail(error)
            }
          }
        },
      }, CanvasDrawer)
    }

  /**
   * @description 开始绘制
   * @param  { object } config
   */
  const create = async () => {
    const configHeight = getHeight(config)
    const canvasObj = await initCanvas()
    const { ctx, canvas } = canvasObj || {}
    const {  backgroundColor, texts = [], blocks = [], lines = [] } = config

    canvas.width = config?.width
    canvas.height = configHeight
    // 设置画布底色
    if (backgroundColor) {
      ctx.save() // 保存绘图上下文
      const grd = getLinearColor(ctx, backgroundColor, 0, 0, width, height)
      ctx.fillStyle = grd // 设置填充颜色
      ctx.fillRect(0, 0, width, height) // 填充一个矩形
      ctx.restore() // 恢复之前保存的绘图上下文
    }
     // 将要画的方块、文字、线条放进队列数组
    const queue = drawArr.concat(texts.map(item => {
        item.type = 'text'
        item.zIndex = item.zIndex || 0
        return item
      }))
      .concat(blocks.map(item => {
        item.type = 'block'
        item.zIndex = item.zIndex || 0
        return item
      }))
      .concat(lines.map(item => {
        item.type = 'line'
        item.zIndex = item.zIndex || 0
        return item
      }))

    queue.sort((a, b) => a.zIndex - b.zIndex) // 按照层叠顺序由低至高排序
    for (let i = 0; i < queue.length; i++) {
      const drawOptions = {
        canvas,
        ctx,
        toPx,
        toRpx,
      }
      if (queue[i].type === 'image') {
        await drawImage(queue[i], drawOptions)
      } else if (queue[i].type === 'text') {
        drawText(queue[i], drawOptions)
      } else if (queue[i].type === 'block') {
        drawBlock(queue[i], drawOptions)
      } else if (queue[i].type === 'line') {
        drawLine(queue[i], drawOptions)
      }
    }

    setTimeout(() => {
      getTempFile(canvas) // 需要做延时才能能正常加载图片
    }, 300)
  }

  const pxHeight = height || 500
  const pxWidth = width || 300

  return pxWidth && pxHeight ? (
    <Canvas
      type='2d'
      id={canvasId}
      style={`width:${pxWidth}px; height:${pxHeight}px;`}
      className={`${debug ? 'debug' : 'pro'} canvas`}
    />
  ) : null
}

export default CanvasDrawer

// CanvasDrawer.defaultProps = {
//   config: {},
// }

// CanvasDrawer.propTypes = {
//   config: PropTypes.object,
//   onCreateSuccess: PropTypes.func.isRequired,
//   onCreateFail: PropTypes.func.isRequired,
// }
