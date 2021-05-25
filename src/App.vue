<template>
  <div id="app">
    <div id="myOverviewDiv"></div>
    <ClassDiagram
      styleString="background-color: #f2f2f2;border: solid 2px black; width:80%; height:600px;justify-content: center;margin: 0 auto;"
      nodeDataUrl="diagramClass"
      linkDataUrl="diagramLink"
    ></ClassDiagram>
    <SeqDiagram
      styleString="background-color: #f2f2f2;border: solid 2px black; width:80%; height:600px;justify-content: center;margin: 0 auto;"
      seqDataUrl="diagramSeq"
    ></SeqDiagram>

    <TreeDiagram
      styleString="background-color: #f2f2f2;border: solid 2px black; width:80%; height:600px;justify-content: center;margin: 0 auto;"
      nodeDataUrl="diagramTree"
    ></TreeDiagram>
  </div>
</template>

<script  type="module">
const ClassDiagram = () => import("./diagram/ClassDiagram");
const SeqDiagram = () => import("./diagram/SeqDiagram");
const TreeDiagram = () => import("./diagram/TreeDiagram");

export default {
  name: "App",

  components: {
    ClassDiagram,
    SeqDiagram,
    TreeDiagram,
    //局部注册，该组件只能在当前组件被使用
  },
  mounted() {},
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#myOverviewDiv {
  position: absolute;
  width: 250px;
  height: 125px;
  top: 30px;
  left: 60px;
  background-color: #f2f2f2;
  z-index: 300; /* make sure its in front */
  border: solid 1px black;
}
</style>
