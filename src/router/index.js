import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/User.vue'], resolve),
                    meta: { title: '用户信息' }
                },
                {
                    path: '/ecs',
                    component: resolve => require(['../components/page/Ecs.vue'], resolve),
                    meta: { title: 'ECS请求页面' }
                },
                {
                    path: '/application',
                    component: resolve => require(['../components/page/Approval.vue'], resolve),
                    meta: { title: '申请审批' }
                },
                {
                    path: '/Sql',
                    component: resolve => require(['../components/page/Sql.vue'], resolve),
                    meta: { title: '数据上传' }
                },
                {
                    path: '/joblog/:job_id',
                    component: resolve => require(['../components/page/AnsibleLogDetail.vue'], resolve),
                    meta: { title: 'Ansible Job 日志' }
                },
                {
                    path: '/ansible',
                    component: resolve => require(['../components/page/ansible.vue'], resolve),
                    meta: { title: '执行任务' }
                },
                {
                    path: '/ansiblelog',
                    component: resolve => require(['../components/page/AnsibleLog.vue'], resolve),
                    meta: { title: 'Ansible 日志列表' }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
