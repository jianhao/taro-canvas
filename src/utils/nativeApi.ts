
import Taro from '@tarojs/taro'

type AuthSetting = 'scope.address' | 'scope.camera' | 'scope.invoice' | 'scope.invoiceTitle' | 'scope.record' | 'scope.userInfo' | 'scope.userLocation' | 'scope.werun' | 'scope.writePhotosAlbum'

/** 查询用户是否有授权
 *@params 授权scope 授权列表：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html#scope-%E5%88%97%E8%A1%A8
 *@returns 是否有授权
 */
 export const queryAuth = (scope: AuthSetting) => new Promise(resolve => {
  Taro.getSetting().then(res => {
    if (res.authSetting[scope]) { // 是否已经授权
      resolve(true)
    } else { // 没授权就去询问授权
      Taro.authorize({ scope }).then(() => { // 微信主动弹窗询问
        resolve(true)
      }).catch(e => {
        console.log('错误信息', e)
        resolve(false)
      })
    }
  }).catch(e => {
    Taro.showToast({
      title: e || '获取授权信息失败',
      icon: 'none',
    })
  })
})

// 调用小程序api保存图片到相册
const saveToAlbum = (filePath, index) => new Promise((resolve, reject) => {
  Taro.saveImageToPhotosAlbum({ filePath }).then(res => {
    if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
      resolve(true)
    } else {
      Taro.showToast({
        title: `第${index}图片保存失败，请重试`,
        icon: 'none',
      })
      reject(new Error('保存失败,请重试'))
    }
  }).catch(e => {
    reject(e)
  })
})

/** 保存图片到相册
 *@params 授权scope
 *@returns 是否有授权
 */
export const saveImgAlbum = (url, index = 1) => new Promise((resolve, reject) => {
  if (url.includes('http')) { // 网络图片必须先下载才能保存到相册
    Taro.downloadFile({
      url,
      success: (res) => {
        saveToAlbum(res.tempFilePath, index).then(() => resolve(true), e => reject(e))
      },
      fail: (err) => {
        reject(new Error('下载网络图片出现错误'))
        Taro.showToast({ icon: 'none', title: err.errMsg || '下载网络图片出现错误' })
      }
    })
  } else {
    saveToAlbum(url, index).then(() => resolve(true), e => reject(e))
  }
})
