import parse from 'html-react-parser'

const covertToHtmlWithAnimation = (content: string | undefined) => {
  if (!content) {
    return null
  }

  let delayCounter = 1

  const parserOptions = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag' && !domNode.parent) {
        const dynamicDelayClass = `animate fadeIn-${delayCounter}`
        delayCounter += 1

        domNode.attribs = {
          ...domNode.attribs,
          className: `${dynamicDelayClass}`.trim(),
        }
      }
      return undefined
    },
  }

  return (
    <div className="ql-editor tracking-wider !overflow-y-hidden">
      {parse(content, parserOptions)}
    </div>
  )
}

export default covertToHtmlWithAnimation
