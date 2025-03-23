import { unitMappings } from '@/utils/unitSize';

export function formatBytes(bytes: number, lang = 'en-US') {
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1000));
    const sizeInUnit = bytes / Math.pow(1000, i);

    const sizes = unitMappings[lang]
    const formattedNumber = new Intl.NumberFormat(lang, {
        maximumFractionDigits: 2,
    }).format(sizeInUnit);

    return `${formattedNumber} ${sizes[i]}`;
}
