<template>
    <section class="section-padding d-flex align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-6 col-xl-5">
                <div class="card card-adjust">
                    <div class="pb-0 card-header text-start">
                        <div class="m-auto navbar-brand text-center small-logo">
                            <img src="@/assets/img/synergy_putih.png" class="" alt="main_logo" />
                        </div>
                    <p class="mb-0">Silahkan pilih coverage terlebih dahulu</p>
                    </div>
                    <div class="card-body">
                        <label>Coverage Code</label>
                        <div>
                            <select v-model="coverageSelected" name="coverage" id="coverage" class="form-control border-input-bottom" required>
                                <option
                                    v-for="item in coverage"
                                    v-bind:key="item._id"
                                    v-bind:value="item">
                                    {{ item.policy_no }}
                                </option>
                            </select>
                        </div>
                        <div class="text-note text-danger mt-2" v-if="showMessage">
                            Silahkan pilih coverage terlebih dahulu!
                        </div>
                        <div class="text-center" @click="selectCoverage">
                            <button class="btn bg-gradient-success btn-md w-100 null my-4 mb-2">
                                Pilih
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return{
            coverage:'',
            coverageSelected:'',
            showMessage:false
        }
    },
    async created() {
        let defaultCoverage = {
            company_data:{},
            company_coverage_data:{}
        }

        var dataCoverage = await this.$apiController('get', '/human_resource/get_coverage')
        .catch(err=>console.log(err))
        
        this.coverage = dataCoverage !== undefined && dataCoverage.is_ok == true ? dataCoverage.data.company_coverage_data : defaultCoverage;
        console.log('cov', this.coverage)
    },
    methods: {
        selectCoverage(){
            if(this.coverageSelected !== null && this.coverageSelected !== ''){
                let coverage = {
                    id:this.coverageSelected._id,
                    policy:this.coverageSelected.policy_no
                }

                localStorage.setItem('coverage', JSON.stringify(coverage));
                this.$router.push('/dashboard')
            } else {
                this.showMessage = true             
            }
        }
    },
}
</script>

<style>

</style>