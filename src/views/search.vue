<template>
    <div style="padding: 0 20px">
        <el-input
                placeholder="请输入商店或产品"
                prefix-icon="el-icon-search"
                v-model="keywords"
                @change="search()"
                @input="results = [],show_search=false"
        >
        </el-input>
        <div class="history" v-if="show_history || keywords.length == 0">
            <Empty description="暂无搜索历史" v-if="history_words.length == 0"/>
            <div v-if="history_words.length != 0">
                <el-divider>
                    <li class="el-icon-time divider"> 搜索历史</li>
                </el-divider>
                <el-tag
                        v-for="word in history_words"
                        :key="word"
                        closable
                        class="history"
                        @click="keywords = word,search()"
                        @close="removeWords(word)"
                        :disable-transitions="false">
                    {{word}}
                </el-tag>
            </div>
        </div>
        <div class="results" v-if="show_search">
            <StoreItem v-for="result in results" :key="result.name" :item="result"/>
            <empty description="没有找到相关结果" v-if="results.length == 0"/>
        </div>
    </div>
</template>

<script>
    import Empty from "@/components/empty";
    import common from "@/utils/commont";
    import StoreItem from "@/components/item";
    import mock from "@/mock";

    export default {
        name: "search",
        components: {StoreItem, Empty},
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
        methods: {
            getHistory() {
                const history = localStorage.getItem('history-words')
                if (history == null) {
                    return []
                } else {
                    return history.split(',')
                }
            },
            search() {
                if (this.keywords != '') {
                    this.show_history = false
                    this.show_search = true
                    this.addWords()
                    this.results = mock.search(this.keywords)
                }
            },
            removeWords(word) {
                this.history_words = common.arrayRemove(this.history_words, word)
                let history = localStorage.getItem('history-words')
                if (this.getHistory().length == 1) {
                    localStorage.removeItem('history-words')
                } else {
                    localStorage.setItem('history-words', history.replace(',' + word, ''))
                }
            },
            addWords() {
                if (this.history_words.indexOf(this.keywords) == -1) {
                    this.history_words.push(this.keywords)
                }
                let history = localStorage.getItem('history-words')
                if (history == null) {
                    history = this.keywords
                } else {
                    if (history.indexOf(this.keywords) == -1) {
                        history = history + ',' + this.keywords
                    }
                }
                localStorage.setItem('history-words', history)
            },
            touchstart(word) {
                this.timeOutEvent = setTimeout(() => {
                    this.timeOutEvent = 0
                    this.removeWords(word)
                }, 3000)
            },
        }
    }
</script>

<style scoped>

    .history {
        margin: 0 5px;
    }

    .divider {
        color: #909399;
        font-size: 2vh;
    }
</style>