//接口配置
// var BaseUrl="/";
// var BaseUrl="http://118.178.85.180/api/api/areas/txopenuniversity/";
// var BaseUrl="http://118.178.85.180:26/api/";
// var BaseUrl=API_BASE;
// var FileUrl=API_BASE;
var BaseUrl = "/";
var FileUrl = "/OptCourse/api/";

var APIConfig = {
  Base: {
    GetUserInit: BaseUrl + "base/GetUserInit",
    GetModule: BaseUrl + "base/GetModule",
    GetLayout: BaseUrl + "base/GetLayout",
    GetSchool: BaseUrl + "base/GetSchool",
    GetGroupUser: BaseUrl + "base/GetGroupUser",
    GetTest: BaseUrl + "base/GetTest",
    UpdateDic: BaseUrl + "base/UpdateDic",
    FileUpload: FileUrl + "api/base/FileUpload",
    Logout: BaseUrl + "base/Logout",
  },

  OptCourse: {
    GalleryCateList: BaseUrl + "OptCourse/OptCourse_List/GalleryCateList", //图库类别树
    AddGalleryCate: BaseUrl + "OptCourse/OptCourse_List/AddGalleryCate", //添加图库类别
    DeleteGalleryCate: BaseUrl + "OptCourse/OptCourse_List/DeleteGalleryCate", //删除图库类别
    EditGalleryCate: BaseUrl + "OptCourse/OptCourse_List/EditGalleryCate", //编辑图库类别
    GalleryList: BaseUrl + "OptCourse/OptCourse_List/GalleryList", //获取图库列表
    CateList: BaseUrl + "OptCourse/OptCourse_List/CateList", //课程类别树
    UserList: BaseUrl + "OptCourse/OptCourse_List/UserList", //用户下拉
    GetActiveList: BaseUrl + "OptCourse/OptCourse_List/GetActive", //场次下拉
    GetqxUserList: BaseUrl + "OptCourse/OptCourse_List/GetqxUserList", //获取用户列表
    Addquanxian: BaseUrl + "OptCourse/OptCourse_List/addquanxian", //设置用户选课管理员权限
    Deletejuese: BaseUrl + "OptCourse/OptCourse_List/Deletejuese", //权限回收
    Istruexkadmin: BaseUrl + "OptCourse/OptCourse_List/Istruexkadmin", //权限
    AddCate: BaseUrl + "OptCourse/OptCourse_List/AddCate", //添加课程类别
    EditCate: BaseUrl + "OptCourse/OptCourse_List/EditCate", //编辑课程类别
    DeleteCate: BaseUrl + "OptCourse/OptCourse_List/DeleteCate", //删除课程类别
    OptCourseDelete: BaseUrl + "OptCourse/OptCourse_List/OptCourseDelete", //删除具体课程
    OptCourseDetails: BaseUrl + "OptCourse/OptCourse_List/OptCourseDetails", //根据serid获取课程详情
    GetGradeList: BaseUrl + "OptCourse/OptCourse_List/GetGrade", //年级下拉
    GetClass: BaseUrl + "OptCourse/OptCourse_List/GetClass", //对应年级的班级下拉
    GetClassStuList: BaseUrl + "OptCourse/OptCourse_List/GetClassStuList", //获取班级学生列表
    AddStuYXOpt: BaseUrl + "OptCourse/OptCourse_List/AddStuYXOpt", //具体课程添加学生
    DeleteYXStu: BaseUrl + "OptCourse/OptCourse_List/DeleteYXStu", //删除具体课程中的学生
    OptStuList: BaseUrl + "OptCourse/OptCourse_List/OptStuList", //当前课程学生列表
    StuYXOptExport: FileUrl + "OptCourse/OptCourse_List/StuYXOptExport", //批量导入学生样表下载
    GetDroCourse: BaseUrl + "OptCourse/OptCourse_List/GetDroCourse", //获取场次课程
    OptCourseList: BaseUrl + "OptCourse/OptCourse_List/OptCourseList",
    ChangOpt: BaseUrl + "OptCourse/OptCourse_List/ChangOpt", //换课

    GetGradeClassTree: BaseUrl + "OptCourse/OptCourse_List/GetGradeClassTree",
    AddDic: BaseUrl + "OptCourse/OptCourse_List/AddDic", //添加字典
    DeleteDic: BaseUrl + "OptCourse/OptCourse_List/DeleteDic",
    ActivityList: BaseUrl + "OptCourse/OptCourse_List/ActivityList",
    ActivityDelete: BaseUrl + "OptCourse/OptCourse_List/ActivityDelete",
    ActivityDetail: BaseUrl + "OptCourse/OptCourse_List/ActivityDetails",
    ActivityCreate: BaseUrl + "OptCourse/OptCourse_List/ActivityAdd",
    ActivityEdit: BaseUrl + "OptCourse/OptCourse_List/ActivityEdit",
    UploadPicture: BaseUrl + "OptCourse/OptCourse_List/upload",
    // GetPictureList:BaseUrl+"OptCourse/OptCourse_List/GalleryList",
    DeletePicture: BaseUrl + "OptCourse/OptCourse_List/GalleryDelete",

    OldGetActive: BaseUrl + "OptCourse/OptCourse_List/OldGetActive",
    GetZYActive: BaseUrl + "OptCourse/OptCourse_List/GetZYActive",
    GetCourse: BaseUrl + "OptCourse/OptCourse_List/GetCourse",

    GetCategoryList: BaseUrl + "OptCourse/OptCourse_List/GetCategory",
    CategoryList: BaseUrl + "OptCourse/OptCourse_List/CategoryList",
    OptCourseSP: BaseUrl + "OptCourse/OptCourse_List/OptCourseSP",
    GetAcCourse: BaseUrl + "OptCourse/OptCourse_List/GetAcCourse",


    AllOptCourseList: BaseUrl + "OptCourse/OptCourse_List/AllOptCourseList",
    PcRandanceList: BaseUrl + "OptCourse/OptCourse_List/PcRandanceList", // 考勤
    AllSwitchStuList: BaseUrl + "OptCourse/OptCourse_List/AllSwitchStuList",
    SyOptCourseAdd: BaseUrl + "OptCourse/OptCourse_List/SyOptCourseAdd",

    OptCourseCreate: BaseUrl + "OptCourse/OptCourse_List/OptCourseAdd",
    OptCourseEdit: BaseUrl + "OptCourse/OptCourse_List/OptCourseEdit",

    OptCourseExport: FileUrl + "OptCourse/OptCourse_List/OptCourseExport",
    OptCourseImport: FileUrl + "OptCourse/OptCourse_List/OptCourseImport",
    OptCourseSPList: BaseUrl + "OptCourse/OptCourse_List/OptCourseSPList", //选课审批
    OptCourseSP: BaseUrl + "OptCourse/OptCourse_List/OptCourseSP",
    ManageOptStuList: BaseUrl + "OptCourse/OptCourse_List/ManageOptStuList", //选课学生
    SwitchStuList: BaseUrl + "OptCourse/OptCourse_List/SwitchStuList",

    OptCourseStuAdd: BaseUrl + "OptCourse/OptCourse_List/OptCourseStuAdd",
    OptCourseStuDelete: BaseUrl + "OptCourse/OptCourse_List/OptCourseStuDelete",

    StuYXOptImport: FileUrl + "OptCourse/OptCourse_List/StuYXOptImport",
    ClassStatics: BaseUrl + "OptCourse/OptCourse_List/ClassStatics", //全部班级的数据
    tjclasslist: BaseUrl + "OptCourse/OptCourse_List/tjclasslist", //单个班级的数据
    tbClassStatics: BaseUrl + "OptCourse/OptCourse_List/tbClassStatics",
    CourseStatistics: BaseUrl + "OptCourse/OptCourse_List/CourseStatistics",
    tbCourseStatistics: BaseUrl + "OptCourse/OptCourse_List/tbCourseStatistics",
    GetSYNumber: BaseUrl + "OptCourse/OptCourse_List/GetSYNumber",
    dcCourseStatistics: FileUrl + "OptCourse/OptCourse_List/dcCourseStatistics", //按照课程统计导出
    dcClassStatics: FileUrl + "OptCourse/OptCourse_List/dcClassStatics", //按照班级统计导出
    dctjclasslist: FileUrl + "OptCourse/OptCourse_List/dctjclasslist", //按照班级统计导出(班级筛选)
    TeaPlanStatics: BaseUrl + "OptCourse/OptCourse_List/TeaPlanStatics",
    PlanList: BaseUrl + "OptCourse/OptCourse_List/PlanList",
    PlanEdit: BaseUrl + "OptCourse/OptCourse_List/PlanEdit",
    PlanAdd: BaseUrl + "OptCourse/OptCourse_List/PlanAdd",
    tbTeaPlanStatics: BaseUrl + "OptCourse/OptCourse_List/tbTeaPlanStatics",
    AttendanceStuList: BaseUrl + "OptCourse/OptCourse_List/AttendanceStuList",
    RecordAttendance: BaseUrl + "OptCourse/OptCourse_List/RecordAttendance",
    DeleteAttendance: BaseUrl + "OptCourse/OptCourse_List/DeleteAttendance",
    Auto_SelStu: BaseUrl + "OptCourse/OptCourse_List/Auto_SelStu",
    SelStuDelete: BaseUrl + "OptCourse/OptCourse_List/SelStuDelete",
    AttendanceStatistics: BaseUrl + "OptCourse/OptCourse_List/AttendanceStatistics",
    GetAllWeek: BaseUrl + "OptCourse/OptCourse_List/GetAllWeek",
    DeletePlan: BaseUrl + "OptCourse/OptCourse_List/DeletePlan",
    Actikaiguan: BaseUrl + "OptCourse/OptCourse_List/Actikaiguan", //场次管理 是否显示 按钮切换
  },

  statistics: {
    //课程统计
    GetSchYear: BaseUrl + "OptCourse/OptCourseStatics_List/GetSchYear", //获取学年
    GetYearAct: BaseUrl + "OptCourse/OptCourseStatics_List/GetYearAct", //获取学年下的场次
    ActivityDetails: BaseUrl + "OptCourse/OptCourseStatics_List/ActivityDetails", //场次详情接口
    GetTJData: BaseUrl + 'OptCourse/OptCourseStatics_List/GetTJData', //头部场次下的数量统计
    CateList: BaseUrl + 'OptCourse/OptCourse_List/CateList', //课程类别 树
    GetGrade: BaseUrl + 'OptCourse/OptCourse_List/GetGrade', //年级下拉
    GetClass: BaseUrl + 'OptCourse/OptCourse_List/GetClass', //班级下拉
    GetActCourse: BaseUrl + 'OptCourse/OptCourseStatics_List/GetActCourse', //课程列表
    DcActCourse: BaseUrl + 'OptCourse/OptCourseStatics_List/DcActCourse', //导出
    CourseStatistics: BaseUrl + 'OptCourse/OptCourseStatics_List/CourseStatistics', //某个课程下的详情
    dcCourseStatistics: BaseUrl + 'OptCourse/OptCourseStatics_List/dcCourseStatistics', //某个课程下的详情导出
    tbCourseStatistics: BaseUrl + 'OptCourse/OptCourseStatics_List/tbCourseStatistics', //环形图接口
    ActivityEdit: BaseUrl + 'OptCourse/OptCourseStatics_List/ActivityEdit', //编辑场次时间

    // 班级统计
    GetGradeClass: BaseUrl + 'OptCourse/OptCourseStatics_List/GetGradeClass', //列表
    DCGradeClass: BaseUrl + 'OptCourse/OptCourseStatics_List/DCGradeClass', //导出
    BTClassData: BaseUrl + 'OptCourse/OptCourseStatics_List/BTClassData', //饼图
    ClassStuDetails: BaseUrl + 'OptCourse/OptCourseStatics_List/ClassStuDetails', //详情里面的list
    BTClassStuDetails: BaseUrl + 'OptCourse/OptCourseStatics_List/BTClassStuDetails', //详情里面的饼图

    //学生统计
    StuDetails: BaseUrl + 'OptCourse/OptCourseStatics_List/StuDetails', //列表list
    GetDroCourse: BaseUrl + 'OptCourse/OptCourseStatics_List/GetDroCourse', //全部课程下拉
    DcStuDetails: BaseUrl + 'OptCourse/OptCourseStatics_List/DcStuDetails', //导出
    GetActoptCourse: BaseUrl + 'OptCourse/OptCourseStatics_List/GetActoptCourse', //课程list
    ChangOpt: BaseUrl + 'OptCourse/OptCourseStatics_List/ChangOpt', //课程调整
    addChangOpt: BaseUrl + 'OptCourse/OptCourseStatics_List/addChangOpt', //增加名额调整课程

  },

  Front: {
    GetZXActInfo: BaseUrl + 'OptCourse/OptCourse_List/GetZXActInfo', //学校下最新一条场次信息
    GetSchYear: BaseUrl + 'OptCourse/OptCourse_List/GetSchYear', //学年下拉
    IndexCourseList: BaseUrl + 'OptCourse/OptCourse_List/IndexCourseList', //全部课程列表
    AddBroRecord: BaseUrl + 'OptCourse/OptCourse_List/AddBroRecord', //记录浏览
    RmCourseInfo: BaseUrl + 'OptCourse/OptCourse_List/RmCourseInfo', //热门课程列表
    OptCourseDetails: BaseUrl + 'OptCourse/OptCourse_List/OptCourseDetails', //课程详情
    IstrueStuorTea: BaseUrl + 'OptCourse/OptCourse_List/IstrueStuorTea', //判断跳转学生选课还是选课管理的
    GetUserInfo: BaseUrl + 'OptCourse/OptCourse_List/GetUserInfo', //获取用户信息

  }

}



export {
  APIConfig
}
