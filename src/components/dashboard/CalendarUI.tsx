import {
    Calendar,
    CalendarCurrentDate,
    CalendarMonthView,
    CalendarNextTrigger,
    CalendarPrevTrigger,
    CalendarTodayTrigger
} from '../ui/full-calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function CalendarUI() {
    return (
        <div className={'flex flex-1 p-4 border rounded-lg bg-card text-card-foreground shadow-sm '}>
            <Calendar
                events={[
                    {
                        id: '1',
                        start: new Date('2024-08-26T09:30:00Z'),
                        end: new Date('2024-08-26T14:30:00Z'),
                        title: 'event A',
                        color: 'pink',
                    },
                    {
                        id: '2',
                        start: new Date('2024-08-26T10:00:00Z'),
                        end: new Date('2024-08-26T10:30:00Z'),
                        title: 'event B',
                        color: 'blue',
                    },
                ]}
            >
                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between border-b pb-4 gap-2">
                        <Badge>Calendar : Soon</Badge>

                        <CalendarCurrentDate/>

                        <div className={'flex items-center gap-2'}>
                            <CalendarPrevTrigger>
                                <ChevronLeft size={20}/>
                                <span className="sr-only">Previous</span>
                            </CalendarPrevTrigger>

                            <CalendarTodayTrigger>Today</CalendarTodayTrigger>

                            <CalendarNextTrigger>
                                <ChevronRight size={20}/>
                                <span className="sr-only">Next</span>
                            </CalendarNextTrigger>
                        </div>
                    </div>
                    <CalendarMonthView/>
                </div>
            </Calendar>
        </div>
    )
}
