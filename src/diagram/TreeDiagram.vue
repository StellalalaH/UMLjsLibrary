<template>
  <div :style="getStyleString"></div>
</template>

//组件行爲
<script>
import { TreeDiagram } from "../baseElem/TreeDiagram.js";
let $ = window.go.GraphObject.make;

export default {
  name: "TreeDiagram",
  props: {
    styleString: String, //接受父组件字符串设置图片样式
    nodeDataUrl: String, //接受文件名作为参数读入数据
  },
  data() {
    return {
      diagram: null,
    };
  },
  computed: {
    getStyleString: function () {
      return this.styleString;
    },
  },
  mounted() {
    //创立新的图
    var myDiagram = new TreeDiagram(this, this.nodeDataUrl);
  },
};
</script>

//組件樣式
<style>
</style>