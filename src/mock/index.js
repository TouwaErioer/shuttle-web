const mock = {}

// 服务
mock.services = function () {
    return [
        {'id': 1, 'name': '外卖', 'color': '#51A8DD', 'icon': 'el-icon-shopping-bag-2'},
        {'id': 2, 'name': '打印', 'color': '#86C166', 'icon': 'el-icon-printer'},
        {'id': 3, 'name': '超市', 'color': '#8B81C3', 'icon': 'el-icon-shopping-cart-2'},
        {'id': 4, 'name': '快递', 'color': 'rgb(245 108 108 / 0.85)', 'icon': 'el-icon-box'},
        {'id': 5, 'name': '跑腿', 'color': '#F9BF45', 'icon': 'el-icon-position'},
        {'id': 6, 'name': '其他', 'color': '#DC9FB4', 'icon': 'el-icon-user'},
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
            'id': 1,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-noodles-vegetables-egg-819x1024.jpg',
            'name': '套餐一',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 2,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches-819x1024.jpg',
            'name': '套餐二',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 3,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2018/12/green-salad-with-hemp-seeds.jpg',
            'name': '套餐三',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 4,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-noodles-vegetables-egg-819x1024.jpg',
            'name': '套餐一',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 5,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches-819x1024.jpg',
            'name': '套餐二',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 6,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2018/12/green-salad-with-hemp-seeds.jpg',
            'name': '套餐三',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 7,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-noodles-vegetables-egg-819x1024.jpg',
            'name': '套餐一',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 8,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches-819x1024.jpg',
            'name': '套餐二',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 9,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2018/12/green-salad-with-hemp-seeds.jpg',
            'name': '套餐三',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        }
    ]
}

// 搜索
mock.search = function (keywords) {
    if (keywords != '套餐一' & keywords != '套餐二' & keywords != '套餐三') {
        return []
    }
    const results = {
        '套餐一':
            [
                {
                    'image': 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-noodles-vegetables-egg-819x1024.jpg',
                    'name': '套餐一',
                    'shop': '外卖',
                    'rate': 5,
                    'sales': 0,
                    'price': 10
                }
            ],
        '套餐二':
            [
                {
                    'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches-819x1024.jpg',
                    'name': '套餐二',
                    'shop': '外卖',
                    'rate': 5,
                    'sales': 0,
                    'price': 10
                }
            ],
        '套餐三':
            [
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
    return results[keywords]
}

// 商店
mock.stores = function () {
    const stores = [
        {
            'id': 1,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/korean-spicy-seafood-soup-with-king-prawns-from-top-view-768x512.jpg',
            'name': '套餐',
            'service': '外卖',
            'rate': 2,
            'sales': 6,
            'price': 10,
            'category': '一食堂'
        },
        {
            'id': 2,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/hot-shakshuka-819x1024.jpg',
            'name': '面馆',
            'service': '外卖',
            'rate': 1,
            'sales': 5,
            'price': 10,
            'category': '二食堂'
        },
        {
            'id': 3,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2020/08/omelette-with-freshly-baked-pastry-in-a-cafe-1-768x576.jpg',
            'name': '米线',
            'service': '外卖',
            'rate': 5,
            'sales': 1,
            'price': 10,
            'category': '三食堂'
        },
        {
            'id': 4,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-noodles-vegetables-egg-819x1024.jpg',
            'name': '套餐一',
            'service': '外卖',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 5,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches-819x1024.jpg',
            'name': '套餐二',
            'service': '外卖',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 6,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2018/12/green-salad-with-hemp-seeds.jpg',
            'name': '套餐三',
            'service': '外卖',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 7,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-noodles-vegetables-egg-819x1024.jpg',
            'name': '套餐一',
            'service': '外卖',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 8,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2021/01/fried-egg-and-guacamole-sandwiches-819x1024.jpg',
            'name': '套餐二',
            'service': '外卖',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        },
        {
            'id': 9,
            'image': 'https://www.foodiesfeed.com/wp-content/uploads/2018/12/green-salad-with-hemp-seeds.jpg',
            'name': '套餐三',
            'service': '外卖',
            'shop': '套餐',
            'rate': 5,
            'sales': 0,
            'price': 10
        }
    ]
    return stores
}

mock.category = function (serviceId) {
    let categories = {
        '1': ['一食堂', '二食堂', '三食堂'],
        '2': ['宿舍', '门市'],
        '3': ['校内', '校外']
    }
    return categories[serviceId]
}

mock.order = function () {
    return [{
        id: 1,
        product: '套餐一',
        service: '外卖',
        shop: '套餐',
        date: '2016-05-02',
        status: '-1'
    }, {
        id: 2,
        product: '套餐一',
        service: '外卖',
        shop: '套餐',
        date: '2016-05-02',
        status: '0'
    }, {
        id: 3,
        product: '套餐一',
        service: '外卖',
        shop: '套餐',
        date: '2016-05-02',
        status: '1'
    }]
}
export default mock