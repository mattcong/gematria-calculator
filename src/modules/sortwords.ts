function format(words: string[]) {
    if (words.length > 21) { return `This is shared by: ${words.toString().replaceAll(",", ", ")} and ${words.length - 20} more.` }
    if (words.length > 1 && words.length < 21) {
        const result = words.toString().replaceAll(",", ", ")
        const replace = result.lastIndexOf(", ")
        return `This is shared by: ${result.substring(0, replace) + " and" + result.substring(replace + 1)}.`
    }
    if (words.length === 1) { return `This is shared by: ${words.toString()}.` }
    if (!words.length) { return `No single word shares this value.` }
}


export function displayRandomWords(words: string[]) {
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
    return format(random)
}