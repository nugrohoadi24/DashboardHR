<template>
    <div>
        <Loading v-if="loading"/>
        <div class="py-4 container-fluid" v-if="dataAvailable">
            <div class="row">
                <div class="col-xl-3 col-sm-12 px-2">
                    <div class="mb-4 card card-adjust">
                        <div class="p-3 card-body d-xl-flex justify-content-between">
                            <div class="d-flex justify-content-between">
                                <div class="mr-3">
                                    <div class="mb-2 font-weight-bolder text-subheading">
                                    {{ coverage.coverage_participant_data.participant_total }}
                                    </div>
                                    <div class="text-sm text-description">
                                    Participant
                                    </div>
                                </div>
                            </div>
                            <div class="text-center shadow icon icon-shape bg-gradient-blue d-flex">
                                <img src="@/assets/img/icon/participant.png" alt="participant" class="m-auto">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-sm-12 px-2">
                    <div class="mb-4 card card-adjust">
                        <div class="p-3 card-body d-xl-flex justify-content-lg-between">
                            <div class="d-flex justify-content-between mb-2 mb-xl-0">
                                <div class="mr-3">
                                    <div class="mb-2 font-weight-bolder text-subheading">
                                    {{ coverage.coverage_participant_data.participant_total_employee_main }}
                                    </div>
                                    <div class="text-sm text-description">
                                    Employee
                                    </div>
                                </div>
                                <div>
                                    <div class="text-center shadow icon icon-shape bg-gradient-blue d-flex">
                                        <img src="@/assets/img/icon/employee.png" alt="employee" class="m-auto">
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between mb-2 mb-xl-0">
                                <div class="mr-3">
                                    <div class="mb-2 font-weight-bolder text-subheading">
                                    {{ coverage.coverage_participant_data.participant_total_spouse }}
                                    </div>
                                    <div class="text-sm text-description">
                                    Spouse
                                    </div>
                                </div>
                                <div>
                                    <div class="text-center shadow icon icon-shape bg-gradient-blue d-flex">
                                        <img src="@/assets/img/icon/spouse.png" alt="spouse" class="m-auto">
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="mr-3">
                                    <div class="mb-2 font-weight-bolder text-subheading">
                                    {{ coverage.coverage_participant_data.participant_total_child }}
                                    </div>
                                    <div class="text-sm text-description">
                                    Child
                                    </div>
                                </div>
                                <div>
                                    <div class="text-center shadow icon icon-shape bg-gradient-blue d-flex">
                                        <img src="@/assets/img/icon/child.png" alt="child" class="m-auto">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-12 px-2">
                    <div class="mb-4 card card-adjust">
                        <div class="p-3 card-body d-xl-flex justify-content-between">
                            <div class="d-flex justify-content-between">
                                <div class="mr-3">
                                    <div class="mb-2 font-weight-bolder text-subheading">
                                    {{ coverage.coverage_claim_data.claim_cases }}
                                    </div>
                                    <div class="text-sm text-description">
                                    Claim Cases
                                    </div>
                                </div>
                            </div>
                            <div class="text-center shadow icon icon-shape bg-gradient-blue d-flex">
                                <img src="@/assets/img/icon/claim-cases.png" alt="claim" class="m-auto">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-md-6 mb-4 mb-sm-0">
                    <div class="card card-adjust">
                        <div class="card-body p-3">
                            <PieChart
                                id="chart-pie"
                                title="Claim Method"
                                description="Data show in percentage"
                                :chart="{
                                labels: claim_method_label,
                                datasets: [
                                    {
                                        data: claim_method_percentage,
                                    },
                                ],
                                }"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-4 mb-sm-0">
                    <div class="card card-adjust">
                        <div class="card-body p-3">
                            <Doughnut
                                id="doughnut-pie"
                                title="Claimed Products"
                                description="Data show in total"
                                :chart="{
                                labels: coverage_product_label,
                                datasets: [
                                    {
                                        data: coverage_product_percentage,
                                    },
                                ],
                                }"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row text-center">
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card card-adjust h-150">
                        <div class="card-body p-3">
                            <div class="p-3 text-color-blue mb-2">
                                <i class="far fa-credit-card fa-lg icon-large"></i>
                            </div>
                            <div class="text-subheading">
                                Rp. {{ number(coverage.coverage_deposit.deposit_amount) }}
                            </div>
                            <div class="text-description">
                                Deposited Amount
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card card-adjust h-150">
                        <div class="card-body p-3">
                            <div class="text-subheading">
                                Rp. {{ number(coverage.coverage_deposit.deposit_remaining) }}
                            </div>
                            <div class="text-description">
                                Remaining Deposit
                            </div>
                            <hr>
                            <div class="text-subheading">
                                {{ percentage(coverage.coverage_deposit.deposit_remaining_percentage) }}%
                            </div>
                            <div class="text-description">
                                of Deposied Amount
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card card-adjust h-150">
                        <div class="card-body p-3">
                            <div class="p-3 text-color-blue mb-2">
                                <i class="far fa-file-alt fa-lg icon-large"></i>
                            </div>
                            <div class="text-subheading">
                                Rp. {{ number(coverage.coverage_claim_data.claim_total_ammount) }}
                            </div>
                            <div class="text-description">
                                Processed Claim Amount
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card card-adjust h-150">
                        <div class="card-body p-3">
                            <div class="text-subheading">
                                Rp. {{ number(coverage.coverage_claim_data.claim_approved_amount) }}
                            </div>
                            <div class="text-description">
                                Approved Claim Amount
                            </div>
                            <hr>
                            <div class="text-subheading">
                                {{ percentage(coverage.coverage_claim_data.claim_approved_percentage) }}%
                            </div>
                            <div class="text-description">
                                of Processed Claimed Amount
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Doughnut from "@/components/chart/DoughnutChart"
import PieChart from "@/components/chart/PieChart"

export default {
    components: {
        Doughnut,
        PieChart
    },
    data(){
        return {
            loading: true,
            dataAvailable:false,
            coverage:{},
            claim_method_label:[],
            claim_method_percentage:[],
            coverage_product_label:[],
            coverage_product_percentage:[],
        }
    },
    async created() {
        let localCoverage = JSON.parse(localStorage.getItem("coverage"));

        if (localCoverage !== null && localCoverage !== undefined ) {
            var coverageId = localCoverage.id;
        } else {
            this.$router.push('/select-coverage');
        }

        let defaultCompany = {
            company_data:{},
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

        var getDataMethod = this.coverage.coverage_recap_claim_data
        getDataMethod.forEach(item => {
            this.claim_method_label.push(item.claim_name)
            this.claim_method_percentage.push(item.claim_percentage)
        })

        var getDataProduct = this.coverage.coverage_product
        getDataProduct.forEach(item => {
            if(item.product_total_claim !== 0){
                this.coverage_product_label.push(item.product_type)
                this.coverage_product_percentage.push(item.product_total_claim)
            }
        })
        this.loading = false;
    },
    methods: {
        number(value){
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        percentage(value){
            if(value !== 100){
                let val = (Math.round(value * 100) / 100).toFixed(2);
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            } else {
                return value
            }
        }
    }
}
</script>

<style>

</style>