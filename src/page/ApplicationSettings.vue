<template>
    <div class="body" id="Course_Selection_web">
        <div class="path-nav">
            <h1>应用设置</h1>
        </div>
        <div class="main-box">
            <div class="main-box_s">
                <Tabs type="card" @on-click="getTabName">
                    <Tab-Pane label="权限设置" >
                        <div class="Students_buttom">
                            <Select style="width:200px;" v-model="juese" @on-change="getChangeJurisdictionData">
                                <Option v-for="item in Jurisdictionlist" :value="item.value" :key="item.value">{{item.label}}</Option>
                            </Select>
                        </div>
                        <i-Table border :columns="columns" :data="data" no-data-text="暂无数据"></i-Table>
                    </Tab-Pane>
                    <Modal v-model="editJurisdictionUserModal" title="权限回收确认" @on-ok="recoverJurisdiction" >
                        <span>是否回收改用户的选课管理员权限？</span>
                    </Modal>
                    <Modal v-model="addJurisdictionUserModal" title="新增选课管理员" @on-ok="addXKAdmin" @on-cancel="reSetAddModal">
                        <div>
                            <Input v-model="addJurisdictionUser.name" clearable placeholder="请输入姓名搜索" style="width:500px;" />
                            <Button type="primary" @click="getChangeUserList">搜索</Button>
                        </div>
                        <div>
                            <Table border :columns="columns1" :data="userListData" no-data-text="暂无数据" @on-select="showSelection"></Table>
                        </div>
                    </Modal>
                    <!-- <Tab-Pane label="权限设置" >
                        
                    </Tab-Pane> -->
                </Tabs>
            </div>
            <div class="custom-page-wrap">
                <div v-if="tabName==0" >
                    <div style="float: left;margin-top: 10px;margin-left: 20px;"><Button style="background:rgb(128, 108, 240);" type="primary" @click="openAddJurisdictionUserModal">新增选课管理员</Button></div>
                    <div style="float: right;margin-right:3%;"><Page :total="total" :page-size="PageSize" show-sizer show-elevator show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" ></Page></div>
                    <!-- <div style="margin-right:3%;"> -->
                    <!-- <h3>新增选课管理员</h3>
                    <Page :total="total" :page-size="PageSize" show-sizer show-elevator show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" ></Page> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            data:[],//用户数据
            userListData:[],//所有用户
            delUserID:'',//选中的权限回收id
            tabName:'',
            PageSize:10,
            PageIndex:0,
            total:0,
            juese:0,
            editJurisdictionUserModal:false, //编辑用户权限对话框
            addJurisdictionUserModal:false, //新增选课管理员对话框
            addJurisdictionUser:{
                name:'',
                selection:[],
            },
            Jurisdictionlist:[
                {
                    value: 0,
                    label: '全部'
                },
                {
                    value: 1,
                    label: '选课管理员'
                }
            ],
            columns:[
                { title: '序号', type: 'index', width: 70, },
                { title: '账号', key: 'zhanghao', },
                { title: '姓名', key: 'UserName', },
                { title: '学校名称/部门', key: '', },
                { title: '角色名称', key: 'FileTrueName', },
                { title: '备注', key: '', },
                { 
                    title: '操作', 
                    width: 180,
                    align: 'center', 
                    render: (h, params) => {
                        return [
                            h('Tooltip', {props: {content: "权限回收",placement:'bottom'},class:'operating'}, [
                                h('Button', { props: { type: 'text', icon: 'ios-compose-outline' }, on: {
                                    click: () => {
                                        var _this=this;
                                        // console.log(params.row.UserID)
                                        _this.openEditJurisdictionUserModal(params.row.UserID);
                                    }
                                }},'')])
                        ];
                    },
                },
            ],
            columns1:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                { title: '账号', key: 'zhanghao', },
                { title: '姓名', key: 'username', },
                { title: '学校名称/部门', key: '', },
            ],
        };
    },
    mounted(){
        var _this=this;
        _this.getJurisdictionData();
        // _this.getUserList();
    },
    methods:{
        getJurisdictionData(){ //获取选课管理员或全部
            var _this=this;
            let PageSize=_this.PageSize;
            let PageIndex=_this.PageIndex;
            let juese=_this.juese;
            _this.$api.get(APIConfig.OptCourse.GetqxUserList,{juese:juese,PageIndex:PageIndex,PageSize:PageSize},resp=>{
                _this.data=resp.Data;
                _this.total=resp.Page.sumDataCount;
                // console.log(_this.data)
            })
        },
        getUserList(){ //获取所有用户
            var _this=this;
            let name=_this.addJurisdictionUser.name;
            _this.$api.get(APIConfig.OptCourse.UserList,{name:name},resp=>{
                // _this.userListData=resp.Data;
                let temp=resp.Data;
                if(_this.data.length!=0){
                    temp.forEach(x=>{
                        let flag=false;
                        _this.data.forEach(y=>{
                            if(x.userid == y.UserID) flag=true;
                        });
                        if(!flag) _this.userListData.push(x);
                    });
                }else _this.userListData=resp.Data;
            })
        },
        getChangeUserList(){
            var _this=this;
            _this.userListData=[];
            _this.getUserList();
        },
        getChangeJurisdictionData(){
            var _this=this;
            console.log(111111)
            _this.getJurisdictionData();
        },
        getTabName(name){ //tab页切换
            var _this=this;
            _this.tabName=name;
            console.log(_this.tabName);
        },
        openAddJurisdictionUserModal(){
            var _this=this;
            _this.addJurisdictionUser.name;
            _this.getUserList();
            _this.addJurisdictionUserModal=true;
        },
        reSetAddModal(){
            var _this=this;
            _this.addJurisdictionUser.name='';
        },
        showSelection(selection,row){ //新增选课管理员列表
            console.log(selection)
            var _this=this;
            _this.addJurisdictionUser.selection=selection;
        },
        addXKAdmin(){
            var _this=this;
            let tempuseridslist=[];
            let selection=_this.addJurisdictionUser.selection;
            if(selection.length!=0){
                selection.forEach(x=>{
                    tempuseridslist.push(x.userid);
                });
            }
            let useridslist=tempuseridslist.join(',')
            // console.log(useridslist)
            _this.$api.get(APIConfig.OptCourse.Addquanxian,{useridslist:useridslist,juese:1},resp=>{
                _this.getJurisdictionData();
            })
        },
        openEditJurisdictionUserModal(UserID){
            var _this=this;
            _this.delUserID=UserID
            _this.editJurisdictionUserModal=true;
        },
        recoverJurisdiction(){ //权限回收
            var _this=this;
            let UserID=_this.delUserID;
            let juese=1;
            _this.$api.get(APIConfig.OptCourse.Deletejuese,{juese:juese,UserID:UserID},resp=>{
                _this.getJurisdictionData();
            })
        },
        pageChange(index){
            var _this=this;
            _this.PageIndex=index-1;
        },
        pageSizeChange(pagesize){
            var _this=this;
            _this.PageSize=pagesize;
        },
    },
}
</script>