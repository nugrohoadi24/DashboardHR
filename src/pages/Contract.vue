<template>
    <div class="py-4 container-fluid">
        <div class="row mb-4">
            <div class="col-12 mb-4 mb-sm-0">
                <div class="card card-adjust">
                    <div class="card-body p-3 d-flex justify-content-between align-items-center">
                        <div>
                            <div class="text-subheading">
                                Name Company: {{ contract.name }}
                            </div>
                            <div class="text-subheading">
                                Code Compant: {{ contract.code }}
                            </div>
                        </div>
                        <div>
                            <div class="text-subheading">
                                Status
                            </div>
                            <div class="text-heading text-success">
                                {{ contract.is_active }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 mb-4 mb-sm-0">
                <div class="card card-adjust">
                    <div class="card-header pb-2">
                        <div class="text-subheading">
                            Document
                        </div>
                    </div>
                    <div class="card-body p-3" v-if="contract.company_attachement.length > 0">
                        <div class="row">
                            <div class="col-6 doc-thumbnail mb-5 text-center" v-for="item in contract.company_attachement" :key="item._id">
                                <a :href="baseURL + item.path + '?token=' + token" target="_blank">
                                    <img src="@/assets/img/pdf.png" :alt="item.name" :name="item.name">
                                </a>
                                <div class="mt-3">
                                    <div class="text-description">
                                        Name Document: <strong>{{ item.name }}</strong>
                                    </div>
                                    <div class="text-description">
                                        Type Document: <strong>{{ item.type }}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-3" v-else>
                        <div class="row">
                            <div class="col-12 mb-5">
                                <div class="text-subheading text-center">
                                    Tidak ada dokumen
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            contract:{},
            baseURL:process.env.VUE_APP_DOCUMENT_URL,
            token: this.$auth.getToken(),
        }
    },
    async created() {
        let defaultContract = {
            _id:'',
            name:'',
            code:'',
            is_active:'',
            company_attachement:[]
        }

        var dataContract = await this.$apiController('get', '/human_resource/detail_contract')
        .catch(err=>console.log(err))
        
        this.contract = dataContract !== undefined && dataContract.is_ok == true ? dataContract.data : defaultContract;

        if(this.contract.is_active == true) {
            this.contract.is_active = 'ACTIVE'
        } else {
            this.contract.is_active = 'EXPIRED'
        }
    },
}
</script>

<style>

</style>