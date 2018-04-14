var imageMixin = {
   props: {
            urlPrefix:{
              type: String,
              default: ''
            },
            value:null,
            uploaderOptions:Object,
            name:String
          },
   computed:{
      imgSrc: function(){
          const slash = this.urlPrefix == '' ? '' : '/';
          return this.urlPrefix + slash + this.value.file;
      },
   },
};

export default imageMixin;
