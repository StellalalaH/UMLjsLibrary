import { ClassNode } from "./classDiagramElem/ClassNode.js";
import { LinkTemp } from "./classDiagramElem/LinkTemp.js";
import { DataManager } from "../baseElem/DataManager.js";
import { GroupTemp } from "../baseElem/GroupTemp.js";

class ClassDiagram {
    constructor(self,nodeDataUrl,linkDataUrl){
        let $ = window.go.GraphObject.make;
        //console.log(nodeDataUrl);
        var myDiagram = $(go.Diagram,self.$el,{
            "undoManager.isEnabled": true,

            //力导向布局
            layout: $(go.ForceDirectedLayout,{
                defaultSpringLength:50,
                defaultSpringStiffness:0.05,
            })

            //树型布局
            // layout: $(go.TreeLayout, {
            //   // this only lays out in trees nodes connected by "generalization" links
            //   angle: 90,
            //   path: go.TreeLayout.PathSource, // links go from child to parent
            //   setsPortSpot: false, // keep Spot.AllSides for link connection spot
            //   setsChildPortSpot: false, // keep Spot.AllSides
            //   // nodes not connected by "generalization" links are laid out horizontally
            //   arrangement: go.TreeLayout.ArrangementHorizontal
            // })
          });
      
          //创建对象便于调用函数
          this.ClassTemplate = new ClassNode();
          this.ClassLinkTemplate = new LinkTemp();
          this.diaDataManager = new DataManager();
          this.GroupTemplate = new GroupTemp();
          //ClassLinkTemplate.setStrokeWidth("8");

          //获得类的Map
          myDiagram.nodeTemplateMap = this.ClassTemplate.getClassTemplateMap();
          myDiagram.linkTemplate = this.ClassLinkTemplate.getLinkTemp();          
          myDiagram.groupTemplate = this.GroupTemplate.getGroupTemplate();
      
          //读取数据
          var diagramClassData = require(`./../../data/${nodeDataUrl}.json`); //读取节点数据
          var nodedata = diagramClassData.classArray;
      
          var diagramLinkData = require(`./../../data/${linkDataUrl}.json`); //读取关系数据
          var linkdata = diagramLinkData.LinkArray;


          
      
          //处理数据，
          //正确渲染节点数据的必须操作
          //数据中【值-类的类型】对应的数组，即classTypeValueArray[0]，classTypeValueArray[1]，classTypeValueArray[3]的值
          //分别对应普通类，抽象类，接口类
          var classTypeValueArray = [0, 1, 2];
          this.diaDataManager.addCategoryToData(
            "classType",
            classTypeValueArray,
            nodedata
          );
      
          myDiagram.model = $(go.GraphLinksModel, {
            copiesArrays: true,
            copiesArrayObjects: true,
            nodeDataArray: nodedata,
            linkDataArray: linkdata,
            
          });
          this.diagram=myDiagram;
        }
         /**
          * 
          * setConnectorWidth函数
          * 用于设置类元素之间连线的粗细
          */
         /**
          * 
          * @param {Number} w
          */
        setConnectorWidth(w){
            this.ClassLinkTemplate.setStrokeWidth(w.toString());
            this.diagram.linkTemplate = this.ClassLinkTemplate.getLinkTemp();
        }
        //普通类的显示属性
        /**
         * 
         * @param {string} colorStr 
         * 
         * @example 如实例为Exp
         * Exp.setClassBackgroundColor("black")
         * or
         * Exp.setClassBackgroundColor("#000000")
         */
        setClassBackgroundColor(colorStr) {
          this.ClassTemplate.setClassBackgroundColor(colorStr);
          this.diagram.nodeTemplateMap = this.ClassTemplate.getClassTemplateMap();
        }
        /**
         * 以字符串的形式传入数字，设置边框的线条粗细
         * @param {string} widthNumStr 
         * @example 如实例为Exp
         * Exp.setClassBorderWidth("2")
         * or
         * Exp.setClassBorderWidth("5")
         */
      
        setClassBorderWidth(widthNumStr) {
          this.ClassTemplate.setClassBorderWidth(widthNumStr);
          this.diagram.nodeTemplateMap = this.ClassTemplate.getClassTemplateMap();
        }
        setClassBorderColor(colorStr) {
          this.ClassTemplate.setClassBorderColor(colorStr);
          this.diagram.nodeTemplateMap = this.ClassTemplate.getClassTemplateMap();
        }
      
        //抽象类显示属性
        setAbstractClassBackgroundColor(colorStr) {
          this.ClassTemplate.setAbstractClassBackgroundColor(colorStr);
          this.diagram.nodeTemplateMap = this.ClassTemplate.getClassTemplateMap();
        }
        setAbstractClassBorderWidth(widthNumStr) {
          this.ClassTemplate.setAbstractClassBorderWidth(widthNumStr);
          this.diagram.nodeTemplateMap = this.ClassTemplate.getClassTemplateMap();
        }
        setAbstractClassBorderColor(colorStr) {
          this.ClassTemplate.setAbstractClassBorderColor(colorStr);
          this.diagram.nodeTemplateMap = this.ClassTemplate.getClassTemplateMap();
        }
      
        //接口类显示属性
        setInterfaceBackgroundColor(colorStr) {
          this.ClassTemplate.setInterfaceBackgroundColor(colorStr);
          this.diagram.nodeTemplateMap = this.ClassTemplate.getClassTemplateMap();
        }
        setInterfaceBorderWidth(widthNumStr) {
          this.ClassTemplate.setInterfaceBorderWidth(widthNumStr);
          this.diagram.nodeTemplateMap = this.ClassTemplate.getClassTemplateMap();
        }
        setInterfaceBorderColor(colorStr) {
          this.ClassTemplate.setInterfaceBorderColor(colorStr);
          this.diagram.nodeTemplateMap = this.ClassTemplate.getClassTemplateMap();
        }
      
        //分析信息显示属性
        setAnnotationBackgroundColor(colorStr) {
          this.ClassTemplate.setAnnotationBackgroundColor(colorStr);
          this.diagram.nodeTemplateMap = this.ClassTemplate.getClassTemplateMap();
        }
    }
    export {
        ClassDiagram
      }