<template>
    <div class="body index" id="Course_Selection_web">
        <div class="Path" style="margin-top:20px">
            <i-select class="mr10" style="width:300px;" @on-change="getOptCourseList()" v-model="addCourse.ActivityID"> 
                <i-option v-for="item in actList" :key="item.SerID" :value="item.SerID">{{item.Name}}</i-option> 
            </i-select>
            <i-Button type="ghost" @click="handleTabsAdd" size="small" slot="extra" style="float:right;background: #6C91F0;color:#fff;">增加课程</i-Button>
            <i-Button type="success" @click="modalc = true" style="margin-right:20px;">同步老课程</i-Button>
            <Modal v-model="modalc" title="同步老课程"  width="80%" class="Students1 Students1cs">
                <p><em>历史场次选择:</em><i-select class="mr10" v-model="SYOldCourse" @on-change="getSYOptCourse()" placeholder="请选择历史场次">
                    <i-option v-for="item in actListTea" :key="item.SerID" :value="item.SerID">{{item.Name}}</i-option> 
                </i-select></p>
                <Transfer 
                    :data="SYCourseList" 
                    :target-keys="targetKeys2" 
                    filterable 
                    @on-change="SYoldToNew"></Transfer>
                <div slot="footer">
                    <i-Button type="ghost" @click="closeSYCourse">取消</i-Button>
                    <i-Button type="primary" @click="oldCourseToNew()">确定</i-Button>
                </div>    
            </Modal>
        </div>
        <div class="main-box" style="margin-top:0px">
            <div class="main-tab">
                <Tabs type="card" v-model="currentCourse" @on-click="getCourseInfo()">
                    <Tab-Pane v-for="(course,index) in courseList" :key="course.SerID" :name="course.SerID" :label="label(course.Name)">
                        <Form ref="courseInfo" :model="courseInfo" :rules="ruleValidate">
                            <div class="main-contents">
                                <p>
                                    <FormItem prop="OptName"> <tt id="tt1">*</tt><em>课程名称:</em><i-Input v-model="courseInfo.OptName" :disabled="(courseInfo.Status==2)?true:false" placeholder="请输入课程名称（注:课程名称不要超过12个字符)">
                                    </i-Input></FormItem>
                                </p>
                                <p>                          
                                    <span v-if="courseInfo.Status==2">
                                       <tt id="tt1">*</tt><em>课程类别:</em><i-Input v-model="courseInfo.TypeName" :disabled="true"></i-Input></span>
                                    <span v-else>
                                        <FormItem prop="TypeID"> <tt id="tt1">*</tt><em>课程类别:</em><i-select class="mr10" v-model="courseInfo.TypeID" placeholder="请选择类别">
                                            <i-option v-for="item in addCourse.data" :key=item.SerID :value="item.SerID">{{item.Name}}</i-option></i-select>
                                        </FormItem>
                                    </span>

                                    <span v-if="courseInfo.Status==2">
                                        <tt id="tt1">*</tt><em>面向年级:</em><i-Button type="primary" @click="gradeModel=true">确定</i-Button>
                                        <i-Input v-model="courseInfo.GradeName" :disabled="true"></i-Input>
                                    </span>
                                    
                                    <span v-else>
                                        <FormItem prop="gradeList"> <tt id="tt1">*</tt><em>面向年级:</em><i-Button type="primary" @click="gradeModel=true">选择班级</i-Button>
                                            <!-- <i-select class="mr10" :multiple=true v-model="courseInfo.gradeList" placeholder="(注:可多选)">
                                              <i-option v-for="item in addCourse.gradeList" :key=item.CodeSerID :value="item.CodeSerID" :name="item.CodeSerID" >{{item.Code}}</i-option>
                                            </i-select> -->
                                        </FormItem>
                                    </span>
                                </p>
                                <Modal v-model="gradeModel" title="选择课程面对的班级" class="Gallery" width="600px">
                                    <Tree :data="data4" 
                                          show-checkbox 
                                          multiple
                                          @on-check-change="getGradeClass"
                                          ref="Tree"></Tree>
                                    <div slot="footer"></div>
                                </Modal>
                                <p> 
                                    <span><FormItem prop="PlanAmount">
                                         <tt id="tt1">*</tt><em>计划人数:</em><i-Input v-model="courseInfo.PlanAmount" :disabled="(courseInfo.Status==2)?true:false" placeholder="请输入计划招生人数(正整数)">
                                    </i-Input></FormItem></span>                               
                                    
                                    <span><FormItem prop="MinAmount">
                                         <tt id="tt2">*</tt><em>最少人数:</em><i-Input v-model="courseInfo.MinAmount" :disabled="(courseInfo.Status==2)?true:false" placeholder="请输入最少招生人数(正整数)">
                                    </i-Input></FormItem></span>                               
                                </p>
                                <p>
                                    <span>
                                         <tt id="tt2">*</tt><em>上课时间:</em><i-Input v-model="courseInfo.OptTime" :disabled="(courseInfo.Status==2)?true:false" placeholder="请输入上课时间">
                                    </i-Input></span>

                                    <span>
                                         <tt id="tt2">*</tt><em>上课地点:</em><i-Input v-model="courseInfo.OptPlace" :disabled="(courseInfo.Status==2)?true:false" placeholder="请输入上课地点">
                                    </i-Input></span>
                                </p>
                                <p>
                                    <span><FormItem prop="TotalClassTime">
                                        <tt id="tt1">*</tt><em>总课次:</em><i-Input v-model="courseInfo.TotalClassTime" :disabled="(courseInfo.Status==2)?true:false" placeholder="本课程预计多少堂课(正整数)">
                                    </i-Input></FormItem></span>
                                </p>

                                <p>
                                     <tt id="tt2">*</tt><em>课程介绍:</em><i-Input v-model="courseInfo.OptIntro" type="textarea" :rows="4" :disabled="(courseInfo.Status==2)?true:false" placeholder="请输入课程介绍内容..."></i-Input>
                                </p>
                                <div class="main-contents_img">
                                    <em>课程图片:</em>
                                    <div class="main-contents_imgs">
                                        <a><img :src="courseInfo.ImgurlName"/></a>
                                        <i-Button type="primary" :disabled="(courseInfo.Status==2)?true:false" @click="showPictureSel">图片选择</i-Button>
                                        <Modal v-model="Gallery" title="图片选择" class="Gallery" width="80%">
                                            <p>
                                                <em>当前课程类别:</em>
                                                <i-select class="mr10" style="width:200px;" @on-change="getPictureList"  v-model="selectedCat">
                                                    <i-option v-for="(item,index) in categorySelect" :key=index :value="item.SerID">{{item.Name}}</i-option>
                                                </i-select>
                                                <Upload  class="fr btn" style="float:right;"
                                                    :action="courseImportUrl"
                                                    :show-upload-list="false"
                                                    accept=".jpg,.png"
                                                    :on-success="importFile"
                                                    :data="uploadData"
                                                    >
                                                    <i-Button type="primary" style="float:right;">本地图片上传</i-Button>
                                                </Upload>
                                                <!-- <i-Button type="primary" style="float: right;">本地图片上传</i-Button> -->
                                            </p>
                                            <div class="Gallery_img">
                                                <ul>
                                                    <!-- <li><a href="javascript:;"><img src="../../static/img/psuia.png"/></a><img src="../../static/img/gou.png"/></li> -->
                                                    <li @click="setStatus(item,index)" v-for="(item,index) in picture.modalPic" :key=item.SerID><a href="javascript:;"><img :src="item.FileName"/></a>
                                                    <img v-if="item.Status" src="../../static/img/gou.png"/></li>
                                                </ul>
                                            </div>
                                            <Page class="fr" 
                                                    :total="picture.total" 
                                                    :current="picture.PageIndex" 
                                                    @on-change="pageUpdate" 
                                                    show-total></Page>
                                            <div slot="footer">
                                                <i-Button type="ghost" @click="Gallery=false">取消</i-Button>
                                                <i-Button type="primary" @click="savePictureUrl()">确定</i-Button>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                                <p id="tj">
                                    <FormItem>
                                        <i-Button type="danger" v-show="(courseInfo.Status==2)?false:(courseInfo.SerID == '')?false:true" @click="deleteCourse()">删除</i-Button>
                                        <i-Button v-if="courseInfo.Status==2" type="primary" :disabled="(courseInfo.Status==2)?true:false">已通过</i-Button>
                                        <i-Button v-else type="primary" @click="handleSubmit('courseInfo',index)">提交</i-Button>
                                    </FormItem>
                                </p>
                            </div>
					    </Form>     

                        <div class="main-contents2 contents_h3" v-if="courseInfo.Status==2">
                            <div class="h3"  @click="toggleXK"><h3>选课学生</h3><a id="xk1"><img src="../../static/img/More.png"/></a></div>
                            <div id="xk1s" v-show="showXS">
                                <div class="Students_buttom">
                                    <i-Button type="primary" icon="android-person" v-show="SX_let"  @click="Students1 = true">筛选学生</i-Button>
                                    <Modal v-model="Students1" title="筛选学生"  width="80%" class="Students1">
                                        <p><span><em>志愿顺序列表</em>(总共:<a>{{SwitchNum}}</a>人)</span><span><em>选中学生列表</em>(总共:<a>{{XKStuData.total}}</a>人);<em>计划招收:</em><a>{{courseInfo.PlanAmount}}</a>人</span></p>
                                        <Transfer 
                                            :data="sourceList" 
                                            :target-keys="targetList" 
                                            filterable 
                                            :titles="titles"
                                            @on-change="filterMethod"></Transfer>
                                        <div slot="footer">
                                            <i-Button type="ghost" @click="closeStuModal">取消</i-Button>
                                            <i-Button type="primary" @click="optCourseStu()">确定</i-Button>
                                        </div>    
                                    </Modal>
                                    
                                    <i-Button type="success" v-show="TQ_let" @click="openUpload()">提前录取</i-Button>
                                    <Modal v-model="modal1" title="提前录取名单" width="80%" class="Modal_box_tq">
                                        <p><em>Excel上传:</em>
                                            <i-Input v-model="fileName"></i-Input>
                                                <Upload  class="fr btn"
                                                    :action="actionUrl"
                                                    :show-upload-list="false"
                                                    :data = "dataUpload"
                                                    accept=".xls,.xlsx"
                                                    :on-success="importFileStuPre"
                                                    >
                                                    <i-button icon="plus"></i-button>
                                                </Upload>
                                                <!-- <Upload  class="fr btn"
                                                    :action="actionUrl"
                                                    :show-upload-list="false"
                                                    accept=".xls,.xlsx"
                                                    :on-success="importFileStuPre"
                                                    >
                                                    <i-Button type="primary" style="float: right;">本地图片上传</i-Button>
                                                </Upload> -->
                                                <!-- <i-Button slot="append" icon="plus-round"></i-Button> -->
                                            
                                        </p>
                                        <Alert show-icon>
                                            操作说明:
                                            <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
                                            <template slot="desc">
                                                请先上传EXCEL文件，若成功则显示导入成功数据，否则显示错误的数据及错误原因;<br>
                                                EXCEL文件的格式()：工作表(WorkSheet)的名称应设为缺省的[Sheet1]；<br>
                                                [Sheet1]的第一行为标题行，列名分别为：学生姓名，班级;<br>
                                                <p><a @click="getExcel()">点击链接下载【提前录入学生模版.xls】</a></p>
                                            </template>
                                        </Alert>
                                        <div v-if="listData.Data!=null" style="margin-bottom:10px">
                                            <div  v-if="listData.State==true" style="color:green">导入成功！</div>
                                            <div  v-else  style="color:red">导入失败，请修改Excel文件中相关数据后再重新上传！</div>
                                        </div>
                                        <Table :columns="columnsimp" :data="listData.Data" v-if="listData.Data"></Table>
                                    </Modal>
                                </div>
                                <div class="Students_Form">
                                    <i-Table :columns="columns1" no-data-text="暂无学生选课" :data="XKStuData.data"></i-Table>
                                    <Page :total="XKStuData.total"></Page>
                                </div>
                            </div>
                        </div>

                        <div class="main-contents3 contents_h3" v-if="courseInfo.Status==2">
                            <div class="h3"  @click="toggleKQ"><h3>考勤记录</h3><a  id="xk2"><img src="../../static/img/More.png"/></a></div>
                            <div id="xk2s" v-show="showKQ">
                                <div class="Students_Form">
                                        <!-- <i-Table border :columns="columns3" :data="data2" no-data-text="暂无数据"></i-Table> -->
                                        
                                    <table class="table" border-top="0" bordercolor="#dedede" style="border-collapse:collapse;">
                                        <thead class="thead">
                                            <tr>
                                                <th style="text-align: center;">序号</th>
                                                <th style="text-align: center;">姓名</th>
                                                <th style="text-align: center;" v-for="(item,index) in weekList" :key="index">{{item.Name}}</th>
                                                <!-- <th style="text-align: center;">合计</th> -->
                                            </tr>
                                        </thead>
                                        <tbody class="tbody">
                                            
                                            <tr v-for="(item,index) in data2" :key="index">
                                                <td style="text-align: center;">{{index+1}}</td>
                                                <td style="text-align: center;">{{item.Name}}</td>
                                                <td style="text-align: center;" v-for="(itt,index1) in item.listname" :key="index1" @click="recordAtt(item,itt,index1)">
                                                    <!-- {{itt.TimeStatus}} -->
                                                    <Icon v-if="itt.TimeStatus==1" type="android-person" class="green"></Icon>
                                                    <Icon v-else type="android-person" class="giay"></Icon>
                                                </td>
                                                <!-- <td style="text-align: center;">{{item.Count}}</td> -->
                                                <!-- <td style="text-align: center;">
                                                    <div class="operating">
                                                        <Tooltip content="查看" placement="bottom">
                                                            <Button icon="eye" type="ghost" @click="lookclick(item.Year,item.Month)"></Button>                                               
                                                        </Tooltip>
                                                    </div>
                                                </td> -->
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div v-if="data2.length==0" style="text-align:center;width:100%;display:table;margin-top:10px;">暂无数据</div>
                                </div>
                            </div>
                        </div>
						        	
                        <div class="main-contents4 contents_h3" v-if="courseInfo.Status==2">
                            <div class="h3" @click="toggleJH"><h3 >课程计划</h3><a id="xk3"><img src="../../static/img/More.png"/></a></div>
                            <div  id="xk3s" v-show="showJH">
                            <div class="Students_buttom">
                                <i-Button type="primary" icon="plus-round" @click="openPlanModal">添加计划</i-Button>
                                <Modal v-model="plan.modal" :title="plan.title" width="50%" class="tjjh">
                                    <p><tt id="tt1">*</tt><em>教学目标:</em><i-Input v-model="plan.TeachGoal" placeholder="请输入教学目标..."></i-Input></p>
                                    <p><tt id="tt1">*</tt><em>课程内容:</em><i-Input v-model="plan.Contents" type="textarea" :rows="4" placeholder="请输入课程内容..."></i-Input></p>
                                    <div slot="footer">
                                        <i-Button type="ghost" @click="plan.modal=false">取消</i-Button>
                                        <i-Button type="primary" @click="submitPlan()">确定</i-Button>
                                    </div>
                                </Modal>
                            </div>
                            <div class="Students_Form jxjh">
                                <i-Table border :columns="columns7" :data="plan.planList"></i-Table>
                            </div>
                            </div>
                        </div>
                    </Tab-Pane>
                    <!-- <i-Button type="ghost" @click="handleTabsAdd" size="small" slot="extra"  icon="ios-plus-outline">增加课程</i-Button>	 -->
                </Tabs>
                <my-confirm @onClick="conItem.call" :msg='conItem.msg' :title='conItem.title' type="" :info="conItem.info" :status="conItem.status"></my-confirm>
            </div>
        </div>
	</div>
