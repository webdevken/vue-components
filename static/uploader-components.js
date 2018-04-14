//projects.m2
var fileUploadTemplate = '\
<div> \
     <a class="btn btn-default" :href="imgSrc" target="_blank" v-if="isUploaded">{{newFile.file}}</a> \
    <div ref="uploader" style="margin-top:10px;"></div> \
    <transition name="fadeInUp">\
       <input type="hidden" :name="name" v-model="newFile.file" > \
    </transition>\
     \
 </div> \
';

Vue.component('file-uploader', {
    template: fileUploadTemplate,
    props: ['urlPrefix', 'file', 'action', 'buttonText', 'name'],
    data: function(){
       return {
          newFile: {
             file: '',
          },
       };
    },
    methods: {
       init_uploader: function (){
          var vm = this,
		    uploader = new qq.FileUploader({
				element: vm.$refs.uploader,
				uploadButtonText: vm.buttonText,
				action: vm.action,
				multiple: false,
				onComplete: function(id, fileName, responseJSON) {
                   vm.newFile.file = responseJSON.newfile;
                   vm.$emit('input', vm.newFile);
				}
			});
       }
    },
    computed:{
       imgJSON: function(){
          return JSON.stringify(this.value);
       },
       imgSrc: function(){
           return this.urlPrefix + '/' + this.value.file;
       },
       isUploaded: function(){
          return this.value.file.length > 0;
       }
    },
    mounted: function(){
       this.init_uploader();
       var uploader = $('.qq-uploader input[type=file]')[0];
       console.log('Uploader', uploader);
         uploader.setAttribute("aria-hidden", "true");
         uploader.setAttribute("aria-label", "do not use");
         uploader.setAttribute("aria-readonly", "true");
    },
    created: function(){
       this.newFile.file = this.file;
    }
});

var imagePreviewTemplate = ' \
   <div>\
     <div class="preview row"  @click="open" style="min-height:224px">\
       <div class="col-md-12">\
          <img :src="imgSrc" :alt="value.alt" class="thumbnail" style="max-width:100%">\
       </div>\
       <p class="caption">{{value.caption}}</p>\
     </div>\
  </div>\
 ';

var uploadButtonTemplate = ' \
      <div ref="uploader"></div>\
 ';

var uploadButton = {
    template : '<div ref="uploader"></div>',
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
                           vm.$emit('input', responseJSON.newfile);
                        }
               },
               options =  Object.assign(defaultOptions, vm.options);
               new qq.FileUploader(options);
               var uploader = $('.qq-uploader input[type=file]')[0];
               uploader.setAttribute("aria-hidden", "true");
               uploader.setAttribute("aria-label", "do not use");
               uploader.setAttribute("aria-readonly", "true");
           }
       }
    },
    mounted: function(){
       this.init_uploader();
    }
};

Vue.component('upload-button', uploadButton);

var imageEditTemplate = `\
<div class="row" style="padding:10px; border:solid 1px #999;"> \
   <div class="col-6">\
   <label>Caption</label>\
     <input v-model="value.caption" @input="$emit(\'input\', value)" class="form-control">\
     <label>ALT Text</label>\
     <input v-model="value.alt" @input="$emit(\'input\', value)" class="form-control">\
     <div style="margin-top:10px; text-align:center">\
      <a class="btn btn-danger btn-sm" aria-label="Delete" @click="$emit(\'delete\')">\
        <i class="fa fa-trash"></i> \
      </a>\
     </div>\
   </div>\
   <div class="preview col-6">\
      <button type="button" class="close" aria-label="Close" @click="close">\
        <span aria-hidden="true">&times;</span>\
      </button>\
      <label>Preview</label>\
      <img :src="imgSrc" style="width: 100%; max-width: 400px;" class="thumbnail">\
      <input :value="value.file" disabled class="form-control" style="margin:10px 0;">\
      <upload-button v-model="value.file" :options="uploaderOptions" @input="$emit(\'input\', value)" ></upload-button>
    </div>\
    \
 </div>\
 `;

 var imageMixin = {

    props: ['urlPrefix', 'value', 'uploader-options'],
    methods:{
        close: function(){this.$emit('close'); },
        open: function(){this.$emit('open'); }
    },
    computed:{
       imgSrc: function(){
           return this.urlPrefix + '/' + this.value.file;
       },
    },
 };


 var imagePreview = {
   template: imagePreviewTemplate,
   mixins: [imageMixin]
 };

 var imageEdit = {
    template: imageEditTemplate,
    mixins: [imageMixin]
 };

Vue.component('image-uploader', {
    components: {'image-edit' : imageEdit, 'image-preview' : imagePreview},
    props: ['name', 'value'],
    template: '\
   <div style="margin-bottom:10px">\
   <transition name="flipInY" mode="out-in">\
   <div :is="imageComponent" :uploader-options="uploaderOptions" :name="name" :url-prefix="urlPrefix" @open="isOpen = true" @close="isOpen = false" v-model="value" @input="emit" @delete="$emit(\'delete\')"></div>\
   </transition>\
    <input type="hidden" :name="name" :value="imgJSON" >\
   </div>\
   ',
   data:function(){
      return {
         isOpen: (this.value.file != '' && this.value.alt != '') ? false : true
      }
   },
    mixins: [imageMixin],
    computed:{
       imageComponent: function(){
         return ( this.value.file == '' || this.isOpen ) ? imageEdit : imagePreview;
       },
       imgJSON: function(){
          return JSON.stringify(this.value);
       },
    },
   methods:{
      emit: function(){
         this.$emit('input', this.value);
      }
   }
});

var colorPickerTemplate = '\
<div class="input-group" :class="inputClass" style="float:left; width:150px; margin-right:15px; margin-bottom: 15px;">\
   <span :style="previewStyle" class="input-group-addon">&nbsp;</span>\
   <input type="text" ref="picker" :name="name" class="form-control" :value="value">\
   <span class="input-group-addon">\
   <button type="button" class="close" aria-label="Close" @click="close">\
     <span aria-hidden="true">&times;</span>\
   </button>\
   </span>\
</div>\
';

Vue.component('color-picker', {
   template: colorPickerTemplate,
   props: ['value', 'name', 'inputClass'],
   computed:{
      previewStyle: function(){
         return 'background-color: ' + this.value;
      }
   },
   methods:{
      close: function(){
         this.$emit('close');
      }
   },
   mounted: function(){
     var vm = this;
     $(this.$refs.picker)
        .colorpicker({format:'hex'})
        .on('colorpickerChange', function(e){
           vm.$emit('input', e.color.toString())
         });
   }
});
