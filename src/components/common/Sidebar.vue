<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';

    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'iconfont elem-icon-user',
                        index: '1',
                        title: '用户管理',
                        subs: [
                            {
                                index: '/user',
                                title: '用户信息'
                            },
                        ]
                    },
                    {
                        icon: 'iconfont elem-computer',
                        index: '2',
                        title: 'ECS管理',
                        subs: [
                            {
                                index: '/ecs',
                                title: 'ECS信息'
                            },
                        ]
                    },
                    {
                        icon: 'iconfont elem-computer',
                        index: '3',
                        title: '审批',
                        subs: [
                            {
                                index: '/application',
                                title: '申请审批'
                            },
                        ]
                    },
                    {
                        icon: 'iconfont elem-computer',
                        index: '4',
                        title: '执行任务',
                        subs: [
                            {
                                index: '/ansible',
                                title: 'Ansible任务'
                            },
                            {
                                index: '/ansiblelog',
                                title: 'JOB日志'
                            },
                        ]
                    },

                    {
                        icon: 'iconfont elem-shujuku',
                        index: '/sql',
                        title: '数据处理'
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>

    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
