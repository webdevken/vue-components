<template lang="html">
    <textarea ref="editor" :value="value" :name="name" ></textarea>
</template>

<script>
export default {
  props:['value', 'options', 'name', 'order'],
  activated: function(){
    this.$emit('input', this.text);
    this.init();
  },
  deactivated: function(){this.text = this.value, this.editor.destroy()},
  created: function(){this.text = this.value},
  data: function(){
    return {
      text: '',
      editor:{}
    }
  },
  watch:{
    order(){
      this.editor.destroy();
      this.init();
    }
  },
  methods:{
    init(){
      var vm = this,
          //set default options for tinymce, but allow override from parent
          options = {
            target:this.$refs.editor,
            plugins: "code print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help",
            toolbar: "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | code",
            menubar: "tools",
            convert_urls: false,
          init_instance_callback(editor){
            editor.on('Change', e => vm.$emit('input', editor.getContent()));
            editor.on('KeyUp', e => vm.$emit('input', editor.getContent()));
            vm.editor = editor;
            vm.$nextTick(function(){editor.show(); editor.load();});
            }
          };

          console.log('init fire  d');
          //override with options prop from parent
      Object.assign(options, this.options);
          //check to make sure tinymce is installed
      if(typeof tinymce === 'undefined') {
        console.error('TinyMCE not loaded!');
      }else{
        tinymce.init(options);
      }
    }
  },
  updated(){
    console.log('updated fired');
    this.editor.show();
  },
}
</script>

<style lang="css">
</style>
