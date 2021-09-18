# taro-canvas
小程序组件-小程序海报组件
   [![npm](https://img.shields.io/npm/v/taro-canvas.svg?style=flat "npm")](https://www.npmjs.com/package/taro-canvas)[![npm](https://img.shields.io/npm/dm/taro-canvas.svg?style=flat "npm")](https://www.npmjs.com/package/taro-canvas)

## 概述
taro-canvas 是基于 Taro3 的微信小程序 canvas 绘图组件，封装了常用的操作, 通过配置的方式绘制海报。


## 生成效果
<img width="300" src="http://pic.jianhunxia.com/imgs/20210918103108poster1.png"></img> 
<!-- <img width="300" src="http://pic.jianhunxia.com/imgs/20210918101604taroCanvasImg2.png"></img> -->
<!-- <img width="300" src="https://github.com/chuyun/taro-canvas/blob/v1/src/assets/images/demo3.png"></img> -->

## 安装使用

### 方式一：通过 npm 安装 (推荐)

小程序已经支持使用 npm 安装第三方包，详见 [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html?search-key=npm)

``` bash
# npm
npm i taro-canvas -S --production

# yarn
yarn add taro-canvas --production
```
#### 使用组件

```javascript
// 引入代码
import { TaroCanvasDrawer } from 'taro-canvas';

// 在 render 方法中调用
<TaroCanvasDrawer
  config={this.state.config}
  onCreateSuccess={this.onCreateSuccess}
  onCreateFail={this.onCreateFail}
/>
// 注意点 
// config 绘图配置信息 - 必填项
// onCreateSuccess 绘图成功回调 - 必须实现 => 接收绘制结果、重置 TaroCanvasDrawer 状态
// onCreateFail 绘图失败回调 - 必须实现 => 接收绘制错误信息、重置 TaroCanvasDrawer 状态
```


### 方式二： 下载代码

直接通过 git 下载 taro-canvas 源代码，并将`src/component/taro-canvas`目录拷贝到自己的项目的 `src/component`目录中

#### 使用组件

```javascript
// 引入代码 *引入方式和上面的方式一略有不同
import TaroCanvasDrawer from '../../component/taro-canvas';

// 在 render 方法中调用 和方式一一样
```


### 使用注意事项

1. 图片的域名**务必**添加到 downloadFile 合法域名中（开发设置-服务器域名-downloadFile合法域名）
【P.s 开发时可 选中不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书】
【P.s 真机运行，可打开调试模式】

## 组件参数解释

### config字段

| 字段            | 类型                     | 必填 | 描述                                       |
| --------------- | ------------------------ | ---- | ------------------------------------------ |
| width           | Number(单位:rpx)         | 是   | 画布宽度                                   |
| height          | Number(单位:rpx)         | 是   | 画布高度                                   |
| backgroundColor | String                   | 否   | 画布颜色                                   |
| debug           | Boolean                  | 否   | false隐藏canvas，true显示canvas，默认false |
| blocks          | Object Array（对象数组） | 否   | 看下文                                     |
| texts           | Object Array（对象数组） | 否   | 看下文                                     |
| images          | Object Array（对象数组） | 否   | 看下文                                     |
| lines           | Object Array（对象数组） | 否   | 看下文   |
### blocks字段

| 字段名          | 类型             | 必填 | 描述                                   |
| --------------- | ---------------- | ---- | -------------------------------------- |
| x               | Number(单位:rpx) | 是   | 块的坐标                               |
| y               | Number(单位:rpx) | 是   | 块的坐标                               |
| width           | Number(单位:rpx) | 否   | 如果内部有文字，由文字宽度和内边距决定 |
| height          | Number(单位:rpx) | 是   |                                        |
| paddingLeft     | Number(单位:rpx) | 否   | 内左边距                               |
| paddingRight    | Number(单位:rpx) | 否   | 内右边距                               |
| borderWidth     | Number(单位:rpx) | 否   | 边框宽度                               |
| borderColor     | String           | 否   | 边框颜色                               |
| backgroundColor | String           | 否   | 背景颜色                               |
| borderRadius    | Number(单位:rpx) | 否   | 圆角                                   |
| text            | Object           | 否   | 块里面可以填充文字，参考texts字段解释  |
| zIndex          | Int              | 否   | 层级，越大越高                         |

### texts字段

| 字段名         | 类型             | 必填 | 描述                                                         |
| -------------- | ---------------- | ---- | ------------------------------------------------------------ |
| x              | Number(单位:rpx) | 是   | 坐标                                                         |
| y              | Number(单位:rpx) | 是   | 坐标                                                         |
| text           | String\|Object   | 是   | 当Object类型时，参数为text字段的参数，marginLeft、marginRight这两个字段可用（示例请看下文） |
| fontSize       | Number(单位:rpx) | 是   | 文字大小                                                     |
| color          | String           | 否   | 颜色                                                         |
| opacity        | Int              | 否   | 1为不透明，0为透明                                           |
| lineHeight     | Number(单位:rpx) | 否   | 行高                                                         |
| lineNum        | Int              | 否   | 根据宽度换行，最多的行数                                     |
| width          | Number(单位:rpx) | 否   | 没有指定为画布宽度                                           |
| marginLeft     | Number(单位:rpx) | 否   | 当text字段为Object可以使用，用来控制多行文字间距             |
| marginRight    | Number(单位:rpx) | 否   | 当text字段为Object可以使用，用来控制多行文字间距             |
| textDecoration | String           | 否   | 目前只支持 line-through（贯穿线），默认为none                |
| baseLine       | String           | 否   | top\| middle\|bottom基线对齐方式                             |
| textAlign      | String           | 否   | left\|center\|right对齐方式                                  |
| zIndex         | Int              | 否   | 层级，越大越高                                               |
| fontFamily     | String           | 否   | 小程序默认字体为'sans-serif', 请输入小程序支持的字体，例如：'STSong' |
| fontWeight     | String           | 否   | 'bold'加粗字体，目前小程序不支持 100 - 900 加粗            |
| fontStyle      | String           | 否   | 'italic'倾斜字体                                          |

### images字段

| 字段         | 类型             | 必填 | 描述                                      |
| ------------ | ---------------- | ---- | ----------------------------------------- |
| x            | Number(单位:rpx) | 是   | 右上角的坐标                              |
| y            | Number(单位:rpx) | 是   | 右上角的坐标                              |
| url          | String           | 是   | 图片url（**需要添加到下载白名单域名中**）也支持本地图片 |
| width        | Number(单位:rpx) | 是   | 宽度（**会根据图片的尺寸同比例缩放**）    |
| height       | Number(单位:rpx) | 是   | 高度（**会根据图片的尺寸同比例缩放**）    |
| borderRadius | Number(单位:rpx) | 否   | 圆角，跟css一样                           |
| borderWidth  | Number(单位:rpx) | 否   | 边框宽度                                  |
| borderColor  | String           | 否   | 边框颜色                                  |
| zIndex       | Int              | 否   | 层级，越大越高                            |

### lines字段

| 字段   | 类型             | 必填 | 描述           |
| ------ | ---------------- | ---- | -------------- |
| startX | Number(单位:rpx) | 是   | 起始坐标       |
| startY | Number(单位:rpx) | 是   | 起始坐标       |
| endX   | Number(单位:rpx) | 是   | 终结坐标       |
| endY   | Number(单位:rpx) | 是   | 终结坐标       |
| width  | Number(单位:rpx) | 是   | 线的宽度       |
| color  | String           | 否   | 线的颜色       |
| zIndex | Int              | 否   | 层级，越大越高 |


## 事件

### onCreateSuccess（绘制成功回调） 

返回生成海报图片的本地 url，一般做法是使用 wx.previewImage 预览海报或者在指定位置预览，如下

```javascript
// 绘制成功回调函数 （必须实现）=> 接收绘制结果、重置 TaroCanvasDrawer 状态
  onCreateSuccess = (result) => {
    const { tempFilePath, errMsg } = result;
    Taro.hideLoading();
    if (errMsg === 'canvasToTempFilePath:ok') {
      this.setState({
        shareImage: tempFilePath,
        // 重置 TaroCanvasDrawer 状态
        canvasStatus: false,
        config: null
      })
    } else {
      // 重置 TaroCanvasDrawer 状态
      this.setState({
        canvasStatus: false,
        config: null
      })
      Taro.showToast({ icon: 'none', title: errMsg || '出现错误' });
      console.log(errMsg);
    }
  }

```

### onCreateFail（绘制失败）

```javascript
// 绘制失败回调函数 （必须实现）=> 接收绘制错误信息、重置 TaroCanvasDrawer 状态
  onCreateFail = (error) => {
    Taro.hideLoading();
    // 重置 TaroCanvasDrawer 状态
    this.setState({
      canvasStatus: false,
      config: null
    })
    console.log(error);
  }
```

### 参数注意事项
#### text 
1. 每个元素的 zIndex 属性决定在图层中的高度，其中 text 属性为数组时，继承父元素的 zIndex
2. text 为数组时，多段文字的位置基于父元素坐标和自身 margin 进行计算
3. text 为数组时，多段文字超出宽度暂无处理，不建议绘制多段文字超出

#### Block 
1. 支持圆角、边框、背景色的矩形
2. 块内文字暂不支持多段，多段文字请使用 texts 定位到该块内

## Demo 

以下是示例海报的详细代码，也可以clone仓库，去 src/pages/demo 具体实现。 


<details><summary>例子代码（点击展开）</summary><br>

```tsx
import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { Canvas } from '@tarojs/components'
import { Image, DrawConfig } from './types'
import { drawImage, drawText, drawBlock, drawLine } from './utils/draw'
import { toPx, toRpx, getRandomId, getImageInfo, getLinearColor } from './utils/tools'

// 引入css
import '../../TaroCanvas.css'

export interface CanvasDrawerProps {
  config?: DrawConfig
  showLoading?: boolean
  onCreateSuccess?: (result: any) => void
  onCreateFail?: (result: any) => void
}

let count = 1
const canvasId = getRandomId() // 唯一id

const CanvasDrawer: React.FC<CanvasDrawerProps> = ({
    config,
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
    debug = false,
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
    <Canvas
      type='2d'
      id={canvasId}
      style={`width:${width}px; height:${height}px;`}
      className={`${debug ? 'debug' : 'pro'} taro_canvas`}
    />
  )
}

export default CanvasDrawer
```

样式文件
```less
.posterPreview {
  width: 100%;
  height: 100vh;
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 IOS<11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 IOS>11.2 */
  background: rgba(248, 248, 248, 1);
  padding-bottom: 350px;

  .posterImg{
    width: 690px;
    margin: 50px 30px;
  }

  // 底部按钮
  .btnBox {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 500;
    box-sizing: border-box;
    width: 100%;
    padding: 27px 30px;
    padding-bottom: calc(27px + constant(safe-area-inset-bottom)); /* 兼容 IOS<11.2 */
    padding-bottom: calc(27px + env(safe-area-inset-bottom)); /* 兼容 IOS>11.2 */
    background: #fff;

    .saveBtn {
      line-height: 90px;
      width: 690px;
      height:90px;
      font-size: 30px;
      color: #fff;
      background: linear-gradient(213deg, #5495FF 0%, #2F5CF5 100%);
    }

    .btnWrap {
      display: flex;
      justify-content: space-around;
      width: 690px;
      margin: 0 auto;
      margin-bottom: 20px;

      .bgItem {
        position: relative;
        width: 66px;
        height: 66px;
        border-radius: 33px;

        .selected {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }
      }
    }
  }

  .itemBlue {
    background: linear-gradient(136deg, #8454ff 0%, #005fff 100%);
  }

  .itemGreen {
    background: linear-gradient(180deg, rgba(180, 236, 81, 1) 0%, rgba(66, 147, 33, 1) 100%);
  }

  .itemPurple {
    background: linear-gradient(135deg, rgba(48, 35, 174, 1) 0%, rgba(200, 109, 215, 1) 100%);
  }

  .itemRed {
    background: linear-gradient(0deg, #f7a21c 0%, #ff023f 100%);
  }

  .tempCanvas {
    position: absolute;
    top: -10000px;
    left: 0;
    width: 750px;
    height: 1000px;
  }
}

```
</details>

### 问题反馈

有什么问题可以直接提issue

[提issue](https://github.com/jianhao/taro-canvas/issues/new)


### 参考
- [taro-plugin-canvas](https://github.com/chuyun/taro-plugin-canvas)
- [wxa-plugin-canvas](https://github.com/jasondu/wxa-plugin-canvas)
- [轻松生成小程序分享海报](https://juejin.cn/post/6844903663840788493)
