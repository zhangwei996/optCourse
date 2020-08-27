<template>
    <div class="body" id="Course_Selection_web">
        <div class="path-nav">
            <h1>图库管理</h1>
        </div>
        <div class="main-box">
            <div class="left-box">
                <div style="margin-left: 30px;margin-top: 30px;">
                        <span style="font-size:16px;font-weight:bold;">图库类别</span>
                </div>
                
                <div class="treeOperate" style="text-align: center;margin-top: 5%;">
                    <span>
                        <Tooltip content="新增图库类别" style="" placement="top" >
                            <Button type="primary" shape="circle" icon="ios-plus-outline" @click="openAddModal"></Button>
                        </Tooltip>
                        <Tooltip content="修改图库类别" style="margin-left:10%;" placement="top" >
                            <Button type="primary" shape="circle" icon="ios-compose-outline" @click="openEditModal"></Button>
                        </Tooltip>
                        <Tooltip content="删除图库类别" style="margin-left:10%;" placement="top" >
                            <Button type="primary" shape="circle" icon="ios-trash-outline" @click="openDelModal"></Button>
                        </Tooltip>
                    </span>
                </div>
                <Modal v-model="addGalleryCateModal" title="新增图库类别" @on-ok="AddGalleryCate">
                    <div><span>图库类别名称:</span><Input v-model="addGalleryCateData.name" style="width:300px;" placeholder="请输入新增图库类别名称" /></div>
                </Modal>
                <Modal v-model="editGalleryCateModal" title="编辑图库类别" @on-ok="EditGalleryCate">
                    <div><span>图库类别名称:</span><Input v-model="addGalleryCateData.name" style="width:300px;" placeholder="请输入图库类别名称" /></div>
                </Modal>
                <Modal v-model="delGalleryCateModal" title="删除图库类别" style="width:300px;" @on-ok="DeleteGalleryCate">
                    <Alert type="warning" show-icon>
                        <div>{{"确定要删除吗？"}}</div>
                    </Alert>
                </Modal>                    
                <div style="margin-left: 30px;margin-top: 20px;">
                    <div id="tree-box" class="ztree"></div>
                    <!-- <Tree :data="data1" ref="tree"  @on-select-change="getNodes"></Tree> -->
                </div>
            </div>
            <div class="right-box">
                <div v-if="uploadPerssion()">
                    <Upload :action="pictureImportUrl" :show-upload-list="false" 
                         accept=".jpg,.png,.jpeg" 
                        :on-success="importPicture">
                        <Button type="primary" style="margin-left: 30px;margin-top: 40px;" >上传图片</Button>
                    </Upload>
                </div>
                <!-- <div style="display:flex;flex-wrap: wrap;">
                    <div v-for="(item,index) in imgData" :key="index" style="margin-top: 30px;margin-left: 30px;">
                        <img :src="baseImgUrl+item.FileName" height="200">
                    </div>
                </div> -->
                <div class="Gallery_img_list">
                            <ul>
                                <li v-for="(item,index) in imgData" :key="index" >
                                    <img :src="baseImgUrl+item.FileName"  />
                                    <!-- <img v-if="item.Status" src="../../static/img/gou.png"/> -->
                                </li>
                            </ul>
                                
                        </div>
                <div class="custom-page-wrap" style="margin-right: 10px;">
                    <div style="margin-right:3%;">
                    <Page :total="total" :page-size="PageSize" show-sizer show-elevator show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" ></Page></div>
                </div>
            </div>
            <!-- <div class="main-box_s" v-show="false">
                <div style="width:300px;display: inline-block;vertical-align:top">
                    <div style="margin-left: 30px;">
                        <span style="font-size:16px;font-weight:bold;">图库类别</span>
                    </div>
                    <div style="margin-left: 30px;margin-top: 10px;">
                        <Icon type="ios-plus-outline" size="24" @click.native="openAddModal"></Icon>
                        <Icon type="ios-compose-outline" size="24" style="margin-left: 30px;" @click.native="openEditModal"></Icon>
                        <Icon type="ios-trash-outline" size="24" style="margin-left: 30px;" @click.native="openDelModal"></Icon>
                    </div>
                    <Modal v-model="addGalleryCateModal" title="新增图库类别" @on-ok="AddGalleryCate">
                        <div><span>图库类别名称:</span><Input v-model="addGalleryCateData.name" style="width:300px;" placeholder="请输入新增图库类别名称" /></div>
                    </Modal>
                    <Modal v-model="editGalleryCateModal" title="编辑图库类别" @on-ok="EditGalleryCate">
                        <div><span>图库类别名称:</span><Input v-model="addGalleryCateData.name" style="width:300px;" placeholder="请输入图库类别名称" /></div>
                    </Modal>
                    <Modal v-model="delGalleryCateModal" title="删除图库类别" style="width:300px;" @on-ok="DeleteGalleryCate">
                        <Alert type="warning" show-icon>
                            <div>{{"确定要删除吗？"}}</div>
                        </Alert>
                    </Modal>                    
                    <div>
                        <Tree :data="data1" ref="tree"  @on-select-change="getNodes"></Tree>
                    </div>
                </div>
                <div style="margin-left: 30px;display: inline-block;vertical-align:top">
                    <div v-if="uploadPerssion()">
                        <Upload :action="pictureImportUrl" :show-upload-list="false" 
                             accept=".jpg,.png,.jpeg" 
                            :on-success="importPicture">
                            <Button type="primary" >上传图片</Button>
                        </Upload>
                    </div>
                    <div v-for="(item,index) in imgData" :key="index">
                        <img :src="baseImgUrl+item.FileName" height="100">
                    </div>
                    <div>
                        <Page :total="total" show-sizer show-elevator show-total ></Page>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
