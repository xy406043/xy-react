import { copyText } from '@/utils/util'
import exp from 'constants'

export interface TextTableShow {
  text: string
}

const textShow = ({ text }: TextTableShow) => {
  return (
    <div className="cursor-pointer" onClick={() => copyText(text)}>
      {text}
    </div>
  )
}

export default textShow
