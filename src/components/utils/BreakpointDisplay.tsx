'use client';

import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

export function BreakpointDisplay() {
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    const [currentBreakpoint, setBreakpoint] = useState<Breakpoint | null>(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            let matchedBreakpoint: Breakpoint | null = null;
            for (const [breakpoint, value] of Object.entries(breakpoints)) {
                if (width >= value) {
                    matchedBreakpoint = breakpoint as Breakpoint;
                }
            }

            setBreakpoint(matchedBreakpoint);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <span
            className="absolute right-0 bottom-0 m-3 rounded-full size-7 flex justify-center items-center text-sm bg-primary text-white">{currentBreakpoint ?? 'sm'}</span>
    );
}
