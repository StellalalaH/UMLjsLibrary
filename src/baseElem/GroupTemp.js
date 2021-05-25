class GroupTemp {

  getGroupTemplate() {
    let $ = go.GraphObject.make;
    go.Shape.defineFigureGenerator("Component", function(shape, w, h) {
      var geo = new go.Geometry();
      var fig = new go.PathFigure(w, h, true);
      geo.add(fig);
    
      // Component Box
      fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, 0));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, w, h).close());
      var fig2 = new go.PathFigure(0, 0.2 * h, true);
      geo.add(fig2);
      // Component top sub box
      fig2.add(new go.PathSegment(go.PathSegment.Line, 0.45 * w, 0.2 * h));
      fig2.add(new go.PathSegment(go.PathSegment.Line, 0.45 * w, 0.4 * h));
      fig2.add(new go.PathSegment(go.PathSegment.Line, 0, 0.4 * h));
      fig2.add(new go.PathSegment(go.PathSegment.Line, 0, 0.2 * h).close());
      var fig3 = new go.PathFigure(0, 0.6 * h, true);
      geo.add(fig3);
      // Component bottom sub box
      fig3.add(new go.PathSegment(go.PathSegment.Line, 0.45 * w, 0.6 * h));
      fig3.add(new go.PathSegment(go.PathSegment.Line, 0.45 * w, 0.8 * h));
      fig3.add(new go.PathSegment(go.PathSegment.Line, 0, 0.8 * h));
      fig3.add(new go.PathSegment(go.PathSegment.Line, 0, 0.6 * h).close());
      return geo;
    });
    go.Shape.defineFigureGenerator("Package", function(shape, w, h) {
      var geo = new go.Geometry();
      var fig = new go.PathFigure(0, 0.15 * h, true);
      geo.add(fig);
    
      // Package bottom rectangle
      fig.add(new go.PathSegment(go.PathSegment.Line, w, 0.15 * h));
      fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
      var fig2 = new go.PathFigure(0, 0.15 * h, true);
      geo.add(fig2);
      // Package top flap
      fig2.add(new go.PathSegment(go.PathSegment.Line, 0, 0));
      fig2.add(new go.PathSegment(go.PathSegment.Line, 0.6 * w, 0));
      fig2.add(new go.PathSegment(go.PathSegment.Line, 0.65 * w, 0.15 * h).close());
      geo.spot1 = new go.Spot(0, 0.1);
      geo.spot2 = new go.Spot(1, 1);
      return geo;
    });
    var groupTemplate =
      $(go.Group, "Auto", {
          layout: $(go.LayeredDigraphLayout, {
            direction: 0,
            
            
          })
        },
        $(go.Shape, // surrounds everything
          {
           
            fill: "rgba(128,128,128,0.33)"
          },
          new go.Binding("fill","fill"),
          new go.Binding("figure","figure"),
          new go.Binding("height", "isSubGraphExpanded",
                         function(exp) { return exp ? NaN : 100; } ).ofObject()
          ),
        $(go.Panel, "Vertical", // position header above the subgraph
          {
            defaultAlignment: go.Spot.Left
          },
          $(go.Panel, "Horizontal", // the header
            {
              defaultAlignment: go.Spot.Top
            },
            $("SubGraphExpanderButton"), // this Panel acts as a Button
            $(go.TextBlock, // group title near top, next to button
              {
                font: "Bold 12pt Sans-Serif"
              },
              new go.Binding("text", "GroupName"))
          ),
          $(go.Placeholder, // represents area for all member parts
            {
              padding: 10,
              background: "white"
            },
            new go.Binding("background","background")
            )
        )
      );
    return groupTemplate;

  }
}
export {
  GroupTemp
}
