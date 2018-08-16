function uniqueArrayOfPrimitives(arr) {
    var obj = {}

    for (var i = 0; i < arr.length; i++) {
        var str = arr[i]
        obj[str] = true
    }
    return Object.keys(obj)
}
// this function changes order of array
function uniqueArrayOfObjectById(arr) {
    var obj = {},
        result = []

    for (var i = 0; i < arr.length; i++) obj[arr[i].id] = arr[i]

    for (var value in obj) result.push(obj[value])

    return result
}

function shuffle(array) {
    var arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

export { uniqueArrayOfPrimitives, uniqueArrayOfObjectById, shuffle }
