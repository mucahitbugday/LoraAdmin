'use client'
import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface LineChartProps {
    data: number[]
    labels: string[]
    label: string
    borderColor?: string
    backgroundColor?: string
    height?: number
}

const LineChart: React.FC<LineChartProps> = ({
    data,
    labels,
    label,
    borderColor = 'rgb(66, 139, 255)',
    backgroundColor = 'rgba(66, 139, 255, 0.1)',
    height = 300
}) => {
    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d')
            if (ctx) {
                // Destroy existing chart if it exists
                if (chartInstance.current) {
                    chartInstance.current.destroy()
                }

                const gradient = ctx.createLinearGradient(0, 0, 0, height)
                gradient.addColorStop(0, backgroundColor)
                gradient.addColorStop(1, 'rgba(66, 139, 255, 0)')

                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: label,
                            data: data,
                            fill: true,
                            backgroundColor: gradient,
                            borderColor: borderColor,
                            tension: 0.4,
                            pointRadius: 4,
                            pointBackgroundColor: '#FFFFFF',
                            pointBorderColor: borderColor,
                            pointBorderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    display: true,
                                    color: 'rgba(0, 0, 0, 0.05)'
                                },
                                ticks: {
                                    stepSize: 1000
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                })
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy()
            }
        }
    }, [data, labels, label, borderColor, backgroundColor, height])

    return (
        <canvas ref={chartRef} style={{ height: `${height}px` }}></canvas>
    )
}

export default LineChart 