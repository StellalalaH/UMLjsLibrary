var $ = go.GraphObject.make;
export const LinePrefix = 20; // vertical starting point in document for all Messages and Activations
export const LineSuffix = 30; // vertical length beyond the last message time
export const MessageSpacing = 20; // vertical distance between Messages at different steps
export const ActivityWidth = 10; // width of each vertical activity bar
export const ActivityStart = 5; // height before start message time
export const ActivityEnd = 5; // height beyond end message time
//生命线
export function ensureLifelineHeights(e) {
  // iterate over all Activities (ignore Groups)
  var SeqData = require(`./../../data/diagramSeq.json`); //读取节点数据
  var model=go.Model.fromJson(SeqData);
  var arr = model.nodeDataArray;
  var max = -1;
  for (var i = 0; i < arr.length; i++) {
    var act = arr[i];
    if (act.isGroup) continue;
    max = Math.max(max, act.start + act.duration);
  }
  if (max > 0) {
    // now iterate over only Groups
    for (var i = 0; i < arr.length; i++) {
      var gr = arr[i];
      if (!gr.isGroup) continue;
      if (max > gr.duration) { // this only extends, never shrinks
        model.setDataProperty(gr, "duration", max);
      }
    }
  }
}

export function computeLifelineHeight(duration) {
  return LinePrefix + duration * MessageSpacing + LineSuffix;
}

//活动
export function computeActivityLocation(act) {
  var SeqData = require(`./../../data/diagramSeq.json`); //读取节点数据
  var groupdata = (go.Model.fromJson(SeqData)).findNodeDataForKey(act.group);
  if (groupdata === null) return new go.Point();
  // get location of Lifeline's starting point
  var grouploc = go.Point.parse(groupdata.loc);
  return new go.Point(grouploc.x, convertTimeToY(act.start) - ActivityStart);
}

export function backComputeActivityLocation(loc, act, model) {
  model.setDataProperty(act, "start", convertYToTime(loc.y + ActivityStart));
}

export function computeActivityHeight(duration) {
  return ActivityStart + duration * MessageSpacing + ActivityEnd;
}

export function backComputeActivityHeight(height) {
  return (height - ActivityStart - ActivityEnd) / MessageSpacing;
}

// time is just an abstract small non-negative integer
// here we map between an abstract time and a vertical position
export function convertTimeToY(t) {
  return t * MessageSpacing + LinePrefix;
}

export function convertYToTime(y) {
  return (y - LinePrefix) / MessageSpacing;
}

export function MessageLink() {
  go.Link.call(this); //有点像，调用link的构造函数初始化？
  this.time = 0; // use this "time" value when this is the temporaryLink
  //this.time = 0; // use this "time" value when this is the temporaryLink
}
go.Diagram.inherit(MessageLink, go.Link);

MessageLink.prototype.getLinkPoint = function (node, port, spot, from, ortho, othernode, otherport) {
  var p = port.getDocumentPoint(go.Spot.Center);
  var r = port.getDocumentBounds();
  var op = otherport.getDocumentPoint(go.Spot.Center);

  var data = this.data;
  var time = data !== null ? data.time : this.time; // if not bound, assume this has its own "time" property

  var aw = this.findActivityWidth(node, time);
  var x = (op.x > p.x ? p.x + aw / 2 : p.x - aw / 2);
  var y = convertTimeToY(time);
  return new go.Point(x, y);
};

MessageLink.prototype.findActivityWidth = function (node, time) {
  var aw = ActivityWidth;
  if (node instanceof go.Group) {
    // see if there is an Activity Node at this point -- if not, connect the link directly with the Group's lifeline
    if (!node.memberParts.any(function (mem) {
        var act = mem.data;
        return (act !== null && act.start <= time && time <= act.start + act.duration);
      })) {
      aw = 0;
    }
  }
  return aw;
};

