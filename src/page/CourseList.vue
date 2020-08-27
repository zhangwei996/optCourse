<template>
    <div class="body" id="Course_Selection_web">
        <div class="Path" style="margin-top:20px">
            <i-select class="mr10" style="width:600px;" @on-change="getCourseList()" v-model="ActivityID"> 
                <i-option v-for="item in actList" :key="item.SerID" :value="item.SerID">{{item.Name}}</i-option> 
            </i-select>
        </div>
        <div class="main-box_s" style="margin-top:0px !important;">
            <Tabs type="card" @on-click="getCourseList" v-model="currentCat">
                <Tab-Pane v-for="item in tab.courseCategorys" :key="item.id" :label="item.name" :name="item.id" >
                    <div class="Courses">
                        <ul class="Courses_box">
                            <li class="Courses_list" v-for="item in courseList" :key="item.SerID">
                                <div class="Courses_lists">
                                    <div class="Coursess"> <p><a>{{item.OptName}}</a></p> <img :src="baseImgUrl+item.ImgurlName" /> </div>
                                    <div class="Coursess_bottom"> <div class="Coursess_lis">
                                        <!-- <img src="../../static/img/图层532.png" /> -->
                                        <span style="margin-left:20px;">任课教师：<a style="color:#234;cursor:default">{{item.TeaName}}</a></span>
                                    </div>
                                    <span> 
                                        <i-Button type="primary" shape="circle" icon="eye" @click="getCourseDetail(item.SerID)"></i-Button>
                                        <!-- <i-Button type="primary" shape="circle" icon="trash-a"></i-Button>  -->
                                    </span></div>
                                </div>
                            </li>
                            <span class="justify_fix"></span>
                        </ul>
                    </div>
                </Tab-Pane>
            </Tabs>
            <!-- <Modal v-model="infoModal" title="课程详情" width="60%" class="ckxx">
                <p><em>课程名称:</em><i-Input disabled v-model="courseSPInfo.OptName" ></i-Input></p>
                <p><span><em>课程类别:</em><i-Input disabled v-model="courseSPInfo.TypeName"></i-Input></span><span><em>面向年级:</em><i-Input disabled v-model="courseSPInfo.GradeName"></i-Input></span></p>
                <p><span><em>招收人数:</em><i-Input disabled v-model="courseSPInfo.PlanAmount"></i-Input></span><span><em>最少人数:</em><i-Input disabled v-model="courseSPInfo.MinAmount"></i-Input></span></p>
                <p><span><em>上课时间:</em><i-Input disabled v-model="courseSPInfo.OptTime"></i-Input></span><span><em>上课地点:</em><i-Input disabled v-model="courseSPInfo.OptPlace"></i-Input></span></p>
                <p><span><em>总课次:</em><i-Input disabled v-model="courseSPInfo.PlanAmount"></i-Input></span></p>
                <p><em>课程介绍:</em><i-Input disabled type="textarea" :rows="4" v-model="courseSPInfo.OptIntro"></i-Input></p>
                <p class="main-contents_imgss"><em>课程图片:</em><a><img :src="courseSPInfo.ImgurlName"/></a></p>
                <div slot="footer">
                    <i-Button type="primary" @click="addContactSave()">提交</i-Button>
                    <i-Button type="ghost" @click="category.title=false,modalCategory=false">取消</i-Button>
                </div>
            </Modal> -->
            <Modal v-model="infoModal" title="课程详情" class="ckkc">
                <div class="cks_left"><a><img :src="courseSPInfo.ImgurlName"/></a></div>
                <div class="cks_right">
                        <p><em>课程名称:</em><a>{{courseSPInfo.OptName}}</a></p>
                        <span><p><em>课程类别:</em><a>{{courseSPInfo.TypeName}}</a></p></span><span><p><em>面向年级:</em><a>{{courseSPInfo.GradeName}}</a></p></span>
                        <span><p><em>计划人数:</em><a>{{courseSPInfo.PlanAmount}}</a></p></span><span><p><em>最少人数:</em><a>{{courseSPInfo.MinAmount}}</a></p></span>
                        <span><p><em>上课时间:</em><a>{{courseSPInfo.OptTime}}</a></p></span><span><p><em>上课地点:</em><a>{{courseSPInfo.OptPlace}}</a></p></span>
                </div>
                <p id="kcjss"><em>课程介绍:</em><a>{{courseSPInfo.OptIntro}}</a></p>
            </Modal>
        </div>
    </div>
    <!-- <my-confirm @onClick="conItem.call" :msg='conItem.msg' :title='conItem.title' type="" :info="conItem.info" :status="conItem.status"></my-confirm>   -->
</template>

<script>
    export default {
        data(){
            return {
                actList:[],
                ActivityID:'',                
                tab:{
                    courseCategorys:[],
                },
                currentCat:'',
                currentCategoryID:'',
                courseList:[], 
                infoModal:false,
                courseSPInfo:'',
                baseImgUrl:process.env.NODE_ENV === 'production'?'':'http://debugold.hongyucloud.com/OptCourse/',
            }
        },
        created(){
            var _this = this;
        },
        mounted(){
            var _this = this;
            _this.getActiveListOpen();
            _this.getCategoryList();
        },
        methods: {
            getActiveListOpen(){   //场次
                const _this=this;
                _this.$api.get(APIConfig.OptCourse.GetActiveList,null,(resp)=>{ 
                    _this.actList=[];
                    if(resp.Data != 0){
                        for(let key in resp.Data){
                            _this.actList.push({SerID:resp.Data[key].SerID,Name:resp.Data[key].Name})
                        }
                        _this.ActivityID = _this.actList[0].SerID; 
                    }  
                })
            },
            getCategoryList:function (_type){   // 获取类别列表
               const _this=this;
            //    GetCategoryList
               _this.$api.get(APIConfig.OptCourse.CateList,null,resp=>{                 
                   if(resp.Data !=0){
                       _this.tab.courseCategorys = resp.Data[0].children;
                    //    _this.currentCat = _this.tab.courseCategorys[0].name;
                       _this.currentCat = resp.Data[0].name;
                    //    console.log(_this.currentCat);
                       _this.currentCategoryID = resp.Data[0].id;  
                       _this.getCourseList();
                   }
               })
            }, 
            getCourseList(name){
                var _this = this;
                console.log(name)
                if(name==undefined) name=0;
                var params = {
                    // ActiveID:_this.ActivityID,
                    // TypeID:_this.currentCat

                    ActiveID:_this.ActivityID,
                    OptName:'',
                    CategoryID:name,
                    PageSize:100,
                    PageIndex:0
                };
                _this.courseList = [];
                // AllOptCourseList
                _this.$api.get(APIConfig.OptCourse.OptCourseList,params,resp=>{                 
                   if(resp.Data != 0) _this.courseList = resp.Data;
               })
            },
            getCourseDetail(SerID){
                const _this = this;
                _this.$api.get(APIConfig.OptCourse.OptCourseDetails,{SerID:SerID},(resp)=>{ 
                    _this.courseSPInfo = resp.Data[0];
                    _this.infoModal = true;
                })
            },
        }
    }
</script>