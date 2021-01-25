const mock = {}

// 服务
mock.services = function () {
    return [
        {'id': 1, 'name': '外卖','color':'#86C166','icon':'el-icon-shopping-bag-2'},
        {'id': 2, 'name': '打印','color':'#51A8DD','icon':'el-icon-printer'},
        {'id': 3, 'name': '超市','color':'#8B81C3','icon':'el-icon-box'},
        {'id': 4, 'name': '快递','color':'rgb(245 108 108 / 0.85)','icon':'el-icon-shopping-cart-2'},
        {'id': 5, 'name': '跑腿','color':'#F9BF45','icon':'el-icon-position'},
        {'id': 6, 'name': '其他','color':'#DC9FB4','icon':'el-icon-user'},
    ]
}

// 轮播图
mock.carouselImage = function () {
    return [
        'https://www.foodiesfeed.com/wp-content/uploads/2017/05/juicy-burger-in-a-vibrant-interior.jpg',
        'https://www.foodiesfeed.com/wp-content/uploads/2019/02/messy-pizza-on-a-black-table-768x512.jpg',
        'https://www.foodiesfeed.com/wp-content/uploads/2019/06/beautiful-vibrant-shot-of-traditional-korean-meals-768x512.jpg'
    ]
}

// 产品
mock.product = function () {
    return [
        {
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-noodles-vegetables-egg-819x1024.jpg',
            'name': '套餐一',
            'shop': '外卖',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches-819x1024.jpg',
            'name': '套餐二',
            'shop': '外卖',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2018/12/green-salad-with-hemp-seeds.jpg',
            'name': '套餐三',
            'shop': '外卖',
            'rate': 5,
            'sales': 0,
            'price': 10
        }
    ]
}
export default mock