import React, { useState, useEffect, useRef, CSSProperties } from 'react'
import './cameraScripts.scss'

/**
 * 简单展示摄像头并展示
 */
export default function XyCameraShow() {
  const [videoStyle, setVideoStyle] = useState({ top: 0, left: 0 })
  const [position, setPosition] = useState({
    startX: 0,
    startY: 0
  })
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    createCamera()
  }, [])

  /**
   * 创建摄像头
   */
  async function createCamera() {
    const params: MediaStreamConstraints = {
      audio: false,
      video: {
        width: 300,
        height: 300
      }
    }
    // 打开摄像头
    /**
     *  引入 @types/webrtc
     * https://stackoverflow.com/questions/13641692/how-to-use-getusermedia-from-typescript/35185230
     * https://gist.github.com/keshihoriuchi/40ff3217a7a63d25788ce5cb8230ba3b  !.下面的eslint 建议使用?.但是仍然会有错误
     * const CompatibleURL = window.URL || window.webkitURL
     * videoRef.current?.src = CompatibleURL.createObjectURL(stream)
     */
    const CameraAction = navigator.mediaDevices.getUserMedia
    const stream = await CameraAction(params)
    // 将画面映射到画布上
    videoRef.current!.srcObject = stream
    videoRef.current!.onloadedmetadata = function (e) {
      videoRef.current?.play()
    }
  }

  /**
   * 拖动属性时更新节点位置
   */
  const handleMoveStart = (evt: React.MouseEvent<HTMLVideoElement>) => {
    evt.preventDefault()
    setPosition({
      startX: evt.clientX,
      startY: evt.clientY
    })
    const { top, left } = videoStyle

    document.onmousemove = (evt: MouseEvent) => {
      evt.preventDefault()
      setVideoStyle({
        left: left + evt.clientX - position.startX,
        top: top + evt.clientY - position.startY
      })
    }
  }
  const handleMoveEnd = (evt: React.MouseEvent<HTMLVideoElement>) => {
    evt.preventDefault()

    document.onmousemove = null
  }

  return (
    <div>
      <canvas id="xy-canvas"></canvas>
      <video
        id="xy-video"
        className="xy-video"
        style={videoStyle}
        ref={videoRef}
        onMouseDown={handleMoveStart}
        onMouseUp={handleMoveEnd}
      ></video>
    </div>
  )
}
