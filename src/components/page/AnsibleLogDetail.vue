<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> Ansible Job 日志详情 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="50%">
                    <el-row>
                        <el-col :span="24"><div class="grid-content bg-purple">Result</div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12"><div class="grid-content bg-purple-light">NAME</div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple">{{ taskdata.job_name }}</div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12"><div class="grid-content bg-purple">JOB ID</div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple">{{ taskdata.job_id }}</div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12"><div class="grid-content bg-purple">STATUS</div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple">{{ taskdata.job_status }}</div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12"><div class="grid-content bg-purple">EXECUTE TIME</div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple">{{ taskdata.current_date }}</div></el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <div v-for=" value in taskdata.job_stdout">
                        <div >
                            <ul>
                                <li class="std_job" v-for="(item_value ,item_key) in value"  v-if=" item_key === 'ip_addr' ">  {{  item_key  }} : {{ item_value }}</li>
                                <li class="std_job" v-for="(item_value ,item_key) in value"  v-if=" item_key !== 'ip_addr'">   {{  item_key  }} : {{ item_value }}</li>
                                <span style="text-align: left ; margin:0 ">------------------------------------------------------------------------------</span>
                            </ul>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: 'ansiblelogdetail',
        data() {
            return {
                taskdata: {
                    job_name: '',
                    job_id: '',
                    job_status: '',
                    current_date: '',
                    job_stdout:[]
                }
            }
        },
        methods: {
            Detail(){
                let taskinfo={
                    job_id: this.$route.params.job_id,
                };
                console.log(`job_id :${taskinfo.job_id} , devops_url : ${devops_url}`)
                this.$axios.get(`${devops_url}/backen/ansiblelogdetail/${taskinfo.job_id}/`)
                     .then( res => {
                        if ( res ){
                            this.taskdata = JSON.parse(res.data)
                            this.taskdata.job_stdout = JSON.parse(this.taskdata.job_stdout)
                            console.log('jobid' + this.taskdata.job_stdout )
                        }
                    })
            }
        },
        mounted: function () {
            this.Detail()
        }
    }

</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        /*line-height: 200px;*/
    }
    ul {margin:0;padding:0}
    li {margin:10px;
        padding:10px;
        list-style:none;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        /*line-height: 160px;*/
    }
    .grid-content {
        border-radius: 4px;
        min-height: 40px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }
    .std_job {
        text-align: left;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
