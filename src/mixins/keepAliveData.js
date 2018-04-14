export default{
  props:['value'],
  data(){
    return{
      data:''
    };
  },
  activated: function(){
    this.$emit('input', this.data);
  },
  deactivated: function(){this.data = this.value},
  created: function(){this.$emit('input', this.data)},
}
