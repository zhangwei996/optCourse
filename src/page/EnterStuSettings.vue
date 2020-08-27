<template>
    <div class="body" id="Course_Selection_web">
        <div class="path-nav">
            <h1>提前录取</h1>
            <!-- <div style="margin-top: 1%;margin-left: 80%;"><router-link to="/OptCourse/MyCourse"><Icon type="arrow-return-left" size="24"></Icon></router-link></div> -->
        </div>
        <div class="main-box">
            <div class="main-box_s">
                <div style="margin-bottom: 1%;">
                    <span style="font-size: 24px;">当前课程:{{CurrentCourseDetail.TypeName}}></span><span style="font-size: 20px;">{{CurrentCourseDetail.OptName}}</span>
                </div>
                <div v-if="CurrentCourseDetail.LessonType =='0' ">
                    <div style="display:flex;margin-bottom: 1%;">
                        <div style="margin-right: 1%;"><Button type="primary" style="background:#4a26d8;" @click="openAddStuModal">添加学生</Button></div>
                        <div style="margin-right: 1%;"><Button type="success" @click="openStuImportModal">批量导入学生</Button></div>
                        <div style="margin-right: 1%;"><Input v-model="selectName" clearable placeholder="请输入学生姓名" /></div>
                        <div style="margin-right: 1%;"><Button type="primary" @click="getStuByName">筛选</Button></div>
                    </div>
                    <div>
                        <Table :columns="columns" :data="data" no-data-text="暂无数据" @on-selection-change="getSelStuSel"></Table>
                    </div>
                    <div class="custom-page-wrap" style="display:flex;">
                        <Button style="margin-top: 0.7%;margin-left: 2%;margin-bottom: 0.7%;" @click="delSeveralStu">删除</Button>
                        <Page :total="total" :page-size="PageSize" show-sizer show-elevator show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" ></Page>
                    </div>
                </div>
                <div v-else>
                    <!-- <div>
                        <Button type="success">导入模板</Button>
                    </div>
                    <div>
                        <span>志愿顺序:</span><Select style="width:100px;"></Select><span>(总共:)</span>
                        <span>选中学生列表:（总共:;计划招收:{{CurrentCourseDetail.PlanAmount}}）</span>
                    </div> -->
                    <div style="display:flex;">
                        <div>
                            <div style="margin-bottom: 1%;text-align: center;">
                                <span>志愿学生列表(总共:{{voluntaryModel.volTotal}})</span></div>
                            <Table :columns="columns3" :data="data3" no-data-text="暂无数据" @on-selection-change="getVolSelect"></Table>
                        </div>
                        <div style="text-align: center;margin-top: 6%;">
                            <div style="margin-top: 10%;"><Button type="success" icon="chevron-right" @click="addVolSetTo">选择</Button></div>
                            <div style="margin-top: 10%;"><Button type="warning" icon="chevron-left" @click="delStuSetTo">移除</Button></div>
                            <div style="margin-top: 10%;"><Button type="primary" icon="chevron-left" style="background:red;" @click="delAllStuTo">全部移除</Button></div>
                        </div>
                        <div>
                            <div style="margin-bottom: 1%;text-align: center;"><span>选中学生列表:（总共:{{voluntaryModel.stuTotal}};计划招收:{{CurrentCourseDetail.PlanAmount}}）</span></div>
                            <Table :columns="columns4" :data="data4" no-data-text="暂无数据" @on-selection-change="getVolStuSelect"></Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="SelectModel.addStuModal" title="添加学生" @on-ok="AddCourseStu">
            <div style="display:flex;">
                <!-- v-for="item in gradeList" :key="CodeSerID" -->
                <div><span>年级:</span></div>
                <div>
                    <Select v-model="SelectModelData.currentGrade" style="width:300px;" @on-change="getStuWhileGradeChange">
                        <Option v-for="item in SelectModelData.gradeList" :key="item.CodeSerID" :value="item.CodeSerID">{{item.Code}}</Option>
                    </Select>
                </div>
                <div><span>班级:</span></div>
                <div><Select v-model="SelectModelData.currentClass" style="width:300px;" @on-change="getStuWhileClassChange">
                        <Option v-for="item in SelectModelData.classList" :key="item.ClassID" :value="item.ClassID">{{item.ClassName}}</Option>
                    </Select>
                </div>
            </div>
            <div>
                <Table :columns="columns1" :data="data1" no-data-text="暂无数据" @on-selection-change="getSelectStus"></Table>
            </div>
        </Modal>
        <Modal v-model="SelectModel.importModal" title="导入提前录取名单">
            <div>
                Excel上传:
                <Upload :action="stuEXLImportUrl" :show-upload-ist="false" accept=".xls,.xlsx" :on-success="importStuEXLFile">
                    <Button icon="ios-plus-outline"></Button>
                </Upload>
            </div>
            <div>
                <Alert show-icon>
                    操作说明:
                    <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
                    <template slot="desc">
                        <div>请先上传EXCEL文件,若成功则显示导入成功数据,否则显示错误的数据及错误原因;EXCEL文件的格式():
                        工作表(WorkSheet)的名称应设为缺省的[Sheet1];[Sheet1]的第一行为标题行,列名分别为:学生姓名,年级,课程名称,场次</div>
                        <div>
                            <a href="javascript:;" @click="downFile" style="line-height:32px;float:right;margin-right:15px">点击链接下载[提前录入学生模板.xls]</a>
                        </div>
                    </template>
                <!-- 请先上传EXCEL文件,若成功则显示导入成功数据,否则显示错误的数据及错误原因; -->
                </Alert>
            </div>
            <div v-if="importMessageData.Data != null">
                <div v-if="importMessageData.State == true" style="color:green;">导入成功</div>
                <div v-else style="color:red;">导入失败，请修改Excel文件中相关数据后再重新上传！</div>
                <Table :columns="columns2" :data="importMessageData.Data" no-data-text="暂无数据"></Table>
            </div>
        </Modal>
        <Modal v-model="SingleStuDelModal" title="学生移除" @on-ok="DelSingleStu">
            <Alert type="warning" show-icon>
                    <div>{{"确定要将当前学生移除本课程吗？"}}</div>
                </Alert>
        </Modal>
        <Modal v-model="exCourseModal" title="换课" @on-ok="StuExCourse">
            <div>
                <span>学生姓名:</span>{{ExCourseData.exStu.StuName}}
            </div>
            <div>
                <span>换课至:</span>
                <Select style="width:300px;" v-model="ExCourseData.exCourseId">
                    <Option v-for="item in exchangeCourseList" :key="item.SerID" :value="item.SerID">{{item.Name}}</Option>
                </Select>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    data(){
        return{
            CurrentCourseDetail:{},//当前课程详情
            exchangeCourseList:[],
            selectName:'',
            stuEXLImportUrl:'/api/OptCourse/OptCourse_List/StuYXOptImport?',
            SelectModel:{
                addStuModal:false,
                importModal:false,
                selection:[],
            },
            SelectModelData:{
                gradeList:[],//年级列表
                classList:[],//当前年级的班级列表
                currentGrade:'',//当前年级,默认为列表第一个
                currentClass:'',//当前班级,默认为列表第一个
                selectStuList:[],//添加时选中
            },
            ExCourseData:{
                exStu:{},
                exCourseId:'',
            },
            importMessageData:{},
            SingleStuDelModal:false,
            exCourseModal:false,
            StudentsDelModal:false,
            delStuId:'',//删除学生id
            delStuIds:'',//删除学生ids
            voluntaryModel:{
                leftList:[],
                rightList:[],
                stuTotal:'',
                volTotal:'',
            },
            gradeList:[],//年级列表
            total:100,
            PageSize:10,
            PageIndex:0,
            data:[],
            data3:[],
            data4:[],
            columns:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                { title: '序号', type: 'index', },
                { title: '学生姓名', key: 'StuName', },
                { title: '任课教师', key: '', },
                { title: '年级', key: 'GradeName', },
                { title: '班级', key: 'ClassName', },
                { 
                    title: '操作', 
                    width: 180,
                    align: 'center', 
                    render: (h, params) => {
                        return [
                            h('Tooltip', {props: {content: "换课",placement:'bottom'},class:'operating'}, [
                                h('Button', { props: { type: 'text', icon: 'arrow-swap' }, on: {
                                    click: () => {
                                        var _this=this;
                                        // console.log(params.row.UserID)
                                        _this.openExCourseModal(params.row);
                                    }
                                }},''),]),
                            h('Tooltip', {props: {content: "删除",placement:'bottom'},class:'operating'}, [
                                h('Button', { props: { type: 'text', icon: 'ios-trash-outline' }, on: {
                                    click: () => {
                                        var _this=this;
                                        // console.log(params.row.StuSerID)
                                        _this.openSingleStuDelModal(params.row.SerID);
                                    }
                                }},''),])
                        ];
                    },
                },
            ],
            data1:[],
            columns1:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    // disabled: false,
                },
                { title: '序号', type: 'index', },
                { title: '学生姓名', key: 'StuName', },
            ],
            columns2:[
                {title: '姓名',key: '姓名'},
                {title: '年级',key: '年级'},
                {title: '班级',key: '班级'},
                {title: '上传状态',
                    render: (h, params) => {
                        var row = params.row;
                        if(!this.importMessageData.State){
                            return h('div', {style:{color:'red'}}, row.异常);
                        }
                        else{
                            return h('div', {style:{color:'green'}},'导入成功');
                        }
                    }
                },
            ],
            columns3:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                { title: '班级', key: 'ClassName', },
                { title: '学生姓名', key: 'StuName', },
                { title: '志愿顺序', key: 'Number', },
            ],
            columns4:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                { title: '班级', key: 'ClassName', },
                { title: '学生姓名', key: 'StuName', },
                { title: '志愿名称', key: 'Number', },
                { 
                    title: '操作', 
                    width: 180,
                    align: 'center', 
                    render: (h, params) => {
                        return [
                            h('Tooltip', {props: {content: "换课",placement:'bottom'},class:'operating'}, [
                                h('Button', { props: { type: 'text', icon: 'arrow-swap' }, on: {
                                    click: () => {
                                        var _this=this;
                                        // console.log(params.row.UserID)
                                        _this.openExCourseModal(params.row);
                                    }
                                }},''),])
                            // h('Button', { props: { type: 'text', icon: 'ios-trash-outline' }, on: {
                            //     click: () => {
                            //         var _this=this;
                            //         // console.log(params.row.StuSerID)
                            //         _this.openSingleStuDelModal(params.row.SerID);
                            //     }
                            // }},''),
                        ];
                    },
                },
            ],
        };
    },
    mounted(){
        var _this=this;
        _this.getCourseDetail();
        // _this.getDefaultGradeAndClass();
        // _this.getCurrentCourseStuList();
    },
    methods:{
        getCourseDetail(){ //获取当前课程详情
            var _this=this;
            let SerID=_this.$route.query.id;
            // console.log("课程id为:"+SerID)
            _this.$api.get(APIConfig.OptCourse.OptCourseDetails,{SerID:SerID},resp=>{
                _this.CurrentCourseDetail=resp.Data[0];
                if(resp.Data[0].LessonType=="0"){
                    let OptSerID=_this.CurrentCourseDetail.SerID;
                    // console.log(OptSerID)
                    let PageSize=_this.PageSize;
                    let PageIndex=_this.PageIndex;
                    let name=_this.selectName;
                    _this.$api.get(APIConfig.OptCourse.OptStuList,{OptSerID:OptSerID,PageSize:PageSize,PageIndex:PageIndex,name:name},resp=>{
                        _this.data=resp.Data;
                        _this.total=resp.Page.sumDataCount;
                    });
                    
                    _this.getDefaultGradeAndClass();
                }else{
                    // console.log("志愿模式")
                    _this.getVoluntaryList();
                    _this.getStuListWhileVolModel();
                }
                let ActiveID=resp.Data[0].ActiveID;
                let tempname='';
                _this.$api.get(APIConfig.OptCourse.GetDroCourse,{ActiveID:ActiveID,name:tempname},resp=>{
                        // _this.exchangeCourseList=resp.Data;
                    let temp=resp.Data;
                    _this.exchangeCourseList=[];
                    temp.forEach(x=>{
                        let flag=false;
                        if(_this.CurrentCourseDetail.SerID == x.SerID) flag=true;
                        if(!flag) _this.exchangeCourseList.push(x);
                    });
                        // console.log(_this.exchangeCourseList);
                });
            });
        },
        getVoluntaryList(){ //获取志愿学生列表
            var _this=this;
            _this.data3=[];
            let OptSerID=_this.CurrentCourseDetail.SerID;
            _this.$api.get(APIConfig.OptCourse.AllSwitchStuList,{OptSerID:OptSerID},resp=>{
                _this.data3=resp.Data.map(x=>({
                    ClassName:x.ClassName,
                    Number:x.Number,
                    SerID:x.SerID,
                    _disabled:x.Status==1?true:false,
                    StuName:x.StuName,
                    StuSerID:x.StuSerID,
                    EditDate:x.EditDate
                }));
                _this.voluntaryModel.volTotal=resp.Page.sumDataCount;
            });
        },
        getStuListWhileVolModel(){
            var _this=this;
            let OptSerID=_this.CurrentCourseDetail.SerID;
            let name='';
            _this.$api.get(APIConfig.OptCourse.OptStuList,{OptSerID:OptSerID,name:name},resp=>{
                _this.data4=resp.Data;
                _this.voluntaryModel.stuTotal=resp.Page.sumDataCount;
            });
        },
        getCurrentCourseStuList(){ //获取当前课程学生列表
            var _this=this;
            let OptSerID=_this.CurrentCourseDetail.SerID;
            // console.log(OptSerID)
            let PageSize=_this.PageSize;
            let PageIndex=_this.PageIndex;
            let name=_this.selectName;
            _this.$api.get(APIConfig.OptCourse.OptStuList,{OptSerID:OptSerID,PageSize:PageSize,PageIndex:PageIndex,name:name},resp=>{
                _this.data=resp.Data;
                _this.total=resp.Page.sumDataCount;
            });
        },
        getDefaultGradeAndClass(){ //获取默认年级班级列表
            var _this=this;
            // _this.getGradeLists();
            _this.$api.get(APIConfig.OptCourse.GetGradeList,null,resp=>{
                _this.SelectModelData.gradeList=resp.Data;
                _this.SelectModelData.currentGrade=_this.SelectModelData.gradeList[0].CodeSerID;
                let Grade=_this.SelectModelData.currentGrade;
                _this.$api.get(APIConfig.OptCourse.GetClass,{Grade:Grade},resp=>{
                    _this.SelectModelData.classList=resp.Data;
                    _this.SelectModelData.currentClass=_this.SelectModelData.classList[0].ClassID;
                    let ClassID=_this.SelectModelData.currentClass;
                    _this.$api.get(APIConfig.OptCourse.GetClassStuList,{ClassID:ClassID},resp=>{
                        // _this.data1=resp.Data;
                        if(_this.data.length!=0){
                            let temp=resp.Data;
                            _this.data1=[];
                            temp.forEach(x=>{
                                let flag=false;
                                _this.data.forEach(y=>{
                                    if(x.StuSerID == y.StuSerID) flag=true;
                                });
                                if(!flag) _this.data1.push(x);
                            });
                        }else _this.data1=resp.Data;
                    });
                });
            });
            // console.log(2222222222)
            // _this.getClassLists();
            // _this.SelectModelData.currentClass=_this.SelectModelData.classList[0];
        },
        /** 选择模式相关 */
        openAddStuModal(){ //打开添加学生对话框
            var _this=this;
            // console.log(typeof _this.SelectModelData)
            // _this.SelectModelData.currentGrade=_this.SelectModelData.gradeList[0].CodeSerID;
            _this.SelectModel.addStuModal=true;
        },
        getStuWhileGradeChange(){ //年级改变时,默认获取改变后第一个班级的学生列表
            var _this=this;
            let Grade=_this.SelectModelData.currentGrade;
            _this.$api.get(APIConfig.OptCourse.GetClass,{Grade:Grade},resp=>{
                _this.SelectModelData.classList=resp.Data;
                _this.SelectModelData.currentClass=_this.SelectModelData.classList[0].ClassID;
                let ClassID=_this.SelectModelData.currentClass;
                _this.$api.get(APIConfig.OptCourse.GetClassStuList,{ClassID:ClassID},resp=>{
                    // _this.data1=resp.Data;
                    if(_this.data.length!=0){
                        let temp=resp.Data;
                        _this.data1=[];
                        temp.forEach(x=>{
                            let flag=false;
                            _this.data.forEach(y=>{
                                if(x.StuSerID == y.StuSerID) flag=true;
                            });
                            if(!flag) _this.data1.push(x);
                        });
                    }else _this.data1=resp.Data;
                });
            });
        },
        getStuWhileClassChange(){ //获取改变后班级的学生列表
            var _this=this;
            let ClassID=_this.SelectModelData.currentClass;
            _this.$api.get(APIConfig.OptCourse.GetClassStuList,{ClassID:ClassID},resp=>{
                // _this.data1=resp.Data;
                if(_this.data.length!=0){
                    let temp=resp.Data;
                    _this.data1=[];
                    temp.forEach(x=>{
                        let flag=false;
                        _this.data.forEach(y=>{
                            if(x.StuSerID == y.StuSerID) flag=true;
                        });
                        if(!flag) _this.data1.push(x);
                    });
                }else _this.data1=resp.Data;
            });
        },
        getSelectStus(selection){
            // console.log(selection)
            var _this=this;
            _this.SelectModelData.selectStuList=selection;
        },
        AddCourseStu(){ //添加学生
            var _this=this;
            let selection=_this.SelectModelData.selectStuList;
            let templist=[];
            if(selection.length!=0){
                selection.forEach(x=>{
                    templist.push(x.StuSerID);
                });
            }else{
                _this.$Message.info("请至少选择一个学生添加");
                return;
            }
            let StuSerID=templist.join(',');
            let ActiveID=_this.CurrentCourseDetail.ActiveID;
            let OptSerID=_this.CurrentCourseDetail.SerID;
            _this.$api.post(APIConfig.OptCourse.AddStuYXOpt,{ActiveID:ActiveID,OptSerID:OptSerID,StuSerID:StuSerID},resp=>{
                _this.SelectModelData.selectStuList=[];
                //获取当前课程学生列表
                _this.getCurrentCourseStuList();
            });
        },
        openStuImportModal(){ //打开导入对话框
            var _this=this;
            _this.importMessageData={};
            let ActiveID=_this.CurrentCourseDetail.ActiveID;
            let OptSerID=_this.CurrentCourseDetail.SerID;
            _this.stuEXLImportUrl='/api/OptCourse/OptCourse_List/StuYXOptImport?ActiveID='+ActiveID+'&OptSerID='+OptSerID;
            _this.SelectModel.importModal=true;
        },
        downFile(){ //下载样表
            location.href=APIConfig.OptCourse.StuYXOptExport;
        },
        importStuEXLFile(response, file, fileList){
            var _this=this;
            _this.importMessageData=response;
            _this.getCurrentCourseStuList();
        },
        openSingleStuDelModal(StuSerID){ //打开删除学生对话框
            var _this=this;
            console.log(StuSerID)
            // console.log(StuSerID.length)
            _this.delStuId=StuSerID;
            _this.SingleStuDelModal=true;
        },
        getSelStuSel(selection){ //选课模式选中
            var _this=this;
            _this.SelectModel.selection=selection;
        },
        DelSingleStu(){ //删除单个学生
            var _this=this;
            let ids=_this.delStuId;
            _this.$api.get(APIConfig.OptCourse.DeleteYXStu,{ids:ids},resp=>{
                _this.getCurrentCourseStuList();
            });
        },
        delSeveralStu(){ //删除多个学生
            var _this=this;
            let ids=[];
            let selection=_this.SelectModel.selection;
            if(selection.length==0){
                _this.$Message.info("请选择需要删除的学生");
            }else{
                selection.forEach(x=>{
                    ids.push(x.SerID);
                });
                _this.$api.get(APIConfig.OptCourse.DeleteYXStu,{ids:ids.join(',')},resp=>{
                    _this.SelectModel.selection=[];
                    _this.getCurrentCourseStuList();
                });
            }
        },
        openExCourseModal(data){
            var _this=this;
            _this.ExCourseData.exStu=data;
            _this.exCourseModal=true;
        },
        StuExCourse(){
            var _this=this;
            let ActiveID=_this.CurrentCourseDetail.ActiveID;
            let OptSerID=_this.ExCourseData.exCourseId;
            let StuSerID=_this.ExCourseData.exStu.StuSerID;
            if(OptSerID==''){
                _this.$Message.info("请选择换课至某一具体课程");
                return;
            }else{
                _this.$api.post(APIConfig.OptCourse.ChangOpt,{ActiveID:ActiveID,OptSerID:OptSerID,StuSerID:StuSerID},resp=>{
                    _this.ExCourseData.exCourseId='';
                    if(_this.CurrentCourseDetail.LessonType=='0') _this.getCurrentCourseStuList();
                    else _this.getStuListWhileVolModel();
                });
            }
        },
        /** */

        /** 志愿模式相关 */
        getVolSelect(selection){ //左边选择
            var _this=this;
            _this.voluntaryModel.leftList=selection;
        },
        getVolStuSelect(selection){ //右边选中
            var _this=this;
            _this.voluntaryModel.rightList=selection;
        },
        addVolSetTo(){ //将左边志愿表中选中的学生添加到右边的录取表中
                       //左边选中数据禁用,并将选中部分添加到右边,然后刷新左右表
            var _this=this;
            let selection=_this.voluntaryModel.leftList;
            let ids=[];
            if(selection.length==0){
                _this.$Message.info("请选择需要添加到录取列表的志愿学生");
            }else{
                selection.forEach(x=>{
                    ids.push(x.SerID);
                });
                _this.$api.get(APIConfig.OptCourse.OptCourseStuAdd,{ids:ids.join(',')},resp=>{
                    _this.getStuListWhileVolModel();
                    _this.$api.get(APIConfig.OptCourse.OptCourseStuDelete,{ids:ids.join(',')},resp=>{
                        _this.getVoluntaryList();
                        _this.voluntaryModel.leftList=[];
                        _this.voluntaryModel.rightList=[];
                    });
                });
            }
        },
        delStuSetTo(){ //删除右边选中，左边对应数据可选，刷新左右表
            var _this=this;
            let selection=_this.voluntaryModel.rightList;
            let ids=[];
            if(selection.length==0){
                _this.$Message.info("请选择需要移除的学生");
            }else{
                selection.forEach(x=>{
                    ids.push(x.SerID);
                });
                _this.$api.get(APIConfig.OptCourse.DeleteYXStu,{ids:ids.join(',')},resp=>{
                    _this.getStuListWhileVolModel();
                    _this.$api.get(APIConfig.OptCourse.OptCourseStuDelete,{ids:ids.join(',')},resp=>{
                        _this.getVoluntaryList();
                        _this.voluntaryModel.leftList=[];
                        _this.voluntaryModel.rightList=[];
                    });
                });
            }
        },
        delAllStuTo(){ //删除右边所有，左边对应数据可选，刷新左右表
            var _this=this;
            let selection=_this.data4;
            let ids=[];
            selection.forEach(x=>{
                ids.push(x.SerID);
            });
            _this.$api.get(APIConfig.OptCourse.DeleteYXStu,{ids:ids.join(',')},resp=>{
                _this.getStuListWhileVolModel();
                _this.$api.get(APIConfig.OptCourse.OptCourseStuDelete,{ids:ids.join(',')},resp=>{
                    _this.getVoluntaryList();
                    _this.voluntaryModel.leftList=[];
                    _this.voluntaryModel.rightList=[];
                });
            });
        },
        /** */
        getStuByName(){
            var _this=this;
            _this.getCurrentCourseStuList();
        },
        pageChange(index){
            var _this=this;
            _this.PageIndex=index-1;
            _this.getCurrentCourseStuList();
        },
        pageSizeChange(pagesize){
            var _this=this;
            _this.PageSize=pagesize;
            _this.getCurrentCourseStuList();
        },
    },
}
</script>