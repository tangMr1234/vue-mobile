import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(["@/views/Login.vue"], resolve); // 登录
const NotFound = resolve => require(["@/views/404.vue"], resolve); // 错误404
const Home = resolve => require(["@/views/Home.vue"], resolve); // 主页面框架

const Cart = resolve => require(["@/views/public/Cart.vue"], resolve); // 购物车
const Left_Tab = resolve => require(["@/views/public/Left_Tab.vue"], resolve); // 左侧tab型(疫苗档案首页)
const Table_Form = resolve => require(["@/views/public/Table_Form.vue"], resolve); // 表格+表单型详情
const CardList = resolve => require(["@/views/public/Card_List.vue"], resolve); // 卡片式列表
const List = resolve => require(["@/views/public/List.vue"], resolve); // 列表
const bdMap = resolve => require(["@/views/public/bdMap.vue"], resolve); // 地图
const Form = resolve => require(["@/views/public/Form.vue"], resolve); // 修改设置页面
const Article = resolve => require(["@/views/public/Article.vue"], resolve); // 文章详情

const Index = resolve => require(["@/views/Main/Index.vue"], resolve); // 首页
const Message = resolve => require(["@/views/Main/Message.vue"], resolve); // 消息
const User = resolve => require(["@/views/Main/User.vue"], resolve); // 我的
const More = resolve => require(["@/views/Main/More.vue"], resolve); // 更多
const AboutUs = resolve => require(["@/views/Main/More/AboutUs.vue"], resolve); // 关于我们
const MorePublic = resolve => require(["@/views/Main/More/MorePublic.vue"], resolve); // 更多里的公用页面
const Help = resolve => require(["@/views/Main/More/Help.vue"], resolve); // 更多里的帮助页面
const FeedBack = resolve => require(["@/views/Main/More/FeedBack.vue"], resolve); // 更多里的意见反馈


const Realtime = resolve => require(["@/views/Main-cold/realtime/Index.vue"], resolve); // 实时温湿度的首页
const Alarm = resolve => require(["@/views/Main-cold/alarm/Index.vue"], resolve); // 预警管理的首页
const Vehicle = resolve => require(["@/views/Main-cold/vehicle/Index.vue"], resolve); // 车辆监测
const AppStore = resolve => require(["@/views/Other/appstore/Recommend.vue"], resolve); // AppStore应用中心

const Details = resolve => require(["@/views/Main-cold/realtime/Details.vue"], resolve); // 详情
const Grid = resolve => require(["@/views/Main-cold/realtime/Grid.vue"], resolve); // 详情
const Curve = resolve => require(["@/views/Main-cold/realtime/Curve.vue"], resolve); // 详情
const TabHome = resolve => require(["@/views/TabHome.vue"], resolve); // 详情

// const Box = resolve => require(["@/views/Main-cold/box/Index.vue"], resolve); // 保温箱监测
// const Fridges = resolve => require(["@/views/Other/library/fridges/Fridges.vue"], resolve); // 疫苗博物馆
const Manufacturer = resolve => require(["@/views/Other/library/museum/Manufacturer.vue"], resolve); // 医用冰箱馆

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '错误界面',
      hidden: true
    },
    {
      path: '*',
      name: '404',
      hidden: true,// 隐藏，在菜单中不显示
      redirect: {path: '/404'}
    },
    {
      path: '/',
      name: '主页面',
      component: Home,
      redirect: {path: home_index},  //config里面的配置
      children: [
        {
          path: '/home/index/:url',
          component: Index,
          NewRouter: 'index',
          name: '首页',
          icon: 'icon-shouye',
          meta: {tabbar: true, keepAlive: true, header: false, headBack: false, tabbar: true}
        },
        {
          path: '/home/message/:url',
          component: Message,
          name: '消息',
          meta: {name: '消息', keepAlive: false, header: true, headBack: false, tabbar: true}
        },
        {
          path: '/home/my/:url',
          component: User,
          name: '我的',
          meta: {name: "我的", keepAlive: true, header: false, headBack: false, tabbar: true}
        },
        {
          path: '/home/more/:url',
          component: More,
          name: '更多',
          meta: {name: '更多', keepAlive: true, header: true, headBack: false, tabbar: true},
        },
        {
          path: '/home/realtime/:url',
          component: Realtime,
          name: "实时温湿度",
          meta: {name: '实时温湿度', keepAlive: true, header: false, headBack: false, tabbar: false},
        },
        {
          path: '/home/alarm/:url',
          component: Alarm,
          name: "预警管理",
          meta: {name: '预警管理', keepAlive: true, tabbar: false},
        },
        {
          path: '/home/appstore/:url',
          component: AppStore,
          name: "应用中心",
          meta: {name: '应用中心', keepAlive: true, header: true, headBack: true, tabbar: false},
        },
        {
          path: '/home/card_list/:url',
          component: CardList,
          name: "卡片列表",
          meta: {name: '用苗登记', keepAlive: true, header: false, headBack: false, tabbar: false},
        },
        {
          path: '/home/cart/:url',
          component: Cart,
          name: '购物车',
          meta: {name: '用苗登记', keepAlive: true, header: false, headBack: false, tabbar: false}
        },
        {
          path: '/home/left_tab/:url',
          component: Left_Tab,
          name: "左侧tab",
          meta: {name: '疫苗档案', keepAlive: true, header: false, headBack: false, tabbar: false},
        },
        {
          path: '/home/table_form/:url',
          component: Table_Form,
          name: "表格+表单的详情",
          meta: {name: '详情', keepAlive: false, header: true, headBack: true, tabbar: false},
        },
        {
          path: '/home/list/:url',
          component: List,
          name: "列表",
          meta: {name: '用苗登记记录', keepAlive: false, header: false, headBack: false, tabbar: false},
        },
        {
          path: '/home/bdMap/:url',
          component: bdMap,
          name: "地图",
          meta: {name: "地图", keepAlive: false, header: true, headBack: true, tabbar: false}
        },
        {
          path: '/home/form/:url',
          component: Form,
          name: "设置",
          meta: {name: "设置", keepAlive: true, header: true, headBack: true, tabbar: false}
        },
        {
          path: '/home/article/:url',
          component: Article,
          name: "文章详情",
          meta: {name: "详情", keepAlive: false, header: true, headBack: true, tabbar: false}
        },


        {
          path: '/details',
          component: TabHome,
          name: "其他详情",
          children: [
            {
              path: '/detail',
              component: Details,
              name: "表格列表",
              meta: {name: '详情', keepAlive: false, header: true, headBack: true, tabbar: false},
            },
            {
              path: '/grid',
              component: Grid,
              name: "表格grid",
              meta: {name: '详情', keepAlive: false, header: true, headBack: true, tabbar: false},
            },
            {
              path: '/curve',
              component: Curve,
              name: "曲线图",
              meta: {name: '详情', keepAlive: false, header: true, headBack: true, tabbar: false},
            },
          ]
        },
        {
          path: '/home/more/feedback',
          component: FeedBack,
          name: "意见反馈1",
          meta: {name: '意见反馈', keepAlive: true, tabbar: false},
        },
        {
          path: '/home/top_tab/:url',
          component: Manufacturer,
          name: "医用冰箱",
          meta: {name: '医用冰箱1', keepAlive: true, header: false, headBack: false, tabbar: false},
        },
      ]
    }
  ]
})
