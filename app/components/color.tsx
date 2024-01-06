import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BlockPicker, ColorResult } from 'react-color'
import ColorLensIcon from '@mui/icons-material/ColorLens'
interface ColorPicProps {
  expanded?: boolean
  onExpandEvent?: () => void
  onChange?: (type: string, color: string) => void
  currentState?: {
    color: string
  }
}

const ColorPic: React.FC<ColorPicProps> = ({ onChange, currentState }) => {
  const [expanded, setExpanded] = useState(false)
  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  const handleChange = (color: ColorResult) => {
    if (onChange) {
      onChange('color', color.hex)
    }
  }

  const renderModal = () => {
    const { color } = currentState || { color: '' }
    return (
      <div
        onClick={stopPropagation}
        style={{
          position: 'absolute',
          top: '40%',
          left: '84%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          background: '#fff',
          zIndex: 1000,
        }}
      >
        <BlockPicker color={color} onChangeComplete={handleChange} />
      </div>
    )
  }
  const onExpandEvent = (e: any) => {
    e.preventDefault()
    setExpanded(!expanded)
  }

  return (
    <div>
      <button
        onClick={onExpandEvent}
        style={{
          display: 'relative',
          border: '1px solid #F1F1F1',
          borderRadius: '2px',
          margin: '0 4px',
          height: '20px',
          minWidth: '25px',
        }}
      >
        <ColorLensIcon sx={{ width: '100%', height: '100%' }} />
      </button>
      {expanded ? renderModal() : undefined}
    </div>
  )
}

ColorPic.propTypes = {
  onChange: PropTypes.func,
  currentState: PropTypes.shape({
    color: PropTypes.string,
  }),
}

export default ColorPic
