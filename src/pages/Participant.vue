<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <DataTables ref="dataTable" 
                    v-bind:title="title"  
                    v-bind:tableData="tableData"  
                    v-bind:fields="fields" 
                    v-on:loadItems="loadItems"
                    :search="search">  

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
export default {
    data () {
      return {
        title:"Data Participant",
        loading: false,
        fields: [
          { key: 'user.nama', label:"NAMA USER", sortable: true},
          { key: 'nama_tertanggung', label:"NAMA PARTICIPANT", sortable: true},
          { key: 'dob_tertanggung', label:"TANGGAL LAHIR", date:true},
          { key: 'card_no', label:"CARD NO", sortable: true},
          { key: 'certificate_no', label:"CERTIFICATE NO", sortable: true},
          { key: 'policy_date', label:"POLICY DATE", sortable: true, date:true},
          { key: 'policy_end_date', label:"END DATE", sortable: true, date:true},
          { key: 'insurance_product.name', label:"PRODUCT", sortable: true},
          { key: 'plan_name', label:"PLAN", sortable: true},
          { key: 'status_polis', label:"STATUS", sortable: false},
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
          page:1,
          pages:1,
          total:0,
          limit:10,
          docs: [
          ]
        },
        currentData:{},
        search:"",
      }
    },
    async created () {
      var page = this.$route.query.p;
      var limit = this.$route.query.l;
      var search = this.$route.query.s;

      this.loadItems(page?page:1,limit?limit:10,search?search:"");
    },
    methods: {
      async loadItems(page,limit,search){
        let localCoverage = JSON.parse(localStorage.getItem("coverage"));

        if (localCoverage !== null && localCoverage !== undefined ) {
            var coveragePolicy = localCoverage.policy;
        } else {
            this.$router.push('/select-coverage');
        }

        this.search = search;
        this.$router
          .replace({ query: { ...this.$route.query, p:page, l:limit, s:search} })
          .catch(() => {});

        this.$emit('showLoading', true);
        var response = await this.$apiController('get', `/human_resource/list_participant/${coveragePolicy}?page=${page}&perpage=${limit}&searchquery=${search}`);

        this.$emit('showLoading', false);
        if(response.is_ok){
          this.tableData = response.data

          var getProductType = this.tableData.docs
          getProductType.forEach(item => {
            if(item.insurance_product.product_type == "1") {
              item.insurance_product.product_type = "SALVUSCARE"
            } else {
              item.insurance_product.product_type = "INSURANCE CLAIM"
            }
          })
        }else {
          this.$emit('showAlert',response.message, "danger");                        
        }
      },
    }
}
</script>

<style>

</style>