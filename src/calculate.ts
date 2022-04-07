export const calculateSimple = (s: string): number => {
    return [...s.toUpperCase()]
        .map(e => e.charCodeAt(0) - 64)
        .filter(x => x > 0 && x < 27)
        .reduce((acc, i) => acc + i)
}

export const calculateBase6 = (s: string): number => {
    return [...s.toUpperCase()]
        .map(e => (e.charCodeAt(0) - 64) * 6)
        .filter(x => x > 5 && x < 157)
        .reduce((acc, i) => acc + i)
}

export const calculatePythagorean = (s: string): number => {
    const arr1: number[] = [...s.toUpperCase()]
        .map(e => e.charCodeAt(0) - 64)
        .filter(x => x > 0 && x < 27)
    const arr2: number[] = []
    arr1.forEach(e => {
        if (e > 9 && e <= 18) {
            arr2.push(e - 9)
        } else if (e >= 19 && e < 27) {
            arr2.push(e - 18)
        } else {
            arr2.push(e)
        }
    })
    return arr2.reduce((acc, i) => acc + i)
}