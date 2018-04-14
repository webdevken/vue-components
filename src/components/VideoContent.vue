<template lang="html">
<div class="card">
  <div class="card-header">YouTube Video ID</div>
  <div class="card-block">
    <div class="form-group">
      <input type="text" :value="value" class="form-control" @input="$emit('input', $event.target.value)" aria-label="YouTube Video ID">
    </div>
  </div>
  <div class="card-block">
    <div class='embed-container'>
      <iframe
        :src="src"
        frameborder="0"
        gesture="media"
        allow="encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</div>
</template>

<script>
import keepAliveData from '../mixins/keepAliveData.js';
export default {
  mixins:[keepAliveData],
  computed:{
    src(){
      return 'https://www.youtube.com/embed/' + this.value + '?rel=0&theme=dark&controls=2&autohide=1&modestbranding=1&showinfo=0';
    }
  }
}
</script>

<style lang="css" scoped>
.embed-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  }
  </style>
