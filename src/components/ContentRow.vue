<template lang="html">
 <div class="row">
    <draggable
      v-model="columns"
      style="display:inherit"
    >
    <transition-group
      name="flip-list"
      style="display:inherit"
    >
      <ContentColumn
        :class="'col-md-' + (12 / columnCount)"
        v-for="(contentColumn, i) in columns"
        ref="columns"
        :key="contentColumn.guid"
        :column-order="i"
        url-prefix=""
        v-model="columns[i]"
      />
    </transition-group>
    </draggable>
  </div>
</template>

<script>
import ContentColumn from './ContentColumn';

import EventBus from '../event-bus.js';

import Vue from 'Vue';
import draggable from 'vuedraggable';
export default {
  name:'content-row',
  props: ['value'],
  components: {
    ContentColumn,
    draggable
  },
  methods:{
    guid(){
      return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b);
    }
  },
  computed:{
    columnCount(){ return this.columns.length},
    columns:{
      get(){
        const indexes = [1,2,3,4];
        var result = [],
            row = this.value;
        indexes.forEach(i =>{
          console.log(i, row);
            var isRowEmpty = row['content'+i+'_type'] == null;
            if(!isRowEmpty){
              result.push({
                type: row['content'+i+'_type'],
                content: row['content'+i],
                guid:this.guid()
              });
            }
        });
        return result;
      },
      set(newValue){
        console.log('setting new col value', newValue);
      }
    }
  },
  created(){
    EventBus.$emit('update:row', ['test data']);
    /*
    var vm = this,
        newContent = [];
    this.contentColumns.forEach(function(v,k) {
      v.guid = vm.guid();
      });
      console.log('newContent', newContent, vm.guid());
  */
  },
}
</script>

<style lang="css">
.flip-list-move {
  transition: transform 1s;
}
</style>
