<template>
  <div>
    <section class="section-padding d-flex align-items-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-6 col-xl-5">
              <div class="card card-adjust">
                <div class="pb-0 card-header text-start">
                    <div class="m-auto navbar-brand text-center small-logo">
                        <img src="@/assets/img/synergy_putih.png" class="" alt="main_logo" />
                    </div>
                  <p class="mb-0">Silahkan masukkan Email dan Password Anda untuk Login!</p>
                </div>
                <div class="card-body">
                    <label>Email</label>
                    <div class="form-group">
                        <input
                            id="email"
                            type="email"
                            class="form-control"
                            name="email"
                            placeholder="Silahkan masukkan email"
                            v-model="userEmail"
                            required
                        />
                    </div>
                    <label>Password</label>
                    <div class="form-group">
                        <input
                            id="password"
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Silahkan masukkan password"
                            v-model="password"
                            required
                        />
                    </div>
                    <div class="text-note text-danger" v-if="showMessage">
                        Email atau Password Anda salah!
                    </div>
                    <div class="text-center">
                      <button class="btn bg-gradient-success btn-md w-100 null my-4 mb-2" @click="login">
                          Login
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  </div>
</template>

<script>

export default {
    data() {
        return {
            userEmail:'',
            password:'',
            showMessage:false
        }
    },
    methods: {
        async login() {
            if (this.userEmail !== '' && this.password !== '') {
                var response = await this.$apiController('post', '/human_resource/auth',{
                    "email":this.userEmail,
                    "password":this.password
                });
                if(response.is_ok){
                    this.$auth.setToken(response.data.token);
                    if (this.$auth.getToken() != null){
                        this.$emit('loggedIn')
                        this.$router.push('/select-coverage');
                    }
                    this.showMessage = true
                }else {
                    this.showMessage = true             
                }
            }
        }
    },
};
</script>
