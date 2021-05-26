<template>
  <div :style="getStyleString"></div>
</template>

<script>
import { SeqDiagram } from "../baseElem/SeqDiagram.js";
let $ = window.go.GraphObject.make;
export default {
  name: "SeqDiagram",
  props: {
    styleString: String, //接受父组件字符串设置图片样式
    seqDataUrl: String, //接受文件名作为参数读入数据
  },
  data() {
    return {
      diagram: null
    };
  },
  computed: {
    getStyleString: function() {
      return this.styleString;
    }
  },
  mounted(){
    //创立新的顺序图
    var myDiagram=new SeqDiagram(this,this.seqDataUrl);
    //设置缩率图
    //var myOverview =
    //     $(go.Overview, "myOverviewDiv",  // the HTML DIV element for the Overview
    //       { observed: myDiagram.diagram, contentAlignment: go.Spot.Center });   // tell it which Diagram to show and pan
    }
};
</script>

//組件樣式
<style>
</style>