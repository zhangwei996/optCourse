<template>
  <div>
      <!-- 自定义上传附件 -->
     
        <Upload
            multiple
            :data="uploadData"
            :on-success="encloSuccess"
            :on-remove="encloRemove"
            :default-file-list="defaultList "
            :action="uploadFileUrl"
            :accept="fileType"
            :multiple="isMultiple"
            :before-upload="handleUpload"
        >
            <i-button type="primary" style="padding: 7px 45px;margin-right: 15px;"><Icon type="ios-cloud-upload-outline"></Icon>上传图片</i-button>
        </Upload>
  </div>
</template>

<script>
export default {
  props: {
    // 应用类型
    appType:String,
    defaultList:Array,
    fileids:Array,
    fileType:String,
    multiple:Boolean,
  },
  model:{
    prop: 'fileids',
    event: 'ids'
  },
  data () {
    return {
        uploadData:{
            AppType:this.appType,
        },
        isMultiple: !this.multiple || false ,
        uploadFileUrl:APIConfig.Base.FileUpload,
	}
  },
  methods: {
    encloSuccess(resp){
        this.fileids.push(resp.fileid);
        this.$emit('ids', this.fileids);
    },
    encloRemove(fileList){//删除文件
        var list, arry=[];

        //默认的列表(编辑)
        if(fileList.fileid) list=fileList;
        //刚刚上传的
        else list=fileList.response;
        let fileid=list.fileid;
        
        this.fileids.forEach(element => {
            if(element!=fileid)
                arry.push(element);
        });
        this.$emit('ids',arry);
    },
    handleUpload(){//阻止上传
        if(!this.isMultiple && this.fileids.length>0){
            this.$Message.info('仅允许上传一个附件！');
            return false;
        }
    }
  }
}  
</script>
<style lang="scss">
</style>
