<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>Mysql数据执行</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                MySQL脚本执行页面
            </div>
            <el-upload
                class="upload-demo"
                name="upload_file"
                ref="upload"
                action="http://test1-django.yunqueyi.com/backen/uploadsql/"
                :on-success="handlSucess"
                :before-upload="beforeAvatarUpload"
                :auto-upload="false"
                :limit="1"
                :on-exceed="handleExceed"
                accept=".sql"
                drag
                :data="DatabaseEnv"
                :headers="UploadHeader"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将.sql文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <el-form :inline="true" :model="DatabaseEnv" :rules="rules" ref="DatabaseEnv">
                <el-form-item label="数据库环境及实例" prop="dataenv">
                    <el-select v-model="DatabaseEnv.dataenv" placeholder="请选择数据库环境">
                        <el-option label="test1环境" value="test1"></el-option>
                        <el-option label="test2环境" value="test2"></el-option>
                        <el-option label="uat环境" value="uat"></el-option>
                    </el-select>
                    <el-select v-model="DatabaseEnv.instance" placeholder="请选择数据库实例">
                        <el-option label="pica数据库" value="pica"></el-option>
                        <el-option label="pica_log数据库" value="pica_log"></el-option>
                        <el-option label="pica_md数据库" value="pica_md"></el-option>
                        <el-option label="pica_medical数据库" value="pica_medical"></el-option>
                        <el-option label="pica_message数据库" value="pica_message"></el-option>
                        <el-option label="pica_oa数据库" value="pica_oa"></el-option>
                        <el-option label="pica_shorturl数据库" value="pica_shorturl"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload('DatabaseEnv')">上传并执行sql</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    export default {
        name: 'sql',
        data: function(){
            return {
                DatabaseEnv: {
                    dataenv: '',
                    instance: ''
                },
                rules: {
                    dataenv : [
                      {required: true, message: '数据库环境', trigger: 'blur'}
                  ],
                    instance:[
                        {required: true, message: '数据库环境', trigger: 'blur'}
                    ]
                },
                UploadHeader: {
                    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Authorization': localStorage.getItem('user_token')
                }
            }
        },
        methods:{
            handlSucess(response,file){
                console.log(response)
                if (response['status'] ===  0 ){
                    this.$alert('执行成功：' + response['filename'],'返回文件名称',{
                        confirmButtonText: '确定',
                    })
                    this.$refs.upload.clearFiles();
                }
                else {
                    this.$alert('报错信息：' + response['err_message'],'返回文件名称',{
                        confirmButtonText: '确定',
                    })
                    this.$refs.upload.clearFiles();
                }
            },
            submitUpload(Dataname){
                this.$refs[Dataname].validate((valid) =>{
                    if(valid) {
                        this.$refs.upload.submit();
                    }
                    else {
                        console.log('error submit');
                        return false
                    }
                });
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            beforeAvatarUpload(file) {
                console.log(file)
                const regex_name = /.*\.sql/
                const isLt50M = file.size / 1024 / 1024 < 50
                const isSql   = regex_name.test(file.name)
                if ( !isSql ){
                    this.$message.error('上传文件只能是sql格式!');
                }
                if ( !isLt50M){
                    this.$message.error('上传文件不能超过50MB!');
                }
                return isSql && isLt50M;
            }
        }

    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>
