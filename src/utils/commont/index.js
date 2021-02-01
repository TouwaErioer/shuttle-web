const common = {}
common.arrayRemove = function (arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

common.changePrice = function (price) {
    return (price / 100).toFixed(1)
}

export default common