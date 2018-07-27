//配置文件，配置api的服务器地址
let ApiConfig = {
  url_demo: '', //演示的API接口地址
  url: 'https://dev4.coldyun.com', // 正式的API接口地址
  api: {
    // Menu菜单
    Menu: "/init/menu/mobile",
    MessageCount: "/init/message/check",  //获取菜单位置消息条数
    Main_Form: "/init/app/form/change_password", //获取修改设置的表单
    //预警管理API
    Alarm_Index: "/coldchain2/app/alarm", //获取预警管理首页数据
    Alarm_Filter: "/coldchain2/app/alarm/search", //获取预警管理筛选页面数据
    Alarm_IsHandled: "/coldchain2/app/alarm/view", //获取预警管理详情&&处理页面数据
    //实时温湿度API
    Realtime_Index: '/coldchain2/app/realtime', //获取实时温湿度首页
    Realtime_Filter: '/coldchain2/app/realtime/search',//获取实时温湿度筛选页面数据
    Realtime_Detail: '/coldchain2/app/realtime/view',//获取实时温湿度的详情内容
    Realtime_Grid_Curve: '/coldchain2/app/realtime/history',//获取实时温湿度的Grid和Curve折线图的内容
    //数据报表API
    Report_IndexData: '/coldchain2/app/report', //获取数据报表首页
    Report_Detial: '/coldchain2/app/report/search',//获取数据报表条件内容
    // Report_ResultData: '/coldchain2/app/5b0cb94f550fa',//获取数据报表详情
    Report_ResultType: '/coldchain2/app/report/search_result',//获取数据报表详情
    // Report_ResultType: '/coldchain2/app/report/preview',//获取报表预览模板
    //疫苗博物馆API
    Museum_IndexMenu: '/museum/app/5ae14d27531e3', //获取疫苗博物馆首页的侧边栏菜单
    Museum_IndexList: '/museum/app/5ae438e1288c2',//获取疫苗博物馆首页的列表内容
    Museum_IndexContent: '/museum/app/5ae438e1288c2',//获取疫苗博物馆疫苗的详情内容
    Museum_ManufacturerData: '/museum/app/5ae438e1288c2',//获取疫苗博物馆厂家的列表内容
    Museum_ManuDetailData: '/museum/app/5ae438e1288c2',//获取疫苗博物馆厂家的详情内容
    Museum_NewData: '/museum/app/5ae438e1288c2',//获取疫苗博物馆厂家的动态列表内容
    Museum_NewDetailData: '/museum/app/5ae438e1288c2',//获取疫苗博物馆厂家的动态详情内容
    //医用冰箱馆API
    Fridges_IndexMenu: '/library/app/5ae3f9278d114', //获取医用冰箱馆首页的侧边栏菜单
    Fridges_IndexList: '/library/app/5ae4943d39fa6',//获取医用冰箱馆首页的列表内容
    Fridges_IndexContent: '/library/app/5ae53ea6ce48a',//获取医用冰箱馆的详情内容
    Fridges_ManufacturerData: '/library/app/5af168969d792',//获取医用冰箱馆品牌的列表内容
    Fridges_ManuDetailData: '/library/app/5af177b37f3c6',//获取医用冰箱馆品牌的详情内容
    Fridges_NewData: '/library/app/5af17ecfa916b',//获取医用冰箱馆最新动态列表
  }
}

//动态加载远程iconfont
var doc = document;
var link = doc.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute("href", "//at.alicdn.com/t/font_580526_51c376gc47i.css");

var heads = doc.getElementsByTagName("head");
if (heads.length)
  heads[0].appendChild(link);
else
  doc.documentElement.appendChild(link);

//实时温湿度显示颜色
let cooler_color = "#e2d213";
let temp_color = {
  正常: "",
  高温: "red",
  低温: "blue",
  离线: "#ccc"
};
let humi_color = ["", "red", "blue", "#ccc"];

//错误码和跳转页面
const CODE_SUCCESS = 0;
const CODE_LoginException = [300, 399];
const CODE_AuthException = [400, 499];
let locationHref = ApiConfig.url + "/init/app/login/login";

//时间戳转换
function timestamp(time, n) {
  if (!n || n == "" || n <= 10) {
    return (Date.parse(time.replace(/-/g, '/')) / 1000).toString();
  }
  if (n && n != "" && n > 10) {
    return Date.parse(time.replace(/-/g, '/')).toString();
  }
}

let home_index = "/home/index/init-menu-mobile-home";  //跳转系统首页
let bdmapIcon = "//cdn-static.coldyun.net/images/icon/icon_map_point.png";
