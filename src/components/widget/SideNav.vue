<template>
    <aside
        class="my-3 ml-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl fixed-start"
        id="sidenav-main"
    >
        <div class="sidenav-header">
            <i
                class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
                aria-hidden="true"
                id="iconSidenav"
            ></i>
            <a class="m-0 navbar-brand text-center" href="/">
                <img src="@/assets/img/synergy_putih.png" class="navbar-brand-img medium-logo h-100" alt="main_logo" />
            </a>
        </div>
        <hr class="mt-0" />
        <div
            class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
            id="sidenav-collapse-main"
        >
            <ul class="navbar-nav py-2">
                <li class="nav-item">
                    <router-link class="nav-link" to="/dashboard">
                        <div class="text-center bg-white nav-shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center">
                            <i class="fas fa-store"></i>
                        </div>
                        <span class="nav-link-text ml-2">
                            Dashboard
                        </span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/participant">
                        <div class="text-center bg-white nav-shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center">
                            <i class="fas fa-users"></i>
                        </div>
                        <span class="nav-link-text ml-2">
                            Active Certificates
                        </span>
                    </router-link>
                </li>
                <!-- <li class="nav-item">
                    <router-link class="nav-link" to="/product">
                        <div class="text-center bg-white nav-shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <span class="nav-link-text ml-2">
                            Product & Plan
                        </span>
                    </router-link>
                </li> -->
                <li class="nav-item">
                    <router-link class="nav-link" to="/deposit">
                        <div class="text-center bg-white nav-shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center">
                            <i class="fas fa-credit-card"></i>
                        </div>
                        <span class="nav-link-text ml-2">
                            Deposit
                        </span>
                    </router-link>
                </li>
                <!-- <li class="nav-item">
                    <router-link class="nav-link" to="/report">
                        <div class="text-center bg-white nav-shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <span class="nav-link-text ml-2">
                            Report
                        </span>
                    </router-link>
                </li> -->
                <li class="nav-item">
                    <router-link class="nav-link" to="/contract">
                        <div class="text-center bg-white nav-shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center">
                            <i class="fas fa-hands-helping"></i>
                        </div>
                        <span class="nav-link-text ml-2">
                            Contract
                        </span>
                    </router-link>
                </li>
                <!-- <li class="nav-item">
                    <router-link class="nav-link" to="/invoice">
                        <div class="text-center bg-white nav-shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <span class="nav-link-text ml-2">
                            Invoice
                        </span>
                    </router-link>
                </li> -->
                <li class="nav-item">
                    <router-link class="nav-link" to="/provider">
                        <div class="text-center bg-white nav-shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center">
                            <i class="fas fa-tools"></i>
                        </div>
                        <span class="nav-link-text ml-2">
                            Provider
                        </span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/select-coverage">
                        <div class="text-center bg-white nav-shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center">
                            <i class="fas fa-cog"></i>
                        </div>
                        <span class="nav-link-text ml-2">
                            Setting
                        </span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="doLogout">
                        <div class="text-center bg-white nav-shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center">
                            <i class="fas fa-sign-out-alt"></i>
                        </div>
                        <span class="nav-link-text ml-2">
                            Logout
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            isActive: "active",
        }
    },
    methods: {
        doLogout(){
            this.$auth.removeToken();
            localStorage.removeItem('coverage');
            this.$router.push('/')
        }
    }

}
</script>

<style>
.navbar-main {
    transition: box-shadow 0.25s ease-in, background-color 0.25s ease-in;
}
</style>