</template>

<script>
   
</script>



<script>
import myConfirm from '@/components/confirm';
  export default {
    components: {myConfirm},  
    data: function() {
        return {
            conItem:{msg:'',title:'',type:'',info:'',status:false,call:()=>{}},
            data4: [
                  {
                    title:'全部',
                    value:'0',
                    expand:true,
                    // selected:true,
                    checked:true,
                    children:[
                      {
                        title: '高一',
                        value:'120',
                        expand: false,
                        // selected: true,
                        children: [
                            {
                              title: '一班',
                              value:'250'
                            },
                            {
                              title: '二班',
                              value:'251'
                            }
                        ]
                      },
                      {
                          title: '高二',
                          expand: false,
                          // selected: true,
                          children: [
                              {
                                title: '一班',
                              },
                              {
                                title: '二班',
                              }
                          ]
                      }
                    ]
                  } 
                ],
            titles:['志愿学生','选中学生'],
            actList:[],
            courseList:[],
            categorySelect:[],
            ruleValidate: {
                OptName:[{ required: true, message: '请输入课程名称',trigger: 'blur' },
                     {max:12,type:'string',message:'课程名称不能超过12个字',trigger:'blur'}],
                TypeID:[{required: true, message: '请选择课程类别',trigger: 'change'}],
                gradeList:[{required: true,type:'array', message: '请选择课程类别',trigger: 'change'}],
                PlanAmount:[{ required: true,message: '请输入计划人数(正整数)',trigger:'blur'},
                            {pattern: /^[1-9]\d*$/,type: 'string', message: '请输入计划人数(正整数)',trigger: 'blur'}],
                MinAmount:[{ required: false,message: '请输入最少人数(正整数)',trigger:'blur'},
                            {pattern: /^[1-9]\d*$/,type: 'string', message: '请输入最少人数(正整数)',trigger: 'blur'}],
                TotalClassTime:[{ required: true, message: '请输入总课数',trigger:'blur'},
                             {pattern: /^[1-9]\d*$/,type: 'string', message: '请输入总课次(正整数)',trigger: 'blur'}]
            },
            actionUrl:APIConfig.OptCourse.StuYXOptImport,
            classList2:["43c5c307-9cea-4b68-91f7-4fd83d0c6f7a","1612ab16-06bd-4e4e-8bda-e23d09b5229c","a6820aa3-f6cd-4066-9531-51d2f31c1971"],
            resp:{
              "Message": null,
              "Data": [{
                  "CodeSerID": 129,
                  "CodeID": "1",
                  "CodeName": "高一",
                  "ClassList": [{
                      "ClassID": "43c5c307-9cea-4b68-91f7-4fd83d0c6f7a",
                      "GroupID": "811",
                      "ClassName": "（1）班"
                    },
                    {
                      "ClassID": "23f0b4a6-6f3e-4bbb-8367-ce68f2814791",
                      "GroupID": "812",
                      "ClassName": "（2）班"
                    },
                    {
                      "ClassID": "60301829-a7c1-468a-a90d-fdb38888d3ea",
                      "GroupID": "813",
                      "ClassName": "（3）班"
                    }
                  ]
                },
                {
                  "CodeSerID": 130,
                  "CodeID": "2",
                  "CodeName": "高二",
                  "ClassList": [{
                      "ClassID": "1612ab16-06bd-4e4e-8bda-e23d09b5229c",
                      "GroupID": "814",
                      "ClassName": "（1）班"
                    },
                    {
                      "ClassID": "a6820aa3-f6cd-4066-9531-51d2f31c1971",
                      "GroupID": "815",
                      "ClassName": "（2）班"
                    }
                  ]
                },
                {
                  "CodeSerID": 131,
                  "CodeID": "3",
                  "CodeName": "高三",
                  "ClassList": [{
                      "ClassID": "16eeb28e-0d27-49a6-bd5a-3faff8fc6088",
                      "GroupID": "817",
                      "ClassName": "（1）班"
                    },
                    {
                      "ClassID": "50e8cb28-761f-495d-aef5-110db7bc7b39",
                      "GroupID": "818",
                      "ClassName": "（2）班"
                    },
                    {
                      "ClassID": "a3bb0d8c-3e01-4127-9faa-d86fae3804ca",
                      "GroupID": "819",
                      "ClassName": "（3）班"
                    }
                  ]
                }
              ],
              "State": true,
              "Page": null,
              "OtherData": null
            },
            fileName:'',
            showKQ:false,
            showXS:false,
            showJH:false,
            modal1: false,
            modalc: false,
            Gallery: false,
            Students1: false,
            gradeModel:false,
            TQ_let:true,
            SX_let:true,
            /**同步老课程 */
            targetKeys2:[],
            SYOldCourse:'',
            SYCourseList:[],
            /**图片 */
            courseImportUrl:'/api/base/FileUpload',
            uploadData:{
                AppType:'OptCourse',
            },
            picture:{
                PageIndex:1,
                PageSize:10,
                modalPic:[],
            },
            selectedCat:'',
            index:'',
            pictureUrl:'',
            ImgSerID:'',
            /**选课学生 */
            columns1: [
                { title: '序号',type: 'index',width: 70},
                { title: '学生姓名', key: 'StuName' },
                { title: '所在班级', key: 'ClassName' },
                { title: '志愿', key: 'Number' }
            ],
            weekList:[],
            dataS:[],
            rightData:[],
            dataR:[],
            SwitchNum:'0',
            ActiveID:'',
            OptSerID:'',
            columnsimp:[        //提前录取学生
                {
                    title: '姓名',
                    key: '姓名'
                },
                {
                    title: '班级',
                    key: '班级'
                },
                {
                    title: '上传状态',
                    render: (h, params) => {
                        var row = params.row;
                        if(!this.listData.State){
                            return h('div', {style:{color:'red'}}, row.异常);
                        }
                        else{
                            return h('div', {style:{color:'green'}},'导入成功');
                        }
                        
                    }
                },
            ],
            XKStuItem:{
                PageSize:10,
                PageIndex:1,
            },
            XKStuData:{
                total:0,
                data:[],
            },
            actListTea:[],
            listData:{},
            sourceList:[],
            targetList:[],
            addCourse:{
                ActivityID:'',
                data:[],
                gradeList:[],
            },
            currentCourse:'',
            courseInfo:{
                // ActiveID:'',
                // ActiveName:'',
                // EditDate:'',
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
                Status:'',
                StatusName:'',
                // TeaName:'',
                TotalClassTime:'',
                Type:'1',
                // TypeID:'',
                // TypeName:'',
                // UID:'',
            },
            /**考勤 */
            columns3: [{ title: '序号', type:'index', width: 70 },
                { title: '学生姓名', key: 'Name', width: 130, },
                { title: '第一周', key:"listname",render: (h, params) => {
                    return [ h('Button', { props: { type: 'text', icon: 'checkmark' }, class: 'operating'}, '') ] } },
                { title: '第二周', render: (h, params) => { 
                    return [ h('Button', { props: { type: 'text', icon: 'close' }, class: 'operating2'}, '') ] } },
            ],
            data2: [],
            /**课程计划 */
            plan:{
                planList:[],
                total:0,
                PageSize:10,
                PageIndex:1,
                modal:false,
                SerID:'',
                TeachGoal:'',
                Contents:'',
            },
            status:true,
            columns7: [     //课程计划
                { title: '序号', type:'index', width: 70, },
                { title: '计划名称', key: 'TeachGoal',width:180 },
                { title: '计划内容', key: 'Contents', },
                { title: '操作',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        return [
                            h('Tooltip', { props: { content: "编辑", placement: 'bottom' }, class: 'operating' }, 
                                [ h('Button', { props: { type: 'text', icon: 'ios-compose-outline' }, on: {
                                    click: () => {
                                        var _this = this;
                                        _this.plan.title = '编辑教学计划';
                                        _this.plan.SerID = params.row.SerID;
                                        _this.plan.TeachGoal = params.row.TeachGoal;
                                        _this.plan.Contents = params.row.Contents;
                                        _this.plan.modal=true;
                                    } 
                                } }, '')
                            ]),
                            h('Tooltip', { props: { content: "删除选项", placement: 'bottom' }, class: 'operating' },
                                [ h('Button', { props: { type: 'text', icon: 'ios-trash-outline' }, on: { 
                                    click: () => {
                                         this.deletePlan(params.row); 
                                    } 
                                } }, '')
                            ]),
                        ]
                    }
                }
            ],
            gradeList:[],
            classList:[],
        }
    },
    created: function() {
        var _this = this;
    },
	mounted(){
        var _this = this;
        _this.getActiveListOpen();  
        _this.getActiveListTea();
        _this.getTree();
    },		
    methods: {
        getGradeClass(data){
            var _this = this;
            _this.classList=[];
            _this.gradeList=[];
            data.forEach(item=>{
                if(!item.children){
                    _this.classList.push(item.ClassID);
                    _this.gradeList.push(item.CodeSerID);
                    var bl = false;
                    for(let i=0;i<_this.gradeList.length-1;i++){
                        if(_this.gradeList[i] === item.CodeSerID) bl = true;
                    }
                    if(bl) _this.gradeList.splice(_this.gradeList.length-1,1);
                }
            });
        },
        label(_type){
            var _this = this;
            return _type;
        },
        //GetGradeClassTree
        getTree(){      // 同步老课程穿梭框左框数据
            var _this = this;
            _this.data4 = [];
            // _this.$api.get(APIConfig.OptCourse.GetGradeClassTree,null,(resp)=>{ 
            //     if(resp.Data != '0'){
            //         console.log(resp); 
            //     }
            // })
              // let arr = [];
              
              let data = _this.resp.Data;
              if (data.length != 0) {
                  data.forEach(item => {
                      let obj = {};
                      obj.title = item.CodeName;
                      obj.CodeSerID = item.CodeSerID; // 其他你想要添加的属性
                      obj.expand = true;
                      obj.selected = false;
                      if(item.ClassList) obj.children = _this.setChild(item.ClassList,item.CodeSerID);
                      _this.data4.push(obj);
                  });
              }
              // _this.data4 = arr;
              // return arr;
        },
        setChild(grade,CodeSerID){
          var _this = this;
          var children = [];
          var list = _this.classList2;
          grade.forEach(item=>{
            let obj = {};
            for(let key in list){
              obj.title = item.ClassName;
              obj.ClassID = item.ClassID;
              obj.CodeSerID = CodeSerID;
              obj.expand = true;
              if(list[key] == item.ClassID){
                obj.checked = true;
              }
            }
            children.push(obj);
          })
          return children;
        },
        deleteCourse(){
            const _this=this;
            if(_this.courseInfo.SerID == ''){
                _this.$Message.info({content:'当前课程为新增课程不能删除',duration:4});
                return;
            };
            _this.conItem.status=!_this.conItem.status;
            _this.conItem.msg='确定删除当前课程吗？';
            _this.conItem.info='删除后不可恢复！';
            _this.conItem.call=()=>{
                _this.$api.get(APIConfig.OptCourse.OptCourseDelete+'?ids='+_this.courseInfo.SerID,null,(resp)=>{
                    setTimeout(() => {
                       _this.getOptCourseList();
                    }, 500);
                })
            }
        },
        openUpload(){
            var _this = this;
            _this.modal1 = true;
            _this.fileName = '';
            _this.listData = {};
            _this.actionUrl = _this.actionUrl+'?ActiveID='+_this.ActiveID+'&OptSerID='+_this.OptSerID
        },
        /**同步老课程相关 */
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
                var url = APIConfig.OptCourse.SyOptCourseAdd+'?ids='+_this.targetKeys2.join(',')+'&ActiveID='+_this.addCourse.ActivityID
                _this.$api.post(url,null,(resp)=>{
                    _this.$Message.info(resp.Message);
                    _this.getOptCourseList();
                    _this.modalc = false;
                });
            }
        },

        closeSYCourse(){    // 取消同步
            var _this = this;
            _this.targetKeys2 = [];
            _this.modalc = false;
        },

        /**课程内容 */
        getActiveListOpen(){   //场次
            const _this=this;
            _this.$api.get(APIConfig.OptCourse.GetActiveList,null,(resp)=>{ 
                _this.actList=[];
                for(let key in resp.Data){
                    _this.actList.push({SerID:resp.Data[key].SerID,Name:resp.Data[key].Name})
                }
                _this.addCourse.ActivityID = _this.actList[0].SerID;
                // _this.getOptCourseList();
            })
        },
        /**课程内容 */
        getActiveListTea(){   //场次
            const _this=this;
            _this.$api.get(APIConfig.OptCourse.OldGetActive,null,(resp)=>{ 
                _this.actListTea=[];
                for(let key in resp.Data){
                    _this.actListTea.push({SerID:resp.Data[key].SerID,Name:resp.Data[key].Name})
                }
            })
        },
        getOptCourseList(_type){     //课程
            var _this = this;
            if(_type){
                console.log(_type);
                _this.$Message.info({content:_type,duration:5});
            }
            _this.courseList = [];
            _this.$api.get(APIConfig.OptCourse.GetAcCourse,{ActiveID:_this.addCourse.ActivityID},(resp)=>{ 
                if(resp.Data != '0'){
                    _this.courseList = resp.Data;
                }else{
                    _this.handleTabsAdd();
                }
                if(_this.courseList.length != 0){
                    _this.currentCourse = _this.courseList[0].SerID;
                }
                _this.getCategoryList();
                _this.getGradeList();
                _this.getCourseInfo();
            })
        },      
        getCourseInfo(){    // 课程内容 紧密管理表单验证
            var _this = this;
            _this.reSetCourseInfo();
            if(_this.currentCourse == '01'){
                return;
            }
            _this.$api.get(APIConfig.OptCourse.OptCourseDetails,{SerID:_this.currentCourse},(resp)=>{ 
                if(resp.Data != 0){
                    _this.courseInfo = resp.Data[0];
                    _this.$set(_this.courseInfo,'PlanAmount',resp.Data[0].PlanAmount+'');
                    if(resp.Data[0].MinAmount != null) _this.$set(_this.courseInfo,'MinAmount',resp.Data[0].MinAmount+'');
                    _this.$set(_this.courseInfo,'TotalClassTime',resp.Data[0].TotalClassTime+'');
                    _this.$set(_this.courseInfo,'gradeList',[]);
                    _this.$set(_this.courseInfo,'Type',resp.Data[0].Type);

                    _this.ActiveID = resp.Data[0].ActiveID;
                    _this.OptSerID = resp.Data[0].SerID;
                    var StartTime = new Date(resp.Data[0].StartTime).getTime();
                    var EndTime = new Date(resp.Data[0].EndTime).getTime();
                    var nowTime = new Date(resp.OtherData).getTime();
                    var SelNum = resp.Data[0].SelNum;
                    if(SelNum == null){
                        _this.SX_let = false;
                        if(nowTime>StartTime){
                            _this.TQ_let = false;
                        }
                    }else{
                        if(nowTime<StartTime){
                            _this.SX_let = false;
                            _this.TQ_let = true;
                        }else if(nowTime>StartTime && nowTime <EndTime){
                            _this.SX_let = false;
                            _this.TQ_let = false;
                        }else if(nowTime > EndTime){
                            _this.SX_let = true;
                            _this.TQ_let = false;
                        }   
                    }
                    var array = resp.Data[0].GradeID.split(',');
                    for(var i=0;i<array.length;i++){
                        _this.courseInfo.gradeList.push(parseInt(array[i]));
                    }
                    _this.getPlanList();
                    _this.getSwitchStuList();
                    _this.getRecordList();
                    _this.getAllWeek();
                }
            })
        },
        getCategoryList(_type){   // 类别
            const _this=this;
            _this.$api.get(APIConfig.OptCourse.GetCategoryList,null,resp=>{             
                _this.addCourse.data = resp.Data;
            })
        },
        getGradeList(){     // 年级
            var _this = this;
            _this.$api.get(APIConfig.OptCourse.GetGradeList,null,resp=>{             
                _this.addCourse.gradeList = resp.Data; 
            })
        },
        reSetCourseInfo(){      //表单相关项数据清空
            var _this = this;
            _this.courseInfo = {
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
            }
        },
        importFile (res, file) {       //图片 上传回调
            var _this = this;
            _this.courseInfo.Imgurl = res.fileid;
            _this.courseInfo.ImgurlName = res.fileurl;
            _this.courseInfo.Type = '0';
            _this.Gallery = false;
        },
        setStatus(item,index){  //图片  选中
            var _this = this;
            if(_this.index != '')_this.picture.modalPic[_this.index].Status = false;
            if(_this.index == 0) _this.picture.modalPic[0].Status = false;
            item.Status = true;
            _this.index = index;
            _this.pictureUrl = item.FileName;
            _this.ImgSerID = item.SerID;
            _this.courseInfo.Type = '1';
        },
        savePictureUrl(){   //图片 提交
            var _this = this;
            if(_this.pictureUrl != ''){
                _this.courseInfo.ImgurlName = _this.pictureUrl;
                _this.courseInfo.Imgurl = _this.ImgSerID;
            }
            _this.Gallery = false;
        },
        commitCourse() {    // 新增课程或编辑课程
            var _this = this;
            // _this.$utils.handleValidate(_this,'courseInfo');
            var data = {};
            var vList = _this.courseInfo;
            if(vList.SerID!=''){
                var url=APIConfig.OptCourse.OptCourseEdit;
                data.SerID=vList.SerID; 
                // data.Status = _this.status;
            }else{
                var url=APIConfig.OptCourse.OptCourseCreate;
            }
            vList.OptName = vList.OptName.replace(/(^\s*)|(\s*$)/g, "");
            if(vList.OptName == '') {
                _this.$Message.info('课程名称不能为空！');
                return;
            }
            data.OptName = vList.OptName;
            data.ActivityID = _this.addCourse.ActivityID;
            data.GradeID = vList.gradeList.join(',');
            data.TypeID =vList.TypeID;
            data.PlanAmount=vList.PlanAmount;
            if(vList.MinAmount != '')data.MinAmount =vList.MinAmount;
            if(vList.OptPlace != '')data.OptPlace = vList.OptPlace;
            if(vList.OptTime != '')data.OptTime=vList.OptTime;
            if(vList.OptIntro != '')data.OptIntro =vList.OptIntro;
            data.TotalClassTime=vList.TotalClassTime;
            console.log(vList.Type);
            if(vList.Type=='1'||vList.Type=='0') data.Type = vList.Type;
            else data.Type = '0'
            // data.Imgurl = '/UploadFile/1015/5474539e-1a43-42dc-a3d9-0e0f5141d5a7.jpg'//vList.OptImgUrl;
            if(vList.Imgurl != undefined && vList.Imgurl != ''){
                data.Imgurl = vList.Imgurl;
            }
            _this.$api.post(url,data,(resp)=>{
                console.log(resp);
                _this.getOptCourseList(resp.Message);
            });
        },
        
        handleSubmit (name,index) {   //表单验证
            var _this = this;
            _this.$refs[name][index].validate((valid) => {
                if (valid) { 
                    _this.commitCourse();
                }else{
                    return;
                }
            })
        },
        handleReset (name) {    //表单重置
            var _this = this;
            _this.$refs[name][_this.$refs[name].length-1].resetFields();
        },
        handleTabsAdd () {  // 新增tab
            var _this = this;
            for(let key in _this.courseList){
                if(_this.courseList[key].SerID=='01'){
                    _this.$Message.info({content:'请先提交当前新增的课程！',duration:4});
                    return;
                }
            }
            _this.courseList.push({
                mgurl:'',
                ImgurlName:'',
                Name:'新增课程',
                SerID:'01',
            });
            _this.currentCourse = '01';
            _this.reSetCourseInfo();
        },


        /**图片相关，单独处理 */
        showPictureSel(){       // 图片 选取模态框
            var _this = this;
            _this.getCategorys();
            _this.selectedCat = _this.courseInfo.TypeID;
            _this.Gallery = true;
        },
        getPictureList(){   // 图片 分类获取
            var _this = this;
            _this.picture.modalPic = [];
            _this.index = '';
            _this.ImgSerID = '';
            var params = {CategoryID:_this.selectedCat,Type:'1',PageSize:_this.picture.PageSize,PageIndex:(_this.picture.PageIndex-1)}
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
        pageUpdate(page){   //图片 浏览分页
            var _this = this;
            _this.picture.PageIndex = page;
            _this.getPictureList();
        },
        
        getCategorys:function (_type){   // 图片 分类类别下拉
            const _this=this;
            _this.$api.get(APIConfig.OptCourse.GetCategoryList,null,resp=>{             
                _this.categorySelect = resp.Data;
            })
        },
        

        /**下边是选课学生的请求 */
        getSwitchStuList:function(params){  //志愿学生列表
            var _this = this;
            var item={
                OptSerID:_this.currentCourse
            }
            _this.sourceList = [];
            _this.$api.get(APIConfig.OptCourse.AllSwitchStuList,item,(resp)=>{                 
                if(resp.Data != 0){
                    _this.dataS = resp.Data;
                    _this.SwitchNum = resp.Page.sumDataCount;
                    for(var i=0;i<_this.dataS.length;i++){
                        _this.sourceList.push({'key':_this.dataS[i].SerID,'label':_this.dataS[i].StuName,'disabled':(_this.dataS[i].Status==1?true:false)});
                    }
                }
                _this.getOptStuList();
                _this.getPageOptStuList();
            })
        },
        getOptStuList:function(){   //已选中学生列表
            var _this = this;
            var item={
                OptSerID:_this.currentCourse
            }
            _this.targetList = [];
            _this.$api.get(APIConfig.OptCourse.OptStuList,item,(resp)=>{               
                if(resp.Data != 0){
                    var data = resp.Data;
                    _this.rightData = resp.Data;
                    var source = _this.dataS;
                    for(var j=0;j<source.length;j++){
                        for(var i=0;i<data.length;i++){
                            if(source[j].StuSerID == data[i].StuSerID){
                                _this.targetList.push(source[j].SerID);
                                _this.sourceList[j].disabled = false;
                                break;
                            }
                        }
                    }
                    _this.dataR = [];
                    for(let key in _this.targetList){
                        _this.dataR.push(_this.targetList[key]);
                    }
                }else{
                    _this.dataR = [];
                    _this.rigthData = [];
                }

            })
        },
        filterMethod (targetKeys, direction, moveKeys) {    // 选课学生移动操作
            var _this = this;
            var targetL = _this.targetList;
            if(direction == 'left'){ //删除选中学生
                for(var i=0;i<targetL.length;i++){
                    for(var j=0;j<moveKeys.length;j++){
                        if(moveKeys[j] == targetL[i]){
                            targetL.splice(i,1);
                        }
                    }
                }
            }else{  // 加入到选中学生
                for(var j=0;j<moveKeys.length;j++){
                    targetL.push(moveKeys[j]);
                }
            }
        },
        render1(item){      // 选课学生模态框数据显示格式
            return item.label;
        },
        optCourseStuD(){        //选中学生移除到志愿学生列表
            var _this = this;
            var right = _this.targetList;   //变更后的右侧数据
            var ids = [],fag = true;
            for(var i=0;i<_this.dataR.length;i++){
                fag = true;
                for(var j=0;j<right.length;j++){
                    if(right[j] == _this.dataR[i]){
                        fag = false;
                    }
                }
                if(fag){
                    ids.push(_this.dataR[i]);
                }
            }
            if(ids.length == 0) return;
            var dels = [];
            for(let key in _this.dataS){
                for(var j=0;j<ids.length;j++){
                    if(ids[j]==_this.dataS[key].SerID){
                        dels.push(_this.dataS[key].StuSerID);
                    }
                }
            }
            var arrD = [];
            for(var i=0;i<dels.length;i++){
                for(var j=0;j<_this.rightData.length;j++){
                    if(dels[i] == _this.rightData[j].StuSerID){
                        arrD.push(_this.rightData[j].SerID);
                    }
                }
            }
            _this.$api.get(APIConfig.OptCourse.OptCourseStuDelete,{ids:arrD.join(',')},(resp)=>{
                _this.$Message.info(resp.Message);
            });
        },
        optCourseStuA(){        // 志愿学生加入选中学生表
            var _this = this;
            var right = _this.targetList;  
            var ids = [],fag = true;
            for(var i=0;i<right.length;i++){
                fag = true;
                for(var j=0;j<_this.dataR.length;j++){
                    if(right[i] == _this.dataR[j]){
                        fag = false;
                    }
                }
                if(fag){
                    ids.push(right[i]);
                }
            }
            if(ids.length == 0) return;
            _this.$api.get(APIConfig.OptCourse.OptCourseStuAdd,{ids:ids.join(',')},(resp)=>{
                _this.$Message.info(resp.Message);
            });
        },
        closeStuModal(){        // 选课学生穿梭框取消button
            var _this = this;
            _this.Students1 = false;
            _this.targetList = [];
            for(let ket in _this.dataR){
                _this.targetList.push(_this.dataR[key]);
            }
        },
        optCourseStu(){     //穿梭框提交button
            var _this = this;
            _this.optCourseStuD();
            _this.optCourseStuA();
            _this.getSwitchStuList();
            // setTimeout(_this.getSwitchStuList(),1000);
            // setTimeout(_this.getOptStuList(),1000);
            // setTimeout(_this.getPageOptStuList(),1000);
            _this.Students1 = false;
        },
        getPageOptStuList:function(){   //已选中学生列表分页，transform需要的
            var _this = this;
            var item={
                OptSerID:_this.currentCourse,
                PageSize:_this.XKStuItem.PageSize,
                PageIndex:_this.XKStuItem.PageIndex-1,
            }
            _this.XKStuData = {data:[],total:0};
            _this.$set(_this.XKStuData,'data',[]);
            _this.$api.get(APIConfig.OptCourse.OptStuList,item,(resp)=>{               
                if(resp.Data != 0){
                    _this.XKStuData.data = resp.Data;
                    _this.XKStuData.total = resp.Page.sumDataCount;
                }
            })
        },



        /**选课学生提前录取 */
        getExcel(){ 
            location.href=APIConfig.OptCourse.StuYXOptExport;
        },
        importFileStuPre(response, file, fileList){     
            const _this=this;
            // console.log(response);
            _this.fileName=file.name;
            _this.listData=response;
            // _this.XKStuData.data = response;
            _this.getPageOptStuList();

        },


        /**考勤模块接口（暂时根本不用管） */
        getAllWeek(){
            var _this = this;
            var params = {
                OptSerID : _this.currentCourse
            }
            _this.weekList = [];
            _this.$api.get(APIConfig.OptCourse.GetAllWeek,params,(resp)=>{  
                if(resp.Data != 0){
                    _this.weekList = resp.Data; 
                    setTimeout(() => {
                        $("#xk2s").each(function (i) {
                            var $div = $(this)//.eq(i);
                            var $img = $div.find("th");
                            var $tabs = $div.find(".table");
                            if ($img.length >= 10) {
                                $img.css({ "width": "80",});
                                $tabs.css({"width":"1600"});
                            } else if ($img.length >= 2) {
                                $img.css({ "margin": "auto" });
                            }
                        });
                    }, 500);
                }          
            })
        },
        getOptStuKQList:function(){
            var _this = this;
            var item={
                OptSerID:_this.currentCourse
            }
            _this.$api.get(APIConfig.OptCourse.AttendanceStuList,item,(resp)=>{  
                _this.students = [];             
                if(resp.Data != 0){
                    // _this.students = resp.Data;
                }
            })
        },



        /**显示隐藏下边的三模块 */
        toggleXK(){     //隐藏和显示选课学生模块
            var _this = this;
            // if(!_this.showXS){
            //     _this.getSwitchStuList();
            // }
            _this.showXS = !_this.showXS;
        },
        toggleKQ(){
            var _this = this;
            // if(!_this.showKQ){
            //     _this.getRecordList();
            //     _this.getAllWeek();
            // }
            _this.showKQ = !_this.showKQ;
        },
        toggleJH(){
            var _this = this;
            // if(!_this.showJH){
            //     _this.getPlanList();
            // }
            _this.showJH = !_this.showJH;
        },


        /**课程计划 */
        getPlanList(){
            var _this=this;
            var params={
                OptSerID:_this.currentCourse,
                PageSize:_this.plan.PageSize,
                PageIndex:_this.plan.PageIndex-1
            }
            _this.$api.get(APIConfig.OptCourse.PlanList,params,(resp)=>{ 
                _this.plan.planList = [];
                if(resp.Data != 0){
                    _this.plan.planList=resp.Data;
                    _this.plan.total = resp.Page.sumDataCount;
                }
            })
        },
        submitPlan:function(){
            const _this =this;
            if(_this.plan.TeachGoal == '') {_this.$Message.info('请填写教学目标之后在提交'); return;}
            if(_this.plan.Contents == '') {_this.$Message.info('请填写课程内容之后在提交'); return;}
            if(_this.plan.SerID != ''){
                var params ={
                    SerID:_this.plan.SerID,
                    OptSerID:_this.currentCourse,
                    TeachGoal:_this.plan.TeachGoal,
                    Contents:_this.plan.Contents,
                }
                var url = APIConfig.OptCourse.PlanEdit;
            }else{
                params ={
                    OptSerID:_this.currentCourse,
                    TeachGoal:_this.plan.TeachGoal,
                    Contents:_this.plan.Contents,
                }
                url = APIConfig.OptCourse.PlanAdd;
            }
            _this.$api.post(url,params,(resp)=>{ 
                _this.getPlanList();
                _this.plan.modal = false;
            })
           
        },
        openPlanModal(){
            var _this = this;
            _this.plan.SerID = '';
            _this.plan.TeachGoal = '';
            _this.plan.Contents = '';
            _this.plan.title = '添加教学计划'
            _this.plan.modal = true;
        },
        deletePlan(item){      
            const _this=this;
            _this.conItem.status=!_this.conItem.status;
            _this.conItem.msg='确定删除当前课程计划吗？';
            _this.conItem.info='删除后不可恢复！';
            _this.conItem.call=()=>{
                _this.$api.post(APIConfig.OptCourse.DeletePlan+'?ids='+item.SerID,null,(resp)=>{
                    _this.$Message.success(resp.Message);
                    setTimeout(() => {
                       _this.getPlanList();
                    }, 500);
                })
            }
        },

        /**考勤记录 */
        getRecordList(){
            var _this=this;
            _this.data2 = [];
            _this.$api.get(APIConfig.OptCourse.PcRandanceList,{OptSerID:_this.currentCourse},(resp)=>{ 
                if(resp.Data != 0){
                    _this.data2 = resp.Data;
                }
            })
        },
        recordAtt(item,itt,index1){  
            var _this = this;
            if(_this.status){
                _this.status = false;
                if(itt.TimeStatus==1){
                    var params ={
                        OptSerID:_this.currentCourse,
                        StuSerID:item.StuSerID,
                        ClassTime:(index1+1) 
                    }
                    _this.$api.post(APIConfig.OptCourse.RecordAttendance,params,(resp)=>{   
                        if(resp.State){
                            itt.TimeStatus = 0;
                            _this.status = true;
                        }            
                    })
                }else{
                    var params ={
                        OptSerID:_this.currentCourse,
                        StuSerID:item.StuSerID,
                        ClassTime:(index1+1) 
                    }
                    _this.$api.post(APIConfig.OptCourse.DeleteAttendance,params,(resp)=>{ 
                        if(resp.State){  
                            itt.TimeStatus = 1;
                            _this.status = true;
                        }
                    })
                }
            }else{
                _this.$Message.info('请勿连续点击操作！');
            } 
        },
        // validateNum1(){
        //     var _this = this;
        //     var rule = /^([0-9]|[0-9][0-9]|(1[0-9][0-9]|200))$/;  //200以内，计划招生人数
        //     if(!rule.test(_this.courseInfo.PlanAmount)){
        //         _this.ruleValidate.PlanAmount[0].message = '请输入10-200之间的正整数';
        //         _this.ruleValidate.PlanAmount[0].type = 'email';
        //     }else{
        //         _this.ruleValidate.PlanAmount[0].message = '请输入200之间的正整数';
        //         _this.ruleValidate.PlanAmount[0].type = 'number';                
        //     }
        // },
        // validateNum3(){
        //     var _this = this;
        //     var rule = /^([1-9]|1[0-2])$/;  
        //     if(!rule.test(_this.courseInfo.TotalClassTime)){
        //         _this.ruleValidate.TotalClassTime[0].message = '请输入12以内的正整数';
        //         _this.ruleValidate.TotalClassTime[0].type = 'email';
        //     }else{
        //         _this.ruleValidate.TotalClassTime[0].message = '请输入12以内的正整数';
        //         _this.ruleValidate.TotalClassTime[0].type = 'number';                
        //     }
        // },
    }
}
</script>
