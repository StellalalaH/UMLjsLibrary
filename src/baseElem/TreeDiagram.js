import { Margin } from "gojs";
import nodeNotifier from "node-notifier";
import "./figure.js";
class TreeDiagram {

    constructor(self, nodeDataUrl) {
      let $ = window.go.GraphObject.make;
      //console.log(nodeDataUrl);
      var myDiagram = $(go.Diagram, self.$el, {
        "toolManager.hoverDelay": 100, // 100 milliseconds instead of the default 850
        allowCopy: false,
        layout: // create a TreeLayout for the family tree
          $(go.TreeLayout, {
            angle: 90,
            nodeSpacing: 10,
            layerSpacing: 40,
            layerStyle: go.TreeLayout.LayerUniform
          })
      });

    //图注部分
    //   var bluegrad = '#90CAF9';
    //   var pinkgrad = '#F48FB1';
  
    //   // Set up a Part as a legend, and place it directly on the diagram（图注）
    //   myDiagram.add(
    //     $(go.Part, "Table", {
    //         position: new go.Point(300, 10),
    //         selectable: false
    //       },
    //       $(go.TextBlock, "Key", {
    //         row: 0,
    //         font: "700 14px Droid Serif, sans-serif"
    //       }), // end row 0
    //       //左上角的图标
    //       $(go.Panel, "Horizontal", {
    //           row: 1,
    //           alignment: go.Spot.Left
    //         },
            
    //         $(go.Shape, "Rectangle", {
    //           desiredSize: new go.Size(30, 30),
    //           fill: bluegrad,
    //           margin: 5
    //         }),
    //         $(go.TextBlock, "Males", {
    //           font: "700 13px Droid Serif, sans-serif"
    //         })
    //       ), // end row 1
    //         //左上角的图标
    //       $(go.Panel, "Horizontal", {
    //           row: 2,
    //           alignment: go.Spot.Left
    //         },
    //         $(go.Shape, "Rectangle", {
    //           desiredSize: new go.Size(30, 30),
    //           fill: pinkgrad,
    //           margin: 5
    //         }),
    //         $(go.TextBlock, "Females", {
    //           font: "700 13px Droid Serif, sans-serif"
    //         })
    //       ) // end row 2
    //     ));
  
  
  
      //获得类的Map
      myDiagram.nodeTemplateMap = this.getNodeTemplateMap();
      //myDiagram.nodeTemplate = this.getNodeTemplate();
      myDiagram.linkTemplate = this.getLinkTemplate();
  
  
      //读取数据
      var diagramClassData = require(`./../../data/${nodeDataUrl}.json`); //读取节点数据
      var nodedata = diagramClassData.treeArray;
      //console.log(nodedata);
      myDiagram.model = new go.TreeModel(nodedata);
  
      this.diagram = myDiagram;
    }


    //备注的模板（可删去）
    getTooltiptemplate() {
      let $ = window.go.GraphObject.make;
      var tooltiptemplate =
        $("ToolTip", {
            "Border.fill": "whitesmoke",
            "Border.stroke": "black"
          },
          $(go.TextBlock, {
              font: "bold 8pt Helvetica, bold Arial, sans-serif",
              wrap: go.TextBlock.WrapFit,
              margin: 5
            },
            new go.Binding("text", "otherinfo")
        ))
      return tooltiptemplate;
    }
  
  
    // tooltipTextConverter(person) {
    //   var str = "";
    //   str += "Born: " + person.birthYear;
    //   if (person.deathYear !== undefined) str += "\nDied: " + person.deathYear;
    //   if (person.reign !== undefined) str += "\nReign: " + person.reign;
    //   return str;
    // }
  
    // genderBrushConverter(gender) {
    //   if (gender === "M") return bluegrad;
    //   if (gender === "F") return pinkgrad;
    //   return "orange";
    // }

    convertPrefix(pre){
      if(pre===1) return "TriangleUp";
      if(pre===2) return "TriangleDown";
      return none;
    }
    //node的模板
    getFunctionTemplate(){
        let $ = go.GraphObject.make;
        var nodeTemplate = $(go.Node, "Auto", {
            deletable: false,
            toolTip: this.getTooltiptemplate()
          },
          $(go.Panel, "Horizontal",
          $(go.Shape,
              { width: 10, height: 10 ,fill:"transparent",stroke:"black",margin:new Margin(0,0,5,0)},
              new go.Binding("figure","prefix",this.convertPrefix),
              new go.Binding("stroke","prefix",function(e){
                if(e===0) return null
              })
          ),  
          $(go.TextBlock, {
              font: "600 12px Droid Serif, sans-serif",
              textAlign: "center",
              margin: new go.Margin(8, 2, 8, 2),
              maxSize: new go.Size(100, NaN)
            },
            new go.Binding("text", "name"))))
        return nodeTemplate;
    }
    getOperaterTemplate(){
        let $ = window.go.GraphObject.make;
        var nodeTemplate = $(go.Node, "Auto", {
            deletable: false,
            toolTip: this.getTooltiptemplate()
          },
          $(go.Shape,{
              width:20,
              height:20,
              strokeWidth: 2,
              margin:5,
              stretch: go.GraphObject.Fill,
              alignment: go.Spot.Center
            },
            new go.Binding("figure","name"),
        ))
        return nodeTemplate;
    }
    getNodeTemplateMap() {
      var classTemplateMap = new go.Map();
      classTemplateMap.add("function", this.getFunctionTemplate());
      classTemplateMap.add("operator", this.getOperaterTemplate());
      return classTemplateMap;
    }

    //link的模板
    getLinkTemplate() {
      let $ = window.go.GraphObject.make;
      var linkTemplate =
        $(go.Link, // the whole link panel
          {
            routing: go.Link.Orthogonal,
            corner: 5,
            selectable: false
          },
          $(go.Shape, {
            strokeWidth: 2,
            stroke: '#424242'
          }));
      return linkTemplate;
    }
  
  
  
  }
  export {
    TreeDiagram
  }
  