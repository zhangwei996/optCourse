<template>
    <div class="body" id="Course_Selection_web">
        <div class="path-nav">
            <h1>课程管理</h1>
        </div>
        <div class="main-box">
            <div class="main-box_s">
                <Tabs type="card" @on-click="getTabName">
                <Tab-Pane label="课程类别" v-if="false">
                    <div class="Students_buttom">
                        <i-Button type="primary"  @click="openCategory()">新增类别</i-Button>
                        <!-- <Modal v-model="Category1" title="新增类别" width="70%" class="kclb">
                            <p> <em>课程类别:</em> <i-Input v-model="value" placeholder="请输入类别名称..."></i-Input> </p>
                            <p> <em>排序:</em> <i-Input v-model="value" placeholder="请输入序号..."></i-Input> </p>
                        </Modal> -->
                        
                        <Modal v-model="modalCategory" :title=category.title width="600px" class="kclb">
                            <p> <em><tt id="tt1">*</tt>课程类别:</em> <i-Input v-model="category.Name" placeholder="请输入类别名称（注:课程名称不要超过12个字符)"></i-Input></p>
                            <p> <em><tt id="tt1">*</tt>排序:</em><Input type="number" placeholder="请输入排序号(正整数)" v-model="category.sort" /></p>
                            <span style='color:red;margin-left:100px'>{{danger}}</span>
                            <div slot="footer">   
                                <i-Button type="ghost" @click="category.title=false,modalCategory=false">取消</i-Button>
                                <i-Button type="primary" @click="addContactSave()">提交</i-Button>
                            </div>
                        </Modal>
                        
                        <Modal v-model="modalImgess" title="图片管理" width="70%" class="tpgl">
                            <div class="Students_buttom">
                                <p><em>当前课程类别:</em><a>{{picture.currentCatName}}</a></p>
                                <i-Button type="error"  style="padding: 7px 15px;" @click="delPic()">删除</i-Button>
                                <!-- <my-upload v-model="formData.chkadd.encloid" appType="apply" :defaultList="fileList"></my-upload> -->
                                <Upload  class="fr btn" style="float:right;"
                                    :action="pictureImportUrl"
                                    :show-upload-list="false"
                                    accept=".jpg,.png,.jpeg"
                                    :on-success="importPicture"
                                    >
                                    <i-Button type="primary" style="padding: 7px 45px;margin-right: 15px;">上传图片</i-Button>
                                </Upload>
                                <!-- <i-Button type="primary" style="padding: 7px 45px;margin-right: 15px;">上传图片</i-Button> -->
                            </div>
                                <!-- <Alert>建议上传234*168的图片</Alert> -->
                            <div class="Gallery_img">
                                <ul v-if="listData.data != []">
                                    <li v-for="item in picture.modalPic" :key="item.SerID">
                                        <a href="javascript:;" @click="DeletePic(item)">
                                            <img :src="item.FileName"/>
                                        </a>
                                        <img v-if="item.Status" @click="DeletePic(item)" src="../../static/img/gou.png"/>
                                    </li>
                                    <!-- <li v-for="(item,index) in listData.data" :key=index>
                                        <a href="javascript:;">
                                            <img :src="item.ImgUrl"/>
                                        </a>
                                        <img src="../../static/img/gou.png"/>
                                    </li> -->
                                </ul>
                                
                            </div>
                            <div slot="footer">
                                <Page :total="picture.total" :current="picture.PageIndex" @on-change="picturePageUpdate" show-total></Page>
                            </div>
                        </Modal>
                    </div>
                    <i-Table border :columns="columns" :data="data" no-data-text="暂无数据"></i-Table>
                </Tab-Pane>
                
                <Tab-Pane label="场次管理">
                    <div class="Students_buttom">
                        <i-Button type="primary"  @click="openActivity()">新增场次</i-Button>
                        <i-Button type="primary" class="ivu-btn ivu-btn-success"  @click="ImportCourse()" v-if="false">导入课程</i-Button>
                        <Modal v-model="modalActivity" :title=activity.title width="80%" class="ccgl" id="ccgls">
                            <p><em><tt id="tt1">*</tt>场次名称:</em>
                                <i-Input v-model="activity.name" placeholder="请输入场次名称(注:课程名称不要超过40个字符)"></i-Input>
                            </p>
                            <p><em><tt id="tt1">*</tt>选课模式:</em>
                                <i-select class="mr10"  placeholder="全部年度" v-model="activity.type"> 
                                    <i-option value="1">志愿模式</i-option> 
                                    <i-option value="0">抢课模式</i-option>
                                    <i-option value="2">预选模式</i-option>
                                </i-select>
                            </p>
                            <p v-if="activity.type == 1"><em><tt id="tt1">*</tt>志愿数:</em>
                                <i-Input v-model="activity.num" type='number' placeholder="请输入志愿数(1-10的整数)"></i-Input>
                            </p>
                             <p v-if="activity.type == 2"><em><tt id="tt1">*</tt>预选数:</em>
                                <i-Input v-model="activity.num" type='number' placeholder="请输入预选数(1-10的整数)"></i-Input>
                            </p>
                            <p>
                                <span><em><tt id="tt1">*</tt>报名开始时间:</em>
                                    <i-Col span="12"> <Date-Picker v-model="activity.startTime" 
                                        format="yyyy-MM-dd HH:mm:ss" type="datetime" transfer
                                        placeholder="请选择报名开始时间... "
                                        placement="bottom"></Date-Picker> </i-Col>
                                </span>
                                <span><em><tt id="tt1">*</tt>报名结束时间:</em>
                                    <i-Col span="12"> <Date-Picker v-model="activity.endTime" 
                                    format="yyyy-MM-dd HH:mm:ss" type="datetime" transfer
                                    placeholder="请选择报名结束时间..."
                                    placement="bottom"></Date-Picker> </i-Col>
                                </span>
                            </p>
                            <p><em>是否显示:</em>
                                <i-Switch v-modal="activity.switch" :value="activity.switch" @on-change="changeSwitch"> <span slot="open">开</span> 
                                <span slot="close">关</span> </i-Switch>
                            </p>
                            <div slot="footer">
                                <i-Button type="info" @click="modalActivity=false" style="margin-left: 8px">取消</i-Button>
                                <i-Button type="info" @click="preDoActivityAdd(2)" style="margin-left: 8px">提交</i-Button>
                            </div>
                        </Modal>
                        
                        <Modal v-model="Course2" title="课程导入" width="80%" class="ccdr">
                                <div class="Students_buttom">
                                    <!-- <p><em>当前场次:</em><a>{{current.ActivityName}}</a></p> -->
                                    <Upload  class="fr btn"  style="float:right;"
                                        :action="courseImportUrl"
                                        :show-upload-list="false"
                                        accept=".xls,.xlsx"
                                        :on-success="importFile"
                                        >
                                        <i-Button type="success" style="padding: 7px 45px;margin-right: 15px;">导入课程</i-Button>
                                    </Upload>
                                    <a href="javascript:;" @click="downFile" style="line-height:32px;float:right;margin-right:15px">下载[网上开课样表.xls]</a>
                                    <!-- <i-Button type="success" style="padding: 7px 45px;margin-right: 15px;">导入课程</i-Button> -->
                                </div>
                                <div v-if="listData1.Data!=null" style="margin-bottom:10px">
                                    <div  v-if="listData1.State==true" style="color:green">导入成功！</div>
                                    <div  v-else  style="color:red">导入失败，请修改Excel文件中相关数据后再重新上传！</div>
                                </div>
                                <Table :columns="columns3" :data="listData1.Data" v-if="listData1.Data" no-data-text="暂无数据"></Table>
                        </Modal>
                        
                        <Modal v-model="Course3" title="随机抽选" width="30%" class="sjcx">
                                <div class="sjcx_xx">
                                    <i-Button type="success" style="width: 100%;padding: 7px 0;" @click="randomSelection">开始抽选</i-Button>
                                </div>
                        </Modal>
                    </div>
                    <i-Table border :columns="columns2" :data="listDataActive.data" @on-selection-change="selectChange" no-data-text="暂无数据"></i-Table>
                    <div class="Pages">
                        <!-- <i-Button type="dashed" @click="removeDataAct">删除</i-Button> -->
                        <!-- <Page :total="listDataActive.total" @on-change="pageUpdateAct" show-total></Page> -->
                    </div>
                </Tab-Pane>
                
                <Tab-Pane label="开课审批">
                    <div class="Students_buttom">
                        <i-select class="mr10" v-model="CourseItem.activeID" @on-change="getOptCourseList(1)" style="width:300px;" placeholder="请选择场次进行选课筛选">
                            <i-option v-for="item in actList" :key=item.SerID :value=item.SerID :label="item.Name">{{item.Name}}</i-option>
                        </i-select>
                        <i-Input v-model="CourseItem.optName" style="width:300px;float: right;" id="ssk" placeholder="请输入课程名称进行筛选">
                            <i-Button slot="append" @click="getOptCourseList(1)"  icon="ios-search-strong"></i-Button>
                        </i-Input>
                    </div>
                    <i-Table border :columns="columns4" :data="CourseData.data" @on-selection-change="selectChangeSP" no-data-text="暂无数据"></i-Table>
                    <div class="Pages">
                        <!-- <i-Button type="primary" @click="courseListSP">通过</i-Button>
                        <i-Button type="dashed" @click="courseListSP(CourseData.selectList,1)">退回</i-Button> -->
                        <!-- <Page :total="CourseData.total" :current="CourseItem.PageIndex" @on-change="pageUpdate" show-total></Page> -->
                    </div>
                </Tab-Pane>
                
                <!-- <Modal v-model="Course5" title="查看详细" width="80%" class="ckxx">
                        <p><em>课程名称:</em><i-Input disabled v-model="courseSPInfo.OptName" ></i-Input></p>
                        <p><span><em>课程类别:</em><i-Input disabled v-model="courseSPInfo.TypeName"></i-Input></span><span><em>面向年级:</em><i-Input disabled v-model="courseSPInfo.GradeName"></i-Input></span></p>
                        <p><span><em>招收人数:</em><i-Input disabled v-model="courseSPInfo.PlanAmount"></i-Input></span><span><em>最少人数:</em><i-Input disabled v-model="courseSPInfo.MinAmount"></i-Input></span></p>
                        <p><span><em>上课时间:</em><i-Input disabled v-model="courseSPInfo.OptTime"></i-Input></span><span><em>上课地点:</em><i-Input disabled v-model="courseSPInfo.OptPlace"></i-Input></span></p>
                        <p><span><em>总课次:</em><i-Input disabled v-model="courseSPInfo.PlanAmount"></i-Input></span></p>
                        <p><em>课程介绍:</em><i-Input disabled type="textarea" :rows="4" v-model="courseSPInfo.OptIntro"></i-Input></p>
                        <p class="main-contents_imgss"><em>课程图片:</em><a><img :src="courseSPInfo.ImgurlName"/></a></p>
                </Modal> -->
                <Modal v-model="Course5" title="课程详情" class="ckkc">
                    <div class="cks_left"><a><img :src="courseSPInfo.ImgurlName"/></a></div>
                    <div class="cks_right">
                            <p><em>课程名称:</em><a>{{courseSPInfo.OptName}}</a></p>
                            <span><p><em>课程类别:</em><a>{{courseSPInfo.TypeName}}</a></p></span><span><p><em>面向年级:</em><a>{{courseSPInfo.GradeName}}</a></p></span>
                            <span><p><em>计划人数:</em><a>{{courseSPInfo.PlanAmount}}</a></p></span><span><p><em>最少人数:</em><a>{{courseSPInfo.MinAmount}}</a></p></span>
                            <span><p><em>上课时间:</em><a>{{courseSPInfo.OptTime}}</a></p></span><span><p><em>上课地点:</em><a>{{courseSPInfo.OptPlace}}</a></p></span>
                    </div>
                    <p id="kcjss"><em>课程介绍:</em><a>{{courseSPInfo.OptIntro}}</a></p>
                </Modal>
            </Tabs>
            <div class="custom-page-wrap">
                <div style="margin-right:3%;">
                <Page :total="listDataActive.total" @on-change="pageUpdateAct" show-total show-sizer show-elevator v-if="tabName==0"></Page>
                <div style="margin-left: 3%;padding-top: 1%;" v-if="tabName==1">
                    <i-Button type="primary" @click="courseListSP">通过</i-Button>
                    <i-Button type="ghost" style="color: red;border-color: red;margin-left: 1%;" @click="courseListSP(CourseData.selectList,1)">退回</i-Button>
                </div>
                </div>
            </div>
            <my-confirm @onClick="conItem.call" :msg='conItem.msg' :title='conItem.title' type="" :info="conItem.info" :status="conItem.status"></my-confirm>
            </div>
        </div>
    </div>
    <!-- <my-confirm @onClick="conItem.call" :msg='conItem.msg' :title='conItem.title' type="" :info="conItem.info" :status="conItem.status"></my-confirm>   -->
