import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Energy from "../views/Energy.vue";
import Battery from "../views/Battery.vue";
import Tokens from "../views/Tokens.vue";
import IoTs from "../views/IoTs.vue";
import Divisions from "../views/Divisions.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/energy",
    name: "Energy",
    component: Energy,
    meta: { requiresAuth: true }
  },
  {
    path: "/battery",
    name: "Battery",
    component: Battery,
    meta: { requiresAuth: true }
  },
  {
    path: "/divisions",
    name: "Divisions",
    component: Divisions,
    meta: { requiresAuth: true }
  },
  {
    path: "/tokens",
    name: "Tokens",
    component: Tokens,
    meta: { requiresAuth: true }
  },
  {
    path: "/iots",
    name: "IoTs",
    component: IoTs,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("name") != "" ? true: false;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/signin');
    } else {
      next();
    }
  } else {
    next();
  }
});


/* router.beforeEach(async (to,from,next) => {
  console.log(to)
  const body = document.getElementsByTagName("body")[0];
  if(to.path !== '/signin' && (await !store.getters.isAuthenticated)){
    store.commit('uiSignin');
    body.classList.remove("bg-gray-100");
    next('/signin')
  } else {
    store.commit('uiLogged');
    body.classList.add("bg-gray-100");
    next()
  }
}) */

export default router;
