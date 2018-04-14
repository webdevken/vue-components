<template lang="html">
  <div ref="uploader"></div>
</template>

<script>
export default {
  name: 'upload-button',
  props: ['value', 'options'],
  methods: {
     init_uploader: function (){
         if(typeof qq === 'undefined'){
              console.error('qq uploader not found!');
         } else{
             var vm = this,
                 defaultOptions = {
                      element: vm.$refs.uploader,
                      uploadButtonText: 'Choose File',
                      action: window.location.href,
                      multiple: false,
                      onComplete: function(id, fileName, responseJSON) {
                         vm.$emit('input', {target: {value: responseJSON.newfile}});
                      }
             },
             options =  Object.assign(defaultOptions, vm.options);
             new qq.FileUploader(options);
         }
     }
  },
  mounted: function(){
     this.init_uploader();
  }
}
</script>

<style lang="css">
</style>
