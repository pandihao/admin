<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 阿里云服务器信息表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
        <el-button type="primary" @click="EcsInfo">刷新主机信息</el-button>
    </div>
        <div class="container">
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column label="序号" type="index" width="180"></el-table-column>
                <el-table-column prop="name" label="ECS名称" width="180">
                    <template slot-scope = "scope">
                        <span style="margin-left: 10px"> {{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="public_ip" label="公网IP"> </el-table-column>
                <el-table-column prop="internal_ip" label="公网IP"> </el-table-column>
                <el-table-column prop="cpu" label="CPU核数"> </el-table-column>
                <el-table-column prop="memory" label="内存(MB)"> </el-table-column>
                <!--<el-table-column  prop="status"  label="状态"></el-table-column>-->
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
                <el-table-column label="操作"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

export default {
        name: 'ecs',
        data() {
            return {
                tableData: [],
                Status:{
                    up: false,
                    down: false
                }
            }
        },
        methods: {
            EcsInfo() {
                this.$axios.get(`${devops_url}/backen/ecs/`)
                    .then( res =>  {
                        this.tableData = JSON.parse(res.data);
                    })
                    .catch( error => {
                        console.log(error);
                    })
            },
            filterTag(value, row) {
                // console.log(row.status)
                return row.status === value;
            }
        },
        created: function () {
            this.EcsInfo()
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
