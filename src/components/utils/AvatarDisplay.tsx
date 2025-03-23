import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    seed: string;
}

export function AvatarDisplay({ seed, className, ...props }: AvatarProps) {
    const avatar = createAvatar(initials, {
        seed,
        fontSize: 46
    }).toDataUri();

    return (
        <img
            {...props}
            className={cn('rounded-lg size-8 select-none cursor-pointer', className)}
            src={avatar}
            alt="Account Image"
        />
    );
}
