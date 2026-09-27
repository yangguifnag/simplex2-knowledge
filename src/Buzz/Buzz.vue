<script>
import {resolvePageConfig} from '../config/pages'

export default {
    name: 'Buzz',
    props: {
        buzzNo: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            page: null,
            error: '',
            renderVersion: 0,
        }
    },
    computed: {
        pageConfigNo() {
            return this.buzzNo || this.$route.params.buzzNo
        },
    },
    created() {
        this.renderPage(this.pageConfigNo)
    },
    watch: {
        pageConfigNo(buzzNo) {
            this.renderPage(buzzNo)
        },
        '$route.hash'(hash) {
            this.$nextTick(() => this.scrollToHash(hash))
        },
    },
    methods: {
        async renderPage(buzzNo) {
            const renderVersion = ++this.renderVersion
            try {
                const config = await resolvePageConfig(buzzNo)
                if (renderVersion !== this.renderVersion) {
                    return
                }

                if (!config) {
                    this.page = null
                    this.error = `未找到 Buzz${String(buzzNo ?? '')} 对应的页面配置`
                    return
                }

                this.error = ''
                this.page = config
                this.$nextTick(() => this.scrollToHash(this.$route.hash))
            } catch (error) {
                if (renderVersion !== this.renderVersion) {
                    return
                }
                this.page = null
                this.error = error instanceof Error
                    ? error.message
                    : `加载 Buzz${String(buzzNo ?? '')} 时发生未知错误`
            }
        },
        handlePageError(error) {
            this.error = error.message
        },
        scrollToHash(hash) {
            if (!hash) {
                return
            }

            const target = document.getElementById(hash.slice(1))
            target?.scrollIntoView({behavior: 'smooth', block: 'start'})
        },
    },
}
</script>

<template>
    <div class="buzz-page" v-if="page">
        <SimplexElementPage
            :page="page"
            @invalid="handlePageError"
            @error="handlePageError"
        />
    </div>
    <div v-else class="buzz-error">{{ error }}</div>
</template>

<style lang="scss" scoped>
.buzz-page {
    width: 100%;
    height: 100vh;
    height: 100dvh;
}

.buzz-error {
    padding: 24px;
    color: #f56c6c;
}
</style>
