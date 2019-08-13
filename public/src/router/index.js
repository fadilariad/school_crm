import Vue from 'vue';
import Router from 'vue-router';
import Students from '@/components/students';
import Courses from '@/components/courses';
import Settings from '@/components/settings';
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Courses
        },
        {
            path: '/students',
            component: Students
        },
        {
            path: '/courses',
            component: Courses
        },
        {
            path: '/settings',
            component: Settings
        }
  ]
})
