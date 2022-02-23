import ReactDOM from 'react-dom'
import { useState, useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import { nanoid } from 'nanoid'

const InjectShow = () => {
  const panel = document.createElement('div')
  panel.id = 'xy-draw'

  const SimpleRender = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const cid = nanoid()
      canvasRef.current!.id = cid

      const canvas: fabric.Canvas = new fabric.Canvas(cid)
      canvas.setWidth(300)
      canvas.setHeight(300)

      const text = '家人们你好哇'
      const textConfig: fabric.ITextboxOptions = {
        fontSize: 36,
        originY: 'center', // 垂直居中
        originX: 'center', // 基于外框水平居中
        textAlign: 'center', // 文字块水平居中
        left: 520,
        top: 154,
        width: 30,
        fill: 'green',
        strokeWidth: 1,
        stroke: '#9ec8da',
        shadow: '#66a8a8 -1px -1px 1px',
        // shadow: {
        //   // blur: 2,
        //   color: '#66a8a8',
        //   offsetX: 1,
        //   offsetY: 1,
        // },
        fontWeight: 'bolder',
        splitByGrapheme: true
      }
      const textSet = new fabric.Textbox(text, textConfig)
      canvas.add(textSet)
    }, [])

    return (
      <div className="xy-draw-panel">
        <canvas id="xy-canvas" ref={canvasRef} />
      </div>
    )
  }

  document.body.append(panel)
  ReactDOM.render(<SimpleRender />, panel)
}

export default InjectShow
