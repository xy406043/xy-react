import { useState, useEffect } from 'react'
import './App.css'
import './App.scss'
import 'antd/dist/antd.css'

function App() {
  console.log('关于在应用内部使用chrome Api', chrome)

  const [count, setCount] = useState(0)
  const [tabList, setTab] = useState([
    {
      key: 'title',
      title: '标题',
      content: ['默认标题']
    },
    {
      key: 'description',
      title: '描述',
      content: ['默认描述']
    },
    {
      key: 'keywords',
      title: '关键词',
      content: ['React']
    }
  ])

  useEffect(() => {
    console.log('数据更新了', count)
  })

  return (
    <div className="App">
      <header className="App-header xy-none-text">
        <div className="mb-10px">Hello Vite + React!</div>
        <p>
          <button type="button" onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
      <main>
        {tabList.map((item, index) => {
          return (
            <div className="come-item" key={index}>
              <div className="xy-title">{item.title}</div>
              <div className="xy-content">内容</div>
            </div>
          )
        })}
      </main>
    </div>
  )
}

export default App
