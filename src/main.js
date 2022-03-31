import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui';
import {Button, Table, TableColumn, Dialog, Input, Alert, Pagination, Form, FormItem, Upload, MessageBox} from "element-ui"
import "./assets/style/reset.scss"
// Vue.use(ElementUI);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Alert);
Vue.use(Pagination);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Upload);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
