var vm=new Vue({
  el:".container",
  data:{
    addressList:[],
    limitNum:3,
    isIndex:0,
    shippingMethods:1
  },
  mounted: function(){
    this.$nextTick(function(){
      this.getAddressList();
    });
  },
  computed:{
    filterAddress:function(){
      return this.addressList.slice(0,this.limitNum)
    }
  },
  methods:{
    getAddressList: function(){
      var _this = this;
      this.$http.get("data/address.json").then(function(res){
        var response = res.data;
        if(response.status == "0"){
          _this.addressList = response.result;
        }
      });
    },
    setDefault:function(addressId){
      this.addressList.forEach(function(item,index){
        if(item.addressId == addressId){
          item.isDefault = true;
        }else{
          item.isDefault = false;
        }
      })
    }
  }
})