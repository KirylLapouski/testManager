function uniqueArrayOfPrimitives(arr) {
    let obj = {}

    for (let i = 0; i < arr.length; i++) {
        let str = arr[i]
        obj[str] = true
    }
    return Object.keys(obj)
}
// this function changes order of array
function uniqueArrayOfObjectById(arr) {
    let obj = {},
        result = []

    for (let i = 0; i < arr.length; i++) obj[arr[i].id] = arr[i]

    for (let value in obj) result.push(obj[value])

    return result
}

function shuffle(array) {
    let arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

export { uniqueArrayOfPrimitives, uniqueArrayOfObjectById, shuffle }
