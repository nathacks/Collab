'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from '@/components/ui/chart'
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';


const chartConfig = {
    users: {
        label: 'Users',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig

interface UsersChartProps {
    users: {
        users: number
        date: string
    }[]
}

export function UsersChart(props: HTMLAttributes<HTMLDivElement> & UsersChartProps) {
    const { users, className } = props
    return (
        <Card className={cn('flex flex-col flex-1', className)}>
            <CardHeader className="flex border-b">
                <CardTitle>Users</CardTitle>
                <CardDescription className={'truncate'}>
                    Showing total users for the last 3 months
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 p-4 items-center">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto lg:h-full h-52 w-full"
                >
                    <AreaChart data={users}>
                        <defs>
                            <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-users)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-users)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString('en-EN', {
                                    month: 'short',
                                    day: 'numeric',
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString('en-EN', {
                                            month: 'long',
                                            day: 'numeric',
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area dataKey="users" type="natural" fill="url(#fillUsers)" stroke="var(--color-users)"
                              stackId="a"/>
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
