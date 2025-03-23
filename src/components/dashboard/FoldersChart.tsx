'use client'

import * as React from 'react'
import { HTMLAttributes } from 'react'
import { Label, Pie, PieChart } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from '@/components/ui/chart'
import { cn } from '@/lib/utils';


const chartConfig = {
    folders: {
        label: 'Folders',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig

interface InvitationsChartProps {
    folderCount: number
}

export function FoldersChart(props: HTMLAttributes<HTMLDivElement> & InvitationsChartProps) {
    const { folderCount, className } = props

    const chartData = [
        {
            folders: 'Folders',
            data: folderCount === 0 ? 0.0001 : folderCount,
            fill: 'var(--color-folders)'
        },
    ]

    return (
        <Card className={cn('flex flex-col flex-1 h-72', className)}>
            <CardHeader className="flex border-b">
                <CardTitle>Folders</CardTitle>
                <CardDescription>Total folders in workspace</CardDescription>
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
                            nameKey="folders"
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
                                                    {folderCount.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Folders
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
