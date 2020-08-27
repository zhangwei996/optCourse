<template>
  <div class="body" id="Course_Selection_web">
    <div class="path-nav">
      <h1>数据统计</h1>
    </div>
    <div class="main-box">
      <div class="main-box_s">
        <div style="position: absolute;right: 56px;">
          当前时间：
          <span style="color:#6b92ef">{{this.$utils.dateFormat(new Date(),'yyyy-MM-dd HH:mm')}}</span>
        </div>
        <div class="Students_buttom" style="margin-top:30px">
          <div class="l" style="width: 450px;min-width: 450px;">
            <i-Select v-model="years" @on-change="searchYear" style="width:120px;margin-left:10px">
              <Option v-for="(item,index) in yearList" :key="index" :value="item.year">{{item.name}}</Option>
            </i-Select>
            <i-Select
              v-model="session"
              @on-change="searchSession"
              style="width:280px;margin-left:15px"
            >
              <Option
                v-for="(item,index) in sessionList"
                :key="index"
                :value="item.SerID"
              >{{item.ActivityName}} 【{{item.lessonTypeName}}】&nbsp;&nbsp;&nbsp; {{item.ActStatus}}</Option>
            </i-Select>
            <div style="padding: 10px;">
              该场次时间：
              <span
                style="background-color:#ccdbf7"
                v-show="this.SessionID!=undefined"
              >{{StartTime}} &nbsp; 至 &nbsp; {{EndTime}}</span>
              <img
                :src="require('../../static/image/zwImg/edit.png')"
                style="width:15px;margin-left: 15px;"
                v-show="this.SessionID!=''"
                @click="openEditClick"
              />
            </div>
          </div>
          <div class="right">
            <span style="margin-left: 194px;">课程</span>
            <span class="style1">丨</span>
            <span style="margin-left: 17px;">招收名额</span>
            <span class="style1">丨</span>
            <span style="margin-left: 20px;">参与</span>
            <span class="style1">丨</span>
            <span style="margin-left: 60px;">已选</span>
            <span style="margin-left: 73px;position: relative;top: 9px;">丨</span>
            <span style="margin-left: 20px;">待选</span>
            <div v-show="this.SessionID!=undefined">
              <span style="margin-left: 200px;color: #7b9feb;">{{kc}}</span>
              <span style="position: absolute;left: 287px;color: #7b9feb;">{{zsme}}人</span>
              <span style="color: #7b9feb;position: absolute;left: 390px;">{{cy}}人</span>
              <span
                style="color: #7b9feb;position: absolute;left: 475px;"
              >{{yixuan}}人（其中{{yuxuan}}人预选）</span>
              <span style="color: #7b9feb;position: absolute;left: 656px;">{{dx}}人</span>
            </div>
          </div>
        </div>
        <div class="tabtea">
          <div class="taba" :class="selecttea==1?'addclass':''" @click="selectechartype(1)">课程统计</div>
          <div class="taba" :class="selecttea==2?'addclass':''" @click="selectechartype(2)">班级统计</div>
          <div class="taba" :class="selecttea==3?'addclass':''" @click="selectechartype(3)">学生统计</div>
          <!-- <div class="taba" :class="selecttea==4?'addclass':''" @click="selectechartype(4)">流量监控</div> -->
        </div>
      </div>

      <!-- 课程统计 -->
      <div class="left-box" style="margin-top:10px" v-if="selecttea==1">
        <b style="position: relative;top: 20px;left: 25px;">课程类别</b>
        <div class="tree-btn">
          <div class="tree-box">
            <ul id="treeGroup" class="ztree"></ul>
          </div>
        </div>
      </div>
      <div class="right-box" style="margin-top:10px" v-if="selecttea==1">
        <div
          style="background-color: #6c91f1;width: 7px;height: 26px;position: relative;left: 40px;top: 15px;border-radius: 5px;"
        ></div>
        <b style="position: relative;left: 60px;top: -9px;">当前课程类别：{{this.kcCategory}}</b>
        <b
          v-show="this.SessionID!=undefined"
          style="position: relative;left: 118px;top: -9px;"
        >( 剩余：{{shengyu}} / 招收：{{zhaoshou}} ) 人</b>
        <div class="r" style="padding-left:29px;padding-top: 15px;">
          <i-Select
            v-model="allGrade"
            @on-change="searchGrade"
            style="width:120px;margin-left:10px;margin-right:10px"
            placeholder="全部年级"
          >
            <Option value="-1">全部年级</Option>
            <Option
              v-for="(item,index) in gradeList"
              :key="index"
              :value="item.CodeSerID"
            >{{item.Code}}</Option>
          </i-Select>
          <i-Select
            v-model="allClass"
            @on-change="searchClass"
            style="width:120px;margin-left:10px;margin-right:10px"
            placeholder="全部班级"
          >
            <Option value="-1">全部班级</Option>
            <Option
              v-for="(item,index) in classList"
              :key="index"
              :value="item.ClassID"
            >{{item.ClassName}}</Option>
          </i-Select>
          <i-Select
            v-model="allCourseStatus"
            @on-change="searchCourseStatus"
            style="width:120px;margin-left:10px;margin-right:10px"
            placeholder="全部课程状态"
          >
            <!-- <Option value>全部课程状态</Option> -->
            <Option v-for="(item,index) in courseList" :key="index" :value="item.id">{{item.name}}</Option>
          </i-Select>

          <i-Button type="success" @click="dataExport" style="margin-left:75px;">数据导出</i-Button>

          <!-- 图片show -->
          <div
            v-show="picShow"
            style="width: 250px;position: relative;left: 658px;top: -27px;display:flex;height: 30px;"
          >
            <span
              @click="listShowClick"
              style="cursor:pointer;margin-left: 50px;color: #999999;font-weight: bold;font-size: 15px;position: relative;top: 3px;"
            >列表</span>
            <div
              style="background-color:#6d91f1;width: 80px;border-radius: 10px;margin-left: 10px;"
            ></div>
            <img
              :src="require('../../static/image/zwImg/pic.png')"
              style="width:20px;height:20px;position: relative;left: -28px;top: 4px;"
            />
            <span
              @click="picShowClick"
              style="cursor:pointer;position: relative;left: -6px;color: #999999;top: 3px;font-weight: bold;font-size: 15px;color:#6d91f1;"
            >图表</span>
          </div>

          <!-- 列表show -->
          <div
            v-show="listShow"
            style="width: 250px;position: relative;left: 658px;top: -27px;display:flex;height: 30px;"
          >
            <span
              @click="listShowClick"
              style="cursor:pointer;margin-left: 50px;color: #999999;font-weight: bold;font-size: 15px;position: relative;top: 3px;color:#6d91f1;"
            >列表</span>
            <div
              style="background-color:#6d91f1;width: 80px;border-radius: 10px;margin-left: 10px;"
            ></div>
            <img
              :src="require('../../static/image/zwImg/list.png')"
              style="width:20px;height:20px;position: relative;left: -70px;top: 4px;"
            />
            <span
              @click="picShowClick"
              style="cursor:pointer;position: relative;left: -6px;color: #999999;top: 3px;font-weight: bold;font-size: 15px;"
            >图表</span>
          </div>
        </div>

        <div
          v-show="picShow&&this.SessionID!=undefined"
          style="display:flex;flex-wrap: wrap;margin-left: 42px;width: 984px;min-width: 984px;"
          class="picScroll"
        >
          <!-- <Scroll> -->
          <div
            v-for="(item,index) in datalist3"
            :key="index"
            style="padding-right: 25px;height:290px"
          >
            <!-- "http://debugold.hongyucloud.com/OptCourse/"+item.ImgurlName+"  -->
            <img :src="bgImg(item)" style="width: 207px;height: 128px;" />
            <div
              v-if="item.StatusName=='未通过'"
              style="background-color:red;color:#ffffff;position: relative;top: -133px;border-bottom-left-radius: 29px;width: 73px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;height: 23px;"
            ></div>
            <div
              v-if="item.StatusName=='已通过'"
              style="background-color:green;color:#ffffff;position: relative;top: -133px;border-bottom-left-radius: 29px;width: 73px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;height: 23px;"
            ></div>
            <div
              v-if="item.StatusName=='未审核'"
              style="background-color:#c7b264;color:#ffffff;position: relative;top: -133px;border-bottom-left-radius: 29px;width: 73px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;height: 23px;"
            ></div>
            <span
              style="position: relative;top: -153px;left: 15px;color: #ffffff;"
            >{{item.StatusName}}</span>
            <div
              style="width: 207px;margin-top: -6px;background-color:#624e4e;position: relative;top: -59px;height: 37px;color:#ffffff"
            >计划招生{{item.PlanAmount}}人 已招生{{item.YZAmount}}人 剩余{{item.SYNum}}人</div>
            <div
              style="background-color:#ffffff;border: 1px solid #ebebeb;margin-top: -59px;height: 60px;"
            >
              <b style="font-size: 19px;margin-left: 20px;">{{item.OptName}}</b>
              <br />
              <b style="font-size: 14px;margin-left: 20px;">任课教师：{{item.TeaName}}</b>
            </div>
            <div style="background-color:#f8f9fb;border: 1px solid #ebebeb;height:44px;"></div>
            <Tooltip
              content="班级分布"
              placement="top"
              style="position: relative;top: -31px;left: 44px;"
            >
              <img
                @click="bjfbClick(item)"
                :src="require('../../static/image/zwImg/yuan.png')"
                style="width:20px;"
              />
            </Tooltip>
            <span style="position: relative;top: -36px;left: 75px;color:grey">丨</span>
            <Tooltip
              content="学生状态"
              placement="top"
              style="position: relative;top: -31px;left: 107px;"
            >
              <img
                @click="xsztClick(item)"
                :src="require('../../static/image/zwImg/stu.png')"
                style="width:20px;"
              />
            </Tooltip>
          </div>
          <!-- </Scroll> -->
          <!-- <Table :columns="columns3" :data="datalist3" ref="table"></Table> -->
          <div
            class="mt10 v-tr page-wrap2"
            style="position: relative;top: -30px;margin-left: 570px;"
          >
            <Page
              class="fr"
              :total="total3"
              :page-size="count3"
              :page-size-opts="[8,16,24,32]"
              :current="page3"
              @on-page-size-change="pageSizeUpdate"
              placement="top"
              @on-change="pageUpdate"
              show-sizer
              show-total
            ></Page>
          </div>
        </div>

        <div class="table-bottom-box clearfix" v-show="listShow&&this.SessionID!=undefined">
          <Table :columns="columns1" :data="datalist1" ref="table"></Table>
          <div class="mt10 v-tr page-wrap2">
            <Page
              class="fr"
              :total="total1"
              :page-size="count1"
              :page-size-opts="[10,20,30,40]"
              :current="page1"
              @on-page-size-change="pageSizeUpdate"
              placement="top"
              @on-change="pageUpdate"
              show-sizer
              show-total
            ></Page>
          </div>
        </div>
      </div>

      <!-- 班级统计 -->
      <div class="main-box_s2" style="margin-top:10px" v-if="selecttea==2">
        <div style="float:left">
          <div>
            <i-Select
              v-model="allGrade2"
              @on-change="searchGrade2"
              style="width:120px;margin-left:10px;margin-right:10px"
              placeholder="全部年级"
            >
              <Option value="-1">全部年级</Option>
              <Option
                v-for="(item,index) in gradeList"
                :key="index"
                :value="item.CodeSerID"
              >{{item.Code}}</Option>
            </i-Select>
            <span style="background-color:#c4d3fa;height: 26px;display: inline-block;">
              <b
                style="position: relative;top: 3px;"
              >{{bjsl}}个班级 &nbsp; {{zrs}}人 &nbsp; 已选：{{yxsl}}人 &nbsp; 未选：{{wxsl}}人 &nbsp; 选中率：{{xzl}}</b>
            </span>
            <i-Button
              type="success"
              @click="bjtjDataExport"
              style="position: absolute;left: 638px;"
            >数据导出</i-Button>
          </div>
          <div class="table-bottom-box clearfix" style="width: 700px;">
            <div class="bjtjScroll">
              <Scroll>
                <Table :columns="columns5" :data="datalist5" ref="table"></Table>
              </Scroll>
            </div>
            <div class="mt10 v-tr page-wrap2">
              <Page
                class="fr"
                :total="total5"
                :page-size="count5"
                :page-size-opts="[10,20,30,40]"
                :current="page5"
                @on-page-size-change="pageSizeUpdate"
                placement="top"
                @on-change="pageUpdate"
                show-sizer
                show-total
              ></Page>
            </div>
          </div>
        </div>
        <div style="float:right;width: 400px;height: 500px;margin-top: 30px;">
          <bing3 :uid="3" :xzl="xzl" ref="bing3"></bing3>
          <span
            v-show="this.SessionID!=''"
            style="font-size: 30px;margin-left: 99px;color: #b1b1b6;"
          >选中率</span>
        </div>
      </div>

      <!-- 学生统计 -->
      <div class="main-box_s2" style="margin-top:10px" v-if="selecttea==3">
        <div class="r">
          <i-Select
            v-model="allCourse"
            @on-change="searchCourse"
            style="width:260px;margin-left:10px;margin-right:10px"
            placeholder="全部课程"
          >
            <Option value="-1">全部课程 &nbsp; (剩余：{{zsme-yixuan}}/ 招收：{{zsme}})人</Option>
            <Option
              v-for="(item,index) in allCourseList"
              :key="index"
              :value="item.SerID"
            >{{item.Name}} &nbsp; (剩余：{{item.SyAmount}}/ 招收：{{item.PlanAmount}})人</Option>
          </i-Select>
          <i-Select
            v-model="allGrade"
            @on-change="searchGrade"
            style="width:120px;margin-left:10px;margin-right:10px"
            placeholder="全部年级"
          >
            <Option value="-1">全部年级</Option>
            <Option
              v-for="(item,index) in gradeList"
              :key="index"
              :value="item.CodeSerID"
            >{{item.Code}}</Option>
          </i-Select>
          <i-Select
            v-model="allClass"
            @on-change="searchClass"
            style="width:120px;margin-left:10px;margin-right:10px"
            placeholder="全部班级"
          >
            <Option value="-1">全部班级</Option>
            <Option
              v-for="(item,index) in classList"
              :key="index"
              :value="item.ClassID"
            >{{item.ClassName}}</Option>
          </i-Select>
          <i-Select
            v-model="allCourseStatus"
            @on-change="searchCourseStatus"
            style="width:120px;margin-left:10px;margin-right:10px"
            placeholder="全部课程状态"
          >
            <Option v-for="(item,index) in courseList" :key="index" :value="item.id">{{item.name}}</Option>
          </i-Select>

          <i-Input v-model="searchname" placeholder="请输入学生姓名或课程名称搜索" clearable style="width:250px;"></i-Input>
          <i-Button
            type="primary"
            @click="searchName"
            style="margin-left:-29px;position: relative;left: 29px;"
          >搜索</i-Button>
          <i-Button
            type="success"
            @click="xstjDataExport"
            style="position: absolute;right: 70px;"
          >数据导出</i-Button>
        </div>
        <div class="table-bottom-box clearfix">
          <div>
            <!-- <Scroll> -->
            <Table :columns="columns7" :data="datalist7" ref="table"></Table>
            <!-- </Scroll> -->
          </div>
          <div class="mt10 v-tr page-wrap2">
            <Page
              class="fr"
              :total="total7"
              :page-size="count7"
              :page-size-opts="[10,20,30,40]"
              :current="page7"
              @on-page-size-change="pageSizeUpdate"
              placement="top"
              @on-change="pageUpdate"
              show-sizer
              show-total
            ></Page>
          </div>
        </div>
      </div>
    </div>

    <!-- 场次编辑的模态框 -->
    <Modal title="编辑场次信息" v-model="isModal.editSession" class="editSession">
      <div>
        <div class="style2">
          <b>开始时间：</b>
          <DatePicker type="date" placeholder="开始时间" v-model="edit.startTime"></DatePicker>
        </div>
        <div class="style2">
          <b>结束时间：</b>
          <DatePicker type="date" placeholder="结束时间" v-model="edit.endTime"></DatePicker>
        </div>
      </div>
      <div slot="footer">
        <i-Button @click="myCancel('editSession')" style="margin-left: 8px">取消</i-Button>
        <i-Button type="primary" @click="editSessionOk()" style="margin-left: 8px">确定</i-Button>
      </div>
    </Modal>

    <!-- 某一个课程详情下的模态框 -->
    <Modal :title="this.OptName" v-model="isModal.courseDetail" width="1000" class="courseDetail">
      <div class="table-bottom-box clearfix" style="float:left;width:537px">
        <Table :columns="columns2" :data="datalist2" ref="table"></Table>
        <div class="mt10 v-tr page-wrap2">
          <Page
            class="fr"
            :total="total2"
            :page-size="count2"
            :page-size-opts="[10,20,30,40]"
            :current="page2"
            @on-page-size-change="pageSizeUpdate"
            placement="top"
            @on-change="pageUpdate"
            show-sizer
            show-total
          ></Page>
        </div>
      </div>
      <div style="float:right;width: 400px;height: 454px;">
        <div>
          <b>招收：{{jsrs}}人</b>
          <b style="margin-left: 55px;">每班：{{mb}}</b>
          <i-Button type="success" @click="detailDataExport" style="margin-left:75px;">数据导出</i-Button>
        </div>
        <div style="margin-top:20px">
          <bing :uid="1" ref="bing"></bing>
        </div>
      </div>

      <div slot="footer"></div>
    </Modal>

    <!-- 班级分布模态框 -->
    <Modal :title="this.tupianName" v-model="isModal.bjfbModal">
      <div>
        <b>招收：{{jsrs}}人</b>
        <b style="margin-left: 100px;">每班：{{mb}}</b>
        <div style="margin-left: 55px;">
          <bing :uid="2" ref="bing2"></bing>
        </div>
      </div>
      <div slot="footer">
        <i-Button @click="myCancel('bjfbModal')" style="margin-left: 8px">取消</i-Button>
        <i-Button type="primary" @click="isModal.bjfbModal=false" style="margin-left: 8px">确定</i-Button>
      </div>
    </Modal>

    <!-- 学生状态模态框 -->
    <Modal :title="this.tupianName" v-model="isModal.xsztModal" width="600">
      <div class="table-bottom-box clearfix" style="width:537px">
        <Table :columns="columns2" :data="datalist2" ref="table"></Table>
        <div class="mt10 v-tr page-wrap2">
          <Page
            class="fr"
            :total="total2"
            :page-size="count2"
            :page-size-opts="[10,20,30,40]"
            :current="page2"
            @on-page-size-change="pageSizeUpdate"
            placement="top"
            @on-change="pageUpdate"
            show-sizer
            show-total
          ></Page>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>

    <!-- 班级统计 详情下的模态框 -->
    <Modal :title="this.className" v-model="isModal.bjtjDetail" width="1000" class="courseDetail">
      <div class="table-bottom-box clearfix" style="float:left;width:537px">
        <Table :columns="columns6" :data="datalist6" ref="table"></Table>

        <div class="mt10 v-tr page-wrap2">
          <Page
            class="fr"
            :total="total6"
            :page-size="count6"
            :page-size-opts="[10,20,30,40]"
            :current="page6"
            @on-page-size-change="pageSizeUpdate"
            placement="top"
            @on-change="pageUpdate"
            show-sizer
            show-total
          ></Page>
        </div>
      </div>
      <div style="float:right;width: 400px;height: 454px;">
        <div style="margin-top:20px">
          <bing4 :uid="4" :BTname="BTname" ref="bing4"></bing4>
        </div>
      </div>

      <div slot="footer"></div>
    </Modal>

    <!-- 学生统计 课程调整模态框 -->
    <Modal title="调整课程" v-model="isModal.kctzModal" width="800">
      <div>
        <span style="color:#6e91ef">丨</span>
        <span>当前学生：</span>
        <b>{{dqbj}}</b>
        <b style="margin-left: 25px;">{{dqxs}}</b>
        <span style="margin-left: 40px;">当前课程：</span>
        <b>{{dqkc}}</b>
      </div>
      <div class="table-bottom-box clearfix">
        <Table :columns="columns8" :data="datalist8" ref="table"></Table>
        <div class="mt10 v-tr page-wrap2">
          <Page
            class="fr"
            :total="total8"
            :page-size="count8"
            :page-size-opts="[10,20,30,40]"
            :current="page8"
            @on-page-size-change="pageSizeUpdate"
            placement="top"
            @on-change="pageUpdate"
            show-sizer
            show-total
          ></Page>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>

    <!-- 学生统计 课程调整成功模态框 -->
    <Modal
      title="提示"
      v-model="isModal.kctzOkModal"
      :mask-closable="false"
      :closable="false"
      class="kctzOkModal"
    >
      <img
        :src="require('../../static/image/zwImg/duigou.png')"
        style="width: 75px;margin-left: 200px;"
      />
      <div style="margin: 20px;">
        <b style="margin-left: 175px;">调整到{{tzName}}成功！</b>
      </div>

      <div slot="footer">
        <i-Button type="primary" @click="kctzOKClick">确定</i-Button>
      </div>
    </Modal>

    <!--学生统计 增加名额模态框 -->
    <Modal title="提示" v-model="isModal.zjmeModal" width="500">
      <img
        :src="require('../../static/image/zwImg/meqw.png')"
        style="width: 75px;margin-left: 200px;"
      />
      <div style="margin: 20px;">
        <b style="margin-left: 103px;">{{meqw}}已抢完，需要增加名额才能调整！</b>
      </div>

      <div slot="footer">
        <i-Button
          @click="isModal.zjmeModal=false,isModal.kctzModal=true"
          style="margin-left: 8px"
        >取消</i-Button>
        <i-Button type="primary" @click="isModal.meqwModal=false,addChangOpt()">增加名额调整</i-Button>
      </div>
    </Modal>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
