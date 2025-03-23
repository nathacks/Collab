export const fetcherApi = (url: string) => fetch(url).then(r => r.json())
