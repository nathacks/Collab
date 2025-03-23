'use client'

import * as React from 'react'
import { HTMLAttributes } from 'react'
import { Label, Pie, PieChart } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from '@/components/ui/chart'
import { cn } from '@/lib/utils';


const chartConfig = {
    files: {
        label: 'Files',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig

interface InvitationsChartProps {
    fileCount: number
}

export function FilesChart(props: HTMLAttributes<HTMLDivElement> & InvitationsChartProps) {
    const { fileCount, className } = props

    const chartData = [
        {
            files: 'Files',
            data: fileCount === 0 ? 0.0001 : fileCount,
            fill: 'var(--color-files)'
        },
    ]

    return (
        <Card className={cn('flex flex-col flex-1 h-72', className)}>
            <CardHeader className="flex border-b">
                <CardTitle>Files</CardTitle>
                <CardDescription>Total files in workspace</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="w-[230px] h-48"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Pie
                            data={chartData}

                            dataKey="data"
                            nameKey="files"
                            innerRadius={50}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {fileCount.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Files
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
