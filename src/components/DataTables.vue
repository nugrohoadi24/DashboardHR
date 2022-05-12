<template>
  <div class="py-4">
    <div class="card card-adjust mb-4 p-3">
        <b-row style="margin-bottom:5px">
            <div class="col-md-4" v-if="nowRoute == 'Provider'">
                <div class="card-header px-0 pb-3">
                    <div class="text-subheading">{{this.title}}</div>
                </div>
            </div>
            <div class="col-md-8" v-else>
                <div class="card-header px-0 pb-3">
                    <div class="text-subheading">{{this.title}}</div>
                </div>
            </div>
            <div class="col-md-4 d-flex justify-content-end" v-if="nowRoute == 'Provider'">
                <div class="card-header px-0 pb-3 d-flex" @click="selectTypeProvider">
                  <div class="text-description mr-2">Type Provider</div>
                    <b-form-select id="filterRekanan" class="text-right" v-model="typeProvider" :options="options">
                        <i class="fas fa-filter"></i>
                    </b-form-select>
                </div>
            </div>
            <div class="col-md-4 d-flex justify-content-end" v-if="nowRoute !== 'Deposit'">
                <div class="card-header px-0 pb-3">
                    <table border="0px" >
                        <tr>
                            <td>
                            <b-input-group size="sm" style="width:250px">
                                <b-input-group-prepend is-text @click="loadItems(1)">
                                <i class="fas fa-search"></i>
                                </b-input-group-prepend>          
                                <b-form-input type="search" placeholder="Search" v-on:keyup.enter="loadItems(1)" v-model="search"></b-form-input>
                            </b-input-group>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </b-row>

        <div class="overflow-auto">
            <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0 mb-1">
                    <b-table
                        :sticky-header=false
                        id="my-table" 
                        :items="localTableData.docs" 
                        head-variant="light" 
                        :striped=true
                        :bordered=true
                        :fields="fields"
                        class="table mb-3 text-capitalize text-description"
                        responsive="sm">
                    </b-table>
                
                    <b-pagination
                        pills align="center"
                        v-model="localTableData.page"
                        :total-rows="total"
                        :per-page="limit"
                        limit=3
                        @change="loadItems"
                        v-if="nowRoute !== 'Deposit'"
                    />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    data () {
      return {
        loading: false,
        currentData:{},
        nowRoute:'',
        options:[
            { value: 'ALL', text:'All' },
            { value: 'RS', text:'Rumah Sakit' },
            { value: 'KLINIK', text:'Klinik' },
            { value: 'LAB', text:'Lab' },
            { value: 'OPTIK', text:'Optik' },
            { value: 'APOTEK', text:'Apotik' },
        ],
      }
    },
    props: {
      fields : {
        type: Array
      },
      tableData : {
        type: Object
      },
      title : {
        type: String
      },
      search :{
        type: String
      },
      typeProvider :{
        type: String,
        default:"ALL"
      },
      createTitle :{
        type: String,
        default:"CREATE"
      }
    },
    computed: {
      localTableData:{
        get: function () {
          return this.tableData;
        }
      },
      limit:{
        get: function () {
          if(Boolean(this.tableData.limit))
            return this.tableData.limit;
          else
            return 10;
        }
      },
      total:{
        get: function () {
          if(Boolean(this.tableData.total))
            return this.tableData.total;
          else
            return 10000000;
        }
      },
    },
    async created () {
      for(var field of this.fields) {        
        if(field.key == 'action'){
          field.tdClass = 'text-center';
          field.thClass = 'text-center columnActionStyle';
        } 
        else
          field.thClass = 'text-center';

        if(field.date){
          field.formatter= (value, key, item) => {
            if(Boolean(value))
              return moment(value).format('DD/MM/YYYY');
            else
              return "";
          }
        } else if (field.number){
          field.formatter= (value, key, item) => {
            if(Boolean(value)){
              let val = (value/1).toFixed(0).replace('.', ',')
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            else
              return "";
          }
        } else if (field.datetime){
          field.formatter= (value, key, item) => {
            if(Boolean(value))
              return moment(value).format('DD/MM/YYYY hh:mm:ss');
            else
              return "";
          }
        }
      }
    },
    mounted(){
        this.nowRoute = this.$route.name
    },
    methods: {
      async loadItems(page){
        if(this.nowRoute !== 'Provider'){
          this.$emit('loadItems', page, this.tableData.limit, this.search);
        } else if (this.nowRoute == 'Provider'){
          this.$emit('loadItems', page, this.tableData.limit, this.search, this.typeProvider);
        }
      },

      async reloadItems(){     
        if(this.nowRoute !== 'Provider'){    
          this.$emit('loadItems', this.tableData.page, this.tableData.limit, this.search);
        } else if (this.nowRoute == 'Provider'){
          this.$emit('loadItems', this.tableData.page, this.tableData.limit, this.search, this.typeProvider);
        }
      },
      
      async selectTypeProvider(event) {
        this.typeProvider = event.target.value
        var response = await this.$apiController('get', `/human_resource/list_provider/${this.typeProvider}?page=${this.tableData.page}&perpage=${this.tableData.limit}&searchquery=${this.search}`);
        this.tableData = response.data
      }
    },
  }
</script>

<style>
  .columnActionStyle {
    max-width: 100px;
    width: 100px;
  }
</style>