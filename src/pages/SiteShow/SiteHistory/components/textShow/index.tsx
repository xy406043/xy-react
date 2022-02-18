import { commonUtil } from '@/utils'
import exp from 'constants'

export interface TextTableShow {
  text: string
}

const textShow = ({ text }: TextTableShow) => {
  return (
    <div className="cursor-pointer" onClick={() => commonUtil.copyText(text)}>
      {text}
    </div>
  )
}

export default textShow
