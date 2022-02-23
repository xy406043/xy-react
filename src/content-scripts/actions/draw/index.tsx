import SimpleRender from './draw'
import ReactDOM from 'react-dom'

const InjectShow = () => {
  const panel = document.createElement('div')
  panel.id = 'xy-draw'
  panel.className = 'xy-draw'

  document.body.append(panel)
  ReactDOM.render(<SimpleRender />, panel)
}

export default InjectShow
