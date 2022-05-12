import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import axios from 'axios'
import router from './router'
import moment from 'moment'
import { BootstrapVue} from 'bootstrap-vue'

import Loading from '@/components/Loading'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/main.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

const client = axios.create({
  baseURL: process.env.VUE_APP_SERVICE_URL,
  json: true
})

Vue.prototype.$auth = {
  getToken(){
    let token = localStorage.getItem('token');
    return token;
  },

  getTokenData(){
    let token = localStorage.getItem('token');

    if (token) 
      return JSON.parse(atob(token.split('.')[1]));
    
    return null;
  },

  setToken(token){
    localStorage.setItem( 'token', token);
  },

  removeToken(){
    localStorage.removeItem("token");
  }
}

Vue.prototype.$apiController = async (method, resource, data)  => {
  // inject the accessToken for each request
  let accessToken = Vue.prototype.$auth.getToken();
  return client({
    method,
    url: resource,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(req => {
    return req.data
  }).catch(e => {
    console.log(e);
    if (e.response) {
      var msg = "";
      
      if (e.response.status === 401) {
        setTimeout(() => {
          Vue.prototype.$auth.removeToken();
          router.push('/');  
        },1000);
      }

      if(Boolean(e.response) && Boolean(e.response.data) && Boolean(e.response.data.message)) 
        msg = e.response.data.message;
      else 
        msg = e.toString();

      return {
        "is_ok":false,"message":msg,"data":null
      }
    } else if (e.request) {
      return {
        "is_ok":false,"message":"Network error " + e.toString(),"data":null
      }
    } else {
      console.log(e.response)
    }
  });
};

Vue.prototype.$apiUpload = async (method, resource, data)  => {
  let accessToken = Vue.prototype.$auth.getToken();
  return client({
    method,
    url: resource,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": 'multipart/form-data'
    }
  }).then(req => {
    return req.data
  }).catch(e => {
    var msg = "";
    if (e.response.status === 401) {
      setTimeout(() => {
        Vue.prototype.$auth.removeToken();
        router.push('login');  
      },1000);
    }

    if(Boolean(e.response) && Boolean(e.response.data) && Boolean(e.response.data.message)) 
      msg = e.response.data.message;
    else 
      msg = e.toString();
    return {
      "is_ok":false,"message":msg,"data":null
    }
  });
};

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
  }
})

Vue.component('Loading', Loading)

new Vue({
  router: Router,
  render: h => h(App),
  components: { App },
}).$mount('#app')
