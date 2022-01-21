import Vue from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faCross,
  faTrash,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faUserSecret, faCross, faTrash, faCheck, faTimes]);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import router from "./router/router";
import store from "./store/store";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
