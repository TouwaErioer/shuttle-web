const common = {}
common.arrayRemove = function (arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

common.changePrice = function (price) {
    return (price / 100).toFixed(1)
}

common.addToLocalStorage = function (product) {
    if (localStorage.getItem('cart') == null) {

        let cart = new Map()
        cart.set(product.id, product.data)
        localStorage.setItem('cart', JSON.stringify(Array.from(cart)))
    } else {
        let cart = new Map(JSON.parse(localStorage.getItem('cart')))
        if (cart.has(product.id)) {
            cart.get(product.id).count++
        } else {
            cart.set(product.id, product.data)
        }
        localStorage.setItem('cart', JSON.stringify(Array.from(cart)))
    }
}

common.changeCart = function (payload) {
    let value = payload.currentValue - payload.oldValue
    let cart = new Map(JSON.parse(localStorage.getItem('cart')))
    let count = cart.get(payload.id).count + value
    if(count != 0) cart.get(payload.id).count = count
    else cart.delete(payload.id)
    if(cart.size == 0) localStorage.removeItem('cart')
    else localStorage.setItem('cart', JSON.stringify(Array.from(cart)))
}

common.getCartCount = function () {
    let count = 0
    new Map(JSON.parse(localStorage.getItem('cart'))).forEach(function (product) {
        count += product.count
    })
    return count
}

common.clearCart = function () {

    localStorage.removeItem('cart')
}

export default common