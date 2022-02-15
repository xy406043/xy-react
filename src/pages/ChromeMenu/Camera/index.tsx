import { useEffect, useRef, useLayoutEffect } from 'react'
import { nanoid } from 'nanoid'
import clonedeep from 'lodash.clonedeep'

/**
 *
 * @returns 展示相机
 */
export default function XyCameraShow() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // LIFE ；useEffect 不能使用异步
    ;(async () => {
      const params = {
        audio: false,
        video: {
          width: 300,
          height: 300
        }
      }
      // 创建
      const stream = await navigator.mediaDevices.getUserMedia(params)
      const CompatibleURL = window.URL || window.webkitURL
      console.log('videoRef', videoRef, stream)

      // try {
      //   // videoRef.src = CompatibleURL.createObjectURL(stream)
      // } catch (err) {
      //   videoRef.srcObject = stream
      // }

      videoRef.current?.play()
      // videoRef.onloadedmetadata = function (e) {
      //   videoRef.play()
      // }
    })()
  }, [])

  return (
    <div className="showContent">
      <canvas id="xy-camera"></canvas>
      <video id="xy-camera" ref={videoRef}></video>
    </div>
  )
}
