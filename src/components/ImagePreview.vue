<template lang="html">
    <div class="card" @click="$emit('open')" >
         <img :src="imgSrc"
           :alt="value.alt"
           :title="value.file"
           />
         <div class="card-block pt-0">
          <p class="card-text caption">{{value.caption}}</p>
         </div>
    </div>
</template>

<script>
  import imageMixin from '../mixins/imageMixin';
  import UploadButton from './uploadButton';
  export default {
      mixins: [imageMixin],
      components: {
        UploadButton
      }
  }
</script>

<style lang="css" scoped>
img{
  padding: 0.25rem;
  max-width: 100%;

}
</style>
