'use client'

import * as React from 'react'
import { HTMLAttributes } from 'react'
import { Label, Pie, PieChart } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from '@/components/ui/chart'
import { cn } from '@/lib/utils';


const chartConfig = {
    invited: {
        label: 'Invited',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig

interface InvitationsChartProps {
    totalInvitations: number
}

export function InvitationsChart(props: HTMLAttributes<HTMLDivElement> & InvitationsChartProps) {
    const { totalInvitations, className } = props

    const chartData = [
        {
            invited: 'invited',
            invitations: totalInvitations === 0 ? 0.0001 : totalInvitations,
            fill: 'var(--color-invited)'
        },
    ]

    return (
        <Card className={cn('flex flex-col w-[230px] h-full', className)}>
            <CardHeader className="flex border-b">
                <CardTitle>Invitations</CardTitle>
                <CardDescription>Total user currently invited</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="flex-1 aspect-square"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Pie
                            data={chartData}

                            dataKey="invitations"
                            nameKey="invited"
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
                                                    {totalInvitations.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    invitations
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