// import myConfirm from '@/components/confirm';
 require("../../static/js/ztree/zTreeStyle.css");
import  '../../static/js/ztree/jquery.ztree.all.min.js';
export default {
    // components:{myConfirm},
    data(){
        return {
            data1: [],
            treeSelectNow:[],
            treeSelectNowId:0,
            treeSelectNowName:'',
            addGalleryCateModal:false,
            addGalleryCateData:{},
            editGalleryCateModal:false,
            delGalleryCateModal:false,
            PageSize:10,
            PageIndex:0,
            total:0,
            imgData:[],
            pictureImportUrl:"/api/OptCourse/OptCourse_List/upload?CategoryID=",

            baseImgUrl:process.env.NODE_ENV === 'production'?'':'http://debugold.hongyucloud.com/OptCourse/',
        };
    },
    mounted(){
        var _this=this;
        // _this.getTreeData();
        // _this.getImgData();
        _this.getTreeDataV2();
    },
    methods:{
        getTreeDataV2(){
            // CateList
            var _this=this;
            let data;
            const tree={
                view: {
                    dblClickExpand: false,
                    showIcon:false,
                },
                check: {
                    enable:false,
                    chkboxType: { "Y" : "ps", "N" : "ps" },
                    },
                callback:{}
            };
            tree.callback.onClick=(event, treeId, treeNode, clickFlag)=>{
                let check = treeNode.checked;
                let treeObj = $.fn.zTree.getZTreeObj(treeId);
                treeObj.checkNode(treeNode, !check, true);
                console.log(treeNode,treeNode.checked);
                console.log(treeNode.id)
                _this.treeSelectNowId=treeNode.id;
                _this.treeSelectNowName=treeNode.name;
                _this.pictureImportUrl="/api/OptCourse/OptCourse_List/upload?CategoryID="+treeNode.id;
                _this.getImgDataV2();
                // _this.treeSelectNow=treeNode;
                //console.log(treeNode);
            };
            tree.callback.onCheck=(event, treeId, treeNode)=>{
                // console.log(treeNode);
                console.log('click');
            };
            // let data =[   
            //     { name:"父节点3 - 没有子节点", isParent:true}  
            // ];
            // console.log( $.fn.zTree.init);
            _this.$api.get(APIConfig.OptCourse.GalleryCateList,null,resp=>{
                data=resp.Data;
                data.forEach(x=>{
                    x.open=true;
                });
                $.fn.zTree.init($('#tree-box'), tree,data);
                _this.getImgDataV2();
            });
            // setTimeout(() => {
            //     $.fn.zTree.init($('#tree-box'), tree,data);
            // }, 1000);
        },
        getTreeData(){
            var _this=this;
            _this.data1=[];
            _this.$api.get(APIConfig.OptCourse.GalleryCateList,null,(resp)=>{
                let data=resp.Data;
                if(data.length==1){
                    let obj={};
                    obj.title=data[0].name;
                    obj.id=data[0].id;
                    obj.expand = true;
                    obj.selected=false;
                    obj.children=[];
                    let child=data[0].children;
                    if(child.length>0){
                        //大类数据
                        child.forEach(x=>{
                            let tempchild={};
                            tempchild.id=x.id;
                            tempchild.pid=x.pid;
                            tempchild.UID=x.UID;
                            tempchild.title=x.name;
                            tempchild.SchSerID=x.SchSerID;
                            tempchild.expand=false;
                            tempchild.selected=false;
                            tempchild.children=[];
                            let secondChild=x.children;
                            if(secondChild.length>0){
                                //某一分支下的类数据
                                secondChild.forEach(y=>{
                                    let setemp={};
                                    setemp.id=y.id;
                                    setemp.pid=y.pid;
                                    setemp.UID=y.UID;
                                    setemp.title=y.name;
                                    setemp.SchSerID=y.SchSerID;
                                    setemp.expand=false;
                                    setemp.selected=false;
                                    setemp.children=y.children;
                                    tempchild.children.push(setemp);
                                });
                            }
                            obj.children.push(tempchild);
                        });
                    }
                    let data1size=_this.data1.push(obj);
                    _this.treeSelectNow=_this.data1;
                    _this.getImgData();
                }
            });
        },
        getImgData(){
            var _this=this;
            let CategoryID=_this.treeSelectNow[0].id;
            // let CategoryID=0;
            let PageSize=_this.PageSize;
            let PageIndex=_this.PageIndex;
            _this.$api.get(APIConfig.OptCourse.GalleryList,{CategoryID:CategoryID,PageSize:PageSize,PageIndex:PageIndex},resp=>{
                _this.total=resp.Page.sumDataCount;
                _this.imgData=resp.Data;
            });
        },
        getImgDataV2(){
            var _this=this;
            let CategoryID=_this.treeSelectNowId;
            // let CategoryID=0;
            let PageSize=_this.PageSize;
            let PageIndex=_this.PageIndex;
            _this.$api.get(APIConfig.OptCourse.GalleryList,{CategoryID:CategoryID,PageSize:PageSize,PageIndex:PageIndex},resp=>{
                _this.total=resp.Page.sumDataCount;
                _this.imgData=resp.Data;
            });
        }, 
        getNodes:function(data){
            var _this=this;
            console.log(data);
            // console.log(data[0].id)
            _this.treeSelectNow=data;
            _this.pictureImportUrl="/api/OptCourse/OptCourse_List/upload?CategoryID="+data[0].id;
            _this.getImgData();
        },
        AddGalleryCate(){
            var _this=this;
            // console.log(_this.treeSelectNow[0].id);
            let pid=_this.treeSelectNowId;
            let name=_this.addGalleryCateData.name;
            _this.$api.post(APIConfig.OptCourse.AddGalleryCate,{pid:pid,name:name},resp=>{
                _this.getTreeDataV2();
            });
        },
        EditGalleryCate(){
            var _this=this;
            let SerID=_this.treeSelectNowId;
            let name=_this.addGalleryCateData.name;
            _this.$api.post(APIConfig.OptCourse.EditGalleryCate,{SerID:SerID,name:name},resp=>{
                _this.getTreeDataV2();
            });
        },
        DeleteGalleryCate(){
            var _this=this;
            let ids=_this.treeSelectNowId;
            _this.$api.get(APIConfig.OptCourse.DeleteGalleryCate,{ids:ids},resp=>{
                _this.getTreeDataV2();
            })
        },
        openAddModal(){
            var _this=this;
            //_this.addGalleryCateModal=true;
            let deep=_this.treeSelectNowId;
            if(deep<0){
                // alert("该类别已是最小类别，无法在其下创建子类别")
                _this.$Message.info("该类别已是最小类别，无法在其下创建子类别");
            }else{
                _this.addGalleryCateData={};
                _this.addGalleryCateModal=true;
            }
        },
        openEditModal(){
            var _this=this;
            let deep=_this.treeSelectNowId;
            if(deep==0){
                // alert("默认选择为根节点，无法编辑，请选择具体类别")
                _this.$Message.info("当前/默认选择为根节点，无法编辑，请选择具体类别");
            }else{
                _this.addGalleryCateData.name=_this.treeSelectNowName;
                _this.editGalleryCateModal=true;
            }
        },
        openDelModal(){
            var _this=this;
            let deep=_this.treeSelectNowId;
            if(deep>0){
                _this.delGalleryCateModal=true;
            }else{
                // alert("当前（默认）选择为根节点，无法删除")
                _this.$Message.info("当前/默认选择为根节点，无法删除");
            }
        },
        uploadPerssion(){
            var _this=this;
            let deep=_this.treeSelectNowId;
            if(deep>=0){
                return true;
            }else{
                return false;
            }
        },
        importPicture(response, file, fileList){
            var _this=this;
            _this.treeSelectNowId=0;
            _this.getImgDataV2();
        },
        pageChange(index){
            var _this=this;
            _this.PageIndex=index-1;
            _this.getImgDataV2();
        },
        pageSizeChange(pagesize){
            var _this=this;
            _this.PageSize=pagesize;
            _this.getImgDataV2();
        },
        getNodeDeep(id){
            var _this=this;
            let tree=_this.data1[0];
            let deep=0;
            if(id!=tree.id){
                deep=deep+1;
                let temp=tree.children;
                let flag=false;
                temp.forEach(x=>{
                    if(id==x.id){
                        flag=true;
                    }
                });
                if(!flag){
                    deep=deep+1;
                }
            }
            return deep;
        },
    },
}
</script>
<style lang="scss">
.ivu-tree-title-selected, .ivu-tree-title-selected:hover {
    background-color: #4a26d8;
    color: aliceblue;
}


