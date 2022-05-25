<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-6 col-md-8 my-2">
                <div class="card card-adjust h-150">
                    <div class="card-body p-3 d-flex align-items-center">
                        <div>
                          <div class="text-subheading">
                              {{ tableData.policy_data.note }}
                          </div>
                          <div class="text-subheading">
                              {{ tableData.policy_data.policy_no }}
                          </div>
                          <br>
                          <div class="text-description">
                              Policy Date: {{ isDate(tableData.policy_data.policy_date) }}
                          </div>
                          <div class="text-description">
                              End Date: {{ isDate(tableData.policy_data.policy_end_date) }}
                          </div>
                        </div>
                    </div>
                </div>
              </div>
              <div class="col-xl-6 col-md-4 my-2">
                  <div class="card card-adjust h-150">
                      <div class="card-body p-3 d-flex justify-content-between">
                          <div>
                            <div class="text-subheading">
                                Rp. {{ number(tableData.deposit_total_amount) }}
                            </div>
                            <div class="text-description">
                                Deposit Total Amount
                            </div>
                            <hr>
                            <div class="text-subheading">
                                Rp. {{ number(tableData.deposit_remaining) }}
                            </div>
                            <div class="text-description">
                                Deposit Remaining
                            </div>
                          </div>
                          <div class="d-flex align-items-center">
                            <div>
                              <div class="text-heading">
                                  {{ percentage(tableData.deposit_remaining_percentage) }}%
                              </div>
                              <div class="text-description">
                                  Percentage
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
            <div class="col-12">
              <DataTables ref="dataTable" 
                  v-bind:title="title"  
                  v-bind:tableData="tableData"  
                  v-bind:fields="fields" 
                  v-on:loadItems="loadItems"
                  >  

                  <template v-slot:headerbar>
                      <div style="padding-left:20px">
                      <b-form-radio-group
                          v-model="selectedStatus"
                          button-variant="outline-primary"
                          size="sm"
                          name="radio-btn-outline"
                          @change="statusChange"
                          buttons/>      
                      </div>
                  </template>
              </DataTables>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data () {
      return {
        title:"Data Deposit",
        loading: false,
        fields: [
          { key: 'note', label:"Nama Deposit", sortable: true},
          { key: 'amount', label:"Jumlah", sortable: true, number:true},
          { key: 'transaction_date', label:"Tanggal Deposit", sortable: true, date:true},
        ],
        selectData:{
          page:1,
          pages:1,
          total:0,
          limit:10,
          docs: [
          ],
        },
        tableData : {
          policy_data:{},
          page:1,
          pages:1,
          total:0,
          limit:10,
          docs: [
          ]
        },
        currentData:{},
      }
    },
    async created () {
      this.loadItems();
    },
    methods: {
      async loadItems(){
        let localCoverage = JSON.parse(localStorage.getItem("coverage"));

        if (localCoverage !== null && localCoverage !== undefined ) {
            var coverageId = localCoverage.id;
        } else {
            this.$router.push('/select-coverage');
        }

        this.$router
          .replace({ query: { ...this.$route.query} })
          .catch(() => {});

        this.$emit('showLoading', true);
        var response = await this.$apiController('get', `/human_resource/deposit/${coverageId}`);

        this.$emit('showLoading', false);
        if(response.is_ok){
          this.tableData = response.data
        }else {
          this.$emit('showAlert',response.message, "danger");                        
        }
      },
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
      },
      isDate(date) {
        return moment(date).format('DD MMM YYYY');
      },
    }
}
</script>

<style>

</style>