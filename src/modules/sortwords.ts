function format(displayWords: string[], totalWords: number) {
    if (totalWords > 20) { return `This is shared by: ${displayWords.toString().replaceAll(",", ", ")} and ${totalWords - displayWords.length} more.` }
    if (totalWords > 1 && totalWords < 21) {
        const result = displayWords.toString().replaceAll(",", ", ")
        const replace = result.lastIndexOf(", ")
        return `This is shared by: ${result.substring(0, replace) + " and" + result.substring(replace + 1)}.`
    }
    if (totalWords === 1) { return `This is shared by: ${displayWords.toString()}.` }
    if (!totalWords) { return `No single word shares this value.` }
}


export function displayRandomWords(words: string[]) {
    const totalWords: number = words.length
    let random = []

    if (words.length > 20) {
        for (let i = 0; i < 20; i++) {
            random.push(words[Math.floor(Math.random() * words.length)])
        }
    } else {
        for (let i = 0; i < words.length; i++) {
            random.push(words[Math.floor(Math.random() * words.length)])
        }
    }
    return format([...new Set(random)], totalWords)
}