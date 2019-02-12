<template>
    <div class="approval">

        <div class="application">
            <el-button type="primary" class="el-icon-circle-plus" @click="dialogFormVisible = true">新增项目</el-button>
            <el-dialog title="新增项目" :visible.sync="dialogFormVisible">
                <el-form :model="application">
                    <el-form-item label="项目名称"  :label-width="formLabelWidth">
                        <el-input v-model="application.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="项目负责人" :label-width="formLabelWidth" >
                        <el-input v-model="application.developer"  ></el-input>
                    </el-form-item>
                    <el-form-item label="测试人员" :label-width="formLabelWidth" >
                        <el-input v-model="application.testers" ></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间"  :label-width="formLabelWidth">
                        <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" v-model="application.date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="上传文件"  :label-width="formLabelWidth" prop="filestatus" >
                        <el-radio-group v-model="application.filestatus">
                            <el-radio :label=1>是</el-radio>
                            <el-radio :label=0>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="上传文件"  v-show="application.filestatus" :label-width="formLabelWidth">
                        <el-upload
                                action=""
                                name="uploadProject"
                                :http-request="uploadFile"
                        >
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注信息"  :label-width="formLabelWidth">
                        <el-input  type="textarea" v-model="application.remark" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="uploadData()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="">

            <el-table :data="approval"   border style="width: 100%" >
                <el-table-column  label="序号" type="index" width="180"></el-table-column>
                <el-table-column prop="name"      label="项目名称" width="180"></el-table-column>
                <el-table-column prop="developer" label="项目负责人" width="180"></el-table-column>
                <el-table-column prop="testers"   label="测试人员" width="180"></el-table-column>
                <el-table-column prop="execute_data"      label="发布日期" width="180"></el-table-column>
                <el-table-column prop="current_date"      label="申请提交时间" width="180"></el-table-column>
                <el-table-column prop="remark"    label="备注信息" width="180"></el-table-column>
                <el-table-column prop="file_url"    label="附件路径" width="180"></el-table-column>
                <el-table-column prop="approver"  label="执行人" width="180"></el-table-column>
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
                        <el-button size="mini"  :disabled="false" type="primary" @click="Execute(scope.$index, scope.row)">执行</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                formLabelWidth: '120px',
                dialogFormVisible: false,
                filedisplay: 0,
                approval:[],
                // approval:[{
                //     name: 'test',
                //     developer: '小王',
                //     testers: '小张',
                //     date: '2019-01-01 16:00:00',
                //     remark: '没毛病',
                //     approver: '二麻子'
                // }],
                application:{
                    name: '',
                    developer: '',
                    testers: '',
                    date: '',
                    remark: '',
                    filedata:'',
                    filestatus: 0
                }
            }
        },
        methods: {
            filterTag(value, row) {
                // console.log(row.status)
                return row.status === value;
            },
            uploadFile(file){
                this.application.filedata=file.file
            },
            approvalInfo() {
                this.$axios.get(`${devops_url}/backen/deployment/`)
                    .then(res =>  {
                        console.log(res.data)
                        // this.tableData = JSON.parse(res.data)
                        this.approval = JSON.parse(res.data)
                        // console.log(this.tableData)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            uploadData() {
                // if (this.uploadsql.length === 0) {
                //     this.$message({
                //         message: '请先选择sql文件',
                //         type: 'error'
                //     })
                //     return false
                // }
                let uploaddata ={};
                let username = localStorage.getItem('ms_username');
                let formdata = new FormData();
                formdata.append('name',this.application.name);
                formdata.append('developer',this.application.developer);
                formdata.append('testers',this.application.testers);
                formdata.append('date',this.application.date);
                formdata.append('remark',this.application.remark);
                formdata.append('filedata',this.application.filedata);
                formdata.append('filestatus',this.application.filestatus);
                formdata.append('approver',username);
                // for ( var pair  of formdata.entries()){
                //     uploaddata[pair[0]] = pair[1]
                //     console.log(`${pair[1]}`)
                // }
                this.dialogFormVisible = false;
                this.$axios.post(`${devops_url}/backen/deployment/`
                    ,formdata)
                    .then(res => {
                        if (res.data['status'] ===  0 ){
                            this.$alert('执行成功：' + res.data['filename'],'返回文件名称',{
                                confirmButtonText: '确定',
                            })
                            // this.$refs.upload.clearFiles();
                        }
                        else {
                            this.$alert('报错信息：' +  res.data['err_message'],'返回文件名称',{
                                confirmButtonText: '确定',
                            })
                            // this.$refs.upload.clearFiles();
                        }
                        console.log("uploadFile success");
                    })
            }

        },
        created: function () {
            this.approvalInfo()
        }
    }

</script>

<style>

</style>