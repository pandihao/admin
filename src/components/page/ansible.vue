<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> Ansible 执行任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>

            <el-form :inline="true" :model="Task" :rules="rules">
                <el-form-item label="任务名称" prop="name">
                    <el-input class="task-input" v-model="Task.name"></el-input>
                </el-form-item>
                <el-form-item label="环境名称" prop="env">
                    <el-input class="task-input" v-model="Task.env"></el-input>
                </el-form-item>
                <el-form-item label="主机IP" prop="host">
                    <el-input  class="task-input" v-model="Task.host"></el-input>
                </el-form-item>
                <el-form-item label="任务标识" prop="description_flag">
                    <el-input class="task-input"  v-model="Task.description_flag"></el-input>
                </el-form-item>
                <el-form-item label="任务描述" prop="description">
                    <el-input type="textarea"  placeholder="任务描述" v-model="Task.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createTask">创建任务</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div><el-button size="mini" type="primary" @click="getTask()">刷新任务列表</el-button></div>
        <div class="container">
            <el-table :data="ExecuteTask"    border style="width: 100%" >
                <el-table-column label="序号" type="index" width="180"></el-table-column>
                <el-table-column prop="name" label="任务名称" width="180"></el-table-column>
                <el-table-column prop="env" label="环境名称" width="180"></el-table-column>
                <el-table-column prop="host" label="主机IP" width="180"></el-table-column>
                <el-table-column prop="description" label="任务描述"> </el-table-column>
                <el-table-column prop="description_flag" label="任务标识"> </el-table-column>
                <!--<el-table-column  prop="status"  label="返回状态"></el-table-column>-->
                <el-table-column
                    prop="status"
                    label="状态"
                    width="100"
                    :filters="[{ text : 'success',value : 0},{text : 'fail' , value: 1}]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.status === 0  ? 'success' : 'danger'"
                            disable-transitions>{{scope.row.status === 0  ? 'success' : 'fail'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="operate" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="Execute(scope.$index, scope.row)">执行</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ansible',
        data() {
            return {
                ExecuteTask: [],
                Task: {
                    name: '',
                    env: '',
                    description: '',
                    host: '',
                    description_flag: null
                },
                rules: {
                    env: [
                        { required: true, message: '请输入环境名称',  trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入任务名称',  trigger: 'blur' }
                    ],
                    host: [
                        { required: true, message: '请输入主机ip', trigger: 'blur' }
                    ],
                    description_flag: [
                        { required: true, message: '请输入任务标识', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '请输入描述任务', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            createTask() {
                let taskInfo ={
                    env: this.Task.env,
                    name: this.Task.name,
                    description: this.Task.description,
                    host: this.Task.host,
                    description_flag: this.Task.description_flag
                };
                console.log('task_name:'+taskInfo.name)
                if ( !(taskInfo.name && taskInfo.description_flag && taskInfo.host && taskInfo.description && taskInfo.env) ){
                    this.$alert('填写必填字段','提示',{
                        confirmButtonText: '确定',
                    })
                    return 0;
                }
                this.$axios.post(`${devops_url}/backen/createtask/`,JSON.stringify(taskInfo))
                    .then( res =>  {
                         console.log(res.data)
                        if (res.data['success'] === 1){
                            this.getTask()
                        }
                        else {
                            this.$alert('创建任已存在','提示',{
                                confirmButtonText: '确定',
                            })
                        }

                    })
                    .catch( error => {
                        console.log(error)
                    })
            },
            filterTag(value, row) {
                // console.log(row.status)
                return row.status === value;
            },
            getTask(){
                this.$axios.get(`${devops_url}/backen/gettask/`)
                    .then(res =>{
                        console.log(res)
                        this.ExecuteTask = JSON.parse(res.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            Execute(index,row){
                const  loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let taskinfo ={
                    env: row.env,
                    name: row.name,
                    description: row.description,
                    host: row.host,
                    description_flag: row.description_flag
                };
                 this.$axios.post(`${devops_url}/backen/executeTask/`,JSON.stringify(taskinfo))
                     .then(res => {
                         console.log(res)
                         if ( res.data.status  === 0){
                             loading.close()
                             this.$alert('详情请查询JOB ID :' + res.data.job_id  ,'提示',{
                                 confirmButtonText: '确定',
                             })
                         }
                     })
            }
        },
        mounted: function () {
            this.getTask()
        }
    }


</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }
    .task-input {
        width: 130px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
