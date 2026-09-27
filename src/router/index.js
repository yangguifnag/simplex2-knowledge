import {createRouter, createWebHistory} from 'vue-router'
import Buzz from '../Buzz/Buzz.vue'
import BuzzRoutePage from '../Buzz/BuzzRoutePage.vue'
import knowledgeRouteData from '../config/knowledge-routes.json'

const {basePath: knowledgeBasePath, routes: knowledgeRoutes} = knowledgeRouteData
const knowledgeChildren = knowledgeRoutes.map(({key, path, buzzNo}) => ({
    path,
    name: `knowledge-${key}`,
    component: BuzzRoutePage,
    props: {buzzNo},
}))

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: knowledgeBasePath,
            name: 'knowledge-base',
            component: Buzz,
            props: {buzzNo: '2026092702'},
            children: [
                {
                    path: '',
                    redirect: {name: 'knowledge-overview'},
                },
                ...knowledgeChildren,
            ],
        },
        {
            path: '/buzz/:buzzNo',
            name: 'buzz',
            component: Buzz,
            props: true,
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: knowledgeBasePath,
        },
    ],
})
