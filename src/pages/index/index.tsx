/* eslint-disable react/no-multi-comp */
import { useState, useCallback, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button, Canvas } from '@tarojs/components'
import classnames from 'classnames'
import cloneDeep from 'lodash/clonedeep'
import TaroCanvas from '@/components/TaroCanvas'
import selectedImg from '@/assets/selected.png'
import { saveImgAlbum, queryAuth } from '@/utils/nativeApi'
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
      borderWidth: 1,
      opacity: 0.3,
      borderColor: '#1E63ED',
      backgroundColor: '#fff',
      zIndex: 30,
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
      height: 33,
      lineNum: 1,
      textAlign: 'left',
      width: 500,
      zIndex: 50,
    },
    {
      x: 65,
      y: 547,
      text: '李先生向你推荐好车',
      color: '#1E63ED',
      fontSize: 32,
      lineHeight: 45,
      textAlign: 'left',
      display: 'block',
      zIndex: 50,
    },
    {
      x: 65,
      y: 615,
      text: '奥迪A4L 2019款 40 TFSI 时尚版',
      width: 630,
      height: 134,
      lineNum: 2, // 最多几行
      fontSize: 48,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.9)',
      lineHeight: 67,
      textAlign: 'left',
      display: 'block',
      zIndex: 50,
    },
    {
      x: 65,
      y: 758,
      text: '25.23',
      fontSize: 54,
      fontWeight: 'bold',
      color: '#FF2322',
      lineHeight: 75,
      height: 33,
      lineNum: 1,
      textAlign: 'left',
      zIndex: 50,
    },
    {
      x: 240,
      y: 780,
      text: '万元',
      fontSize: 28,
      fontWeight: 'bold',
      color: '#FF2322',
      lineHeight: 75,
      height: 75,
      lineNum: 1,
      textAlign: 'left',
      zIndex: 50,
    },
    {
      x: 328,
      y: 780,
      text: '指导价 8.98 万',
      fontSize: 28,
      color: 'rgba(0, 0, 0, 0.6)',
      lineHeight: 40,
      height: 40,
      lineNum: 1,
      textAlign: 'left',
      zIndex: 50,
    },
    {
      x: 95,
      y: 889,
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
      height: 74,
      lineHeight: 37,
      fontSize: 26,
      color: 'rgba(0, 0, 0, 0.6)',
      zIndex: 50,
    },
    // 长按查看详情 暂时隐藏了
    {
      x: 540,
      y: 1024,
      text: '',
      fontSize: 20,
      color: 'rgba(0, 0, 0, 0.3)',
      lineHeight: 28,
      height: 28,
      lineNum: 1,
      textAlign: 'left',
      zIndex: 50,
    },
    {
      x: 307,
      y: 1131,
      text: '购买请联系 李先生',
      fontSize: 24,
      color: '#1E63ED',
      lineHeight: 33,
      height: 33,
      lineNum: 1,
      textAlign: 'left',
      zIndex: 50,
    },
    {
      x: 307,
      y: 1164,
      text: '扫描左侧二维码添加微信',
      fontSize: 24,
      color: '#1E63ED',
      lineHeight: 33,
      height: 33,
      lineNum: 1,
      textAlign: 'left',
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
      height: 49,
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
      url: 'https://img.maihaoche.com/raboot/assets/demoCar.png',
      zIndex: 20,
    },
    {
      x: 65,
      y: 63,
      width: 24,
      height: 24,
      // url: locationIcon,
      url: '',
      zIndex: 50,
    },
    // 页面二维码
    {
      x: 533,
      y: 880,
      width: 134,
      height: 134,
      // url: 'https://img.maihaoche.com/raboot/grrX2UAPp3oP293516a52a92e10aca5984b2488389c4.jpeg',
      zIndex: 50,
    },
    // 个人二维码
    {
      x: 163,
      y: 1130,
      width: 114,
      height: 114,
      // url: 'https://img.maihaoche.com/raboot/grrX2UAPp3oP293516a52a92e10aca5984b2488389c4.jpeg',
      zIndex: 50,
    },
  ],
  lines: [
    // 备注和小程序码分割线， 暂时不要了
    {
      startX: 502,
      startY: 880,
      endX: 502,
      endY: 1040,
      width: 0,
      color: '#E9E9E9',
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
  const [config, setConfig] = useState({}) // 海报配置参数
  const [currentColor, setCurrentColor] = useState(COLOR_TYPES[0]) // 背景色选项
  const [tempImgs, setTempImgs] = useState<any>([]) // 海报配置参数

  // 改变背景
  const changeBg = async item => {
    setCurrentColor(item)
  }

  // 测量文本宽度
  const getTextWidth = textData => new Promise(resolve => {
    const { text, fontWeight, fontSize, fontFamily } = textData || {}
    const query = Taro.createSelectorQuery()
    query.select('#tempCanvas').fields({ node: true, size: true }).exec(res => {
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
      const { width } = ctx.measureText(text)
      resolve(width)
    })
  })

  // 调用绘画 显示 canvas 组件、同时设置 config
  const canvasDraw = async () => {
    if (crawLoading) return
    setCrawLoading(true)
    setTempImgs([]) // 先清空一波图片缓存
    const newConfig = cloneDeep(defaultConfig)

    setCanvasStatus(true)
    setConfig(newConfig)
    Taro.showLoading({
      title: '绘制中...',
    })
  }

  // 绘制后保存图片
  const saveImg = useCallback(async () => {
    Taro.hideLoading()
    setCrawLoading(false)
    const hasAuth = await queryAuth('scope.writePhotosAlbum')
    if (hasAuth) {
      console.log('缓存图片', tempImgs)
      const taskList = tempImgs.map((url, index) => saveImgAlbum(url, index + 1)) // 添加保存图片的任务
      await Promise.all(taskList)
      setTempImgs([]) // 清空图片缓存
      Taro.showToast({ icon: 'none', title: '海报和车辆二维码已保存到手机' })
    } else { // 如果拒绝授权相册, 引导用户去授权
      Taro.showToast({ icon: 'none', title: '请授权小程序获取相册权限' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempImgs])

  useEffect(() => {
    if (tempImgs.length > 1) {
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
    const { tempFilePath, errMsg } = result
    let msg = '绘制失败'

    setCanvasStatus(false)
    setConfig({})
    msg = '海报绘制出现错误'
    if (errMsg === 'canvasToTempFilePath:ok') {
      setTempImgs([...tempImgs, tempFilePath])
    } else {
      onCreateFail(msg)
    }
  }

  return (
    <View className={styles.posterPreview}>
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
        <Button className={styles.saveBtn} onClick={canvasDraw}>保存图片</Button>
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
  navigationBarTitleText: '海报推广',
}

export default Index
