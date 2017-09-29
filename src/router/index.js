import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Maintitle'
import Connect from '@/components/Connect'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
    },
        {
            path: '/connect',
            name: 'connect',
            component: Connect
    }
  ]
})
