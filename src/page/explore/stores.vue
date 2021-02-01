<template>
    <Page>
        <template v-slot:headers>
            <Headers>
                <span><i :class="icon"></i> {{title}}</span>
            </Headers>
        </template>
        <template v-slot:center>
            <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
                <div>
                    <div class="filters">
                        <div class="filter">
                    <span @click="options['1'] = !options['1']">
                        排序 <i :class="options['1']?'el-icon-arrow-down':'el-icon-caret-bottom'"></i>
                    </span>
                        </div>
                        <div class="filter">
                    <span @click="options['2'] = !options['2']">
                        筛选 <i :class="options['2']?'el-icon-arrow-down':'el-icon-caret-bottom'"></i>
                    </span>
                        </div>
                        <div class="filter">
                    <span @click="options['3'] = !options['3']">
                        高级 <i :class="options['3']?'el-icon-arrow-down':'el-icon-caret-bottom'"></i>
                    </span>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div class="options" v-show="options['1']">
                            <el-radio-group v-model="sort" @change="sortStores()">
                                <el-radio-button label="1">
                                    <i class="el-icon-price-tag"></i><span> 名称</span>
                                </el-radio-button>
                                <el-radio-button label="2">
                                    <i class="el-icon-star-off"></i><span> 评分</span>
                                </el-radio-button>
                                <el-radio-button label="3">
                                    <i class="el-icon-medal"></i><span> 销量</span>
                                </el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-collapse-transition>
                    <el-collapse-transition>
                        <div class="options" v-show="options['2']">
                            <el-radio-group v-model="filter" @change="filterStores()">
                                <el-radio-button v-for="(category,index) in categories" :key="index" :label="category">
                                    <span v-text="category"></span>
                                </el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-collapse-transition>
                    <el-collapse-transition>
                        <div class="options" v-show="options['3']">
                            <el-radio-group v-model="advanced" @change="advancedStores()">
                                <el-radio-button label="1">
                                    <span> 默认</span>
                                </el-radio-button>
                                <el-radio-button label="2">
                                    <span> 重置</span>
                                </el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-collapse-transition>
                    <div class="stores">
                        <Item v-for="store in stores" :key="store.id" :item="store"
                              @click.native="$router.push('/store/' + store.id)">
                            <div slot="sales"><i class="el-icon-medal"></i> 总销量：<span>{{ + store.sales}}</span></div>
                        </Item>
                    </div>
                </div>
            </mescroll-vue>
        </template>
    </Page>
</template>

<script>
    import Headers from "@/components/headers";
    import mock from "@/mock";
    import Item from "@/components/item";
    import Page from "@/layout/page";
    import MescrollVue from 'mescroll.js/mescroll.vue'

    export default {
        name: "stores",
        props: ['sid'],
        components: {Page, Item, Headers, MescrollVue},
        data() {
            return {
                title: null,
                icon: null,
                color: null,
                stores: [],
                activeIndex: '1',
                options: {
                    '1': false,
                    '2': false,
                    '3': false
                },
                sort: '1',
                filter: null,
                advanced: '1',
                categories: [],
                mescrollDown: {
                    callback: this.downCallBack,
                    auto: false,
                }
            }
        },
        created() {
            let serviceList = JSON.parse(sessionStorage.getItem('serviceList'))
            let serviceInfo = serviceList.filter(service => service.id == this.sid)[0]
            this.filter = this.categories[0]
            this.title = serviceInfo.name
            this.icon = serviceInfo.icon
            this.color = serviceInfo.color
            this.getStores()
            this.getCategories()
        },
        methods: {
            getStores() {
                if (this.$store.getters.storesCache(parseInt(this.sid))) {
                    this.stores = this.$store.getters.getStoresBySid(this.sid)
                    console.log('缓存id为' + this.sid + '的stores')
                }
                else {
                    console.log('获取id为' + this.sid + '的stores')
                    let stores = mock.stores(this.sid)
                    this.stores = stores
                    this.$store.commit('setStores', stores)
                }
            },
            getCategories() {
                if (this.$store.getters.categoriesCache(parseInt(this.sid))) {
                    this.categories = this.$store.getters.getCategories(this.sid)[0]['categories']
                    console.log('缓存id为' + this.sid + '的categories')
                }
                else {
                    console.log('获取id为' + this.sid + '的categories')
                    let categories = mock.category(this.sid)[0]
                    this.categories = categories['categories']
                    this.$store.commit('setCategories', categories)
                }
            },
            sortStores() {
                if (this.sort == '1') {
                    this.stores = mock.stores()
                } else if (this.sort == '2') {
                    this.stores.sort((a, b) => b.rate - a.rate)
                } else if (this.sort == '3') {
                    this.stores.sort((a, b) => b.sales - a.sales)
                }
            },
            filterStores() {
                this.stores = this.stores.filter(store => store.category == this.filter)
            },
            advancedStores() {
                if (this.advanced == '2') {
                    this.stores = mock.stores(this.sid)
                }
            },
            mescrollInit(mescroll) {
                this.mescroll = mescroll
            },
            downCallBack(mescroll) {
                this.stores = mock.stores(this.sid)
                this.$nextTick(() => {
                    mescroll.endSuccess(this.stores.length)
                })
            }
        }
    }
</script>

<style scoped>

    .filters {
        height: 30px;
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 10px;
    }

    .filter {
        width: 30%;
        margin: 0 10px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3vh;
        color: #606266;
    }

    .options {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 10px 0;
    }

    .stores {
        margin: 0 10px;
    }
</style>