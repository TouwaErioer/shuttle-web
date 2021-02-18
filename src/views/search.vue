<template>
    <div style="padding: 20px 20px">
        <el-input
                placeholder="请输入产品"
                prefix-icon="el-icon-search"
                v-model="keywords"
                @change="search()"
                @input="show_search=false"
        >
        </el-input>
        <div class="history" v-if="show_history || keywords.length === 0">
            <Empty description="暂无搜索历史" v-if="history_words.length === 0"/>
            <div v-if="history_words.length !== 0">
                <el-divider>
                    <li class="el-icon-time divider"> 搜索历史</li>
                </el-divider>
                <el-tag
                        v-for="word in history_words"
                        :key="word.keywords"
                        closable
                        class="history"
                        @click="clickTag(word.keywords)"
                        @close="removeWords(word)"
                        :disable-transitions="false"
                        :color="word.color"
                        :style="'border-color:' + word.color">
                    {{word.keywords}}
                </el-tag>
            </div>
        </div>
        <div class="results" v-if="show_search">
            <StoreItem v-for="result in results" :key="result.name" :item="result">
                <ProductDialog slot="button" :product="result"/>
                <el-tag size="mini" v-text="result.store.name" effect="dark" class="tag" type="warning"
                        slot="tag" @click="$router.push('/store/' + result.storeId)"/>
                <div slot="price"><i class="el-icon-price-tag"></i> 价格：
                    <span class="price-text" v-text="getPrice(result.price)"/>
                </div>
                <div slot="sales"><i class="el-icon-medal"></i> 销量：
                    <span>{{ + result.sales}}</span>
                </div>
            </StoreItem>
            <empty description="没有找到相关结果" v-if="results.length === 0"/>
        </div>
    </div>
</template>

<script>
    import Empty from "@/components/empty";
    import common from "@/utils/commont";
    import StoreItem from "@/components/item";
    import {searchProduct} from "@/utils/api/product";
    import ProductDialog from "@/components/product-dialog";

    export default {
        name: "search",
        components: {ProductDialog, StoreItem, Empty},
        data() {
            return {
                keywords: '',
                history_words: this.getHistory(),
                results: [],
                show_history: true,
                timeOutEvent: 0,
                show_search: false
            }
        },
        computed: {
            getPrice() {
                return (price) => {
                    return common.changePrice(price)
                }
            },
            getServiceColor() {
                return (serviceId) => {
                    return this.$store.getters.getService.filter(service => service.id === serviceId)[0].color;
                }
            }
        },
        methods: {
            getHistory() {
                const history = localStorage.getItem('history-words');
                if (history === null) {
                    return [];
                } else {
                    return JSON.parse(history);
                }
            },
            search() {
                if (this.keywords !== '') {
                    this.show_history = false;
                    this.show_search = true;
                    searchProduct(this.keywords).then(res => {
                        if (res.code === 1) this.results = res.data;
                        this.addWords(res.data);
                    });
                }
            },
            removeWords(word) {
                this.history_words = common.arrayRemove(this.history_words, word);
                let history = JSON.parse(localStorage.getItem('history-words'));
                let newHistory = history.filter(his => his.keywords !== word.keywords);
                localStorage.setItem('history-words', JSON.stringify(newHistory));
            },
            addWords(results) {
                const keywordsData = {
                    keywords: this.keywords,
                    color: '#909399'
                };
                if (results.length > 0) keywordsData.color = this.getServiceColor(results[0].store.serviceId);
                if (this.history_words.filter(his => his.keywords === this.keywords).length === 0)
                    this.history_words.push(keywordsData);
                let history = localStorage.getItem('history-words');
                if (history === null) history = [keywordsData];
                else {
                    history = JSON.parse(history);
                    if (history.filter(his => his.keywords === this.keywords).length === 0)
                        history.push(keywordsData);
                }
                localStorage.setItem('history-words', JSON.stringify(history));
            },
            clickTag(value) {
                this.keywords = value;
                this.search();
            }
        }
    }
</script>

<style scoped>

    .history {
        margin: 5px 5px;
        color: white;
    }

    .divider {
        color: #909399;
        font-size: 2vh;
    }
</style>