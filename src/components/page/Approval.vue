<template>
    <div class="approval">

        <div class="application">

            <el-button type="primary" class="el-icon-circle-plus" @click="dialogFormVisible = true">新增项目</el-button>
            <el-dialog title="新增项目" :visible.sync="dialogFormVisible">
                <el-form :model="application">
                    <el-form-item label="项目名称" >
                        <el-input v-model="application.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="项目负责人" >
                        <el-input v-model="application.developer" ></el-input>
                    </el-form-item>
                    <el-form-item label="测试人员" >
                        <el-input v-model="application.testers" ></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间" >
                        <el-date-picker type="datetime" placeholder="选择时间" v-model="application.date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="上传文件" >
                        <el-upload
                                class="upload-demo"
                                ref="upload_file"
                                action=""
                                :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注信息" >
                        <el-input  type="textarea" v-model="application.remark" ></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="">

            <el-table :data="approval"   border style="width: 100%" >
                <el-table-column  label="序号" type="index" width="180"></el-table-column>
                <el-table-column prop="name"      label="项目名称" width="180"></el-table-column>
                <el-table-column prop="developer" label="项目负责人" width="180"></el-table-column>
                <el-table-column prop="testers"   label="测试人员" width="180"></el-table-column>
                <el-table-column prop="date"      label="发布日期" width="180"></el-table-column>
                <el-table-column prop="remark"    label="备注信息" width="180"></el-table-column>
                <el-table-column prop="approver"  label="执行人" width="180"></el-table-column>
                <!--<el-table-column-->
                        <!--prop="status"-->
                        <!--label="状态"-->
                        <!--width="100"-->
                        <!--:filters="[{ text : 'success',value : 0},{text : 'fail' , value: 1}]"-->
                        <!--:filter-method="filterTag"-->
                        <!--filter-placement="bottom-end">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-tag-->
                                <!--:type="scope.row.status === 0  ? 'success' : 'danger'"-->
                                <!--disable-transitions>{{scope.row.status === 0  ? 'success' : 'fail'}}</el-tag>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="operate" label="操作">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button size="mini" type="primary" @click="Execute(scope.$index, scope.row)">执行</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                formLabelWidth: '150px',
                dialogFormVisible: false,
                approval:[{
                    name: 'test',
                    developer: '小王',
                    testers: '小张',
                    date: '2019-01-01 16:00:00',
                    remark: '没毛病',
                    approver: '二麻子'
                }],
                application:{
                    name: '',
                    developer: '',
                    testers: '',
                    date: '',
                    remark: '',
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }

</script>

<style scoped>
.pload-demo {

}
</style>