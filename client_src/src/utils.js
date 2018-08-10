function uniqueArrayOfPrimitives(arr) {
    var obj = {};

    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true;
    }
    return Object.keys(obj);
}
// this function changes order of array
function uniqueArrayOfObjectById(arr) {
    var obj = {},
        result = [];

    for (var i = 0; i < arr.length; i++) obj[arr[i].id] = arr[i];

    for (var value in obj) result.push(obj[value]);

    return result;
}

export { uniqueArrayOfPrimitives, uniqueArrayOfObjectById };