MessageLink.prototype.getLinkDirection = function (node, port, linkpoint, spot, from, ortho, othernode, otherport) {
  var p = port.getDocumentPoint(go.Spot.Center);
  var op = otherport.getDocumentPoint(go.Spot.Center);
  var right = op.x > p.x;
  return right ? 0 : 180;
};

MessageLink.prototype.computePoints = function () {
  if (this.fromNode === this.toNode) { // also handle a reflexive link as a simple orthogonal loop
    var data = this.data;
    var time = data !== null ? data.time : this.time; // if not bound, assume this has its own "time" property
    var p = this.fromNode.port.getDocumentPoint(go.Spot.Center);
    var aw = this.findActivityWidth(this.fromNode, time);

    var x = p.x + aw / 2;
    var y = convertTimeToY(time);
    this.clearPoints();
    this.addPoint(new go.Point(x, y));
    this.addPoint(new go.Point(x + 50, y));
    this.addPoint(new go.Point(x + 50, y + 5));
    this.addPoint(new go.Point(x, y + 5));
    return true;
  } else {
    return go.Link.prototype.computePoints.call(this);
  }
}
export function MessagingTool() {
  go.LinkingTool.call(this);
  var $ = go.GraphObject.make;
  this.temporaryLink =
    $(MessageLink,
      $(go.Shape, "Rectangle", {
        stroke: "magenta",
        strokeWidth: 2
      }),
      $(go.Shape, {
        toArrow: "OpenTriangle",
        stroke: "magenta"
      }));
}
go.Diagram.inherit(MessagingTool, go.LinkingTool);
MessagingTool.prototype.doActivate = function () {
  go.LinkingTool.prototype.doActivate.call(this);
  var time = convertYToTime(this.diagram.firstInput.documentPoint.y);
  this.temporaryLink.time = Math.ceil(time); // round up to an integer value
};

MessagingTool.prototype.insertLink = function (fromnode, fromport, tonode, toport) {
  var newlink = go.LinkingTool.prototype.insertLink.call(this, fromnode, fromport, tonode, toport);
  if (newlink !== null) {
    var model = this.diagram.model;
    // specify the time of the message
    var start = this.temporaryLink.time;
    var duration = 1;
    newlink.data.time = start;
    model.setDataProperty(newlink.data, "text", "msg");
    // and create a new Activity node data in the "to" group data
    var newact = {
      group: newlink.data.to,
      start: start,
      duration: duration
    };
    model.addNodeData(newact);
    // now make sure all Lifelines are long enough
    ensureLifelineHeights();
  }
  return newlink;
};
// end MessagingTool


//MessageDraggingTool的样式设定和相关函数重写
export function MessageDraggingTool() {
  go.DraggingTool.call(this);
}
go.Diagram.inherit(MessageDraggingTool, go.DraggingTool);

// A custom DraggingTool that supports dragging any number of MessageLinks up and down --
    // changing their data.time value.
    function MessageDraggingTool() {
      go.DraggingTool.call(this);
    }
    go.Diagram.inherit(MessageDraggingTool, go.DraggingTool);

    // override the standard behavior to include all selected Links,
    // even if not connected with any selected Nodes
    MessageDraggingTool.prototype.computeEffectiveCollection = function(parts, options) {
      var result = go.DraggingTool.prototype.computeEffectiveCollection.call(this, parts, options);
      // add a dummy Node so that the user can select only Links and move them all
      result.add(new go.Node(), new go.DraggingInfo(new go.Point()));
      // normally this method removes any links not connected to selected nodes;
      // we have to add them back so that they are included in the "parts" argument to moveParts
      parts.each(function(part) {
        if (part instanceof go.Link) {
          result.add(part, new go.DraggingInfo(part.getPoint(0).copy()));
        }
      })
      return result;
    }

    // override to allow dragging when the selection only includes Links
    MessageDraggingTool.prototype.mayMove = function() {
      return !this.diagram.isReadOnly && this.diagram.allowMove;
    }

    // override to move Links (which are all assumed to be MessageLinks) by
    // updating their Link.data.time property so that their link routes will
    // have the correct vertical position
    MessageDraggingTool.prototype.moveParts = function(parts, offset, check) {
      go.DraggingTool.prototype.moveParts.call(this, parts, offset, check);
      var it = parts.iterator;
      while (it.next()) {
        if (it.key instanceof go.Link) {
          var link = it.key;
          var startY = it.value.point.y;  // DraggingInfo.point.y
          var y = startY + offset.y;  // determine new Y coordinate value for this link
          var cellY = this.gridSnapCellSize.height;
          y = Math.round(y / cellY) * cellY;  // snap to multiple of gridSnapCellSize.height
          var t = Math.max(0, convertYToTime(y));
          link.diagram.model.set(link.data, "time", t);
          link.invalidateRoute();
        }
      }
    }
    // end MessageDraggingTool



