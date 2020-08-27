<template>
    <div class="body" id="Course_Selection_web">
        <div class="path-nav">
            <h1>我的课程</h1>
        </div>
        <div class="main-box">
            <div class="left-box">
                <div style="margin-left: 30px;margin-top: 30px;">
                    <span style="font-size:16px;font-weight:bold;">场次选择:</span>
                    <Select style="width: 150px;" v-model="ActiveSelectNow.ActivityID" @on-change="getChangeOptCourseList">
                        <Option v-for="item in activeList" :key="item.SerID" :value="item.SerID">{{item.Name}}</Option>
                    </Select>
                </div>
                <div style="margin-left: 30px;margin-top: 30px;">
                        <span style="font-size:16px;font-weight:bold;">课程类别</span>
                </div>
                <div class="treeOperate" style="text-align: center;margin-top: 5%;" v-if="nowUser.uType==1">
                    <span>
                        <Tooltip content="新增课程类别" style="" placement="top" >
                            <Button type="primary" shape="circle" icon="ios-plus-outline" @click="openAddCourseTreeModal"></Button>
                        </Tooltip>
                        <Tooltip content="修改课程类别" style="margin-left:10%;" placement="top" >
                            <Button type="primary" shape="circle" icon="ios-compose-outline" @click="openEditCourseTreeModalV2"></Button>
                        </Tooltip>
                        <Tooltip content="删除课程类别" style="margin-left:10%;" placement="top" >
                            <Button type="primary" shape="circle" icon="ios-trash-outline" @click="openDelCourseTreeModal"></Button>
                        </Tooltip>
                    </span>
                </div>
                <div style="margin-left: 30px;margin-top: 20px;" >
                    <!-- :indent="0" -->
                    <div id="tree-box" class="ztree"></div>
                    <!-- <Tree :data="data1" ref="tree"  @on-select-change="getNodes" ></Tree> -->
                    <!-- <el-tree :data="data1" ref="tree"  @on-select-change="getNodes" :indent='0'></el-tree> -->
                </div>
            </div>
            <div class="right-box">
                <Tabs >
                    <TabPane label="图表">
                        <div style="margin-left: 1%;margin-right: 1%;padding-top: 10px;padding-bottom: 10px;">
                            <div style="background: #eee;">
                                <div style="padding-top: 20px;padding-bottom: 20px;margin-left: 1%;margin-right: 1%;display:flex;">
                                    <div style="margin-right: 1%;"><Button type="primary" style="background:#4a26d8;" @click="openAddModal">新增课程</Button></div>
                                    <div style="margin-right: 1%;"><Button type="success" @click="openModalcModal" >同步老课程</Button></div>
                                    <div style="margin-right: 1%;"><Input v-model="OptName" style="width:150px;" clearable  placeholder="请输入课程名称进行搜索" @on-change="getOptCourseListV2" /></div>
                                    <div style="margin-right: 1%;"><Button type="primary" @click="getOptCourseListV2">搜索</Button></div>
                                    <div style="margin-right: 1%;" v-if="treeSelectNowId !=0"><Button type="primary" style="background:#4a26d8;" @click="ImportCourse">批量导入课程</Button></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="Courses">
                            <ul class="Courses_box">
                                <li class="Courses_list" v-for="(item,index) in data4" :key="index">
                                    <div class="Courses_lists">
                                        <div class="Coursess"> <p><a>{{item.OptName}}</a></p> <img :src="baseImgUrl+item.ImgurlName" /> </div>
                                        <div class="Coursess_bottom1"> 
                                            <div class="Coursess_lis">
                                                <span>任课教师：<a style="color:#234;cursor:default">{{item.TeaName}}</a></span>
                                            </div>
                                            <div class="Coursess_lis">
                                            <span> 
                                                <!-- <i-Button type="primary" shape="circle" icon="eye" @click="getCourseDetail(item.SerID)"></i-Button> -->
                                                <!-- class="operating3" -->
                                                <Tooltip content="查看详情" style="margin-right:1%;cursor: pointer;" placement="top" >
                                                    <!-- <Icon type="eye" size="20" @click.native="openCourseDetailModal(item)"></Icon> -->
                                                    <Button type="primary" shape="circle" size="large" icon="eye" @click="openCourseDetailModal(item)"></Button>
                                                </Tooltip>
                                                <Tooltip content="编辑课程"  style="margin-right:1%;cursor: pointer;" placement="top">
                                                    <!-- <Icon type="ios-compose-outline" size="20"  @click.native="openCourseEditModal(item)"></Icon> -->
                                                    <Button type="primary" shape="circle" size="large" icon="ios-compose-outline" @click="openCourseEditModal(item)"></Button>
                                                </Tooltip>
                                                <Tooltip content="提前录取" style="margin-right:1%;cursor: pointer;" placement="top">
                                                    <!-- <Icon type="person" size="20"  @click.native="openCourseSetModal(item)"></Icon> -->
                                                    <Button type="primary" shape="circle" size="large" icon="person" @click="openCourseSetModal(item)"></Button>
                                                </Tooltip>
                                                <Tooltip content="删除课程" style="cursor: pointer;" placement="top">
                                                    <!-- <Icon type="ios-trash" size="20"  @click.native="openCourseDelModal(item)"></Icon> -->
                                                    <Button type="primary" shape="circle" size="large" icon="ios-trash" @click="openCourseDelModal(item)"></Button>
                                                </Tooltip>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <span class="justify_fix"></span>
                            </ul>
                        </div>
                    </TabPane>
                    <TabPane label="列表">
                        <div style="margin-left: 1%;margin-right: 1%;padding-top: 10px;padding-bottom: 10px;">
                            <div style="background: #eee;">
                                <div style="padding-top: 20px;padding-bottom: 20px;margin-left: 1%;margin-right: 1%;display:flex;">
                                    <div style="margin-right: 1%;"><Button type="primary" style="background:#4a26d8;" @click="openAddModal">新增课程</Button></div>
                                    <div style="margin-right: 1%;"><Button type="success" @click="openModalcModal" >同步老课程</Button></div>
                                    <div style="margin-right: 1%;"><Input v-model="OptName" style="width:150px;" clearable  placeholder="请输入课程名称进行搜索" @on-change="getOptCourseListV2" /></div>
                                    <div style="margin-right: 1%;"><Button type="primary" @click="getOptCourseListV2">搜索</Button></div>
                                    <div style="margin-right: 1%;" v-if="treeSelectNowId !=0"><Button type="primary" style="background:#4a26d8;" @click="ImportCourse">批量导入课程</Button></div>
                                    <div style="margin-right: 1%;"><Button type="ghost" @click="delSeveralCourse" style="color: red;">删除</Button></div>
                                </div>
                            </div>
                        </div>
                        <Table :columns="columns4" :data="data4" no-data-text="暂无数据" @on-selection-change="getSelCourse"></Table>
                    </TabPane>
                </Tabs>
                <div class="custom-page-wrap" >
                    <!-- <Button style="margin-top: 1%;margin-left: 2%;margin-bottom: 1%;" v-show="tabName==1">删除</Button> -->
                    <div style="margin-right:3%;"><Page :total="total" :page-size="PageSize" show-sizer show-elevator show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" ></Page></div>
                </div>
            </div>
            <Modal v-model="CourseTree.addCourseModal" title="新增课程类别" @on-ok="AddCourseV2">
                <div><span>课程类别名称:</span><Input v-model="CourseTree.name" style="width:300px;" placeholder="请输入新增课程类别名称" /></div>
            </Modal>
            <Modal v-model="CourseTree.editCourseModal" title="编辑课程类别" @on-ok="EditCourseV2">
                <div><span>课程类别名称:</span><Input v-model="CourseTree.name" style="width:300px;" placeholder="请输入课程类别名称" /></div>
            </Modal>
            <Modal v-model="CourseTree.delCourseModal" title="删除课程类别" style="width:300px;" @on-ok="DeleteCourseV2">
                <Alert type="warning" show-icon>
                    <div>{{"确定要删除吗？"}}</div>
                </Alert>
            </Modal>   

            <Modal v-model="modalc" title="同步老课程"  width="80%" class="Students1 Students1cs">
                <p><em>历史场次选择:</em>
                    <i-select class="mr10" v-model="SYOldCourse" @on-change="getSYOptCourse()" placeholder="请选择历史场次">
                        <i-option v-for="item in actListTea" :key="item.SerID" :value="item.SerID">{{item.Name}}</i-option> 
                    </i-select>
                </p>
                <Transfer :data="SYCourseList" :target-keys="targetKeys2" filterable @on-change="SYoldToNew"></Transfer>
                <div slot="footer">
                    <i-Button type="ghost" @click="closeSYCourse">取消</i-Button>
                    <i-Button type="primary" @click="oldCourseToNew()">确定</i-Button>
                </div>
            </Modal>

            <Modal v-model="importCourse.importCourseModal" title="课程导入" class="ccdr">
                <div class="Students_buttom">
                    <Upload  class="fr btn"  style="float:right;" :action="courseImportUrl_1" :show-upload-list="false"  accept=".xls,.xlsx"  :on-success="importFile">
                        <i-Button type="success" style="padding: 7px 45px;margin-right: 15px;">导入课程</i-Button>
                    </Upload>
                    <a href="javascript:;" @click="downFile" style="line-height:32px;float:right;margin-right:15px">下载[网上开课样表.xls]</a>
                </div>
                <div v-if="importCourse.importCourseData.Data != null">
                    <div v-if="importCourse.importCourseData.State==true" style="color:green;">导入成功！</div>
                    <div v-else style="color:red;">导入失败，请修改Excel文件中相关数据后再重新上传！</div>
                    <Table :columns="columns3" :data="importCourse.importCourseData.Data" no-data-text="暂无数据"></Table>
                </div>
            </Modal>

            <Modal v-model="CourseOperation.courseDetailModal" title="课程详情" class="ckkc">
                <div class="cks_left"><a><img :src="baseImgUrl+CourseOperation.currentCourse.ImgurlName"/></a></div>
                <div class="cks_right">
                        <p><em>课程名称:</em><a>{{CourseOperation.currentCourse.OptName}}</a></p>
                        <span><p><em>课程类别:</em><a>{{CourseOperation.currentCourse.TypeName}}</a></p></span><span><p><em>面向年级:</em><a>{{CourseOperation.currentCourse.GradeName}}</a></p></span>
                        <span><p><em>计划人数:</em><a>{{CourseOperation.currentCourse.PlanAmount}}</a></p></span><span><p><em>最少人数:</em><a>{{CourseOperation.currentCourse.MinAmount}}</a></p></span>
                        <span><p><em>上课时间:</em><a>{{CourseOperation.currentCourse.OptTime}}</a></p></span><span><p><em>上课地点:</em><a>{{CourseOperation.currentCourse.OptPlace}}</a></p></span>
                        <span><p><em>课程教师:</em><a>{{CourseOperation.currentCourse.TeaName}}</a></p></span><span><p><em>总课次:</em><a>{{CourseOperation.currentCourse.TotalClassTime}}</a></p></span>
                </div>
                <p id="kcjss"><em>课程介绍:</em><a>{{CourseOperation.currentCourse.OptIntro}}</a></p>
            </Modal>
                
            <Modal v-model="CourseOperation.courseDelModal" title="删除课程" style="width:300px;" @on-ok="DeleteCurrentCourse">
                <Alert type="warning" show-icon>
                    <div>{{"确定要删除吗？"}}</div>
                </Alert>
            </Modal>
                
            <Modal v-model="addModal" title="新增课程" ok-text="提交" >
                <Form v-model="addFormData" ref="addFormData" :model="addFormData" :rules="ruleValidate">
                    <div class="main-contents" >
                        <p><span><FormItem prop="OptName"><tt id="tt1">*</tt><em>课程名称:</em><Input v-model="addFormData.OptName" style="width: 300px;margin-left: 10px;" /></FormItem></span>
                            <span><FormItem prop="EveryClassNum"><tt id="tt2" style="margin-left: 55px;">*</tt><em>每班人数:</em>
                            <Input v-model="addFormData.EveryClassNum" style="width:300px;margin-left: 10px;" />
                            <!-- <InputNumber :max="1000" :min="0" v-model="addFormData.EveryClassNum" style="width:300px;"></InputNumber> -->
                            </FormItem></span>
                        </p>
                        <p>
                            <span >
                                <tt id="tt1">*</tt><em>课程类别:</em><Input v-model="addFormData.TypeName" style="width:300px;margin-left: 10px;" disabled  />
                            </span>
                            <span>
                                <FormItem prop="TotalClassTime">
                                    <tt id="tt1" style="margin-left: 68px;">*</tt><em>总课次:</em>
                                    <!-- <InputNumber :max="1000" :min="1" v-model="addFormData.TotalClassTime" style="width:300px;"></InputNumber> -->
                                    <Input v-model="addFormData.TotalClassTime" style="width:300px;" />
                                </FormItem>
                            </span>
                        </p>
                        <p>
                            <span><FormItem prop="PlanAmount"><tt id="tt1">*</tt><em>计划人数:</em>
                            <Input v-model="addFormData.PlanAmount" style="width:300px;margin-left: 10px;" />
                            <!-- <InputNumber :max="1000" :min="0" v-model="addFormData.PlanAmount" style="width:300px;"></InputNumber> -->
                            </FormItem></span>
                            <span><FormItem prop="MinAmount">
                            <tt id="tt2">*</tt><em style="margin-left: 55px;">最少人数:</em><Input v-model="addFormData.MinAmount" style="width:300px;margin-left: 10px;" /></FormItem>
                            </span>
                        </p>
                        <p>
                            <span>
                            <tt id="tt2">*</tt><em>上课时间:</em><Input v-model="addFormData.OptTime" style="width:300px;margin-left: 10px;" /></span>
                            <span><tt id="tt2">*</tt><em style="margin-left: 55px;">上课地点:</em><Input v-model="addFormData.OptPlace" style="width:300px;margin-left: 10px;" /></span>
                        </p>
                        <p v-if="nowUser.uType==1">
                            <tt id="tt2">*</tt><em>课程教师:</em><Select v-model="addFormData.TeaSerID" multiple ><Option v-for="item in teaListData" :key="item.userid" :value="item.userid">{{item.username}}</Option></Select>
                        </p>
                        <p>
                            <FormItem prop="gradeList"><tt id="tt1">*</tt><em>面向对象:</em>
                            <Tree :data="data2" show-checkbox multiple ref="Tree" @on-check-change="getCheckedGradeList"></Tree></FormItem>
                        </p>
                            
                        <p>
                            <tt id="tt2">*</tt><em>课程介绍:</em>
                            <Input v-model="addFormData.OptIntro" style="width: 740px;margin-left: 8px;" type="textarea" :rows="4" />
                        </p>
                        
                        <div style="margin-top: 10px;" class="main-contents_imgs1">
                            <p>
                            <!-- <div style="display:inline-block;vertical-align:top;"> -->
                                <tt id="tt2">*</tt><em>课程图片:</em>
                            <!-- </div> -->
                            <!-- <div style="display:inline-block;vertical-align:top;" class="main-contents_imgs"> -->
                                <a v-if="addFormData.ImgurlName != undefined"><img :src="baseImgUrl+addFormData.ImgurlName" height="100" /></a>
                                <a v-else></a>
                            <!-- </div> -->
                            <Button type="primary" @click="openImgSelectModal">图片选择</Button></p>
                        </div>
                        
                    </div>
                </Form>
                <div slot="footer">
                    <i-Button  @click="reSetAddFormData" style="margin-left: 8px">取消</i-Button>
                    <i-Button type="info" @click="handleSubmit" style="margin-left: 8px">提交</i-Button>
                </div>
            </Modal>
            <Modal v-model="imgSelectModal" title="图片选择" @on-ok="savePictureUrl">
                <div>
                    <div>
                        <Upload :action="courseImportUrl" :show-upload-list="false" accept=".jpg,.png" :on-success="importImgFile" :data="uploadData">
                            <Button>本地图片上传</Button>
                        </Upload>
                    </div>
                    <div class="left-box">
                            <!-- <div style="margin-left: 30px;margin-top: 30px;">
                                <span style="font-size:16px;font-weight:bold;">图库类别</span>
                            </div> -->
                        <div style="margin-left: 30px;margin-top: 20px;">
                            <!-- <Tree :data="data3" ref="tree"  @on-select-change="getGalleryTreeNodes"></Tree> -->
                            <div id="tree-box1" class="ztree"></div>
                        </div>
                    </div>
                    <div class="right-box">
                        <div class="Gallery_img">
                            <ul>
                                <li v-for="(item,index) in picture.modalPic" :key="index" >
                                    <img :src="baseImgUrl+item.FileName" @click="setStatus(item,index)" style=" cursor: pointer;" height="100" />
                                    <img v-if="item.Status" src="../../static/img/gou.png" style="width: 20%;height: 20%;"/>
                                </li>
                            </ul>
                                
                        </div>
                        <div>
                            <Page :total="picture.total" :page-size="picture.PageSize" show-sizer show-elevator show-total @on-change="picturePageChange" @on-page-size-change="picturePageSizeChange" ></Page>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>   
    </div>
