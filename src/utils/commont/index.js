const common = {}
common.arrayRemove = function (arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

export default common