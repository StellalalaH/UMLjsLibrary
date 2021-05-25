<template>
  <div :style="getStyleString"></div>
</template>

//组件行爲
<script>
import { ClassDiagram } from "../baseElem/ClassDiagram.js";
let $ = window.go.GraphObject.make;
export default {
  name: "ClassDiagram",
  props: {
    styleString: String, //接受父组件字符串设置图片样式
    nodeDataUrl: String, //接受文件名作为参数读入数据
    linkDataUrl: String
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
    //创立新的类图
    var myDiagram=new ClassDiagram(this,this.nodeDataUrl,this.linkDataUrl);
    //测试classDiagram的接口
    //修改连接属性
    //myDiagram.setConnectorWidth(5);//对连接的默认宽度进行设置：degree 1~5口

    //修改普通类的属性
    //myDiagram.setClassBackgroundColor("gray");//对普通类的背景颜色进行设置
    //myDiagram.setClassBorderWidth("5");//对普通类的边框粗细进行设置
    //myDiagram.setClassBorderColor("blue");//对普通类的边框颜色进行设置

    //修改抽象类的属性
    //myDiagram.setAbstractClassBackgroundColor("gray");//对抽象类的背景颜色进行设置
    //myDiagram.setAbstractClassBorderWidth("10");//对抽象类的边框粗细进行设置
    //myDiagram.setAbstractClassBorderColor("red")//对抽象类的边框颜色进行设置

    //修改接口类的属性
    //myDiagram.setInterfaceBackgroundColor("gray");//对接口类的背景颜色进行设置
    //myDiagram.setInterfaceBorderWidth("5");//对接口类的边框粗细进行设置
    //myDiagram.setInterfaceBorderColor("green");//对接口类的边框颜色进行设置

    //对标注信息的背景颜色进行设置
    //myDiagram.setAnnotationBackgroundColor("#778899");
    //设置缩率图
    var myOverview =
        $(go.Overview, "myOverviewDiv",  // the HTML DIV element for the Overview
          { observed: myDiagram.diagram, contentAlignment: go.Spot.Center });   // tell it which Diagram to show and pan
    }
};
</script>

//組件樣式
<style>
</style>