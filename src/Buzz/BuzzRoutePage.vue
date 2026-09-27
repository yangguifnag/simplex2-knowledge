<script>
import {resolvePageConfig} from '../config/pages'

export default {
    name: 'BuzzRoutePage',
    props: {
        buzzNo: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            page: null,
            error: '',
            renderVersion: 0,
        }
    },
    created() {
        this.renderPage()
    },
    watch: {
        buzzNo() {
            this.renderPage()
        },
    },
    methods: {
        async renderPage() {
            const renderVersion = ++this.renderVersion
            this.resetScrollPosition()
            try {
                const config = await resolvePageConfig(this.buzzNo)
                if (renderVersion !== this.renderVersion) {
                    return
                }

                if (!config) {
                    this.page = null
                    this.error = `未找到 Buzz${this.buzzNo} 对应的页面配置`
                    return
                }

                this.page = config
                console.log(config)
                window.currentModel = this.page
                this.error = ''
                this.$nextTick(() => this.resetScrollPosition())
            } catch (error) {
                if (renderVersion !== this.renderVersion) {
                    return
                }
                this.page = null
                this.error = error instanceof Error
                    ? error.message
                    : `加载 Buzz${this.buzzNo} 时发生未知错误`
            }
        },
        handlePageError(error) {
            this.error = error.message
        },
        resetScrollPosition() {
            const scrollContainer = this.$el?.closest?.('.el-main')
            if (scrollContainer) {
                scrollContainer.scrollTop = 0
            }
        },
    },
}
</script>

<template>
    <div v-if="page" class="buzz-route-page">
        <SimplexElementPage
            :page="page"
            @invalid="handlePageError"
            @error="handlePageError"
        />
    </div>
    <div v-else class="buzz-route-error">{{ error }}</div>
</template>

<style lang="scss" scoped>
.buzz-route-page {
    min-height: 100%;
}

.buzz-route-error {
    padding: 24px;
    color: #f56c6c;
}
</style>
