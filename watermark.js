const canvasWM = ({
  container = document.body,
  width = '200px',
  height = '80px',
  textAlign = 'center',
  textBaseline = 'middle',
  font = '14px microsoft yahei',
  fillStyle = 'rgba(0, 0, 0, 0.1)',
  content = '请勿外传',
  rotate = '30',
  zIndex = 500
} = {}) => {
  const canvas = document.createElement('canvas')

  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  const ctx = canvas.getContext('2d')

  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.rotate(Math.PI / 180 * rotate)
  ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 10)

  const base64Url = canvas.toDataURL()
  const watermarkDiv = document.createElement('div')
  watermarkDiv.setAttribute('style', `
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:${zIndex};
        pointer-events:none;
        background-repeat:repeat;
        background-image:url('${base64Url}')`)

  container.style.position = 'relative'
  container.insertBefore(watermarkDiv, container.firstChild)
}

const genWaterMark = (container, text) => {
  if (!container || !text) {
    return
  }
  canvasWM({
    container: container,
    content: text
  })
}

export default genWaterMark
