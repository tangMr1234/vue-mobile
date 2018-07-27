import axios from './axios';

let baseUrl = "";
if (typeof(ApiConfig) !== "undefined") {
  baseUrl = ApiConfig.url; //api域名
}

//获取菜单
export const getMenu = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Menu, {timeout: 60000}).then(res => res.data);
};

//获取消息数量
export const getMessageCount = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.MessageCount, {timeout: 60000}).then(res => res.data);
};

//公用数据获取
export const getCommon = params => {
  return axios.get(`${baseUrl}` + params, {timeout: 60000}).then(res => res.data);
};

//公用数据提交
export const postCommon = params => {
  return axios.post(`${baseUrl}` + params['url'], params['params'], {timeout: 60000}).then(res => res.data);
};





//
export const getAlarmIndexData = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Alarm_Index + "?page=" + params.page + "&search=" + params.data, {timeout: 60000}).then(res => res.data);
};

//修改密码&&设置
export const getFilter = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Main_Form, {timeout: 60000}).then(res => res.data);
};

//修改密码&&设置  提交
export const postFilter = params => {
  return axios.post(`${baseUrl}` + ApiConfig.api.Main_Form, params, {timeout: 60000}).then(res => res.data);
};


/* 实时温湿度 */
//首页数据获取
export const getRealtimeIndex = params => {
  return axios.post(`${baseUrl}` + ApiConfig.api.Realtime_Index, params, {timeout: 60000}).then(res => res.data);
};

//详情页数据获取
export const getRealtimeDetail = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Realtime_Detail + "?id=" + params, {timeout: 60000}).then(res => res.data);
};

//详情页曲线&&Grid数据获取
export const getRealtimeGridCurve = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Realtime_Grid_Curve + "?id=" + params.id + "&start_time=" + params.start_time, {timeout: 60000}).then(res => res.data);
};


/*预警管理*/
//预警管理首页数据


//预警管理详情与处理页
export const getHandledData = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Alarm_IsHandled + "?id=" + params, {timeout: 60000}).then(res => res.data);
};

//预警管理处理
export const postHandledData = params => {
  return axios.post(`${baseUrl}` + ApiConfig.api.Alarm_IsHandled, params, {timeout: 60000}).then(res => res.data);
};

//获取数据报表首页
export const getReportIndexData = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Report_IndexData, {timeout: 60000}).then(res => res.data);
};
//获取数据报表条件
export const getReportDetail = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Report_Detial + "?id=" + params, {timeout: 60000}).then(res => res.data);
};
//获取数据报表结果详情-展示类型数据
export const getReportResultType = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Report_ResultType + "?id=" + params, {timeout: 60000}).then(res => res.data);
};

//cell.vue组件页面数据获取
export const getCellData = params => {
  return axios.get('src/api/cellData.json', params).then(res => res.data);
};


//获取医用冰箱博物馆首页的侧边栏菜单
export const getFridgesIndexMenu = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Fridges_IndexMenu, {timeout: 60000}).then(res => res.data);
};
//获取医用冰箱博物馆首页的列表信息
export const getFridgesIndexList = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Fridges_IndexList, {timeout: 60000}).then(res => res.data);
};
//获取医用冰箱博物馆厂家的列表信息
export const getManufacturerData = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Fridges_ManufacturerData, {timeout: 60000}).then(res => res.data);
};


//获取疫苗博物馆首页的侧边栏菜单
export const getMuseumIndexMenu = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Museum_IndexMenu, {timeout: 60000}).then(res => res.data);
};
//获取疫苗博物馆首页的列表信息
export const getMuseumIndexList = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Museum_IndexList + "?type=" + params, {timeout: 60000}).then(res => res.data);
};
//获取疫苗博物馆疫苗的详细信息
export const getMuseumContent = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Museum_IndexContent + "?type=" + params, {timeout: 60000}).then(res => res.data);
};
//获取疫苗博物馆厂家的列表信息
export const getMuseumListData = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Museum_ManufacturerData, {timeout: 60000}).then(res => res.data);
};
//获取疫苗博物馆厂家的详细信息
export const getManuDetailData = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Museum_ManuDetailData + "?type=" + params, {timeout: 60000}).then(res => res.data);
};
//获取疫苗博物馆动态的列表信息
export const getNewData = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Museum_NewData, {timeout: 60000}).then(res => res.data);
};
//获取疫苗博物馆动态的详情信息
export const getNewDetailData = params => {
  return axios.get(`${baseUrl}` + ApiConfig.api.Museum_NewDetailData + "?type=" + params, {timeout: 60000}).then(res => res.data);
};
