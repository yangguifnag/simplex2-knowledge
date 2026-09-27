import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createSimplexElementPlus } from '@simplex2/element-plus-frame'
import App from './App.vue'
import router from './router'
import '@simplex2/element-plus-frame/style.css'
import './styles/knowledge.scss'

const app = createApp(App)

app.use(ElementPlus)
app.use(createSimplexElementPlus())
app.use(router).mount('#app')