.ivu-tree-arrow{
    width: 18px;
   background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyZGZlOTFmYy1hYjIyLWY4NGQtOGEzMi0wODcyYjZlMTRkZmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjM5M0I1REM4QjI2MTFFOEIzNzdDMUUyNTE1NzFGNkMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjM5M0I1REI4QjI2MTFFOEIzNzdDMUUyNTE1NzFGNkMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpiMWMxMGY0Ni1mYjc4LTQ5MmUtYjk2Zi1jMGVlMDVkZjU4MWEiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3MDBkZWMzOS02OWU5LWU5NDYtYjUxZC1jNjQ5ZGQzY2U3MzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz71iRsDAAAAQklEQVR42mK8evXqfwYKAQuUZqTAjP9MDFQAdDPk/6BxCX0MYSEyDNDFGAkZwojFAMYRFLDEGMI49NIJRWUKQIABAKMlCaedVmGBAAAAAElFTkSuQmCC) no-repeat 0;
}
.ivu-tree-arrow.ivu-tree-arrow-open{
 background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyZGZlOTFmYy1hYjIyLWY4NGQtOGEzMi0wODcyYjZlMTRkZmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjM5M0I1RDg4QjI2MTFFOEIzNzdDMUUyNTE1NzFGNkMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjM5M0I1RDc4QjI2MTFFOEIzNzdDMUUyNTE1NzFGNkMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpiMWMxMGY0Ni1mYjc4LTQ5MmUtYjk2Zi1jMGVlMDVkZjU4MWEiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3MDBkZWMzOS02OWU5LWU5NDYtYjUxZC1jNjQ5ZGQzY2U3MzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6fUSyhAAAANklEQVR42mK8evXqfwYKAQuUZqTAjP9MDFQAo4bQyBAWbFFGhD5GQoYwjsbOcEwnFJUpAAEGAAFyBqgsvsnqAAAAAElFTkSuQmCC) no-repeat 0;
}
.ivu-tree-arrow i{
    opacity: 0;
}

.left-box{
    width:250px;
    background: #fff;
    height: 100%;
    float: left;
}
.right-box{
    margin-left: 265px;
    background: #fff;
    height: 100%;
}
</style>