require("../../static/plugins/ztree/zTreeStyle.css");
import "../../static/plugins/ztree/jquery.ztree.all.min.js";
import bing from "../../src/components/bing";
import bing3 from "../../src/components/bing3";
import bing4 from "../../src/components/bing4";
export default {
  components: {
    bing,
    bing3,
    bing4
  },
  data() {
    return {
      picShow: true,
      listShow: false,

      years: new Date().getFullYear(), //v-model的
      yearList: [],
      session: "",
      sessionList: [],

      selecttea: 1,

      SessionID: "", //场次ID
      StartTime: "", //开始时间
      EndTime: "", //结束时间

      year: "",

      isModal: {
        editSession: false,
        courseDetail: false,
        bjfbModal: false,
        xsztModal: false,
        bjtjDetail: false,
        kctzModal: false,
        sjdc: false,
        kctzOkModal: false,
        zjmeModal: false
      },

      edit: {
        startTime: "",
        endTime: ""
      },

      allGrade: "",
      allGrade2: "",
      gradeList: [], //年级下拉的list
      allClass: "",
      classList: [], //班级下拉的list
      allCourseStatus: "",
      courseList: [
        { id: 0, name: "全部" },
        { id: 1, name: "未审核" },
        { id: 2, name: "已通过" },
        { id: 3, name: "未通过" }
      ],
      allCourse: "", //全部课程
      allCourseList: [],

      //分页参数
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,

      page5: 1,
      page6: 1,

      page7: 1,
      page8: 1,

      count1: 10,
      count2: 10,
      count3: 8,
      count4: 10,

      count5: 10,
      count6: 10,

      count7: 10,
      count8: 10,

      total1: 0,
      total2: 0,
      total3: 0,
      total4: 0,

      total5: 0,
      total6: 0,

      total7: 0,
      total8: 0,

      columns1: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "课程状态",
          key: "kezt",
          align: "center",

          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.StatusName);
          }
        },

        {
          title: "课程名称",
          key: "kcmc",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.OptName);
          }
        },
        {
          title: "招收人数",
          key: "zsrs",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.PlanAmount);
          }
        },
        {
          title: "已招人数",
          key: "yzrs",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.YZAmount);
          }
        },
        {
          title: "剩余人数",
          key: "syrs",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.SYNum);
          }
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            var element = [
              h(
                "Button",
                {
                  style: {
                    color: "#65b7ff",
                    border: "unset"
                  },
                  props: {
                    type: "ghost"
                  },
                  on: {
                    click: () => {
                      var _this = this;
                      var data = params.row;
                      console.log(data);
                      _this.OptName = data.OptName; //课程名称
                      _this.courseId = data.SerID; //课程id

                      _this.pagechange2(); //获取某个课程下的详情
                      _this.tbCourseStatistics(); //modal里面的环形图接口
                      _this.isModal.courseDetail = true;
                    }
                  }
                },
                "详细"
              )
            ];
            return element;
          }
        }
      ],
      datalist1: [],

      columns2: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "年级",
          key: "grade",
          // width: 120,
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.GradeName);
          }
        },

        {
          title: "班级",
          key: "class",
          // width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.ClassName);
          }
        },
        {
          title: "姓名",
          key: "name",
          // width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.StuName);
          }
        },
        {
          title: "状态",
          key: "zt",
          // width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.StatusName);
          }
        }
      ],
      datalist2: [],

      datalist3: [],

      columns5: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "班级名称",
          key: "bjmc",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              { class: "operating" },
              params.row.GradeName + params.row.ClassName
            );
          }
        },

        {
          title: "班级人数",
          key: "bjrs",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.ClassNum);
          }
        },
        {
          title: "已选人数",
          key: "yxrs",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.YXNum);
          }
        },
        {
          title: "未选人数",
          key: "wxrs",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.SYNum);
          }
        },

        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            var element = [
              h(
                "Button",
                {
                  style: {
                    color: "#65b7ff",
                    border: "unset"
                  },
                  props: {
                    type: "ghost"
                  },
                  on: {
                    click: () => {
                      var _this = this;
                      var data = params.row;
                      console.log(data);
                      _this.className = data.GradeName + data.ClassName; //班级名称
                      _this.classId = data.ClassID; //班级id

                      _this.pagechange6();
                      _this.BTClassStuDetails(); //modal里面的环形图接口
                      _this.isModal.bjtjDetail = true;
                    }
                  }
                },
                "详细"
              )
            ];
            return element;
          }
        }
      ],
      datalist5: [],

      columns6: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          // width: 120,
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.GradeName);
          }
        },

        {
          title: "课程名称",
          key: "kcmc",
          // width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.ClassName);
          }
        },

        {
          title: "状态",
          key: "zt",
          // width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.StatusName);
          }
        }
      ],
      datalist6: [],

      columns7: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "年级",
          key: "grade",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.GradeName);
          }
        },

        {
          title: "班级",
          key: "class",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.ClassName);
          }
        },
        {
          title: "姓名",
          key: "name",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.StuName);
          }
        },
        {
          title: "课程名称",
          key: "kcmc",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.CourseName);
          }
        },
        {
          title: "提交时间",
          key: "tjsj",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.EditDate);
          }
        },
        {
          title: "状态",
          key: "zt",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.StatusName);
          }
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            var element = [
              h(
                "Button",
                {
                  style: {
                    color: "#65b7ff",
                    border: "unset"
                  },
                  props: {
                    type: "ghost",
                    disabled: params.row.Status == 2 ? true : false
                  },
                  on: {
                    click: () => {
                      var _this = this;
                      var data = params.row;
                      console.log(data);

                      _this.courseId = data.OptSerID; //课程id
                      _this.StuSerID = data.StuSerID; //学生id

                      _this.pagechange8(); //获取某个课程下的详情

                      _this.isModal.kctzModal = true;
                    }
                  }
                },
                "课程调整"
              )
            ];
            return element;
          }
        }
      ],
      datalist7: [],

      columns8: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "课程名称",
          key: "kemc",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.OptName);
          }
        },

        {
          title: "任课教师",
          key: "rkjs",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.TeaName);
          }
        },
        {
          title: "招收人数",
          key: "zsrs",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.PlanAmount);
          }
        },
        {
          title: "已招人数",
          key: "yzrs",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.YZAmount);
          }
        },
        {
          title: "剩余人数",
          key: "syrs",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, params.row.SYNum);
          }
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            return h("div", { class: "operating" }, [
              h(
                "Tooltip",
                { props: { content: "调整到该课程", placement: "bottom" } },
                [
                  h("img", {
                    domProps: {
                      src: require("../../static/image/zwImg/tz.png")
                    },
                    style: {
                      width: "18px",
                      position: "relative",
                      top: "3px",
                      "margin-left": "4px",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        if (this.page8KCid == params.row.SerID) {
                          this.$Message.info("该学生已经被当前课程录取！");
                        } else {
                          if (params.row.SYNum > 0) {
                            this.ChangOpt(params.row.SerID, params.row.OptName);
                          } else {
                            this.zjmekcID = params.row.SerID;
                            this.meqw = params.row.OptName;
                            this.isModal.kctzModal = false;
                            this.isModal.zjmeModal = true;
                          }
                        }
                      }
                    }
                  })
                ]
              )
            ]);
          }
        }
      ],
      datalist8: [],

      formData: {
        showaddgroup: {
          GroupName: "",
          EditGroupName: "",
          ParentID: 0,
          Editid: 0,
          id: 0,
          nodePath1: "",
          excelTable: "",
          grouplist: [],
          isLoading: false
        }
      },

      kc: "",
      zsme: "",
      cy: "",
      yixuan: "",
      yuxuan: "",
      dx: "",

      kcCategory: "", //当前课程类别
      zhaoshou: "", //招收
      shengyu: "", //剩余

      gradeId: "", //年级id
      classId: "", //班级id
      status: 0, //1代表未审核、2代表已通过、3代表未通过     0代表全部
      course: "",

      courseId: "", //课程id

      StuSerID: "", //学生id

      // 模态框title
      OptName: "",
      tupianName: "",
      className: "",

      //班级统计
      bjsl: "",
      zrs: "",
      yxsl: "",
      wxsl: "",
      xzl: "",
      BTname: "",

      //学生统计
      searchname: "",
      dqbj: "",
      dqxs: "",
      dqkc: "",
      tzName: "",
      meqw: "",
      zjmekcID: "",
      page8KCid: "",

      //课程统计modal框里面的参数
      jsrs: "",
      mb: ""
    };
  },
  created() {},
  mounted() {
    var _this = this;
    _this.GetSchYear();
    _this.initTree();
  },

  computed: {
    bgImg() {
      return item => {
        return "http://debugold.hongyucloud.com/OptCourse" + item.ImgurlName;
      };
    }
  },

  methods: {
    picShowClick() {
      var _this = this;
      _this.picShow = true;
      _this.listShow = false;
    },
    listShowClick() {
      var _this = this;
      _this.picShow = false;
      _this.listShow = true;
    },
    //获取学年
    GetSchYear() {
      var _this = this;
      var url = APIConfig.statistics.GetSchYear;
      _this.$api.get(url, {}, resp => {
        if (resp.Data != "") {
          resp.Data.forEach(el => {
            _this.yearList.push(el);
          });
        }
      });
      _this.GetYearAct();
    },

    // 获取学年下的场次
    GetYearAct() {
      // alert(this.years);
      var _this = this;

      var url = APIConfig.statistics.GetYearAct;
      _this.$api.get(url, { year: _this.years }, resp => {
        if (resp.Data.length > 0) {
          resp.Data.forEach(el => {
            _this.sessionList.push(el);
            // _this.SessionID = el.SerID; //场次id
          });
        } else {
          _this.session = "";
          _this.sessionList = [];
        }
      });
    },

    selectechartype: function(type) {
      var _this = this;
      _this.selecttea = type;
      window.selecttea = type;

      if (_this.selecttea == 1) {
        //课程统计
        _this.gradeId = "";
        _this.initTree();
        _this.GetGrade();
      } else if (_this.selecttea == 2) {
        //班级统计
        _this.gradeId = "";
        if (_this.SessionID != "") {
          _this.GetGrade();
          _this.pagechange5();
          _this.BTClassData();
        } else {
          _this.$Message.info("请先选择场次！");
        }
      } else if (_this.selecttea == 3) {
        //学生统计
        _this.gradeId = "";
        _this.allGrade = "";
        if (_this.SessionID != "") {
          _this.pagechange7();
          _this.GetDroCourse();
        } else {
          _this.$Message.info("请先选择场次！");
        }
      } else {
        //流量监控
      }
    },

    //全部课程 的下拉
    GetDroCourse() {
      var _this = this;
      var url = APIConfig.statistics.GetDroCourse;
      _this.$api.get(url, { ActiveID: _this.SessionID }, resp => {
        resp.Data.forEach(el => {
          _this.allCourseList.push(el);
        });
      });
    },

    // 年级下拉
    GetGrade() {
      var _this = this;
      var url = APIConfig.statistics.GetGrade;
      _this.gradeList = [];
      _this.$api.get(url, {}, resp => {
        resp.Data.forEach(el => {
          _this.gradeList.push(el);
        });
      });
    },

    // 场地详情
    ActivityDetails() {
      var _this = this;
      var url = APIConfig.statistics.ActivityDetails;
      _this.$api.get(url, { SerID: _this.SessionID }, resp => {
        if (resp.Data != "") {
          resp.Data.forEach(el => {
            _this.StartTime = el.StartTime; //开始时间
            _this.EndTime = el.EndTime; //结束时间
          });
        }
      });
    },

    // 学年搜索
    searchYear(value) {
      var _this = this;
      _this.year = value;
      _this.GetYearAct();
    },

    //场次的搜索
    searchSession(value) {
      var _this = this;
      _this.SessionID = value;
      if (_this.SessionID != undefined) {
        _this.ActivityDetails();
        _this.GetTJData();
        if (_this.selecttea == 1) {
          _this.pagechange1();
        } else if (_this.selecttea == 2) {
          _this.pagechange5();
          _this.BTClassData();
        } else {
          _this.pagechange7();
        }
        _this.GetGrade();
      }
    },

    //年级的搜索
    searchGrade(value) {
      var _this = this;
      if (value == "-1") {
        _this.gradeId = "";
      } else {
        _this.gradeId = value;
      }

      if (value != undefined) {
        _this.classList = [];
        if (value != "-1") {
          _this.GetClass();
        } else {
          _this.allClass = "";
        }
        if (_this.selecttea == 1) {
          _this.pagechange1();
        } else {
          _this.pagechange7();
        }
      } else {
        _this.allClass = "";
        _this.classList = [];
      }
    },
    searchGrade2(value) {
      var _this = this;
      if (value == "-1") {
        _this.gradeId = "";
      } else {
        _this.gradeId = value;
      }

      if (value != undefined) {
        _this.pagechange5();
        _this.BTClassData();
      }
    },

    //班级的搜索
    searchClass(value) {
      var _this = this;
      if (value == "-1") {
        _this.classId = "";
      } else {
        _this.classId = value;
      }
      if (_this.selecttea == 1) {
        _this.page1 = 1;
        _this.count1 = 10;
        _this.pagechange1();
      } else {
        _this.page7 = 1;
        _this.count7 = 10;
        _this.pagechange7();
      }
    },

    //全部课程状态的搜索
    searchCourseStatus(value) {
      var _this = this;
      _this.status = value;
      if (_this.selecttea == 1) {
        _this.page1 = 1;
        _this.count1 = 10;
        _this.pagechange1();
      } else {
        _this.page7 = 1;
        _this.count7 = 10;
        _this.pagechange7();
      }
    },
    //全部课程的搜索
    searchCourse(value) {
      var _this = this;
      if (value == "-1") {
        _this.course = "";
      } else {
        _this.course = value;
      }

      _this.page7 = 1;
      _this.count7 = 10;
      _this.pagechange7();
    },

    // 学生统计搜索
    searchName() {
      var _this = this;
      _this.page7 = 1;
      _this.count7 = 10;
      _this.pagechange7();
    },

    // 获取年级下的班级
    GetClass() {
      var _this = this;
      // alert(_this.gradeId);
      var url = APIConfig.statistics.GetClass;
      _this.$api.get(url, { Grade: _this.gradeId }, resp => {
        if (resp.Data != "") {
          resp.Data.forEach(el => {
            _this.classList.push(el);
          });
        }
      });
    },

    GetTJData() {
      var _this = this;
      var url = APIConfig.statistics.GetTJData;
      _this.$api.get(url, { ActiveID: _this.SessionID }, resp => {
        if (resp.Data != "") {
          var el = resp.Data;
          _this.kc = el.counum; //课程
          _this.zsme = el.plannum; //招收名额
          _this.cy = el.optnum; //参与
          _this.yixuan = el.yxnum; //已选
          _this.yuxuan = el.ynum; //预选
          _this.dx = el.wxnum; //待选
        }
      });
    },

    //编辑框的点击事件
    openEditClick() {
      var _this = this;
      _this.edit.startTime = "";
      _this.edit.endTime = "";
      _this.isModal.editSession = true;
    },

    //课程统计 树
    initTree() {
      var _that = this;
      _that.treeSetting = _that.$utils.comSetting().tree;
      _that.treeSetting.callback.onClick = (
        event,
        treeId,
        treeNode,
        clickFlag
      ) => {
        _that.groupTreeClick(event, treeId, treeNode, clickFlag);
      };
      _that.$api.get(APIConfig.statistics.CateList, {}, function(resp) {
        var zNodes = [resp.Data[0]];
        zNodes = _that.$utils.openFistNode(zNodes);
        $.fn.zTree.init($("#treeGroup"), _that.treeSetting, zNodes);
        if (zNodes[0].children.length > 0) {
          /*页面刚进来，默认勾选全部下面第一个子节点 */
          var zTree = $.fn.zTree.getZTreeObj("treeGroup");
          var node = zTree.getNodeByParam("id", zNodes[0].children[0].id);
          zTree.selectNode(node); //根据该节点选中
          //默认设置点击第一个节点
          _that.groupTreeClick("", "treeGroup", node, 1);
        } else {
          /*页面刚进来，默认勾选全部这个节点 */
          var zTree = $.fn.zTree.getZTreeObj("treeGroup");
          var node = zTree.getNodeByParam("id", 0);
          zTree.selectNode(node); //根据该节点选中
          //默认设置点击第一个节点
          _that.groupTreeClick("", "treeGroup", node, 1);
        }
      });
    },
    //课程统计的树 组点击
    groupTreeClick(event, treeId, treeNode, clickFlag) {
      var _this = this;
      var vlist = _this.formData.showaddgroup;
      vlist.ParentID = treeNode.pid;
      vlist.id = treeNode.id;
      vlist.Editid = treeNode.id;
      _this.kcCategory = vlist.GroupName = treeNode.name;

      vlist.EditGroupName = treeNode.name;
      vlist.grouplist = treeNode.children == undefined ? [] : treeNode.children;

      if (_this.SessionID != "") {
        _this.pagechange1();
      }
    },

    //========分页=======
    pageUpdate: function(page) {
      var _this = this;
      if (_this.selecttea == 1) {
        if (_this.isModal.editSession == false) {
          if (_this.picShow) {
            _this.page3 = page;
          } else {
            _this.page1 = page;
          }

          _this.pagechange1();
        } else {
          _this.page2 = page;
          _this.pagechange2();
        }
      } else if (_this.selecttea == 2) {
        if (_this.isModal.bjtjDetail == false) {
          _this.page5 = page;
          _this.pagechange5();
        } else {
          _this.page6 = page;
          _this.pagechange6();
        }
      } else {
        if (_this.isModal.kctzModal == false) {
          _this.page7 = page;
          _this.pagechange7();
        } else {
          _this.page8 = page;
          _this.pagechange8();
        }
      }
    },
    pageSizeUpdate: function(size) {
      var _this = this;
      if (_this.selecttea == 1) {
        if (_this.isModal.editSession == false) {
          if (_this.picShow) {
            _this.page3 = 1;
            _this.count3 = size;
          } else {
            _this.page1 = 1;
            _this.count1 = size;
          }

          _this.pagechange1();
        } else {
          _this.page2 = 1;
          _this.count2 = size;
          _this.pagechange2();
        }
      } else if (_this.selecttea == 2) {
        if (_this.isModal.bjtjDetail == false) {
          _this.page5 = 1;
          _this.count5 = size;
          _this.pagechange5();
        } else {
          _this.page6 = 1;
          _this.count6 = size;
          _this.pagechange6();
        }
      } else {
        if (_this.isModal.kctzModal == false) {
          _this.page7 = 1;
          _this.count7 = size;
          _this.pagechange7();
        } else {
          _this.page8 = 1;
          _this.count8 = size;
          _this.pagechange8();
        }
      }
    },

    //第一个按钮界面的分页
    pagechange1() {
      var _this = this;
      if (_this.classId == undefined) {
        _this.classId = "";
      }
      if (_this.picShow) {
        var page = _this.page3 - 1;
        var count = _this.count3;
      } else {
        var page = _this.page1 - 1;
        var count = _this.count1;
      }
      var url = APIConfig.statistics.GetActCourse;
      var item = {
        PageSize: count,
        PageIndex: page,
        TypeID: _this.formData.showaddgroup.id, //类别id
        ActiveID: _this.SessionID, //场次id
        GradeID: _this.gradeId, //年级id
        ClassID: _this.classId, //班级id
        Status: _this.status
      };
      _this.$api.get(url, item, resp => {
        if (resp.Data != 0) {
          _this.datalist1 = resp.Data;
          _this.datalist3 = resp.Data;
          _this.total1 = resp.Page.sumDataCount;
          _this.total3 = resp.Page.sumDataCount;
          _this.zhaoshou = resp.OtherData.plannum;
          _this.shengyu = resp.OtherData.yxnum;
        } else {
          _this.datalist1 = [];
          _this.total1 = resp.Page.sumDataCount;
          _this.zhaoshou = resp.OtherData.plannum;
          _this.shengyu = resp.OtherData.yxnum;
        }
      });
    },

    // 第一个按钮界面详情下的分页
    pagechange2() {
      var _this = this;
      var page = _this.page2 - 1;
      var count = _this.count2;
      var url = APIConfig.statistics.CourseStatistics;
      var item = {
        PageSize: count,
        PageIndex: page,
        ActiveID: _this.SessionID, //场次id
        OptSerID: _this.courseId //课程id
      };
      _this.$api.get(url, item, resp => {
        if (resp.Data != 0) {
          _this.datalist2 = resp.Data;
          _this.total2 = resp.Page.sumDataCount;
        } else {
          _this.datalist2 = [];
          _this.total2 = resp.Page.sumDataCount;
        }
      });
    },

    pagechange5() {
      var _this = this;
      var page = _this.page5 - 1;
      var count = _this.count5;
      var url = APIConfig.statistics.GetGradeClass;
      var item = {
        PageSize: count,
        PageIndex: page,
        ActiveID: _this.SessionID, //场次id
        GradeID: _this.gradeId //年级id
      };
      _this.$api.get(url, item, resp => {
        if (resp.Data != 0) {
          _this.datalist5 = resp.Data;
          _this.total5 = resp.Page.sumDataCount;
        } else {
          _this.datalist5 = [];
          _this.total5 = resp.Page.sumDataCount;
        }
      });
    },

    pagechange6() {
      var _this = this;
      var page = _this.page6 - 1;
      var count = _this.count6;
      var url = APIConfig.statistics.ClassStuDetails;
      var item = {
        PageSize: count,
        PageIndex: page,
        ActiveID: _this.SessionID, //场次id
        ClassID: _this.classId //班级id
      };
      _this.$api.get(url, item, resp => {
        if (resp.Data != 0) {
          _this.datalist6 = resp.Data;
          _this.total6 = resp.Page.sumDataCount;
        } else {
          _this.datalist6 = [];
          _this.total6 = resp.Page.sumDataCount;
        }
      });
    },

    pagechange7() {
      var _this = this;
      var page = _this.page7 - 1;
      var count = _this.count7;
      var url = APIConfig.statistics.StuDetails;
      var item = {
        PageSize: count,
        PageIndex: page,
        ActiveID: _this.SessionID, //场次id
        OptSerID: _this.course, //全部课程
        GradeID: _this.gradeId, //年级id
        ClassID: _this.classId, //班级id
        status: _this.status, //状态
        Name: _this.searchname //搜索的学生名字
      };
      _this.$api.get(url, item, resp => {
        if (resp.Data != 0) {
          _this.datalist7 = resp.Data;
          _this.total7 = resp.Page.sumDataCount;
        } else {
          _this.datalist7 = [];
          _this.total7 = resp.Page.sumDataCount;
        }
      });
    },

    pagechange8() {
      var _this = this;
      var page = _this.page8 - 1;
      var count = _this.count8;
      var url = APIConfig.statistics.GetActoptCourse;
      var item = {
        PageSize: count,
        PageIndex: page,
        ActiveID: _this.SessionID, //场次id
        OptSerID: _this.courseId, //课程id
        StuSerID: _this.StuSerID //学生id
      };
      _this.$api.get(url, item, resp => {
        if (resp.Data != 0) {
          _this.datalist8 = resp.Data;
          _this.total8 = resp.Page.sumDataCount;
          var data = resp.OtherData;
          _this.dqbj = data.ClassName;
          _this.dqxs = data.StuName;
          _this.dqkc = data.OptName; //当前课程
          _this.page8KCid = data.OptSerID;
        } else {
          _this.datalist8 = [];
          _this.total8 = resp.Page.sumDataCount;
        }
      });
    },

    kctzOKClick() {
      var _this = this;
      _this.isModal.kctzOkModal = false;
      _this.pagechange7();
      _this.pagechange8();
      _this.isModal.kctzModal = true;
    },

    //班级统计 饼图
    BTClassData() {
      var _this = this;
      var url = APIConfig.statistics.BTClassData;
      var item = {
        ActiveID: _this.SessionID, //场次id
        GradeID: _this.gradeId //年级id
      };
      var pie = {
        gdata: [],
        ydata: []
      };
      _this.$api.get(url, item, resp => {
        var data = resp.Data;

        _this.bjsl = data.classnum;
        _this.zrs = data.optnum;
        _this.yxsl = data.yxnum;
        _this.wxsl = data.wxnum;
        _this.xzl = data.xzl;
        pie.gdata.push("已选", "未选");
        pie.ydata.push(
          { value: data.yxnum, name: "已选" },
          { value: data.wxnum, name: "未选" }
        );
        _this.$refs.bing3.init(pie.gdata, pie.ydata);
      });
    },

    //班级统计 详情里面的饼图
    BTClassStuDetails() {
      var _this = this;
      var url = APIConfig.statistics.BTClassStuDetails;
      var item = {
        ActiveID: _this.SessionID, //场次id
        ClassID: _this.classId //班级id
      };
      var pie = {
        gdata: [],
        ydata: []
      };

      _this.$api.get(url, item, resp => {
        var data = resp.Data;
        data.forEach(ele => {
          if (ele.OptInfoList.length > 0) {
            _this.BTname = ele.ClassName;
          } else {
            _this.BTname = "";
          }
          ele.OptInfoList.forEach(el => {
            pie.gdata.push(el.OptName);
            pie.ydata.push({ value: el.xkoptnum, name: el.OptName });
          });
        });
        _this.$refs.bing4.init(pie.gdata, pie.ydata);
      });
    },

    //数据导出
    dataExport() {
      var _this = this;

      var url = APIConfig.statistics.DcActCourse;
      var TypeID = _this.formData.showaddgroup.id;
      var ActiveID = _this.SessionID;
      var GradeID = _this.gradeId;
      var ClassID = _this.classId;
      var Status = _this.status;
      window.location.href =
        url +
        "?TypeID=" +
        TypeID +
        "&ActiveID=" +
        ActiveID +
        "&GradeID=" +
        GradeID +
        "&ClassID=" +
        ClassID +
        "&Status=" +
        Status;
    },

    // 详情数据导出
    detailDataExport() {
      var _this = this;
      var url = APIConfig.statistics.dcCourseStatistics;
      var ActiveID = _this.SessionID; //场次id
      var OptSerID = _this.courseId; //课程id

      window.location.href =
        url + "?ActiveID=" + ActiveID + "&OptSerID=" + OptSerID;
    },

    //班级统计 数据导出
    bjtjDataExport() {
      var _this = this;
      var url = APIConfig.statistics.DCGradeClass;
      var ActiveID = _this.SessionID; //场次id
      var GradeID = _this.gradeId; //年级id

      window.location.href =
        url + "?ActiveID=" + ActiveID + "&GradeID=" + GradeID;
    },

    //学生统计 数据导出
    xstjDataExport() {
      var _this = this;
      var url = APIConfig.statistics.DcStuDetails;
      var ActiveID = _this.SessionID; //场次id
      var OptSerID = _this.course; //全部课程id
      var GradeID = _this.gradeId; //年级id
      var ClassID = _this.classId; //班级id
      var status = _this.status; //课程状态
      var Name = _this.searchname; //搜索的name

      window.location.href =
        url +
        "?ActiveID=" +
        ActiveID +
        "&OptSerID=" +
        OptSerID +
        "&GradeID=" +
        GradeID +
        "&ClassID=" +
        ClassID +
        "&status=" +
        status +
        "&Name=" +
        Name;
    },

    //modal里面的环形图接口
    tbCourseStatistics() {
      var _this = this;
      var url = APIConfig.statistics.tbCourseStatistics;
      var item = {
        ActiveID: _this.SessionID,
        OptSerID: _this.courseId
      };
      _this.$api.get(url, item, resp => {
        _this.jsrs = resp.OtherData.PlanAmount; //招收人数
        _this.mb = resp.OtherData.EveryClassNum; //每班人数
        var data = resp.Data;
        var pie = {
          gdata: [],
          ydata: []
        };
        data.forEach(el => {
          // _this.bingClassName = el.ClassName;
          // _this.bingLYNumber = el.LYNumber;
          pie.gdata.push(el.ClassName);
          pie.ydata.push({ value: el.LYNumber, name: el.ClassName });
        });

        if (_this.isModal.bjfbModal == false) {
          _this.$refs.bing.init(pie.gdata, pie.ydata);
        } else {
          _this.$refs.bing2.init(pie.gdata, pie.ydata);
        }
      });
    },

    //头部 编辑场次时间的确认事件
    editSessionOk() {
      var _this = this;

      var url = APIConfig.statistics.ActivityEdit;
      var item = {
        SerID: _this.SessionID,
        StartTime: _this.$utils.dateFormat(
          _this.edit.startTime,
          "yyyy-MM-dd HH:mm"
        ),
        EndTime: _this.$utils.dateFormat(_this.edit.endTime, "yyyy-MM-dd HH:mm")
      };
      if (_this.edit.startTime > _this.edit.endTime) {
        _this.$Message.info("开始时间不能大于结束时间！");
        return;
      } else {
        _this.$api.post(url, item, resp => {
          _this.StartTime = _this.$utils.dateFormat(
            _this.edit.startTime,
            "yyyy-MM-dd HH:mm"
          );
          _this.EndTime = _this.$utils.dateFormat(
            _this.edit.endTime,
            "yyyy-MM-dd HH:mm"
          );

          _this.isModal.editSession = false;
        });
      }
    },

    //取消事件
    myCancel: function(name, resetName) {
      console.log(name, resetName);
      this.isModal[name] = false;
      if (resetName) this.$refs[resetName].resetFields();
    },

    // 班级分布 点击事件
    bjfbClick(item) {
      console.log(item);
      var _this = this;
      _this.tupianName = item.OptName;
      _this.courseId = item.SerID;
      _this.tbCourseStatistics();
      _this.isModal.bjfbModal = true;
    },

    // 学生状态 点击事件
    xsztClick(item) {
      console.log(item);

      var _this = this;
      _this.tupianName = item.OptName;
      _this.courseId = item.SerID; //课程id
      _this.pagechange2();
      _this.isModal.xsztModal = true;
    },

    //学生统计 课程调整的点击事件
    ChangOpt(id, OptName) {
      var _this = this;
      var url = APIConfig.statistics.ChangOpt;
      var item = {
        OptSerID: id,
        ActiveID: _this.SessionID,
        StuSerID: _this.StuSerID
      };
      _this.$api.post(url, item, resp => {
        _this.tzName = OptName;
        _this.dqkc = OptName;
        _this.isModal.kctzModal = false;
        _this.isModal.kctzOkModal = true;
      });
    },

    //增加名额调整课程
    addChangOpt() {
      var _this = this;
      var url = APIConfig.statistics.addChangOpt;
      var item = {
        OptSerID: _this.zjmekcID,
        ActiveID: _this.SessionID,
        StuSerID: _this.StuSerID
      };
      _this.$api.post(url, item, resp => {
        _this.isModal.zjmeModal = false;
        _this.isModal.kctzOkModal = true;
      });
    }
  }
};
</script>
<style scoped>
.main-box_s {
  min-height: 30%;
}
.main-box_s2 {
  padding: 15px;
  background: #ffffff;
  border: 1px solid #eee;
  min-width: 1120px;
  /* height: 600px; */
  min-height: 100%;
}
.right {
  float: right;
  position: absolute;
  right: 50px;
  top: 85px;
  height: 55px;
  width: 700px;
}
.style1 {
  margin-left: 20px;
  position: relative;
  top: 9px;
}
.style2 {
  margin-left: 100px;
  padding-bottom: 20px;
}
.left-box {
  width: 300px;
  background: #fff;
  /* height: 120%;*/
  min-height: 120%;
  float: left;
}
.right-box {
  margin-left: 315px;
  background: #fff;
  /* height: 120%; */
  min-height: 120%;
}
</style>
<style lang="scss" scoped>
.tabtea {
  display: inline-block;
}
.tabtea .taba {
  float: left;
  /* height: 30px; */
  line-height: 40px;
  padding: 0px 30px;
  text-align: center;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  color: #9e7ae4;
  border: 1px solid #9e7ae4;
  //   border-top-left-radius: 15px;
  //   border-top-right-radius: 15px;
  background: #ffffff;
}
.tabtea .taba:hover {
  float: left;
  /* height: 30px; */
  line-height: 40px;
  background: #9e7ae4;
  padding: 0px 30px;
  text-align: center;
  border-radius: 5px;
  margin-right: 10px;
  color: #ffffff;
  cursor: pointer;
  border: 1px solid #9e7ae4;
  //   border-top-left-radius: 15px;
  //   border-top-right-radius: 15px;
}
.addclass {
  background: #9e7ae4 !important;
  color: #ffffff !important;
}
</style>
<style lang="scss" scoped>
.tree-btn {
  height: 40px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-top: 1px dashed #e9eaec;
  margin-top: 27px;
  margin-left: 18px;
}
.tree-btn .btn-li {
  margin-right: -6px;
  margin-left: 23px;
  width: 30px;
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
}
.tree-btn .btn-li:hover {
  margin-right: 9px;
  margin-left: 10px;
  background: #e9eaec;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
}
.tree-btn .tree-spl {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  cursor: pointer;
}
.tree-btn .tree-spl:hover {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background: #e9eaec;
  cursor: pointer;
}
</style>
<style  scoped>
courseDetail /deep/ .ivu-modal-wrap .ivu-modal-body {
  /* // max-height: 492px; */
  overflow: auto;
  /* // width: 537px !important;
  // min-width: 537px !important; */
  height: 600px;
}
.bjtjScroll /deep/ .ivu-scroll-container {
  height: 460px !important;
}

/* .wrap-main .main-box {
  padding: 15px;
  min-width: 760px;
  min-height: 100%;
  position: relative;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #f6f7f7;
} */
</style>
<style scoped>
.picScroll /deep/ .ivu-scroll-container {
  width: 940px !important;
  height: 501px !important;
  position: relative;
  left: -22px;
}
kctzOkModal /deep/ .ivu-modal-content {
  width: 500px;
}
</style>
