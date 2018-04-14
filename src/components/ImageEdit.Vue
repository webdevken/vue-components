<template lang="html">
   <div class="card">
        <div class="card-header">Edit Image
          <button type="button" class="close" aria-label="Close" @click="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
     <div class="card-block pt-0">
       <div class="form-group">
       <label>Caption</label>
         <input :value="value.caption" @input="update('caption', $event)" class="form-control">
       </div>
       <div class="form-group">
         <label>ALT Text</label>
         <input :value="value.alt" @input="update('alt', $event)" class="form-control">
       </div>
         <div class="media">
           <img :src="imgSrc" :alt="value.alt" title="value.file" class="align-self-center img-thumbnail dr-3" style="max-width:64px">
             <div class="media-body">
                <upload-button :value="value.file" :options="uploaderOptions" @input="update('file', $event)" ></upload-button>
             </div>
         </div>
    </div>
    </div>
</template>

<script>
import imageMixin from '../mixins/imageMixin';
import UploadButton from './uploadButton';
import keepAliveData from '../mixins/keepAliveData.js';
export default {
  data(){
    return {
      data:this.value
    }
  },
  mixins: [imageMixin, keepAliveData],
  components: {
    UploadButton
  },
  methods:{
    close: function(){this.$emit('close'); },
    open: function(){this.$emit('open'); },
    update(value, {target}){
     this.data[value] = target.value;
     this.$emit('input', this.data);
    }
  }

}
</script>

<style lang="css">
</style>
