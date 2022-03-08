import Vue from "vue"
import App from "./App.vue"
import "./index.css"
import TextareaAutosize from "vue-textarea-autosize"

import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faUserSecret,
  faCross,
  faTrash,
  faCheck,
  faRedo,
  faTimes,
  faArrowUp,
  faArrowDown,
  faPlay,
  faStop,
  faPray,
  faPlus,
  faEye,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add([
  faUserSecret,
  faCross,
  faTrash,
  faCheck,
  faTimes,
  faArrowUp,
  faArrowDown,
  faRedo,
  faPlay,
  faStop,
  faPray,
  faPlus,
  faEye,
  faAngleRight,
  faAngleLeft,
])

Vue.component("font-awesome-icon", FontAwesomeIcon)
Vue.use(TextareaAutosize)

import router from "./router/router"
import store from "./store/store"

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app")
