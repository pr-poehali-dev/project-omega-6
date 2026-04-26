import { useEffect, useRef } from "react"

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const fontSize = 14
    const chars = "01アイウエオカキクケコウイルスVIRUS<>{}[]ABCDEF".split("")
    let columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      columns = Math.floor(canvas.width / fontSize)
      while (drops.length < columns) drops.push(Math.random() * -100)

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]

        // Головной символ — ярко-белый
        const isHead = drops[i] * fontSize > 0 && drops[i] * fontSize < canvas.height
        if (isHead) {
          ctx.fillStyle = "#aaffaa"
          ctx.shadowColor = "#00ff41"
          ctx.shadowBlur = 8
        } else {
          // Тело — зелёный разной яркости
          const brightness = Math.random() > 0.05 ? "1" : "0.4"
          ctx.fillStyle = `rgba(0, 200, 60, ${brightness})`
          ctx.shadowBlur = 0
        }

        ctx.font = `${fontSize}px monospace`
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 40)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full"
      style={{ background: "#000" }}
    />
  )
}
