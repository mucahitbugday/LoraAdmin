'use client'
import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface LineChartProps {
    data: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
    labels: string[];
    height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, labels, height = 300 }) => {
    const chartRef = useRef<HTMLCanvasElement>(null)
    const chartInstance = useRef<Chart | null>(null)

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d')
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy()
                }

                const datasets = data.map(dataset => {
                    const gradient = ctx.createLinearGradient(0, 0, 0, height)
                    gradient.addColorStop(0, dataset.backgroundColor)
                    gradient.addColorStop(1, 'rgba(66, 139, 255, 0)')

                    return {
                        label: dataset.label,
                        data: dataset.data,
                        fill: true,
                        backgroundColor: gradient,
                        borderColor: dataset.borderColor,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#FFFFFF',
                        pointBorderColor: dataset.borderColor,
                        pointBorderWidth: 2
                    }
                })

                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: datasets
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
                chartInstance.current = null
            }
        }
    }, [data, labels, height])

    return (
        <canvas ref={chartRef} style={{ height: `${height}px` }}></canvas>
    )
}

export default LineChart 