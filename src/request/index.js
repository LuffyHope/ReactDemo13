import axios from 'axios';
import Loading from '../LoadView/index';

/*请求合并只出现一次loading*/
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    loading('start'); /*loading加载*/
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    setTimeout(tryCloseLoading, 300); /*300ms 间隔内的 loading 合并为一次*/
  }
}
const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    loading('end'); /*loading加载*/
  }
};
/*loading加载*/
function loading(str) {
  if (str == 'start') {
    Loading.show();
  } else if (str == 'end') {
    Loading.hide();
  }
}
/*请求拦截*/
axios.interceptors.request.use(
  async function(config) {
    const token = '123412';
    config.baseURL = 'https://jsonplaceholder.typicode.com/';
    config.timeout = 2;
    config.headers['TOKEN'] = token;
    if (config.showLoading) {
      showFullScreenLoading();
    }
    console.log('------------------------request');
    return config;
  },
  error => {
    console.log('------------------------request error ',error);
    return Promise.reject(error);
  },
);
/*请求响应拦截*/
axios.interceptors.response.use(
  response => {
    console.log('------------------------response');
    if (response.config.showLoading) {
      tryHideFullScreenLoading();
    }
    return response;
  },
  error => {
    var errorMsg;
    console.log('------------------------response error',error);
    if (error.config.showLoading) {
      tryHideFullScreenLoading();
    }
    Loading.hide();

    const {response,request} = error;
    if(response){
      errorMsg=error
    }else if(request._timedOut){
      errorMsg="网络超时"
    }else {
      errorMsg="网络异常"
    }
    return Promise.reject(errorMsg);
  },
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, config = {showLoading: false}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, config)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, config = {showLoading: false}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// const request = function(url, params, config, method) {
//   return new Promise((resolve, reject) => {
//     axios[method](url, params,  config)
//       .then(
//         response => {
//           resolve(response.data);
//         },
//         err => {
//           if (err.Cancel) {
//             console.log(err);
//           } else {
//             reject(err);
//           }
//         },
//       )
//       .catch(err => {
//         reject(err);
//       });
//   });
// };

// const post = (url, params, config = {showLoading: true}) => {
//   return request(url, params, config, 'post');
// };

// const get = (url, params, config) => {
//   return request(url, params, config, 'get');
// };

// export {post, get};
