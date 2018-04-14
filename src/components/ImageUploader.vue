<template lang="html">
  <div>
    <transition name="flipInY" mode="out-in">
      <keep-alive>
      <component
        :is="imageComponent"
        :uploader-options="uploaderOptions"
        :url-prefix="urlPrefix"
        @open="isOpen = true"
        @close="isOpen = false"
        :value="value"
        @input="$emit('input', $event)"
        @delete="$emit('delete')">
      </component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
//load mixins that cover common code
import imageMixin from '../mixins/imageMixin';
import keepAliveData from '../mixins/keepAliveData';
//load other components
import ImageEdit from './ImageEdit';
import ImagePreview from './ImagePreview';
export default {
  data:function(){
     return {
        //isOpen: (this.image.file != '' && this.image.alt != '') ? false : true,
        isOpen: true,
        data:{
          file:'https://vuejs.org/images/logo.png',
          alt:'',
          caption:'VueJS'
        }
     }
  },
  props: ['name'],
   components: {
     ImageEdit,
     ImagePreview
   },
   mixins:[keepAliveData, imageMixin],
   computed:{
      imageComponent: function(){
        return ( this.value.file == '' || this.isOpen ) ? ImageEdit : ImagePreview;
      },
      imgJSON: function(){
         return JSON.stringify(this.value);
      },
   }
}
</script>

<style lang="css">
</style>
