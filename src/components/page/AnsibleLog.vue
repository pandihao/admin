<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> Ansible Job 日志 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-button type="primary" @click="firstLoadinPage">刷新日志信息</el-button>
        </div>
        <div class="container">
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column prop="job_id"  label="Job 序号" width="180"></el-table-column>
                <el-table-column prop="job_name" label="执行任务名称" width="180">
                </el-table-column>
                <el-table-column prop="current_date" label="时间"> </el-table-column>
                <el-table-column
                    prop="job_status"
                    label="返回状态"
                    width="100"
                    :filters="[{ text : 'success',value : 0},{text : 'fail' , value: 1}]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.job_status === 0  ? 'success' : 'danger'"
                            disable-transitions>{{scope.row.job_status === 0  ? 'success' : 'fail'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column  label="日志详情">
                    <template slot-scope="scope">
                        <el-button type="primary"  round @click="GetDetail(scope.$index, scope.row)"> 详情 </el-button>
                    </template>>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                layout="prev, pager, next"
                :page-size="1"
                :total=" dataLen ">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ansiblelog',
        data() {
            return {
                tableData: [
                ],
                dataLen: null
            }
        },
        methods: {
            filterTag(value, row) {
                // console.log(row.status)
                return row.job_status === value;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            firstLoadinPage(){
                this.$axios.get(`${devops_url}/backen/ansiblelog/`,{
                    params: {
                        current_page : 1
                    }
                })
                    .then( res =>  {
                        console.log(res.data)
                        this.tableData = JSON.parse(res.data.data)
                        this.dataLen   = parseInt(res.data.data_len / 20 + 1)
                        console.log( this.dataLen)
                    })
                    .catch( error => {
                        console.log(error)
                    })
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.$axios.get(`${devops_url}/backen/ansiblelog/`,{
                    params: {
                        current_page : val
                    }
                })
                    .then( res =>  {
                        this.tableData = JSON.parse(res.data.data)
                        this.dataLen   = parseInt(res.data.data_len / 20 + 1)
                        console.log(res.data)
                    })
                    .catch( error => {
                        console.log(error)
                    })
            },
            GetDetail(index,row){
                console.log( 'entry log detail')
                let taskinfo ={
                    job_id: row.job_id,
                };
                this.$router.push({
                    path: `/joblog/${taskinfo.job_id}`
                })
            }
        },
        created: function () {
            this.firstLoadinPage()
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
    .up{
        background-color: #67C23A;
    }

    .down {
        background-color: #F56C6C;
    }
</style>
