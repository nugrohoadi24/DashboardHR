<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <DataTables ref="dataTable" 
                    v-bind:title="title"  
                    v-bind:tableData="tableData"  
                    v-bind:fields="fields" 
                    v-on:loadItems="loadItems"
                    :search="search"
                    :typeProvider="typeProvider">  

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
        title:"Data Provider",
        loading: false,
        fields: [
          { key: 'code', label:"Code", sortable: true},
          { key: 'name', label:"Nama Provider", sortable: true},
          { key: 'type', label:"Type", sortable: true},  
          { key: 'address_complete', label:"Alamat Lengkap", sortable: true},  
          { key: 'phone1', label:"Phone", sortable: true},
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
        selectedStatus:this.$route.query.ss,
        typeProvider:""
      }
    },
    async created () {
      var page = this.$route.query.p;
      var limit = this.$route.query.l;
      var search = this.$route.query.s;
      var typeProvider = this.$route.query.type;

      this.loadItems(page?page:1,limit?limit:10,search?search:"",typeProvider?typeProvider:"ALL");
    },
    methods: {
      async loadItems(page,limit,search,typeProvider){
        this.search = search;
        this.typeProvider = typeProvider
        this.$router
          .replace({ query: { ...this.$route.query, p: page, l:limit, s:search,type:typeProvider} })
          .catch(() => {});

        this.$emit('showLoading', true);
        var response = await this.$apiController('get', `/human_resource/list_provider/${typeProvider}?page=${page}&perpage=${limit}&search=${search}`);

        this.$emit('showLoading', false);
        if(response.is_ok){
          this.tableData = response.data
        }else {
          this.$emit('showAlert',response.message, "danger");                        
        }
      },
    }
}
</script>

<style>

</style>