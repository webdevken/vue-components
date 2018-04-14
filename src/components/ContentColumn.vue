<template lang="html">
  <div >
    <div class="form-group">
      <label aria-hidden="true">Content Type</label>
      <select :value="value.type" aria-label="Choose Content Type" @input="update('type', $event)" class="form-control">
          <option v-for="t in types" :value="t">{{t}}</option>
      </select>
    </div>
      <transition name="zoomIn" mode="out-in">
          <keep-alive>
          <component
            :is="contentComponent"
            :value="value.content"
            :order="columnOrder"
            @input="updateContent"
          />
          </keep-alive>
      </transition>
    </div>
</template>

<script>
import TinyMCE from './TinyMCE';
import ImageUploader from './ImageUploader';
import VideoContent from './VideoContent';
export default {
  props:['value', 'columnOrder'],
  components:{
    ImageUploader,
    VideoContent,
    TinyMCE
  },
  data(){
    return {
      types:['text', 'image', 'video'],
    }
  },
  methods:{
    updateContent(newContent){
      var newValue = {};
      newValue.content = newContent;
      this.$emit('input', Object.assign({}, this.value, newValue));
    },
    update(key, {target}){
      var newValue = {};
      newValue[key] = target.value;
      this.$emit('input', Object.assign({}, this.value, newValue ));
    },
    guid(){
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();

      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
    }
  },
  computed:{
    contentComponent(){
      const components = {
        text: 'TinyMCE',
        video: 'VideoContent',
        image: 'ImageUploader'
      };
      return components[this.value.type];
    }
  }
}
</script>

<style lang="css">
</style>
