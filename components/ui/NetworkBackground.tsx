"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const NetworkBackground: React.FC<{ className?: string }> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const canvasEl = canvas
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const ctx2d = ctx
        const setCanvasSize = () => {
            canvasEl.width = canvasEl.offsetWidth
            canvasEl.height = canvasEl.offsetHeight
        }

        setCanvasSize()

        const particleCount = 100
        const connectionDistance = 150
        let animationId: number

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number

            constructor() {
                this.x = Math.random() * canvasEl.width
                this.y = Math.random() * canvasEl.height
                this.size = Math.random() * 3 + 1
                this.speedX = Math.random() * 3 - 1.5
                this.speedY = Math.random() * 3 - 1.5
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > canvasEl.width) this.x = 0
                else if (this.x < 0) this.x = canvasEl.width

                if (this.y > canvasEl.height) this.y = 0
                else if (this.y < 0) this.y = canvasEl.height
            }

            draw(color: string) {
                ctx2d.fillStyle = color
                ctx2d.beginPath()
                ctx2d.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx2d.fill()
            }
        }

        const particles = Array.from({ length: particleCount }, () => new Particle())

        const animate = () => {
            ctx2d.clearRect(0, 0, canvasEl.width, canvasEl.height)

            const particleColor = "rgba(229, 231, 235, 0.85)"
            const lineColor = "229, 231, 235"

            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw(particleColor)

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx2d.strokeStyle = `rgba(${lineColor}, ${1 - distance / connectionDistance})`
                        ctx2d.lineWidth = 1
                        ctx2d.beginPath()
                        ctx2d.moveTo(particles[i].x, particles[i].y)
                        ctx2d.lineTo(particles[j].x, particles[j].y)
                        ctx2d.stroke()
                    }
                }
            }

            animationId = requestAnimationFrame(animate)
        }

        animate()

        window.addEventListener("resize", setCanvasSize)

        return () => {
            window.removeEventListener("resize", setCanvasSize)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <motion.div
            className={`absolute inset-0 ${className ?? ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <canvas ref={canvasRef} className="h-full w-full bg-black" />
        </motion.div>
    )
}

export default NetworkBackground
