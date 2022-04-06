const calculateSimple = (s: string): number => {
    return [...s.toUpperCase()]
    .map(e => e.charCodeAt(0) - 64)
    .filter(x => x > 0 && x < 27)
    .reduce((acc, i) => acc + i)
}

export default calculateSimple