import Vue from "vue"
import VueRouter from "vue-router"

import Login from "@/pages/Login"
import SelectCoverage from "@/pages/SelectCoverage"
import Dashboard from "@/pages/Dashboard"
import Deposit from "@/pages/Deposit"
import Contract from "@/pages/Contract"
import Participant from "@/pages/Participant"
import Provider from "@/pages/Provider"

Vue.use(VueRouter)
var router = new VueRouter({
    mode:'hash',
    linkActiveClass: "active",
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login,
        },
        {
            path: "/select-coverage",
            name: "SelectCoverage",
            component: SelectCoverage
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard,
            meta:{
                requiresAuth:true
            }
        },
        {
            path: "/deposit",
            name: "Deposit",
            component: Deposit,
            meta:{
                requiresAuth:true
            }
        },
        {
            path: "/contract",
            name: "Contract",
            component: Contract,
            meta:{
                requiresAuth:true
            }
        },
        {
            path: "/participant",
            name: "Participant",
            component: Participant,
            meta:{
                requiresAuth:true
            }
        },
        {
            path: "/provider",
            name: "Provider",
            component: Provider,
            meta:{
                requiresAuth:true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (Vue.prototype.$auth.getToken() == null) {
            next({
                path: '/',
                params: { nextUrl: to.fullPath }
            })
        } else {
          next();
        }
    } else {
      next();
    }
})

export default router