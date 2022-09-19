import { useState, useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import { nanoid } from 'nanoid'
import './draw.scss'

const SimpleRender = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cid = nanoid()
    canvasRef.current!.id = cid

    const canvas: fabric.Canvas = new fabric.Canvas(cid)
    canvas.setWidth(300)
    canvas.setHeight(300)

    const text = '家人们你好哇,家人们你好哇,家人们你好哇,家人们你好哇,家人们你好哇'
    const textConfig: fabric.ITextboxOptions = {
      fontSize: 36,
      originY: 'center', // 垂直居中
      originX: 'center', // 基于外框水平居中
      textAlign: 'center', // 文字块水平居中
      left: 0,
      top: 0,
      width: 300,
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

  const showContent = () => {
    console.log('输出编译内容')
  }

  return (
    <div className="xy-draw-panel">
      <canvas id="xy-canvas" ref={canvasRef} />
      <div className="xy-sss w-100px h-30px">
        <button className="mr-10px" type="button" onClick={() => showContent()}>
          {' '}
          确定点击 内容
        </button>
      </div>
    </div>
  )
}

export default SimpleRender
