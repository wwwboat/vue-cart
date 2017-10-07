var vm = new Vue({
  el:"#app",
  data:{
    productList:[],
    totalPrice:0,
    checkAll:false,
    delFlag:false,
    pindex:0
  },
  filters:{
    matPrice:function(value){
      return "¥"+value.toFixed(2);
    }

  },
  mounted:function(){
    this.cartView();

  },
  methods:{
    cartView:function(){
      var _this = this;
      this.$http.get('data/cartData.json').then(function(res){
        //console.log(res.data);
        console.log(res);
        _this.totalMoney = res.data.result.totalMoney;
        //console.log(_this.totalMoney);
        _this.productList = res.data.result.list;
        //console.log(_this.productList); 
      });
    },
    changeMoney:function(product,val){
      if(val>0){
        product.productQuantity ++;
      }else{
        if(product.productQuantity < 1){
          product.productQuantity = 1;
        }else{
          product.productQuantity --;
        }
      } 
      this.calcTotalPrice()
    },
    selectedProduct:function(item){
      if(typeof item.checked == 'undefined'){
        Vue.set(item,'checked',true);
      }else{
        item.checked = !item.checked
      }
      this.calcTotalPrice()
    },
    selectedAllProduct:function(flag){
      this.checkAll = flag;
        this.productList.forEach((item,index)=>{
          if(typeof item.checked == 'undefined'){
            this.$set(item,'checked',this.checkAll);
          }else{
            item.checked = this.checkAll;
          }
          this.calcTotalPrice()
        }); 
    },
    calcTotalPrice:function(){
      var _this = this
      this.totalPrice = 0
      this.productList.forEach(function(item,index){
        if(item.checked){
          _this.totalPrice += item.productPrice * item.productQuantity
        }
      })
    },
    delProduct:function(){
      this.delFlag = false;
      this.productList.splice(this.pindex,1);
      
    }

  }
});