<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 用户信息表</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <div>
            <el-form :inline="true" :model="register">
                <el-form-item label="用户名">
                    <el-input v-model="register.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input  type="password" v-model="register.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createUser">创建用户</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="container">
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column label="序号" type="index" width="180"></el-table-column>
                <el-table-column prop="username" label="用户名" width="180">
                    <template slot-scope = "scope">
                        <span style="margin-left: 10px"> {{ scope.row.username}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="password" label="密码"> </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>

</template>

<script>
    export default {
        name: 'user',
        data() {
            return {
                tableData: [],
                register: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            createUser() {
                let info={
                    username: this.register.username,
                    password: this.register.password,
                };
                this.$axios.post(`${devops_url}/backen/register/`
                    ,JSON.stringify(info))
                    .then(res => {
                        if (res.data['success'] ===  1){
                            this.$alert('创建成功','提示',{
                                confirmButtonText: '确定',
                                callback: action => {
                                    // this.$message({
                                    //     type: 'info',
                                    //     message: `action: ${ action}`,
                                    // })
                                }
                            })
                            this.UserInfo();
                        }
                        else  if (res.data === 0 ) {
                            alert(' error ')
                        }
                    })
                    .catch(error => {
                        console.log('register error')
                    })
            },
            UserInfo() {
                this.$axios.get(`${devops_url}/backen/user/`)
                    .then(res =>  {
                        this.tableData = JSON.parse(res.data)
                        // console.log(this.tableData)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            handleDelete(index ,row){
                console.log(row.username);
                let delete_info ={
                    'username' : row.username
                };
                this.$axios.delete(`${devops_url}/backen/user/`,{data:JSON.stringify(delete_info)})
                    .then(res => {
                        console.log(res)
                        if (res.data ===  1){
                            this.$alert('删除成功','提示',{
                                confirmButtonText: '确定',
                                callback: action => {
                                    // this.$message({
                                    //     type: 'info',
                                    //     message: `action: ${ action }`
                                    // })
                                }
                            })
                            this.UserInfo();
                        }
                    })
            }
        },
        created: function () {
            this.UserInfo()
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

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }

</style>
