import Vue from "vue";
import App from "./App.vue";
import "./index.css";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import {
  RecycleScroller,
  DynamicScroller,
  DynamicScrollerItem,
} from "vue-virtual-scroller";

import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faArrowsUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

library.add(
  faUserSecret,
  faArrowsUpDownLeftRight,
  faTrash,
  faCirclePlus,
  faSquarePlus
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(Vuesax);
Vue.component("RecycleScroller", RecycleScroller);
Vue.component("DynamicScroller", DynamicScroller);
Vue.component("DynamicScrollerItem", DynamicScrollerItem);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
