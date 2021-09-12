# taro-canvas
基于 Taro3 的微信小程序 canvas 绘图组件，封装了常用的操作,通过配置的方式绘制海报

## 使用技巧
### text 
1. 每个元素的 zIndex 属性决定在图层中的高度，其中 text 属性为数组时，继承父元素的 zIndex
2. text 为数组时，多段文字的位置基于父元素坐标和自身 margin 进行计算
3. text 为数组时，多段文字超出宽度暂无处理，不建议绘制多段文字超出

### Block 
1. 支持圆角、边框、背景色的矩形
2. 块内文字暂不支持多段，多段文字请使用 texts 定位到该块内


### 参考
- https://github.com/chuyun/taro-plugin-canvas

