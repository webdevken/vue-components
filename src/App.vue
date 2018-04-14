<template>
  <div id="app">
    <div class="container">
      </div>
    </div>
</template>

<script>


import ContentRow from './components/ContentRow';
import EventBus from './event-bus.js';

EventBus.$on('test', function(payload){console.log('Test fired', payload)});

export default {
  name: 'app',
  components: {
    ContentRow
  },
  data(){
    return {
      contentRows:[
        {
          content1:"This was text",
          content1_type:"text",
          content2: "This is text",
          content2_type: "text",
          content3: "This will be text",
          content3_type: "text",
          content4: "This never was text",
          content4_type: "text",
          hidden:false,
        },
      ],
      tinymceOptions:{
      }
    }
  },
  methods:{
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
  created(){
    this.contentRows.forEach(r=>r.guid = this.guid());
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