</template>
<script>
 require("../../static/js/ztree/zTreeStyle.css");
import  '../../static/js/ztree/jquery.ztree.all.min.js';

export default {
    data:function(){
        return{
            // firstAsyncSuccessFlag:0,
            // temp:0,
            // tabName:'',
            data1: [],//课程树(不需要)
            data2: [],//班级树
            data3: [],//图库类别树（不需要）
            data4: [],//课程列表
            courseSelection:[],//列表模式选中课程列表
            treeSelectNow: [],//当前（默认）选中课程类别
            treeSelectNowId:0,
            treeSelectNowName:'',
            galleryTreeSelectNow:[],//当前（默认）选中图库类别(不需要)
            galleryTreeSelectNowId:0,
            teaListData:[],
            CourseOperation:{ //课程操作相关
                courseDetailModal:false, //课程详情对话框
                courseDelModal:false, //课程删除对话框
                courseSetModal:false, //课程设置对话框
                currentCourse:{},
                operationType:0, //操作类别，是新增课程还是编辑已有课程
            },
            CourseTree:{ //课程树相关
                addCourseModal:false,
                editCourseModal:false,
                delCourseModal:false,
                name:'',//课程类别名称
            },
            importCourse:{ //批量导入相关
                importCourseModal:false,
                importCourseData:{
                    // listData:[],
                    // state:'',
                    // message:'',
                },
            },
            total:100,
            PageSize:10,
            PageIndex:0,
            //courseName:'',
            addModal:false,
            imgSelectModal:false,
            /** 同步老课程相关 */
            modalc:false,//同步对话框
            SYOldCourse:'',
            actListTea:[],
            SYCourseList:[],
            targetKeys2:[],
            /** */
            nowUser:{ //当前用户类型
                uType:0,
            },
            courseList:[],//课程选择列表
            activeList:[],//场次列表
            ActiveSelectNow:{ //当前选中场次
                ActivityID:'',
            },
            selectedGradeAndClassList:[],//选中课程面向对象列表
            classList:[],
            OptName:'',
            courseImportUrl:'/api/OptCourse/OptCourse_List/upload?CategoryID=',
            // courseImportUrl_1:'/api/OptCourse/OptCourse_List/OptCourseImport?CateId=1',
            courseImportUrl_1:'',
            uploadData:{
                AppType:'OptCourse',
            },
            baseImgUrl:process.env.NODE_ENV === 'production'?'':'http://debugold.hongyucloud.com/OptCourse/',
            picture:{ //图片选择相关
                PageIndex:0,
                PageSize:10,
                total:0,
                index:'',
                pictureUrl:'',
                ImgSerID:'',
                modalPic:[],
            },
            addFormData:{
                ActiveID:'',
                ActiveName:'',
                EditDate:'',
                gradeList:[],
                GradeID:'',
                GradeName:'',
                Imgurl:'',
                ImgurlName:'',
                MinAmount:'',
                OptIntro:'',
                OptName:'',
                OptPlace:'',
                OptTime:'',
                PlanAmount:'',
                SerID:'',
                Status:'3',
                StatusName:'',
                TeaName:'',
                TotalClassTime:'',
                Type:'1',
                TypeID:'',
                TypeName:'',
                UID:'',
                TeaSerID:'',
                EveryClassNum:'',
                YZAmount:'',
                SYNum:'',
                LessonType:''
            },
            ruleValidate:{
                OptName:[
                    { required: true, message: '请输入课程名称',trigger: 'blur' },
                    {max:50,type:'string',message:'课程名称不能超过50个字',trigger:'blur'}
                ],
                EveryClassNum:[
                    { required: false,message: '请输入每班人数(正整数)',trigger:'blur'},
                    {pattern: /^[1-9]\d*$/,type: 'string', message: '请输入每班人数(正整数)',trigger: 'blur'}
                ],
                TypeID:[
                    {required: true,type:'number', message: '请选择课程类别',trigger: 'change'}
                ],
                gradeList:[
                    {required: true,type:'array', message: '请选择课程面向的对象',trigger: 'change'}
                ],
                PlanAmount:[
                    { required: true,message: '请输入计划人数(正整数)',trigger:'blur'},
                    {pattern: /^[1-9]\d*$/,type: 'string', message: '请输入计划人数(正整数)',trigger: 'blur'}
                ],
                // MinAmount:[{ required: false,message: '请输入最少人数(正整数)',trigger:'blur'},
                //             {pattern: /^[1-9]\d*$/,type: 'string', message: '请输入最少人数(正整数)',trigger: 'blur'}],
                MinAmount:[
                    { required: false,message: '请输入最少人数(整数)',trigger:'blur'},
                    {pattern: /^(0|\+?[1-9][0-9]*)$/,type: 'string', message: '请输入最少人数(整数)',trigger: 'blur'}
                ],
                TotalClassTime:[
                    { required: true, message: '请输入总课数',trigger:'blur' },
                    {pattern: /^[1-9]\d*$/, type:'string', message: '请输入总课次(正整数)',trigger:'blur'}
                ]
            },
            columns3:[{title: '课程名称(必填)',key: '课程名称'},
                    {title: '面向年级(必填 说明：年级之间多个用英文逗号隔开)',key: '面向年级'},
                    // {title: '课程类别(必填)',key: '课程类别'},
                    {title: '场次(必填)',key: '场次'},
                    {title: '计划人数(必填)',key: '计划人数'},
                    {title: '最少人数',key: '最少人数'},
                    {title: '上课地点',key: '上课地点'},
                    {title: '上课时间',key: '上课时间'},
                    {title: '课程介绍',key: '课程介绍'},
                    {title: '任课教师(必填)',key: '任课教师'},
                    {title: '课次(必填)',key: '课次'},
                    {title: '上传状态',
                        render: (h, params) => {
                            var row = params.row;
                            if(!this.importCourse.importCourseData.State){
                                return h('div', {style:{color:'red'}}, row.异常);
                            }
                            else{
                                return h('div', {style:{color:'green'}},'导入成功');
                            }
                        }
                    },
                ],
            columns4:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                { title: '序号', type: 'index', },
                // { title: '课程状态', align:'center',
                //     render:(h,params)=>{
                //         let temp='';
                //         if(params.row.Status=='1') temp='审核中';
                //         else if(params.row.Status=='2') temp='已通过';

                //         return[
                //             h('p',temp)
                //         ];        
                //     }
                // },
                { title: '课程名称', key: 'OptName', },
                { title: '任课教师', key: 'TeaName', },
                { title: '面向年级', key: 'GradeName', },
                { title: '招收人数', key: 'PlanAmount', },
                { title: '已招人数', key: 'YZAmount', },
                { title: '剩余人数', key: 'SYNum', },
                { title: '审批状态', key: 'StatusName', },
                { 
                    title: '操作', 
                    width: 200,
                    align: 'center', 
                    render: (h, params) => {
                        return [
                            h('Tooltip', {props: {content: "提前录取",placement:'bottom'},class:'operating'}, [
                                h('Button', { props: { type: 'text', icon: 'ios-person' }, on: {
                                    click: () => {
                                        var _this=this;
                                        _this.openCourseSetModal(params.row);
                                        // console.log(params.row.UserID)
                                        //_this.openEditJurisdictionUserModal(params.row.UserID);
                                    }
                                }},''),]),
                            h('Tooltip', {props: {content: "编辑",placement:'bottom'},class:'operating'}, [
                                h('Button', { props: { type: 'text', icon: 'ios-compose-outline' }, on: {
                                    click: () => {
                                        var _this=this;
                                        _this.openCourseEditModal(params.row);
                                        // console.log(params.row.UserID)
                                        //_this.openEditJurisdictionUserModal(params.row.UserID);
                                    }
                                }},''),]),
                            h('Tooltip', {props: {content: "删除",placement:'bottom'},class:'operating'}, [
                                h('Button', { props: { type: 'text', icon: 'ios-trash-outline' }, on: {
                                    click: () => {
                                        var _this=this;
                                        _this.openCourseDelModal(params.row);
                                        // console.log(params.row.UserID)
                                        //_this.openEditJurisdictionUserModal(params.row.UserID);
                                    }
                                }},'')])
                        ];
                    },
                },
            ],
        };
    },
    created:function(){
    },
    mounted(){
        var _this=this;
        // _this.getTreeData();
        _this.getCourseTreeData()
        // _this.gettemp();
        _this.getActiveListData();
        _this.getGradeTreeData();
        _this.getOptCourseListV2();
        _this.getUType();
        
    },
    methods:{
        getCourseTreeData(){ //课程类别树
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
                    chkboxType: { "Y" : "s", "N" : "s" },
                },
                async:{
                    enable:true
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
                _this.getOptCourseListV2();
                // _this.treeSelectNow=treeNode;
                //console.log(treeNode);
            };
            tree.callback.onCheck=(event, treeId, treeNode)=>{
                    // console.log(treeNode);
                    // console.log('click');
                    let treeObj=$.fn.zTree.getZTreeObj(treeId);
                    let td=treeObj.getCheckedNodes(true);
                    console.log(td)
                };
            _this.$api.get(APIConfig.OptCourse.CateList,null,resp=>{
                data=resp.Data;
                data.forEach(element => {
                    element.open=true;
                });
                $.fn.zTree.init($('#tree-box'), tree,data);
            });
        },
        
        getUType(){ //获取用户类型，1代表选课管理员，0代表普通教师
            var _this=this;
            _this.$api.get(APIConfig.OptCourse.Istruexkadmin,null,resp=>{
                // console.log(12345)
                _this.nowUser.uType=resp.Data;
                // console.log(_this.nowUser.uType)
            });
        },
        getOptCourseList(){ //获取指定场次的课程列表
            var _this=this;
            //console.log("获取指定场次课程列表")
            let ActiveID=_this.ActiveSelectNow.ActivityID;
            //console.log(ActiveID)
            let OptName=_this.OptName;
            //console.log(OptName)
            //console.log(_this.treeSelectNow[0])
            let CategoryID;
            if(_this.treeSelectNow[0] ==undefined){
                CategoryID=0;
            }else CategoryID=_this.treeSelectNow[0].id;
            // console.log(CategoryID)
            let PageSize=_this.PageSize;
            let PageIndex=_this.PageIndex;
            //console.log(PageSize+' '+PageIndex)
            _this.$api.get(APIConfig.OptCourse.OptCourseList,{ActiveID:ActiveID,OptName:OptName,CategoryID:CategoryID,PageSize:PageSize,PageIndex:PageIndex},resp=>{
                _this.data4=resp.Data;
                _this.total=resp.Page.sumDataCount;
            })
        },
        getOptCourseListV2(){ //获取指定场次的课程列表
            var _this=this;
            //console.log("获取指定场次课程列表")
            let ActiveID=_this.ActiveSelectNow.ActivityID;
            //console.log(ActiveID)
            let OptName=_this.OptName;
            //console.log(OptName)
            //console.log(_this.treeSelectNow[0])
            let CategoryID;
            if(_this.treeSelectNowId ==undefined){
                CategoryID=0;
            }else CategoryID=_this.treeSelectNowId;
            // console.log(CategoryID)
            let PageSize=_this.PageSize;
            let PageIndex=_this.PageIndex;
            //console.log(PageSize+' '+PageIndex)
            _this.$api.get(APIConfig.OptCourse.OptCourseList,{ActiveID:ActiveID,OptName:OptName,CategoryID:CategoryID,PageSize:PageSize,PageIndex:PageIndex},resp=>{
                _this.data4=resp.Data.map(x=>({
                    ActiveID:x.ActiveID,
                    ActiveName:x.ActiveName,
                    EditDate:x.EditDate,
                    gradeList:x.gradeList,
                    GradeID:x.GradeID,
                    GradeName:x.GradeName,
                    Imgurl:x.Imgurl,
                    ImgurlName:x.ImgurlName,
                    MinAmount:x.MinAmount==null ? null : x.MinAmount+'',
                    OptIntro:x.OptIntro,
                    OptName:x.OptName,
                    OptPlace:x.OptPlace,
                    OptTime:x.OptTime,
                    PlanAmount:x.PlanAmount==null ? null : x.PlanAmount+'',
                    SerID:x.SerID,
                    Status:x.Status,
                    StatusName:x.StatusName,
                    TeaName:x.TeaName,
                    TotalClassTime:x.TotalClassTime==null ? null : x.TotalClassTime+'',
                    Type:x.Type,
                    TypeID:x.TypeID,
                    TypeName:x.TypeName,
                    UID:x.UID,
                    TeaSerID:x.TeaSerID,
                    EveryClassNum:x.EveryClassNum==null ? null : x.EveryClassNum+'',
                    SYNum:x.SYNum,
                    YZAmount:x.YZAmount,
                    //
                    LessonType:x.LessonType,
                }));
                _this.total=resp.Page.sumDataCount;
            })
        },
        getActiveListData(){ //获取场次列表
            var _this=this;
            _this.$api.get(APIConfig.OptCourse.GetActiveList,null,resp=>{
                _this.activeList=resp.Data;
                _this.actListTea=resp.Data;
            });
        },
        getChangeOptCourseList(){ //获取选中场次
            var _this=this;
            _this.getOptCourseListV2();
            // console.log(123321)
            // console.log(_this.ActiveSelectNow.ActivityID)
        },
        getGradeTreeData(){ //获取面向对象树 xx年级xx班
            var _this=this;
            _this.data2=[];
            _this.$api.get(APIConfig.OptCourse.GetGradeClassTree,null,resp=>{
                //console.log(resp.Data);
                if(resp.Data != '0'){
                    let tempdata=resp.Data;
                    //console.log(tempdata.length);
                    if(tempdata.length != 0){
                        tempdata.forEach(x=>{
                            let obj={};
                            obj.title=x.CodeName;
                            obj.CodeSerID=x.CodeSerID;
                            obj.expand=false;
                            obj.selected=false;
                            if(x.ClassList) obj.children=_this.setChild(x.ClassList,x.CodeSerID);
                            _this.data2.push(obj);
                        });
                    }
                }
            });
        },
        setChild(grade,CodeSerID){
            var _this=this;
            var children=[];
            var list=_this.selectedGradeAndClassList;
            if(list.length == 0){
                grade.forEach(x=>{
                    let obj={};
                    obj.title=x.ClassName;
                    obj.ClassID=x.ClassID;
                    obj.CodeSerID=CodeSerID;
                    obj.expand=true;
                    children.push(obj);
                });
            }else{
                grade.forEach(x=>{
                    let obj={};
                    obj.title=x.ClassName;
                    obj.ClassID=x.ClassID;
                    obj.CodeSerID=CodeSerID;
                    obj.expand=true;
                    for(let key in list){
                        if(list[key] == x.ClassID){
                            obj.checked=true;
                        }
                    }
                    children.push(obj);
                });
            }
            return children;
        },
        getTreeData(){ //获取课程类别树(无用)
            var _this=this;
            _this.data1=[];
            var fromat=function(data){
                data.title=data.name;
                data.expand = true;
                data.selected=false;
                if(data.children.length>0){
                   data.children.forEach(element => {
                       fromat(element);
                   });
                }
                return data;
            }
            _this.$api.get(APIConfig.OptCourse.CateList,null,(resp)=>{
                let rData=resp.Data[0];
                // console.log(fromat(rData));
                let obj={};
                obj=fromat(rData);
                _this.data1.push(obj);
                // console.log( _this.data1);
                 _this.treeSelectNow=_this.data1; //默认选中根节点
                    //console.log(_this.treeSelectNow)
                // _this.courseList=rData[0].children;
            });
        },
        getGalleryCateTreeData(){ //获取图库类别树
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
                _this.galleryTreeSelectNowId=treeNode.id;
                // _this.treeSelectNowName=treeNode.name;
                _this.courseImportUrl="/api/OptCourse/OptCourse_List/upload?CategoryID="+treeNode.id;
                _this.getImgData();
                // _this.treeSelectNow=treeNode;
                //console.log(treeNode);
            };
            tree.callback.onCheck=(event, treeId, treeNode)=>{
                // console.log(treeNode);
                console.log('click');
            };
            
            _this.$api.get(APIConfig.OptCourse.GalleryCateList,null,resp=>{
                data=resp.Data;
                data.forEach(x=>{
                    x.open=true;
                });
                $.fn.zTree.init($('#tree-box1'), tree,data);
                _this.getImgData();
            });
            // setTimeout(() => {
            //     $.fn.zTree.init($('#tree-box1'), tree,data);
            // }, 1000);
        },
        getImgData(){ //根据（默认）选中节点获取对应的图片数据
            var _this=this;
            let CategoryID=_this.galleryTreeSelectNowId;
            let PageSize=_this.picture.PageSize;
            let PageIndex=_this.picture.PageIndex;
            _this.$api.get(APIConfig.OptCourse.GalleryList,{CategoryID:CategoryID,PageSize:PageSize,PageIndex:PageIndex},resp=>{
                _this.picture.total=resp.Page.sumDataCount;
                _this.picture.modalPic=resp.Data;
                _this.picture.modalPic.forEach(ele => {
                    ele.Status=false;
                });
            });
        },
        setStatus(item,index){ //图库中选中某张图片
            var _this=this;
            if(_this.picture.index != '') _this.picture.modalPic[_this.picture.index].Status = false;
            if(_this.picture.index == 0) _this.picture.modalPic[0].Status = false;
            // // item.Status=true
            // console.log(item)
            // console.log(index)
            _this.$nextTick(()=>{
                let obj=JSON.parse(JSON.stringify( _this.picture.modalPic[index]));
                obj.Status=true;
                // console.log(obj);
                // _this.picture.modalPic[index].Status = true;
                this.$set( _this.picture.modalPic,index,obj)
                // console.log( _this.picture.modalPic)
                _this.picture.index=index;
                _this.picture.pictureUrl=item.FileName;
                _this.picture.ImgSerID=item.SerID;
                _this.addFormData.Type='1';
            })
        },
        savePictureUrl(){ //课程图片选择后提交
            var _this=this;
            if(_this.picture.pictureUrl != ""){
                _this.addFormData.ImgurlName=_this.picture.pictureUrl;
                _this.addFormData.Imgurl=_this.picture.ImgSerID;
            }
            _this.imgSelectModal=false;
        },
        importImgFile (res, file){ //本地图片上传
            var _this=this;
            _this.addFormData.Imgurl=res.fileid;
            _this.addFormData.ImgurlName=res.fileurl;
            _this.addFormData.Type='0';
            _this.getImgData();
            // _this.imgSelectModal=false;
        },
        reSetAddFormData(){ //重置添加表单数据
            var _this=this;
            _this.classList=[],
            _this.addFormData={
                ActiveID:'',
                ActiveName:'',
                EditDate:'',
                gradeList:[],
                GradeID:'',
                GradeName:'',
                Imgurl:'',
                ImgurlName:'',
                MinAmount:'',
                OptIntro:'',
                OptName:'',
                OptPlace:'',
                OptTime:'',
                PlanAmount:'',
                SerID:'',
                Status:'3',
                StatusName:'',
                TeaName:'',
                TotalClassTime:'',
                Type:'1',
                TypeID:'',
                TypeName:'',
                UID:'',
                TeaSerID:'',
                EveryClassNum:'',
                YZAmount:'',
                SYNum:'',
                LessonType:'',
            };
            _this.picture={
                PageIndex:0,
                PageSize:10,
                total:0,
                index:'',
                pictureUrl:'',
                ImgSerID:'',
                modalPic:[],
            };
            _this.getGradeTreeData();
            _this.addModal=false;
        },
        openAddModal(){
            var _this=this;
            _this.addFormData={};
            _this.addFormData.TypeName=_this.treeSelectNowName;
            let deep=_this.treeSelectNowId;
            console.log(_this.addFormData.ImgurlName);
            //console.log(_this.ActiveSelectNow.ActivityID);
            if(_this.ActiveSelectNow.ActivityID == ''){
                _this.$Message.info('请选择场次')
            }else{
                if(deep==0){
                    _this.$Message.info("当前默认课程类别为全部,请选择具体课程类别后新增课程")
                }else{
                    if(_this.nowUser.uType==1){
                        console.log('获取教师下拉列表')
                        let name='';
                        _this.$api.get(APIConfig.OptCourse.UserList,{name:name},resp=>{
                            _this.teaListData=resp.Data;
                        })
                    }
                    console.log(_this.CourseOperation.operationType)
                    _this.CourseOperation.operationType=0;
                    _this.addModal=true;
                }
            }
            // if(deep==0){
            //     _this.$Message.info("当前默认课程类别为全部,请选择具体课程类别后新增课程")
            // }else{
            //     if(_this.ActiveSelectNow.ActivityID == ''){
            //         _this.$Message.info('请选择场次')
            //     }else{
            //         if(_this.nowUser.uType==1){
            //             console.log('获取教师下拉列表')
            //             let name='';
            //             _this.$api.get(APIConfig.OptCourse.UserList,{name:name},resp=>{
            //                 _this.teaListData=resp.Data;
            //             })
            //         }
            //         console.log(_this.CourseOperation.operationType)
            //         _this.CourseOperation.operationType=0;
            //         _this.addModal=true;
            //     }
            // }
        },
        openModalcModal(){
            var _this=this;
            if(_this.ActiveSelectNow.ActivityID == ''){
                _this.$Message.info('请选择目标场次')
            }else{
                _this.modalc=true;
            }
        },
        openImgSelectModal(){
            var _this=this;
            _this.imgSelectModal=true;
            _this.getGalleryCateTreeData();
            _this.courseImportUrl="/api/OptCourse/OptCourse_List/upload?CategoryID="+_this.galleryTreeSelectNowId;
        },
        // getNodes:function(data){ //当前选中的节点数组
        //     var _this=this;
        //     // console.log(data);
        //     _this.treeSelectNow=data;
        //     _this.getOptCourseList();
        // },
        // getGalleryTreeNodes(data){ //当前选中图库节点数组
        //     var _this=this;
        //     _this.galleryTreeSelectNow=data;
        //     _this.courseImportUrl="/api/OptCourse/OptCourse_List/upload?CategoryID="+data[0].id;
        //     _this.getImgData();
        // },
        getCheckedGradeList(data){ //某课程的面向对象列表
            var _this=this;
            //console.log(data);
            _this.classList=[];
            _this.addFormData.gradeList=[];
            data.forEach(x=>{
                if(!x.children){
                    _this.classList.push(x.ClassID);
                    _this.addFormData.gradeList.push(x.CodeSerID);
                    var flag=false;
                    for(let i=0;i<_this.addFormData.gradeList.length-1;i++){
                        if(_this.addFormData.gradeList[i] === x.CodeSerID) flag=true;
                    }
                    if(flag) _this.addFormData.gradeList.splice(_this.addFormData.gradeList.length-1,1);
                }
            });
        },
        handleSubmit(){
            var _this=this;
            console.log(typeof _this.addFormData.TotalClassTime)
            _this.$refs['addFormData'].validate((valid)=>{
                // console.log(111111)
                if(valid){
                    console.log("success")
                    _this.commitCourse();
                }else{
                    console.log("error");
                }
                _this.CourseOperation.operationType=0;
            });
        },
        commitCourse(){ //新增或编辑课程
            var _this=this;
            var data={};
            var vlist=_this.addFormData;
            var url;
            console.log(vlist.SerID)
            if(_this.CourseOperation.operationType==1){ //编辑课程
                url=APIConfig.OptCourse.OptCourseEdit;
                data.SerID=vlist.SerID;
            }else{ //新增课程
                url=APIConfig.OptCourse.OptCourseCreate;
            }
            vlist.OptName=vlist.OptName.replace(/(^\s*)|(\s*$)/g, "");
            if(vlist.OptName == ''){
                _this.$Message.info('课程名称不能为空！');
                return;
            }
            data.OptName=vlist.OptName;
            // console.log(_this.CourseOperation.operationType)
            if(_this.CourseOperation.operationType==1){
                data.ActivityID=vlist.ActiveID;
            }else{
                data.ActivityID=_this.ActiveSelectNow.ActivityID;
            }
            data.GradeID=vlist.gradeList.join(',');
            if(_this.CourseOperation.operationType==1){
                data.TypeID=vlist.TypeID;
            }else{
                // data.TypeID=_this.treeSelectNow[0].id;
                data.TypeID=_this.treeSelectNowId;
            }
            data.PlanAmount=vlist.PlanAmount;
            if(vlist.MinAmount != '') data.MinAmount=vlist.MinAmount;
            if(vlist.OptPlace != undefined) data.OptPlace=vlist.OptPlace;
            if(vlist.OptTime != undefined) data.OptTime=vlist.OptTime;
            if(vlist.OptIntro != undefined) data.OptIntro=vlist.OptIntro;
            data.TotalClassTime=vlist.TotalClassTime;
            data.EveryClassNum=vlist.EveryClassNum;
            data.ClassID= _this.classList.join(',');
            if(vlist.Type == '1' || vlist.Type == '0') data.Type=vlist.Type;
            else data.Type = '0';
            if(vlist.Imgurl != undefined && vlist.Imgurl != ''){
                data.Imgurl =vlist.Imgurl;
            }
            if(vlist.TeaSerID==undefined){
                data.TeaSerID='';
            }else data.TeaSerID=vlist.TeaSerID;
            _this.$api.post(url,data,resp=>{
                _this.addModal=false;
                _this.addFormData={};
                _this.getOptCourseListV2();
                _this.getGradeTreeData();
            });
        },
        /** 同步老课程相关 */
        getSYOptCourse(){      // 同步老课程穿梭框左框数据
            var _this = this;
            _this.SYCourseList = [];
            _this.targetKeys2 = [];
            _this.$api.get(APIConfig.OptCourse.GetAcCourse,{ActiveID:_this.SYOldCourse},(resp)=>{ 
                if(resp.Data != '0'){
                    for(let key in resp.Data){
                        _this.SYCourseList.push({'key':resp.Data[key].SerID,'label':resp.Data[key].Name});
                    } 
                }
            })
        },
        SYoldToNew(targetKeys, direction, moveKeys){    //同步课程穿梭框
            var _this = this;
            _this.targetKeys2 = targetKeys;
        },
        oldCourseToNew(){   //同步老课程到当前场次下==》提交
            var _this = this;
            if(_this.targetKeys2.length != 0){
                var url = APIConfig.OptCourse.SyOptCourseAdd+'?ids='+_this.targetKeys2.join(',')+'&ActiveID='+_this.ActiveSelectNow.ActivityID
                _this.$api.post(url,null,(resp)=>{
                    _this.$Message.info(resp.Message);
                    _this.getOptCourseListV2();
                    _this.modalc = false;
                });
            }
        },
        closeSYCourse(){    // 取消同步
            var _this = this;
            _this.targetKeys2 = [];
            _this.modalc = false;
        },
        /** */
        /** 课程类别树增删改相关 */
        openAddCourseTreeModal(){
            var _this = this;
            _this.CourseTree.name='';
            _this.CourseTree.addCourseModal=true;
        },
        openEditCourseTreeModal(){ //无用
            var _this = this;
            let deep=_this.getNodeDeep(_this.treeSelectNow[0].id);
            if(deep==0){
                _this.$Message.info("当前类别无法编辑")
            }else{
                _this.CourseTree.name=_this.treeSelectNow[0].title;
                _this.CourseTree.editCourseModal=true;
            }
        },
        openEditCourseTreeModalV2(){
            var _this = this;
            let deep=_this.treeSelectNowId;
            if(deep==0){
                _this.$Message.info("当前类别无法编辑")
            }else{
                _this.CourseTree.name=_this.treeSelectNowName;
                _this.CourseTree.editCourseModal=true;
            }
        },
        openDelCourseTreeModal(){
            var _this = this;
            _this.CourseTree.delCourseModal=true;
        },
        AddCourse(){ //无用
            var _this=this;
            let pid=_this.treeSelectNow[0].id;
            let name=_this.CourseTree.name;
            _this.$api.post(APIConfig.OptCourse.AddCate,{pid:pid,name:name},resp=>{
                _this.getTreeData();
            })
        },
        AddCourseV2(){
            var _this=this;
            let pid=_this.treeSelectNowId;
            let name=_this.CourseTree.name;
            _this.$api.post(APIConfig.OptCourse.AddCate,{pid:pid,name:name},resp=>{
                _this.gettemp();
            })
        },
        EditCourse(){ //无用
            var _this=this;
            let SerID=_this.treeSelectNow[0].id;
            let name=_this.CourseTree.name;
            _this.$api.post(APIConfig.OptCourse.EditCate,{SerID:SerID,name:name},resp=>{
                _this.getTreeData();
            })
        },
        EditCourseV2(){
            var _this=this;
            let SerID=_this.treeSelectNowId;
            let name=_this.CourseTree.name;
            _this.$api.post(APIConfig.OptCourse.EditCate,{SerID:SerID,name:name},resp=>{
                _this.gettemp();
            })
        },
        DeleteCourse(){ //无用
            var _this=this;
            let ids=_this.treeSelectNow[0].id;
            _this.$api.get(APIConfig.OptCourse.DeleteCate,{ids:ids},resp=>{
                _this.getTreeData();
            })
        },
        DeleteCourseV2(){
            var _this=this;
            let ids=_this.treeSelectNowId;
            _this.$api.get(APIConfig.OptCourse.DeleteCate,{ids:ids},resp=>{
                _this.gettemp();
            })
        },
        
        /** */
        /** 批量导入相关 */
        ImportCourse(){
            var _this=this;
            _this.importCourse.importCourseData={};
            // let id=_this.treeSelectNow[0].id;
            let id=_this.treeSelectNowId;
            _this.courseImportUrl_1='/api/OptCourse/OptCourse_List/OptCourseImport?CateId='+id;
            _this.importCourse.importCourseModal=true;
        },
        importFile(response, file, fileList){
            var _this=this;
            _this.importCourse.importCourseData=response;
            // console.log(_this.importCourse.importCourseData.Data)
            _this.courseImportUrl_1='';
            _this.getOptCourseListV2();
        },
        downFile(){ //下载样表
            location.href=APIConfig.OptCourse.OptCourseExport;
        },
        /** */
        /** 课程操作相关 */
        openCourseDetailModal(item){
            var _this=this;
            _this.CourseOperation.currentCourse=item;
            _this.CourseOperation.courseDetailModal=true;
        },
        openCourseEditModal(item){
            var _this=this;
            _this.addFormData=item;
            console.log(_this.addFormData)
            // console.log(_this.teaListData)
            let name='';
            _this.$api.get(APIConfig.OptCourse.UserList,{name:name},resp=>{
                _this.teaListData=resp.Data;
            });
            _this.CourseOperation.operationType=1;
            _this.addModal=true;
        },
        openCourseDelModal(item){
            var _this=this;
            _this.CourseOperation.currentCourse=item;
            _this.CourseOperation.courseDelModal=true;
        },
        openCourseSetModal(item){
            var _this=this;
            let id=item.SerID;
            _this.$router.push({name:"EnterStuSettings",query:{id:id}});
        },
        DeleteCurrentCourse(){
            var _this=this;
            let ids=_this.CourseOperation.currentCourse.SerID;
            _this.$api.get(APIConfig.OptCourse.OptCourseDelete,{ids:ids},resp=>{
                _this.getOptCourseListV2();
            });
        },
        getSelCourse(selection){
            var _this=this;
            _this.courseSelection=selection;
        },
        delSeveralCourse(){
            var _this=this;
            let selection=_this.courseSelection;
            let ids=[];
            if(selection.length==0){
                _this.$Message.info("请选择要删除的课程")
            }else{
                selection.forEach(x=>{
                    ids.push(x.SerID);
                });
                _this.$api.get(APIConfig.OptCourse.OptCourseDelete,{ids:ids.join(',')},resp=>{
                    _this.courseSelection=[];
                _this.getOptCourseListV2();
            });
            }
        },
        /** */
        getNodeDeep(id){ //当前选中的树节点的深度（无用）
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
        picturePageChange(index){
            var _this=this;
            _this.picture.PageIndex=index-1;
            _this.getImgData();
        },
        picturePageSizeChange(pagesize){
            var _this=this;
            _this.picture.PageSize=pagesize;
            _this.getImgData();
        },
        pageChange(index){
            var _this=this;
            _this.PageIndex=index-1;
            _this.getOptCourseListV2();
        },
        pageSizeChange(pagesize){
            var _this=this;
            _this.PageSize=pagesize;
            _this.getOptCourseListV2();
        },
    },
}
</script>
<style lang="scss">

.ivu-modal-content{
    width: 900px;
}
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