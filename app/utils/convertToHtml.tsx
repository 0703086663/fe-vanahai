import React from 'react'

interface ElementWithStyles extends HTMLElement {
  style: CSSStyleDeclaration
}

const convertToHtml = (html: string): React.ReactNode => {
  const parseHTML = (htmlString: string): Node[] => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html')
    return Array.from(doc.body.childNodes)
  }

  const convertToCamelCase = (str: string): string => {
    return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
  }

  let fadeInCount = 1

  const renderContent = (node: Node, index: number): React.ReactNode => {
    if (node.nodeType === 1) {
      const element = node as ElementWithStyles
      const tagName = element.tagName.toLowerCase()

      const fadeInClass = tagName === 'p' ? `animate fadeIn-${fadeInCount}` : ''

      if (tagName === 'p') {
        fadeInCount++
      }

      const children = Array.from(element.childNodes).map((child, childIndex) =>
        renderContent(child, childIndex)
      )

      const inlineStyles = element.getAttribute('style')
      const style: React.CSSProperties = inlineStyles
        ? inlineStyles.split(';').reduce((styles, style) => {
            const [property, value] = style.split(':')
            if (property && value) {
              const camelCaseProperty = convertToCamelCase(property.trim())
              ;(styles as any)[camelCaseProperty] = value.trim()
            }
            return styles
          }, {} as React.CSSProperties)
        : {}

      return React.createElement(
        tagName,
        { key: index, className: fadeInClass, style },
        children
      )
    } else if (node.nodeType === 3 && node.nodeValue?.trim() !== '') {
      return (
        <span key={index} className={`fadeIn-${index}`}>
          {node.nodeValue}
        </span>
      )
    }
    return null
  }

  const contentNodes = parseHTML(html)
  return contentNodes.map((node, index) => renderContent(node, index))
}

export default convertToHtml
