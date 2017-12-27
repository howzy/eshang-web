/**
 * Created by zhouhao on 2017/04/24.
 */
import axios from 'axios'
import config from './config'

// axios(config);
export class AXIOS {
  constructor() {

  }
  //获取已授权列表
  // get(param) {
  //   config.data.strSQL = param.param;
  //   return axios.get(param.api,{ params: param.param },config);
  // }
  get (param) {
    let url = 'http://eshang.imwork.net:6060/HighWay/Handler/handler_ajax.ashx';
    return axios.get(url, { params: param });
  }
  post(param) {
    config.data.strSQL = param.param;
    return axios.post(param.api,{},config);
  }
  reqSuccess(obj,msg){

  }
  reqFail(obj,msg){

  }
}
export default AXIOS;
