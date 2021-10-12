# taro-canvas
小程序组件-小程序海报组件
   [![npm](https://img.shields.io/npm/v/taro-canvas.svg?style=flat "npm")](https://www.npmjs.com/package/taro-canvas)[![npm](https://img.shields.io/npm/dm/taro-canvas.svg?style=flat "npm")](https://www.npmjs.com/package/taro-canvas)

## 概述
taro-canvas 是基于 Taro3 的微信小程序 canvas 绘图组件，封装了常用的操作, 通过配置的方式绘制海报。


## 生成效果
<img width="300" height="530" src="http://pic.jianhunxia.com/imgs/20210918103108poster1.png"></img> 
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
import { TaroCanvas } from 'taro-canvas';

// 在 render 方法中调用
<TaroCanvas
  config={this.state.config}
  onCreateSuccess={this.onCreateSuccess}
  onCreateFail={this.onCreateFail}
/>
// 注意点 
// config 绘图配置信息 - 必填项
// onCreateSuccess 绘图成功回调 - 必须实现 => 接收绘制结果、重置 TaroCanvas 状态
// onCreateFail 绘图失败回调 - 必须实现 => 接收绘制错误信息、重置 TaroCanvas 状态
```


### 方式二： 下载代码

直接通过 git 下载 taro-canvas 源代码，并将`src/component/TaroCanvas`目录拷贝到自己的项目的 `src/component`目录中

#### 使用组件

```javascript
// 引入代码 *引入方式和上面的方式一略有不同
import TaroCanvas from '../../component/TaroCanvas';

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
// 绘制成功回调函数 （必须实现）=> 接收绘制结果、重置 TaroCanvas 状态
  onCreateSuccess = (result) => {
    const { tempFilePath, errMsg } = result;
    Taro.hideLoading();
    if (errMsg === 'canvasToTempFilePath:ok') {
      this.setState({
        shareImage: tempFilePath,
        // 重置 TaroCanvas 状态
        canvasStatus: false,
        config: null
      })
    } else {
      // 重置 TaroCanvas 状态
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
// 绘制失败回调函数 （必须实现）=> 接收绘制错误信息、重置 TaroCanvas 状态
  onCreateFail = (error) => {
    Taro.hideLoading();
    // 重置 TaroCanvas 状态
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

<summary>例子代码（点击展开）</summary><br>
<details>

```tsx
import { useState, useCallback, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button, Canvas } from '@tarojs/components'
import classnames from 'classnames'
import cloneDeep from 'lodash/clonedeep'
import selectedImg from '@/assets/selected.png'
import { saveImgAlbum, queryAuth } from '@/utils/nativeApi'
import TaroCanvas from '@/components/TaroCanvas'
import { DrawConfig } from '@/components/TaroCanvas/types'
import styles from './index.module.less'

// 默认海报配置
const defaultConfig = {
  width: 750,
  height: 1334,
  backgroundColor: '#eee',
  debug: false,
  blocks: [
    // 底部白色
    {
      x: 30,
      y: 30,
      width: 690,
      height: 1274,
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: '#fff',
      zIndex: 10,
    },
    { // 公司框框
      x: 60,
      y: 855,
      width: 630,
      height: 212,
      paddingLeft: 0,
      paddingRight: 0,
      borderWidth: 2,
      opacity: 0.3,
      borderColor: 'green',
      backgroundColor: '#fff',
      zIndex: 30,
      borderRadius: 10,
    },
    // 头图渐变遮罩
    {
      x: 30,
      y: 432,
      width: 690,
      height: 98,
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%)',
      zIndex: 30,
    },
    // 外渐变边框
    {
      x: 30,
      y: 30,
      width: 690,
      height: 107,
      paddingLeft: 0,
      paddingRight: 0,
      textShadow: '0px 2px 0px rgba(0, 0, 0, 0.5)',
      backgroundColor: 'background: linear-gradient(180deg, rgba(0, 0, 0, 0.66) 0%, rgba(0, 0, 0, 0) 100%)',
      zIndex: 30,
    },
    // 个人二维码边框
    {
      x: 157,
      y: 1124,
      width: 126,
      height: 126,
      paddingLeft: 0,
      paddingRight: 0,
      borderWidth: 2,
      opacity: 1,
      borderColor: '#4069F6',
      backgroundColor: '#fff',
      zIndex: 30,
    },
  ],
  texts: [
    {
      x: 97,
      y: 62,
      text: '',
      fontSize: 24,
      color: '#fff',
      lineHeight: 33,
      lineNum: 1,
      width: 500,
      zIndex: 50,
    },
    {
      x: 65,
      y: 547,
      text: '剑豪向你推荐好车',
      color: '#1E63ED',
      fontSize: 32,
      lineHeight: 45,
      zIndex: 50,
    },
    {
      x: 65,
      y: 615,
      text: '玛莎拉蒂 2019款 40 TFSI 时尚版',
      width: 630,
      lineNum: 2, // 最多几行
      fontSize: 48,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.9)',
      lineHeight: 67,
      zIndex: 50,
    },
    {
      x: 65,
      y: 758,
      zIndex: 100,
      text: [
        {
          text: '275.23',
          fontSize: 54,
          fontWeight: 'bold',
          color: 'red',
          lineNum: 1,
          zIndex: 1000,
        },
        {
          marginLeft: 10,
          marginRight: 30,
          marginTop: 20,
          text: '万元',
          width: 200,
          fontSize: 28,
          fontWeight: 'bold',
          color: '#FF2322',
          lineNum: 1,
          zIndex: 50,
        },
        {
          marginTop: 20,
          text: '指导价 8.98 万',
          fontSize: 28,
          color: 'rgba(0, 0, 0, 0.6)',
          lineNum: 1,
          zIndex: 50,
        },
      ],
    },
    {
      x: 95,
      y: 889,
      marginLeft: 35,
      text: '珍珠白/棕色/米黄色 中规车',
      fontSize: 26,
      width: 386,
      color: 'rgba(0, 0, 0, 0.6)',
      zIndex: 50,
    },
    {
      x: 95,
      y: 943,
      text: '我是一段没有感情的备注说明备注说明备注说明备注说明备注说明备注说明备注说明备注说明',
      lineNum: 3,
      // width: 386,
      width: 547,
      lineHeight: 37,
      fontSize: 26,
      color: 'rgba(0, 0, 0, 0.6)',
      zIndex: 50,
    },
    {
      x: 348,
      y: 1131,
      text: '购买请联系 剑豪',
      fontSize: 24,
      color: '#1E63ED',
      lineHeight: 33,
      lineNum: 1,
      zIndex: 50,
    },
    {
      x: 348,
      y: 1164,
      text: '扫描左侧二维码添加微信',
      fontSize: 24,
      color: '#1E63ED',
      lineHeight: 33,
      lineNum: 1,
      zIndex: 50,
    },
    {
      x: 348,
      y: 1207,
      text: '13566661111',
      fontSize: 36,
      fontWeight: 'bold',
      color: '#4069F6',
      lineHeight: 49,
      lineNum: 1,
      zIndex: 50,
    },
  ],
  images: [
    { // 车辆头图
      x: 30,
      y: 30,
      width: 690,
      height: 500,
      url: 'http://img.jianhunxia.com/imgs/ChMkJ1gi9H-IcjFjAAYz8EtaA9IAAXm5gOMcEUABjQI228.jpg',
      zIndex: 20,
    },
    // 个人二维码
    {
      x: 163,
      y: 1130,
      width: 114,
      height: 114,
      url: 'http://pic.jianhunxia.com/imgs/20210909154455.jpeg',
      zIndex: 50,
    },
    // 圆角头像
    {
      x: 538,
      y: 1128,
      width: 26,
      height: 26,
      borderColor: "red",
      borderWidth: 1,
      borderRadius: 13,
      url: 'https://pic.jianhunxia.com/blog/jianhao-avatar.jpg',
      zIndex: 50,
    },
  ],
}

const COLOR_TYPES = [
  { id: 1, type: 'Blue', color: 'linear-gradient(116deg, #8454FF 0%, #005FFF 100%)' },
  { id: 2, type: 'Green', color: 'linear-gradient(180deg, rgba(180, 236, 81, 1) 0%, rgba(66, 147, 33, 1) 100%)' },
  { id: 3, type: 'Purple', color: 'linear-gradient(135deg, rgba(48, 35, 174, 1) 0%, rgba(200, 109, 215, 1) 100%)' },
  { id: 4, type: 'Red', color: 'linear-gradient(0deg, #F7A21C 0%, #FF023F 100%)' },
]

function Index () {
  const [crawLoading, setCrawLoading] = useState(false) // 绘制中
  const [canvasStatus, setCanvasStatus] = useState(false) // 展示 canvas 组件
  const [config, setConfig] = useState<DrawConfig>(defaultConfig) // 海报配置参数
  const [currentColor, setCurrentColor] = useState(COLOR_TYPES[0]) // 背景色选项
  const [tempImgs, setTempImgs] = useState<any>([]) // 海报配置参数

  // 改变背景
  const changeBg = async item => {
    setCurrentColor(item)
  }

  // 测量文本宽度
  const getTextWidth = textData => new Promise(resolve => {
    setTimeout(() => { // 不延时可能会
      const { text, fontWeight, fontSize, fontFamily } = textData || {}
      const pageInstance = Taro.getCurrentInstance()?.page || {} // 拿到当前页面实例
      const query = Taro.createSelectorQuery().in(pageInstance)
      query.select('#tempCanvas').fields({ node: true, size: true, context: true }, res => {
        const canvas = res.node
        const ctx = canvas.getContext('2d')
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
        const { width } = ctx.measureText(text)
        resolve(width)
      }).exec()
    }, 300);
  })

  useEffect(() => {
    beginDraw()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 调用绘画 显示 canvas 组件、同时设置 config
  const beginDraw = async () => {
    if (crawLoading) return
    setCrawLoading(true)
    setTempImgs([]) // 先清空一波图片缓存
    const newConfig = cloneDeep(defaultConfig)
    newConfig.backgroundColor = currentColor.color

    setCanvasStatus(true)
    setConfig(newConfig)
    Taro.showLoading({
      title: '绘制中...',
    })
  }

  // 绘制后保存图片
  const saveImg = useCallback(async () => {
    setCrawLoading(false)
    return // 需要保存到本地就去除这行代码
    const hasAuth = await queryAuth('scope.writePhotosAlbum')
    console.log('有没有权限保存图片', hasAuth);
    if (hasAuth) {
      console.log('缓存图片', tempImgs)
      const taskList = tempImgs.map((url, index) => saveImgAlbum(url, index + 1)) // 添加保存图片的任务
      await Promise.all(taskList)
      Taro.showToast({ icon: 'none', title: '海报已保存到本地' })
    } else { // 如果拒绝授权相册, 引导用户去授权
      Taro.showToast({ icon: 'none', title: '请授权小程序获取相册权限' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempImgs])

  useEffect(() => {
    if (tempImgs?.length > 0) {
      saveImg()
    }
  }, [saveImg, tempImgs])

  // 绘制失败
  const onCreateFail = err => {
    Taro.hideLoading()
    setCrawLoading(false)
    Taro.showToast({ icon: 'none', title: err || '绘制出现错误' })
  }

  // 海报绘制成功
  const onCreateSuccess = (result) => {
    console.log('绘制好了', result);
    const { tempFilePath, errMsg } = result
    let msg = '绘制失败'
    setCanvasStatus(false) // 想查看调试就先不要隐藏
    msg = '海报绘制出现错误'
    if (errMsg === 'canvasToTempFilePath:ok') {
      setTempImgs([...tempImgs, tempFilePath])
    } else {
      onCreateFail(msg)
    }
  }

  return (
    <View className={styles.posterPreview}>
      <Image
        src={tempImgs[0]}
        className={styles.posterImg}
        mode='widthFix'
      />
      {/* 底部按钮 */}
      <View className={styles.btnBox}>
        <View className={styles.btnWrap}>
          {
            COLOR_TYPES.map(item => (
              <View
                key={item.id}
                className={classnames(styles.bgItem, styles[`item${item.type}`])}
                onClick={() => changeBg(item)}
              >
                {(item.id === currentColor.id) && (
                  <Image src={selectedImg} className={styles.selected} />
                )}
              </View>
            ))
          }
        </View>
        <Button className={styles.saveBtn} onClick={beginDraw}>绘制海报</Button>
      </View>

      { // 由于小程序限制，目前组件通过状态的方式来动态加载
        canvasStatus && (
          <TaroCanvas
            config={config} // 绘制配置
            onCreateSuccess={onCreateSuccess} // 绘制成功回调
            onCreateFail={onCreateFail} // 绘制失败回调
          />
        )
      }

      {/* 用于计算文字宽度的canvas */}
      <Canvas
        type='2d'
        id='tempCanvas'
        className={styles.tempCanvas}
      />
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '绘制海报',
}

export default Index
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