//接下来是添加回环包的修改
// A custom layout that sizes each "Super" node to be big enough to cover all of it member nodes
export function CustomLayout() {
  go.Layout.call(this);
}
go.Diagram.inherit(CustomLayout, go.Layout);

CustomLayout.prototype.doLayout = function (coll) {
  coll = this.collectParts(coll);

  var supers = new go.Set( /*go.Node*/ );
  coll.each(function (p) {
    if (p instanceof go.Node && p.category === "Super") supers.add(p);
  });

  function membersOf(sup, diag) {
    var set = new go.Set( /*go.Part*/ );
    var arr = sup.data._members;
    for (var i = 0; i < arr.length; i++) {
      var d = arr[i];
      set.add(diag.findNodeForData(d));
    }
    return set;
  }

  function isReady(sup, supers, diag) {
    var arr = sup.data._members;
    for (var i = 0; i < arr.length; i++) {
      var d = arr[i];
      if (d.category !== "Super") continue;
      var n = diag.findNodeForData(d);
      if (supers.has(n)) return false;
    }
    return true;
  }

  // implementations of doLayout that do not make use of a LayoutNetwork
  // need to perform their own transactions
  this.diagram.startTransaction("Custom Layout");

  while (supers.count > 0) {
    var ready = null;
    var it = supers.iterator;
    while (it.next()) {
      if (isReady(it.value, supers, this.diagram)) {
        ready = it.value;
        break;
      }
    }
    supers.remove(ready);
    var b = this.diagram.computePartsBounds(membersOf(ready, this.diagram));
    ready.location = b.position;
    var body = ready.findObject("BODY");
    if (body) body.desiredSize = b.size;
  }

  this.diagram.commitTransaction("Custom Layout");
};
// end CustomLayout


// Define a custom DraggingTool
export function CustomDraggingTool() {
  go.DraggingTool.call(this);
}
go.Diagram.inherit(CustomDraggingTool, go.DraggingTool);

CustomDraggingTool.prototype.moveParts = function (parts, offset, check) {
  go.DraggingTool.prototype.moveParts.call(this, parts, offset, check);
  this.diagram.layoutDiagram(true);
};

CustomDraggingTool.prototype.computeEffectiveCollection = function (parts) {
  var coll = new go.Set( /*go.Part*/ ).addAll(parts);
  var tool = this;
  parts.each(function (p) {
    tool.walkSubTree(p, coll);
  });
  return go.DraggingTool.prototype.computeEffectiveCollection.call(this, coll);
};

// Find other attached nodes.
CustomDraggingTool.prototype.walkSubTree = function (sup, coll) {
  if (sup === null) return;
  coll.add(sup);
  if (sup.category !== "Super") return;
  // recurse through this super state's members
  var model = this.diagram.model;
  var mems = sup.data._members;
  if (mems) {
    for (var i = 0; i < mems.length; i++) {
      var mdata = mems[i];
      this.walkSubTree(this.diagram.findNodeForData(mdata), coll);
    }
  }
};
// end CustomDraggingTool class
