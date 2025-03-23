export const formatStringFirstUpAllLower = (string?: string) => {
    return string?.replaceAll(/\S*/g, (word) => (`${word.slice(0, 1)}${word.slice(1).toLowerCase()}`));
}
