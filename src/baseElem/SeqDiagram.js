import {
  MessageLink,
  MessagingTool,
  MessageDraggingTool,
  ensureLifelineHeights,
  computeLifelineHeight,
  computeActivityLocation,
  backComputeActivityLocation,
  computeActivityHeight,
  backComputeActivityHeight,
  CustomLayout,
  CustomDraggingTool,
  LinePrefix,
  LineSuffix,
  MessageSpacing,
  ActivityWidth,
  ActivityStart,
  ActivityEnd
} from "../baseElem/SeqFunction"
class SeqDiagram {
  constructor(self, seqDataUrl) {
    //部分顺序图样式的属性
    // this.LinePrefix = 20;  // vertical starting point in document for all Messages and Activations
    // this.LineSuffix = 30;  // vertical length beyond the last message time
    // this.MessageSpacing = 20;  // vertical distance between Messages at different steps
    // this.ActivityWidth = 10;  // width of each vertical activity bar
    // this.ActivityStart = 5;  // height before start message time
    // this.ActivityEnd = 5;  // height beyond end message time
    //图形构建
    let $ = window.go.GraphObject.make;
    var myDiagram =
      $(go.Diagram, self.$el, "myDiagramDiv", // must be the ID or reference to an HTML DIV
        {
          allowCopy: false,
          linkingTool: $(MessagingTool), // defined below
          //"resizingTool.isGridSnapEnabled": true,
          //draggingTool: $(MessageDraggingTool), // defined below
          //draggingTool: $(CustomDraggingTool),
          //"draggingTool.gridSnapCellSize": new go.Size(1, MessageSpacing / 4),
          //"draggingTool.isGridSnapEnabled": true,
          // automatically extend Lifelines as Activities are moved or resized
          //"SelectionMoved": ensureLifelineHeights,
          //"PartResized": ensureLifelineHeights,
          //"undoManager.isEnabled": true,//be able to undo or redo.
          layout: $(CustomLayout)
        });

    //各个部分模板
    myDiagram.linkTemplate=this.getLinkTemplate();
    myDiagram.groupTemplate=this.getClassGroupTemplate();
    //myDiagram.groupTemplateMap.add("classGroup", this.getClassGroupTemplate());
    myDiagram.nodeTemplateMap.add("Activity", this.getActivityNodeTemplate());
    myDiagram.nodeTemplateMap.add("Super",this.getLoopNodeTemplate());//loop area
    
   
    //读取数据
    var SeqData = require(`./../../data/${seqDataUrl}.json`); //读取节点数据
    myDiagram.model = go.Model.fromJson(SeqData);


    // make sure all data have up-to-date "members" collections
    // this does not prevent any "cycles" of membership, which would result in undefined behavior
    var arr = myDiagram.model.nodeDataArray;
    for (var i = 0; i < arr.length; i++) {
      var data = arr[i];
      var supers = data.supers;
      if (supers) {
        for (var j = 0; j < supers.length; j++) {
          var sdata = myDiagram.model.findNodeDataForKey(supers[j]);
          if (sdata) {
            // update _supers to be an Array of references to node data
            if (!data._supers) {
              data._supers = [sdata];
            } else {
              data._supers.push(sdata);
            }
            // update _members to be an Array of references to node data
            if (!sdata._members) {
              sdata._members = [data];
            } else {
              sdata._members.push(data);
            }
          }
        }
      }
    }

  }
  // define the Lifeline Node template.
  getClassGroupTemplate(){
    let $ = go.GraphObject.make;
    var ClassGroupTemplate = $(go.Group, "Vertical", {
        locationSpot: go.Spot.Bottom,
        locationObjectName: "HEADER",
        minLocation: new go.Point(0, 0),
        maxLocation: new go.Point(9999, 0),
        selectionObjectName: "HEADER",
        movable:false
      },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Panel, "Auto", {
          name: "HEADER"
        },
        $(go.Shape, "Rectangle", {
          fill: $(go.Brush, "Linear", {
            0: "#bbdefb",
            1: go.Brush.darkenBy("#bbdefb", 0.1)
          }),
          stroke: null
        }),
        $(go.TextBlock, {
            margin: 5,
            font: "400 10pt Source Sans Pro, sans-serif"
          },
          new go.Binding("text", "text"))
      ),
      $(go.Shape, {
          figure: "LineV",
          fill: null,
          stroke: "gray",
          strokeDashArray: [3, 3],
          width: 1,
          alignment: go.Spot.Center,
          portId: "",
          fromLinkable: true,
          fromLinkableDuplicates: true,
          toLinkable: true,
          toLinkableDuplicates: true,
          cursor: "pointer"
        },
        new go.Binding("height", "duration", computeLifelineHeight))
    )
    return ClassGroupTemplate;
  }


  // define the Activity Node template
  getActivityNodeTemplate(){
      let $ = go.GraphObject.make;
      var ActivityNodeTemplate =
        $(go.Node, {
            locationSpot: go.Spot.Top,
            locationObjectName: "SHAPE",
            minLocation: new go.Point(NaN, LinePrefix - ActivityStart),
            maxLocation: new go.Point(NaN, 19999),
            movable:false
            //selectionObjectName: "SHAPE",
            //resizable: true,
            //resizeObjectName: "SHAPE",
            // resizeAdornmentTemplate: $(go.Adornment, "Spot",
            //   $(go.Placeholder),
            //   //修改活动条的buttom
            //   $(go.Shape, // only a bottom resize handle
            //     {
            //       alignment: go.Spot.Bottom,
            //       cursor: "col-resize",
            //       desiredSize: new go.Size(6, 6),
            //       fill: "yellow"
            //     })
            // )
          },
          new go.Binding("location", "", computeActivityLocation).makeTwoWay(backComputeActivityLocation),
          $(go.Shape, "Rectangle", {
              name: "SHAPE",
              fill: "white",
              stroke: "black",
              width: ActivityWidth,
              // allow Activities to be resized down to 1/4 of a time unit
              minSize: new go.Size(ActivityWidth, computeActivityHeight(0.25))
            },
            new go.Binding("height", "duration", computeActivityHeight).makeTwoWay(backComputeActivityHeight))
        );
        return ActivityNodeTemplate;
  }

  //define te Loop Node template
  getLoopNodeTemplate(){
    let $ = go.GraphObject.make;
    var LoopNodeTemplate=  
    $(go.Node, "Auto", {
          locationObjectName: "BODY",
          movable:false
        },
        $(go.Shape, "Rectangle", {
          strokeWidth: 1,
          parameter1: 20,
          spot1: go.Spot.TopLeft,
          spot2: go.Spot.BottomRight,
          minSize: new go.Size(40, 40),
          fill: "rgba(255 ,255, 255, 0.25)",
        }),
        $(go.Panel, "Vertical", {
          },
          $(go.Panel, "Auto", {
              alignment: go.Spot.TopLeft,
              //margin: new go.Margin(0, 10, 0, 10)
            },
            $(go.Shape, {
              fill: "lightgray",
              //fill: "rgba(255 ,255 ,255, 0.25)",
              stroke: "#000000",
              strokeWidth: 1,
              geometryString: "F M 100 100 L 300 100 L 300 230 L 230 300 L 100 300 z"
              //minSize: new go.Size(25, 20),
              //alignment: go.Spot.TopLeft,
            }, ),
            $(go.TextBlock, {
                font: "bold 8pt sans-serif",
                margin: new go.Margin(2, 8, 2, 8)
              },
              new go.Binding("text")
            ),
          ),
          $(go.Shape, {
            name: "BODY",
            margin: new go.Margin(10, 5, 5, 5),
            opacity: 0
          })
        )
      );
      return LoopNodeTemplate;
  }
  // define the Message Link template.
  getLinkTemplate(){
      let $ = go.GraphObject.make;
      var LinkTemplate=$(MessageLink,  // defined below
          { selectionAdorned: true, curviness: 0 },
          $(go.Shape, "Rectangle",
            { stroke: "black" },
            new go.Binding("strokeDashArray", "type", function (t) {
              if (t == 2) return [4, 4];
              else return null;
            })),
          $(go.Shape,
            { toArrow: "OpenTriangle", stroke: "black" },
            new go.Binding("toArrow", "type", this.convertToArrow)),
          $(go.TextBlock,
            {
              font: "400 9pt Source Sans Pro, sans-serif",
              segmentIndex: 0,
              segmentOffset: new go.Point(NaN, NaN),
              isMultiline: false,
              editable: false
            },
            new go.Binding("text", "text").makeTwoWay())
        );
        return LinkTemplate;
  }
  convertToArrow(relationship) {
    switch (relationship) {
      case 0:
        return "Triangle";
      case 1:
        return "OpenTriangle";
      case 2:
        return "OpenTriangle";
      default:
        return null;
    }
  }

}
export {
  SeqDiagram
}
