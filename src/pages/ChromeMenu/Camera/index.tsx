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

      const CompatibleURL = window.URL || window.webkitURL

      // 打开摄像头
      /**
       *  引入 @types/webrtc
       * https://stackoverflow.com/questions/13641692/how-to-use-getusermedia-from-typescript/35185230
       *
       * https://gist.github.com/keshihoriuchi/40ff3217a7a63d25788ce5cb8230ba3b  !.下面的eslint 建议使用?.但是仍然会有错误
       */
      navigator.getUserMedia(
        params,
        stream => {
          // videoRef.current?.src = CompatibleURL.createObjectURL(stream)

          // 将画面映射到画布上
          videoRef.current!.srcObject = stream
          videoRef.current!.onloadedmetadata = function (e) {
            videoRef.current?.play()
          }
        },
        err => {
          console.log(err)
        }
      )
    })()
  }, [])

  return (
    <div className="showContent">
      <canvas id="xy-camera"></canvas>
      <video id="xy-camera" ref={videoRef}></video>
    </div>
  )
}
