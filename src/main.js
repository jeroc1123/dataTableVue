// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"; 
import App from "./App";
import vuetify from "@/plugins/vuetify";
import DataTable from "@andresouzaabreu/vue-data-table";
import "@andresouzaabreu/vue-data-table/dist/DataTable.css";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;

Vue.component("data-table", DataTable);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  vuetify
});