</template>
<script>
    import myConfirm from '@/components/confirm';
    import myUpload from '@/components/uploadFile'
    export default {
        components: {myConfirm,myUpload},
        data(){
            return {
                tabName:'',
                conItem:{msg:'',title:'',type:'',info:'',status:false,call:()=>{}},

                pictureImportUrl:'/OptCourse/api/OptCourse/OptCourse_List/upload?CategoryID=',
                courseImportUrl:'/OptCourse/api/OptCourse/OptCourse_List/OptCourseImport?Apptype=OptCourse',

                danger:'',
                deleteList:[],
                modalImgess: false,
                // Category1: false,              
                Course2: false,
                Course3: false,
                Course5: false,
                modalActivity: false,
                modalCategory: false,

                activity:{
                    serid:'',
                    title:'',
                    name:'',
                    type:'',
                    num:'',
                    startTime:'',
                    endTime:'',
                    status:'',
                    switch:'',
                },
                category:{
                    SerID:'',
                    title:'',
                    Name:'',
                    sort:'',
                },
                columns: [
                    { title: '序号', type: 'index', width: 70, },
                    {title:'类别所属',align:'center',
                        render:(h,params)=>{
                            if(params.row.SchSerID == ''){
                                return[
                                    h('p','系统')
                                ]
                            }else{
                                return[
                                    h('p','学校')
                                ]
                            }
                            
                        }
                    },
                    { title: '类别名称', key: 'Name', },
                    // { title: '类别编号', key: 'CodeID', },
                    { title: '排序', key: 'Des', },
                    { title: '操作',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return [
                                h('Tooltip', { props: { content: "编辑", placement: 'bottom' }, class: 'operating' }, 
                                [
                                    h('Button', { props: { type: 'text', icon: 'ios-compose-outline'}, on: {
                                            click: () => {
                                                var _this = this;
                                                if(params.row.SchSerID != params.row.UserSchSerID){
                                                    _this.$Message.info('您无权操作本类别');
                                                }else{
                                                    _this.category.Name = params.row.Name;
                                                    _this.category.sort = params.row.Des;
                                                    _this.category.title = '类别信息';
                                                    _this.category.SerID = params.row.SerID;
                                                    _this.modalCategory=true;
                                                }
                                            } 
                                        }}, '') 
                                ]),
                                h('Tooltip', { props: { content: "图片管理", placement: 'bottom' }, class: 'operating' }, 
                                [
                                    h('Button', { props: { type: 'text', icon: 'image' }, on: { 
                                        click: () => {
                                            var _this = this;
                                            if(params.row.SchSerID != params.row.UserSchSerID){
                                                    _this.$Message.info('您无权操作本类别');
                                            }else{
                                                _this.picture.currentCatName = params.row.Name;
                                                _this.picture.currentCatCode = params.row.CodeID;
                                                _this.pictureImportUrl = '/OptCourse/api/OptCourse/OptCourse_List/upload?CategoryID='+params.row.CodeID;
                                                _this.picture.PageIndex = 1;
                                                _this.getPictureList();
                                                _this.deleteList = [];
                                                _this.modalImgess = true; 
                                            }
                                        } 
                                    }}, '') 
                                ]),
                                h('Tooltip', { props: { content: "删除类别", placement: 'bottom' }, class: 'operating' },
                                [ 
                                    h('Button', { props: { type: 'text', icon: 'ios-trash-outline' }, on: { 
                                        click: () => { 
                                            var _this = this;
                                            if(params.row.SchSerID != params.row.UserSchSerID){
                                                _this.$Message.info('您无权操作本类别');
                                            }else{
                                                _this.removeData(params.row);
                                            }
                                        } 
                                    } }, '')
                                ]),
                            ]
                        }
                    }
                ],
                
                listDataActive:{
                    PageSize:10,
                    PageIndex:1,
                    total:0,
                    data:[],
                    selectionList:[],
                },
                courseImport:{
                    fileName:'',
                    listData:{},
                },
                current:'',
                columns2: [
                    { type: 'selection', width: 60,},
                    { title: '序号', width: 70,render: (h, params) => {
                            return [
                                h('span', {style:{'margin-right':'5px'}}, params.index+1)
                            ];
                        } 
                    },
                    { title: '场次名称', key: 'ActivityName', },
                    { title: '报名开始时间', key: 'StartTime', },
                    { title: '报名结束时间', key: 'EndTime', },
                    { title: '选课模式', width: 100, key: 'lessonTypeName'},
                    { title: '是否显示', width: 100, render: (h, params) => {  
                        return [ 
                            h('i-Switch',{props:{value:(params.row.Status==0?true:false)}, on: { 
                                'on-change': () => {
                                    var _this = this;
                                    var _type = params.row;
                                    _this.activity.serid = _type.SerID;
                                    _this.activity.title = '修改场次';
                                    _this.activity.name = _type.ActivityName;
                                    _this.activity.type = _type.lessonType;
                                    _this.activity.num = _type.SelNum;
                                    _this.activity.startTime = _type.StartTime;
                                    _this.activity.endTime = _type.EndTime;
                                    if(_type.Status == 0){
                                        _this.activity.switch = false;
                                    }else{
                                        _this.activity.switch = true;
                                    }
                                    _this.preDoActivityAdd(1);
                                } 
                            } },)
                            ] 
                        } 
                    },
                    { title: '操作',
                        width: 280,
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.lessonType == 1){
                                return [
                                    h('Tooltip', {props: {content: "编辑",placement:'bottom'},class:'operating'}, [
                                        h('Button', {
                                            props: {type: 'text',icon: 'compose'},
                                            on: {
                                                click: () => {
                                                    // this.editContactShow(params.index);
                                                    this.openActivity(params.row);
                                                }
                                            }
                                        }, '')
                                    ]),
                                    // h('Tooltip', { props: { content: "课程导入", placement: 'bottom' }, class: 'operating' }, 
                                    //     [ h('Button', { props: { type: 'text', icon: 'ios-upload-outline' }, on: { 
                                    //         click: () => { 
                                    //             this.current = params.row;
                                    //             this.Course2=true; 
                                    //         } 
                                    //     } }, '') 
                                    // ]),                                
                                    h('Tooltip', { props: { content: "随机抽选", placement: 'bottom' }, class: 'operating' },
                                        [ h('Button', { props: { type: 'text', icon: 'ios-people-outline' }, on: { 
                                            click: () => { 
                                                var nowTime = new Date().getTime();
                                                var endTime = new Date(params.row.EndTime).getTime();
                                                if(nowTime < endTime){
                                                    this.$Message.info({content:'当前场次选课尚未结束，暂不能进行随机抽选学生操作',duration:4});
                                                    return;
                                                }
                                                this.current = params.row;
                                                this.Course3=true;                                         
                                            } 
                                            
                                        } }, '') 
                                    ]),
                                    h('Tooltip', { props: { content: "清空人员", placement: 'bottom' }, class: 'operating' }, 
                                        [ h('Button', { props: { type: 'text', icon: 'person' }, on: { 
                                            click: () => { 
                                                this.current = params.row;
                                                this.clearSelection(); 
                                            } 
                                        } }, '')
                                    ]),
                                    h('Tooltip', { props: { content: "删除场次", placement: 'bottom' }, class: 'operating' },
                                        [ h('Button', { props: { type: 'text', icon: 'ios-trash-outline' }, on: {
                                            click: () => { 
                                                var _this = this;
                                                var idobj = [];
                                                idobj.push(params.row)
                                                _this.removeDataAct(idobj); 
                                            } 
                                        } }, '') 
                                    ]),
                                ]
                            }else{
                                return [
                                    h('Tooltip', {props: {content: "编辑",placement:'bottom'},class:'operating'}, [
                                        h('Button', {
                                            props: {type: 'text',icon: 'compose'},
                                            on: {
                                                click: () => {
                                                    this.openActivity(params.row);
                                                    // this.editContactShow(params.index);
                                                }
                                            }
                                        }, '')
                                    ]),
                                    // h('Tooltip', { props: { content: "课程导入", placement: 'bottom' }, class: 'operating' }, 
                                    //     [ h('Button', { props: { type: 'text', icon: 'ios-upload-outline' }, on: { 
                                    //         click: () => { 
                                    //             this.current = params.row;
                                    //             this.Course2=true; 
                                    //         } 
                                    //     } }, '') 
                                    // ]), 
                                    h('Tooltip', { props: { content: "删除选项", placement: 'bottom' }, class: 'operating' },
                                        [ h('Button', { props: { type: 'text', icon: 'ios-trash-outline' }, on: {
                                            click: () => { 
                                                var _this = this;
                                                var idobj = [];
                                                idobj.push(params.row)
                                                _this.removeDataAct(idobj); 
                                            } 
                                        } }, '') 
                                    ]),
                                ]
                            }    
                        }
                    }
                ],
                actList:[],
                CourseItem:{
                    PageIndex:1,
                    PageSize:10,
                    activeID:'',
                    optName:'',
                },
                CourseData:{
                    data:[],
                    total:0,
                    selectList:[],
                },
                listData1:{},
                columns3:[{title: '课程名称(必填)',key: '课程名称'},
                    {title: '面向年级(必填 说明：年级之间多个用英文逗号隔开)',key: '面向年级'},
                    {title: '课程类别(必填)',key: '课程类别'},
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
                            if(!this.listData1.State){
                                return h('div', {style:{color:'red'}}, row.异常);
                            }
                            else{
                                return h('div', {style:{color:'green'}},'导入成功');
                            }
                        }
                    },
                ],
                // columns3:[{title: '课程名称(必填)',key: '课程名称(必填)'},
                //     {title: '面向年级(必填 说明：年级之间多个用英文逗号隔开)',key: '面向年级(必填 说明：年级之间多个用英文逗号隔开)'},
                //     {title: '课程类别(必填)',key: '课程类别(必填)'},
                //     {title: '场次(必填)',key: '场次(必填)'},
                //     {title: '计划人数(必填)',key: '计划人数(必填)'},
                //     {title: '最少人数',key: '最少人数'},
                //     {title: '上课地点',key: '上课地点'},
                //     {title: '上课时间',key: '上课时间'},
                //     {title: '课程介绍',key: '课程介绍'},
                //     {title: '任课教师(必填)',key: '任课教师(必填)'},
                //     {title: '课次(必填)',key: '课次(必填)'},
                //     {title: '上传状态',
                //         render: (h, params) => {
                //             var row = params.row;
                //             if(!this.listData1.State){
                //                 return h('div', {style:{color:'red'}}, row.异常);
                //             }
                //             else{
                //                 return h('div', {style:{color:'green'}},'导入成功');
                //             }
                //         }
                //     },
                // ],
                columns4: [
                    { type: 'selection', width: 60, },
                    { title: '序号', key: 'title',width: 70,render: (h, params) => {
                            return [
                                h('span', {style:{'margin-right':'5px'}}, params.index+1)
                            ];
                        } 
                    },
                    { title: '课程名称', key: 'OptName', },
                    { title: '任课教师',width: 100, key: 'TeaName', },
                    { title: '面向年级', key: 'GradeName', },
                    { title: '招收人数', width: 95, key: 'PlanAmount', },
                    { title: '总课次', width: 90, key: 'TotalClassTime', },
                    { title: '课程类别',width: 120, key: 'TypeName', },
                    // { title: '最少人数', key: 'MinAmount', },
                    // { title: '上课地点', key: 'OptPlace', },
                    { title: '申请时间',width: 150, key: 'EditDate', },
                    { title: '审批状态',
                        width: 100,
                        render: (h, params) => {
                            if(params.row.Status==2){
                                return[
                                    h('Tag', {
                                        style: 'background:#7CBC28;border:1px solid #7CBC28;color:#fff;border-radius:50px;cursor:default;'
                                    }, '已通过')
                                ]
                            }else if(params.row.Status ==1){
                                return [
                                    h('Tag', {
                                        style: 'background:rgb(108, 145, 240);border:1px solid rgb(108, 145, 240);color:#fff;border-radius:50px;cursor:default'
                                    }, '审核中'),                              
                                ]
                            }else{
                                return [
                                    h('Tag', {
                                        style: 'background:#E04749 ;border:1px solid #E04749 ;color:#fff;border-radius:50px;cursor:default'
                                    }, '已退回'),                              
                                ]
                            }   
                        }
                    },
                    { title: '操作',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return [
                                h('Tooltip', { props: { content: "查看详细", placement: 'bottom' }, class: 'operating' }, 
                                    [ h('Button', { props: { type: 'text', icon: 'eye' }, on: { 
                                        click: () => { 
                                            var _this = this;
                                            _this.getCourseDetail(params.row.SerID);
                                            _this.Course5=true; 
                                        } 
                                    } }, '') 
                                ]),
                                h('Tooltip', { props: { content: "审批", placement: 'bottom' }, class: 'operating' },
                                    [ h('Button', { props: { type: 'text', icon: 'android-checkmark-circle' }, on: { 
                                        click: () => { 
                                            var _this = this;
                                            var id = [];
                                            id.push(params.row);
                                            if(params.row.Status == 2){
                                                _this.$Message.info('本课程已经通过审核，请不要重复操作');
                                                return;
                                            }
                                            _this.courseListSP(id);
                                        } 
                                    } }, '') 
                                ]),
                                h('Tooltip', { props: { content: "退回", placement: 'bottom' }, class: 'operating' },
                                    [ h('Button', { props: { type: 'text', icon: 'android-exit' }, on: {
                                        click: () => { 
                                            var _this = this;
                                            var id = [];
                                            id.push(params.row);
                                            if(params.row.Status == 3){
                                                _this.$Message.info('本课程已经退回，请不要重复操作');
                                                return;
                                            }
                                            _this.courseListSP(id,0); 
                                        } 
                                    } }, '') 
                                ]),
                            ]
                        }
                    }
                ],
                data:[],
                courseSPInfo:{},
                listData:{
                    total:'',
                    data:[],
                },
                formItem:{
                    PageIndex:1,
                    PageSize:10,
                },
                picture:{
                    currentCatName:'',
                    currentCatCode:'',
                    modalPic:[],
                    total:0,
                    PageSize:10,
                    PageIndex:1,
                }
            }
        },
        created(){
            var _this = this;
        },
        mounted(){
            var _this = this;
            // $(".path-nav").css("display","none");
            // _this.getCategoryList();
            _this.getDataList();
            _this.getActiveListOpen();
        },
        methods: {
            ImportCourse(){
                var _this = this;
                _this.Course2 = true
                _this.listData1 = {};
            },
            getPictureList(){   // 图片 分类获取
                var _this = this;
                _this.picture.modalPic = [];
                var params = {CategoryID:_this.picture.currentCatCode,Type:'0',PageSize:_this.picture.PageSize,PageIndex:(_this.picture.PageIndex-1)}
                _this.$api.get(APIConfig.OptCourse.GetPictureList,params,resp=>{             
                    if(resp.Data != 0){
                        _this.picture.modalPic = resp.Data;
                        for(var i=0;i<resp.Data.length;i++){
                            _this.$set(_this.picture.modalPic[i],'Status',false)
                        }          
                    }
                    _this.picture.total = resp.Page.sumDataCount;
                })
            },
           /*课程类别接口*/ 
            openCategory(){     //新增类别modal
                var _this = this;
                _this.category.Name = '';
                _this.category.sort = '';
                _this.category.title = '新增类别';
                _this.modalCategory = true;
            },
            addContactSave(){   // 新增类别请求
                var _this = this;
                var reg = /^[1-9]\d*$/;
                if(!reg.test(_this.category.sort)){
                    _this.danger = '请输入正整数';
                    return;
                }else{
                    _this.danger = '';
                }
                var name = _this.category.Name;
                var sort = _this.category.sort;
                var type = 'XKCategory';
                if(name == ''){
                    _this.$Message.info("请输入类别名称！");return;
                }
                if(name.length > 12){
                    _this.$Message.info("类别名称不能超过十二个字！");return;
                }
                if(_this.category.title == '新增类别'){
                    var url = APIConfig.OptCourse.AddDic;
                    var item = {
                        name:name,
                        Des:sort,
                        typeID:type,
                    }
                }else{
                    url = APIConfig.Base.UpdateDic;
                    item = {
                        SerID:_this.category.SerID,
                        name:name,
                        Des:sort,
                        typeID:type,
                    }
                }
                _this.$api.post(url, item, (resp) => {
                    var data=resp.Data;
                    _this.getCategoryList();
                    _this.modalCategory=false;
                    _this.$Message.success(resp.Message);
                
                })
            },
            removeData(item){   // 删除类别请求
                const _this=this;
                _this.conItem.status=!_this.conItem.status;
                _this.conItem.msg='确定删除类别‘'+item.Name+'’吗？';
                _this.conItem.title='删除后无法找回';
                _this.conItem.call=()=>{
                    _this.$api.post(APIConfig.OptCourse.DeleteDic+'?ids='+item.SerID,null,(resp)=>{
                        _this.$Message.success(resp.Message);
                        setTimeout(() => {
                            _this.getCategoryList();
                        }, 500);
                    })
                }
            },
            getCategoryList:function (){   // 获取类别列表
               const _this=this;
                _this.$api.get(APIConfig.OptCourse.CategoryList,null,resp=>{ 
                    _this.data = [];
                    _this.data = resp.Data;
                })
            },
            importPicture(response, file, fileList){    // 课程类别下的图片上传
                var _this = this;
                _this.getPictureList();
            },
            
            /**新增场次相关 */
            openActivity:function(_type){   //新增编辑场次modal
                var _this = this;
                if(_type){
                    _this.activity.serid = _type.SerID;
                    _this.activity.title = '修改场次';
                    _this.activity.name = _type.ActivityName;
                    _this.activity.type = _type.lessonType;
                    _this.activity.num = _type.SelNum;
                    _this.activity.startTime = _type.StartTime;
                    _this.activity.endTime = _type.EndTime;
                    _this.activity.status = _type.Status;
                    if(_type.Status == 0){
                        _this.activity.switch = true;
                    }else{
                        _this.activity.switch = false;
                    }
                    _this.modalActivity = true; 
                }else{
                    _this.activity.serid = '';
                    _this.activity.title = '新增场次';
                    _this.activity.name = '';
                    _this.activity.type = '1';
                    _this.activity.num = '';
                    _this.activity.startTime = '';
                    _this.activity.endTime = '';
                    _this.activity.status = '';
                    _this.activity.switch = true;
                    _this.modalActivity = true; 
                }

            },
            changeSwitch:function(status){      // 是否显示场次调整
                var _this = this;
                _this.activity.switch = status;
            },
            getDataList(_type){     // 获取场次列表
               const _this=this;
               if(_type=='del'){
                    let fData=_this.listDataActive;
                    if(_this.listDataActive.total==fData.PageIndex*fData.PageSize){
                        _this.listDataActive.PageIndex -= 1;
                    }
                }
                var item={
                   PageIndex:_this.listDataActive.PageIndex-1,
                   PageSize:_this.listDataActive.PageSize,
                   lessonType:'',
               };
               _this.$api.get(APIConfig.OptCourse.ActivityList,item,resp=>{                 
                   _this.listDataActive.data=resp.Data;
                   _this.listDataActive.total=resp.Page.sumDataCount;
               })
            },
            preDoActivityAdd:function(itemNew){ // 场次新增 编辑参数验证
                var _this = this;
                var vList = _this.activity;
                if(vList.name == ''){_this.$Message.info('请填写场次名称'); return;}
                if(vList.name.length > 40){_this.$Message.info('场次名称不能超过40个字'); return;}
                if(vList.type == 1){
                    var reg = /^([1-9]|10)$/;
                    if(!reg.test(vList.num)){
                        _this.$Message.info('请输入1~10的整数'); 
                        return; 
                    }  
                }
                if(vList.startTime==''){
                    _this.$Message.info('请输入选课开始时间'); 
                    return;
                }
                
                if(vList.endTime == ''){
                    _this.$Message.info('请输入选课结束时间'); 
                    return;
                }
                var start = new Date(vList.startTime);
                var end = new Date(vList.endTime);
                if(start >= end){
                    _this.$Message.info('选课开始时间大于结束时间,请从新选择'); 
                    vList.endTime = null;
                    return;
                }
                vList.startTime = _this.$utils.dateFormat(vList.startTime,'yyyy-MM-dd HH:mm:ss');
                vList.endTime = _this.$utils.dateFormat(vList.endTime,'yyyy-MM-dd HH:mm:ss');
                var data = {};
                data.ActivityName = vList.name;
                data.LessonType = vList.type;
                data.SelNum = vList.num;
                data.StartTime =_this.$utils.dateFormat(vList.startTime, "yyyy-MM-dd HH:mm:ss")||null;
                data.EndTime =_this.$utils.dateFormat(vList.endTime, "yyyy-MM-dd HH:mm:ss")||null;
                data.Status = vList.status;
                if(vList.switch){
                    data.Status = 0;
                }else{
                    data.Status = 1;
                }
                if(vList.serid != ''){
                    if(itemNew==1){//新改的编辑接口
                        var url=APIConfig.OptCourse.Actikaiguan;//标记  是否显示按钮调用的编辑时这一个
                    }else{
                        var url=APIConfig.OptCourse.ActivityEdit;//标记  原来的编辑接口  编辑图标调用的是这一个
                    }
                    data.SerID=_this.activity.serid;
                }else{
                    var url=APIConfig.OptCourse.ActivityCreate;
                }
                _this.doActivityAdd(url,data)
            },
            doActivityAdd:function(url,data){   //新增或是编辑请求
                var _this = this;
                _this.$api.post(url,data,(resp)=>{
                    if(resp.State)
                    {
                        _this.modalActivity = false;
                        _this.getDataList();
                    }else{
                        _this.modalActivity = false;
                        _this.getDataList();
                    }
                });
            },
            selectChange(selection){    // 列表前选框
                this.listDataActive.selectList = selection;
            },
            removeDataAct(_idObj){      //删除场次
                const _this=this;
                var selData=_this.listDataActive.selectList,arry={id:[],name:[]};
                if(_idObj.length==1)selData=_idObj;//单条删除
                for (let key in selData) {
                    const element =selData[key];
                    if(element.SerID){
                        arry.id.push(element.SerID);
                        arry.name.push(element.ActivityName);
                    }
                }
                if(arry.id.length==0){
                    _this.$Message.info({content:"请选择要删除的数据",duration:3});return;
                }
                _this.conItem.status=!_this.conItem.status;
                _this.conItem.msg='确定删除'+ (arry.name.length>1?'选中的': '“' +arry.name +'”')+'场次吗？';
                _this.conItem.info='删除后无法找回';
                _this.conItem.call=()=>{
                    var item={ids:arry.id.join(',')};
                    _this.$api.get(APIConfig.OptCourse.ActivityDelete,item,(resp)=>{
                        _this.$Message.success({content:resp.Message,duration:4});
                        setTimeout(() => {
                            _this.getDataList('del');
                        }, 500);
                    })
                }
            },
            downFile(){     //下载样表
                location.href=APIConfig.OptCourse.OptCourseExport;
            },
            importFile(response, file, fileList){       //上传
                const _this=this;
                _this.listData1 = response;
            },
            randomSelection(){      //一键随机
                const _this=this;
                _this.conItem.status=!_this.conItem.status;
                _this.conItem.msg='确定对“'+_this.current.ActivityName+'”场次下的课程的学生按照志愿进行随机抽选吗？';
                _this.conItem.title='按志愿随机抽选';
                _this.conItem.type = '';
                _this.conItem.info = '随机后可查看课程详情';
                _this.conItem.call=()=>{
                    var item={ActiveID:_this.activeID};
                    _this.$api.post(APIConfig.OptCourse.Auto_SelStu+"?ActiveID="+_this.current.SerID,null,(resp)=>{
                        _this.Course3 = false;
                        _this.$Message.info('按照志愿顺序随机抽选完毕！');
                    })
                }
            },
            clearSelection(){       //清空人员
                const _this=this;
                _this.conItem.status=!_this.conItem.status;
                _this.conItem.msg='确定清空“'+_this.current.ActivityName+'”场次下的已选中学生吗？';
                _this.conItem.title='清空已选学生';
                _this.conItem.info='清空后不可找回，确认要清空吗？';
                _this.conItem.call=()=>{
                    var item={ActiveID:_this.activeID};
                    _this.$api.post(APIConfig.OptCourse.SelStuDelete+"?ActiveID="+_this.current.SerID,null,(resp)=>{
                        
                    })
                }
            },

            /**审批相关 */
            getActiveListOpen(){   //获取场次下拉
                const _this=this;
                _this.$api.get(APIConfig.OptCourse.GetActiveList,null,(resp)=>{ 
                    _this.actList=[];
                    // _this.actList.push({SerID:'',Name:'全部场次'})
                    for(let key in resp.Data){
                        _this.actList.push({SerID:resp.Data[key].SerID,Name:resp.Data[key].Name})
                    }
                    _this.CourseItem.activeID=_this.actList[0].SerID;
                    _this.getOptCourseList();
                })
            },
            getOptCourseList(_type){  // 获取课程审批列表  
                const _this=this;
                if(_type){
                    _this.CourseItem.PageSize = 10;
                    _this.CourseItem.PageIndex = 1;
                }
                var item={
                    ActiveID:_this.CourseItem.activeID==""||_this.CourseItem.activeID==undefined?'':_this.CourseItem.activeID,
                    OptName:_this.CourseItem.optName,
                    PageIndex:_this.CourseItem.PageIndex-1,
                    PageSize:_this.CourseItem.PageSize,
                };
                _this.$api.get(APIConfig.OptCourse.OptCourseSPList,item,(resp)=>{                 
                    _this.CourseData.data=resp.Data;
                    _this.CourseData.total=resp.Page.sumDataCount;
                })
            },
            selectChangeSP(selection){  // SP选框选取
                this.CourseData.selectList = selection;
            },
            courseListSP(_idObj,_type){     // 批量和单条审批通过请求 
                const _this=this;
                var selData=_this.CourseData.selectList,arry={id:[],name:[]};
                if(_idObj.length==1)selData=_idObj;
                for (let key in selData) {
                    const element =selData[key];
                    if(element.SerID){
                        arry.id.push(element.SerID);
                        arry.name.push(element.OptName);
                    }
                }
                if(arry.id.length==0){
                    _this.$Message.info("请选择要审批的课程");return;
                }
                if(_type=='0'){     //退回，不允许开课
                    var status = '3'
                    _this.conItem.status=!_this.conItem.status;
                    _this.conItem.msg='确定拒绝“'+arry.name +'”这门课程开课吗？';
                    _this.conItem.title = '拒绝后的课程也可再次审批';
                    _this.conItem.info=''; 
                }else if(_type == '1'){
                    status = '3'    //批量退回，
                    _this.conItem.status=!_this.conItem.status;
                    _this.conItem.msg='确定退回'+ (arry.name.length>1?'选中的': '“' +arry.name +'”这门')+'课程吗？';
                    _this.conItem.title = '';
                    _this.conItem.info='';
                }else{
                    status = '2'    //批准，允许开课招生
                    _this.conItem.status=!_this.conItem.status;
                    _this.conItem.msg='确定批准'+ (arry.name.length>1?'选中的': '“' +arry.name +'”这门')+'课程吗？';
                    _this.conItem.title = '';
                    _this.conItem.info='';
                }
                
                _this.conItem.call=()=>{
                    // var item={ids:arry.id.join(','),Status:'2'};
                    _this.$api.post(APIConfig.OptCourse.OptCourseSP+'?ids='+arry.id.join(',')+'&Status='+status,null,(resp)=>{
                        _this.$Message.success(resp.Message);
                        _this.getOptCourseList();
                    })
                }
            },
            getCourseDetail:function(SerID){
                const _this = this;
                _this.$api.get(APIConfig.OptCourse.OptCourseDetails,{SerID:SerID},(resp)=>{ 
                    _this.courseSPInfo = resp.Data[0];
                })
            },

            pageUpdate: function (page) {
                var _this = this;
                _this.CourseItem.PageIndex = page;
                _this.getOptCourseList();
            },
            pageUpdateAct(page){
                var _this = this;
                _this.listDataActive.PageIndex = page;
                _this.getDataList();
            },
            picturePageUpdate(page){
                var _this = this;
                _this.picture.PageIndex = page;
                _this.getPictureList();
            },
            DeletePic(item){
                var _this = this;
                var flag = true;
                for(var i=0;i<_this.deleteList.length;i++){
                    if(item.SerID == _this.deleteList[i]){
                        item.Status = false;
                        flag = false;
                        _this.deleteList.splice(i,1);
                    }
                }
                if(flag){
                    _this.deleteList.push(item.SerID);
                    item.Status = true;
                }
            },
            delPic(){
                var _this = this;
                if(_this.deleteList.length == 0){
                    _this.conItem.status=!_this.conItem.status;
                    _this.conItem.msg='请选择需要删除的图片！';
                    _this.conItem.info=' ';
                    return;
                }else{
                    _this.conItem.status=!_this.conItem.status;
                    _this.conItem.msg='确定删除已选中的图片吗？';
                    _this.conItem.info='删除后无法找回';
                    _this.conItem.call=()=>{
                        var item={ids:_this.deleteList.join(',')};
                        _this.$api.get(APIConfig.OptCourse.DeletePicture,item,(resp)=>{
                            setTimeout(() => {
                                _this.getPictureList();
                            }, 500);
                        })
                    }
                }        
            },
            getTabName(name){ //tab页切换
            var _this=this;
            _this.tabName=name;
            console.log(_this.tabName);
        }, 
    }
}
</script>
