import CameraRender from './Camera'
import ReactDOM from 'react-dom'

const InjectCameraShow = () => {
  const panel = document.createElement('div')
  panel.id = 'xy-react-menu-camera'
  panel.className = 'xy-camera-con'

  document.body.append(panel)
  ReactDOM.render(<CameraRender />, panel)
}

export default InjectCameraShow
