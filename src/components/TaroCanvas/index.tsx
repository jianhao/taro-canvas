/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { Canvas } from '@tarojs/components'
import { Image } from '@/typings/taroCanvas'
import { drawImage, drawText, drawBlock, drawLine } from './utils/draw'
import {toPx, toRpx, getRandomId, getImageInfo, getLinearColor } from './utils/tools'
import './index.css'

interface Props {
  config?: any
  debug?: boolean
  showLoading?: boolean
  onCreateSuccess?: (result: any) => void
  onCreateFail?: (result: any) => void
}

let count = 1
const canvasId = getRandomId() // 唯一id

const CanvasDrawer: React.FC<Props> = ({
    config,
    debug,
    showLoading,
    onCreateSuccess,
    onCreateFail,
  }) => {
  const {
    width,
    height,
    backgroundColor,
    texts = [],
    blocks = [],
    lines = [],
  } = config || {}

  /**
   * step1: 初始化图片资源
   * @param  {Array} images = imgTask
   * @return {Promise} downloadImagePromise
   */
  const initImages = (images: Image[]) => {
    const imagesTemp = images.filter(item => item.url)
    const drawList = imagesTemp.map((item, index) => getImageInfo(item, index))
    return Promise.all(drawList)
  }

  /**
   * step2: 初始化 canvas && 获取其 dom 节点和实例
   * @return {Promise} resolve 里返回其 dom 和实例
   */
  const initCanvas = () => new Promise<any>(resolve => {
    setTimeout(() => {
      const pageInstance = Taro.getCurrentInstance()?.page || {} // 拿到当前页面实例
      const query = Taro.createSelectorQuery().in(pageInstance) // 确定在当前页面内匹配子元素
      query.select(`#${canvasId}`).fields({ node: true, size: true, context: true }, res => {
        const canvas = res.node
        const ctx = canvas.getContext('2d')
        resolve({ ctx, canvas })
      }).exec()
    }, 300)
  })

  // start: 初始化 canvas 实例 && 下载图片资源
  const init = () => {
    if (showLoading) Taro.showLoading({ mask: true, title: '生成中...' })
    if (config?.images?.length) {
      initImages(config.images).then(result => { // 1. 下载图片资源
        startDrawing(result)
      }).catch(err => {
        Taro.hideLoading()
        Taro.showToast({ icon: 'none', title: err.errMsg || '下载图片失败' })
        onCreateFail && onCreateFail(err)
      })
    } else {
      startDrawing([])
    }
  }

  useEffect(() => {
    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    /**
   * @description 保存绘制的图片
   * @param  { object } config
   */
     const getTempFile = canvas => {
      Taro.canvasToTempFilePath({
        canvas,
        success: result => {
          console.log('成功获取图片资源', result);
          Taro.hideLoading()
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
   * step2: 开始绘制任务
   * @param  { Array } drawTasks 待绘制任务
   */
  const startDrawing = async (drawTasks) => {
    // TODO: check
    // const configHeight = getHeight(config)
    const { ctx, canvas } = await initCanvas()

    canvas.width = width
    canvas.height = height

    // 设置画布底色
    if (backgroundColor) {
      ctx.save() // 保存绘图上下文
      const grd = getLinearColor(ctx, backgroundColor, 0, 0, width, height)
      ctx.fillStyle = grd // 设置填充颜色
      ctx.fillRect(0, 0, width, height) // 填充一个矩形
      ctx.restore() // 恢复之前保存的绘图上下文
    }
     // 将要画的方块、文字、线条放进队列数组
    const queue = drawTasks.concat(texts.map(item => {
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
      console.log('待绘制任务', drawTasks);

    queue.sort((a, b) => a.zIndex - b.zIndex) // 按照层叠顺序由低至高排序, 先画低的，再画高的
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
    console.log('绘制完毕');

    setTimeout(() => {
      getTempFile(canvas) // 需要做延时才能能正常加载图片
    }, 300)
  }



  return (
  <>
    <Canvas
      type='2d'
      id={canvasId}
      style={`width:${width}px; height:${height}px;`}
      className={`${debug ? 'debug' : 'pro'} canvas`}
    />
    </>
  )
}

export default CanvasDrawer
