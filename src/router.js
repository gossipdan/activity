import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: () =>
                import ('./views/Main.vue')
        },
        {
            path: '/detail',
            component: () =>
                import ('./views/Detail.vue')
        },
        {
            path: '/trailer',
            component: () =>
                import ('./views/Prepare.vue')
        }
    ]
})