import { Component } from 'react'
import './app.less'

class App extends Component {

  componentDidMount () {
    console.log(process.env.NODE_ENV);
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
