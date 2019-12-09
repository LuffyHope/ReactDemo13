import axios from 'axios';

/*请求合并只出现一次loading*/
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    loading('start'); /*loading加载*/
  }
  console.log('------------------------------start');
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  console.log('------------------------------end');
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
    console.log('------------loading start');
  } else if (str == 'end') {
    console.log('------------loading end');
  }
}
/*请求拦截*/
axios.interceptors.request.use(
  config => {
    const token = '123412';
    config.baseURL = 'https://jsonplaceholder.typicode.com/';
    config.timeout = 5000;
    config.headers['TOKEN'] = token;
    if (config.showLoading) {
      showFullScreenLoading();
    }
    console.log('------------------------config', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
/*请求响应拦截*/
axios.interceptors.response.use(
  response => {
    if (response.config.showLoading) {
      tryHideFullScreenLoading();
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, config = {showLoading: true}) {
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

export function post(url, data = {}, config = {showLoading: true}) {
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
