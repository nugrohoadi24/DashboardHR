<template>
    <nav
        class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl px-0 mx-4 mt-4 px-0 mx-4 mt-4"
        id="navbarBlur"
        data-scroll="true"
        v-if="dataAvailable"
    >
        <div class="px-3 py-1 container-fluid">
            <nav>
                <ol class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb">
                    <li class="text-sm breadcrumb-item active">
                        Pages / {{ currentRouteName }}
                    </li>
                </ol>
                <h6 class="mb-0 font-weight-bolder">
                    {{ currentRouteName }}
                </h6>
            </nav>
            <div class="mt-2 text-description">
                <div class="mb-1">{{ coverage.company_data.company_name }}</div>
                <div class="font-weight-bolder">COVERAGE NUMBER : {{ coverage.coverage_data.coverage_number }}</div>
            </div>
            <div class="mt-2 text-description">
                <div class="mb-1">COVERAGE PERIOD : {{ coverage.coverage_data.coverage_period }}</div>
                <div class="font-weight-bolder">EXPIRING IN {{ coverage.coverage_data.coverage_expired_in }}</div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data(){
        return {
            coverage:{},
            dataAvailable:false,
            nowRoute:''
        }
    },
    async created() {
        let localCoverage = JSON.parse(localStorage.getItem("coverage"));

        if (localCoverage !== null && localCoverage !== undefined ) {
            var coverageId = localCoverage.id;
        }

        let defaultCompany = {
            company_data:{
                company_name:''
            },
            coverage_data:{},
            coverage_participant_data:{},
            coverage_claim_data:{},
            coverage_deposit:{}
        }

        var dataCompany = await this.$apiController('get', `/human_resource/get_coverage/stats/${coverageId}`)
        .catch(err=>console.log(err))

        if(dataCompany !== undefined || dataCompany.is_ok == true){
            this.dataAvailable = true;
        } else {
            this.dataAvailable = false;
        }

        this.coverage = dataCompany !== undefined && dataCompany.is_ok == true ? dataCompany.data : defaultCompany;
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    },
}
</script>

<style>

</style>