import { Fragment } from 'react'

const URL_PATTERN = /(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+)/g
const TRAILING_PUNCTUATION = /[.,;:!?)\]}'"]+$/

interface LinkifiedTextProps {
  text: string
}

/** 본문 텍스트에서 URL을 감지해 새 탭으로 열리는 링크로 렌더링 */
export default function LinkifiedText({ text }: LinkifiedTextProps) {
  const segments = text.split(URL_PATTERN)

  return (
    <>
      {segments.map((segment, index) => {
        const isUrl = index % 2 === 1
        if (!isUrl) return <Fragment key={index}>{segment}</Fragment>

        const trailing = segment.match(TRAILING_PUNCTUATION)?.[0] ?? ''
        const url = trailing ? segment.slice(0, -trailing.length) : segment
        const href = url.startsWith('www.') ? `https://${url}` : url

        return (
          <Fragment key={index}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
            {trailing}
          </Fragment>
        )
      })}
    </>
  )
}
