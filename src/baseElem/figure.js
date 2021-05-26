'use strict';
/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/

// This file holds definitions of all standard shape figures -- string values for Shape.figure.
// You do not need to load this file in order to use named Shape figure.

// The following figures are built-in to the go.js library and thus do not need to be redefined:
//   Rectangle, Square, RoundedRectangle, Border, Ellipse, Circle,
//   TriangleRight, TriangleDown, TriangleLeft, TriangleUp, Triangle,
//   LineH, LineV, None, BarH, BarV, MinusLine, PlusLine, XLine
// If you need any of the other figures that are defined in this file, we suggest that you copy
// just those definitions into your own code.  Do not load this file unless you really want to
// define a lot of code that your app does not use and will not get garbage-collected.

// The following functions and variables are used throughout this file:

/**
* @constructor
* @param {string} name
* @param {number} def
* @param {number=} min defaults to zero
* @param {number=} max defaults to Infinity
* @class
* This FigureParameter class describes various properties each parameter uses in figures.
*/
function FigureParameter(name, def, min, max) {
  if (min === undefined/*notpresent*/) min = 0.0;
  if (max === undefined/*notpresent*/) max = Infinity;
  /** @type {string} */
  this._name = name;
  /** @type {number} */
  this._defaultValue = def;
  /** @type {number} */
  this._minimum = min;
  /** @type {number} */
  this._maximum = max;
};

// Public properties

/**
* Gets or sets the name of the figure.
* @name FigureParamater#name

* @return {string}
*/
Object.defineProperty(FigureParameter.prototype, "name", {
  get: function() { return this._name; },
  set: function(val) {
    if (typeof val !== "string" || val === "") throw new Error("Shape name must be a valid string.");
    this._name = val;
  }
});

/**
* Gets or sets the default value for the parameter.
* @name FigureParameter#defaultValue
* @function
* @return {number}
*/
Object.defineProperty(FigureParameter.prototype, "defaultValue", {
  get: function() { return this._defaultValue; },
  set: function(val) {
    if (typeof val !== "number" || isNaN(val)) throw new Error("The default value must be a real number, not: " + val);
    this._defaultValue = val;
  }
});

/**
* Gets or sets the minimum value allowed for the figure parameter.
* @name FigureParameter#minimum

* @return {number}
*/
Object.defineProperty(FigureParameter.prototype, "minimum", {
  get: function() { return this._minimum; },
  set: function(val) {
    if (typeof val !== "number" || isNaN(val)) throw new Error("Minimum must be a real number, not: " + val);
    this._minimum = val;
  }
});

/**
* Gets or sets the maximum value allowed for the figure parameter.
* @name FigureParameter#maximum

* @return {number}
*/
Object.defineProperty(FigureParameter.prototype, "maximum", {
  get: function() { return this._maximum; },
  set: function(val) {
    if (typeof val !== "number" || isNaN(val)) throw new Error("Maximum must be a real number, not: " + val);
    this._maximum = val;
  }
});


go.Shape._FigureParameters = {};

/*
* This static function gets a FigureParameter for a particular figure name.
* @param {String} figurename
* @param {number} index, currently must be either 0 or 1
* @return {FigureParameter}
*/
go.Shape.getFigureParameter = function(figurename, index) {
  var arr = go.Shape._FigureParameters[figurename];
  if (!arr) return null;
  return /** @type {FigureParmeter} */ (arr[index]);
};

/*
* This static function sets a FigureParameter for a particular figure name.
* @param {String} figurename
* @param {number} index, currently must be either 0 or 1
* @param {FigureParameter} figparam
*/
go.Shape.setFigureParameter = function(figurename, index, figparam) {
  if (!(figparam instanceof FigureParameter)) throw new Error("Third argument to Shape.setFigureParameter is not FigureParameter: " + figparam);
  if (figparam.defaultValue < figparam.minimum || figparam.defaultValue > figparam.maximum) throw new Error("defaultValue must be between minimum and maximum, not: " + figparam.defaultValue);
  var arr = go.Shape._FigureParameters[figurename];
  if (!arr) {
    arr = [];
    go.Shape._FigureParameters[figurename] = arr;
  }
  arr[index] = figparam;
};


/** @ignore */
var _CachedPoints = [];

/**
* @ignore
* @param {number} x
* @param {number} y
* @return {Point}
*/
function tempPointAt(x, y) {
  var temp = _CachedPoints.pop();
  if (temp === undefined) return new go.Point(x, y);
  temp.x = x;
  temp.y = y;
  return temp;
};

/**
* @ignore
* @return {Point}
*/
function tempPoint() {
  var temp = _CachedPoints.pop();
  if (temp === undefined) return new go.Point();
  return temp;
};

/**
  * @ignore
  * @param {Point} temp
  */
function freePoint(temp) {
  _CachedPoints.push(temp);
};

/**
* @ignore
* @param {number} p1x
* @param {number} p1y
* @param {number} p2x
* @param {number} p2y
* @param {number} q1x
* @param {number} q1y
* @param {number} q2x
* @param {number} q2y
* @param {Point} result
* @return {Point}
*/
function getIntersection(p1x, p1y, p2x, p2y, q1x, q1y, q2x, q2y, result) {
  var dx1 = p1x - p2x;
  var dx2 = q1x - q2x;
  var x;
  var y;

  if (dx1 === 0 || dx2 === 0) {
    if (dx1 === 0) {
      var m2 = (q1y - q2y) / dx2;
      var b2 = q1y - m2 * q1x;
      x = p1x;
      y = m2 * x + b2;
    }
    else {
      var m1 = (p1y - p2y) / dx1;
      var b1 = p1y - m1 * p1x;
      x = q1x;
      y = m1 * x + b1;
    }
  }
  else {
    var m1 = (p1y - p2y) / dx1;
    var m2 = (q1y - q2y) / dx2;
    var b1 = p1y - m1 * p1x;
    var b2 = q1y - m2 * q1x;

    x = (b2 - b1) / (m1 - m2);
    y = m1 * x + b1;
  }

  result.x = x;
  result.y = y;
  return result;
};

/**
* @ignore
* @param {number} startx
* @param {number} starty
* @param {number} c1x
* @param {number} c1y
* @param {number} c2x
* @param {number} c2y
* @param {number} endx
* @param {number} endy
* @pararm {number} fraction
* @param {Point} curve1cp1  // modified result control point
* @param {Point} curve1cp2  // modified result control point
* @param {Point} midpoint  // modified result
* @param {Point} curve2cp1  // modified result control point
* @param {Point} curve2cp2  // modified result control point
*/
function breakUpBezier(startx, starty, c1x, c1y, c2x, c2y, endx, endy, fraction,
                       curve1cp1, curve1cp2, midpoint, curve2cp1, curve2cp2) {
  var fo = 1 - fraction;
  var so = fraction;
  var m1x = (startx * fo + c1x * so);
  var m1y = (starty * fo + c1y * so);
  var m2x = (c1x * fo + c2x * so);
  var m2y = (c1y * fo + c2y * so);
  var m3x = (c2x * fo + endx * so);
  var m3y = (c2y * fo + endy * so);
  var m12x = (m1x * fo + m2x * so);
  var m12y = (m1y * fo + m2y * so);
  var m23x = (m2x * fo + m3x * so);
  var m23y = (m2y * fo + m3y * so);
  var m123x = (m12x * fo + m23x * so);
  var m123y = (m12y * fo + m23y * so);

  curve1cp1.x = m1x;
  curve1cp1.y = m1y;

  curve1cp2.x = m12x;
  curve1cp2.y = m12y;

  midpoint.x = m123x;
  midpoint.y = m123y;

  curve2cp1.x = m23x;
  curve2cp1.y = m23y;

  curve2cp2.x = m3x;
  curve2cp2.y = m3y;
};

var GeneratorEllipseSpot1 = new go.Spot(0.156, 0.156);

var GeneratorEllipseSpot2 = new go.Spot(0.844, 0.844);

var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);


//定义图像
go.Shape.defineFigureGenerator("LogicAnd", function(shape, w, h) {
    return new go.Geometry()
           .add(new go.PathFigure(0, h, false)
                .add(new go.PathSegment(go.PathSegment.Line, .5 * w, 0))
                .add(new go.PathSegment(go.PathSegment.Line, w, h)))
           .setSpots(0.25, 0.5, 0.75, 1);
  });
go.Shape.defineFigureGenerator("LogicImplies", function(shape, w, h) {
  var param1 = shape ? shape.parameter1 : NaN;
  if (isNaN(param1)) param1 = .2;  // Distance the arrow folds from the right
  return new go.Geometry()
         .add(new go.PathFigure((1 - param1) * w, 0, false)
              .add(new go.PathSegment(go.PathSegment.Line, w, .5 * h))
              .add(new go.PathSegment(go.PathSegment.Line, (1 - param1) * w, h))
              .add(new go.PathSegment(go.PathSegment.Move, 0, .5 * h))
              .add(new go.PathSegment(go.PathSegment.Line, w, .5 * h)))
         .setSpots(0, 0, 0.8, 0.5);
});
go.Shape.defineFigureGenerator("BpmnActivityLoop", function(shape, w, h) {
    var geo = new go.Geometry();
    var r = .5;
    var cx = 0; // offset from Center x
    var cy = 0; // offset from Center y
    var d = r * KAPPA;
    var mx1 = (.4 * Math.SQRT2 / 2 + .5);
    var my1 = (.5 - .5 * Math.SQRT2 / 2);
    var x1 = 1;
    var y1 = .5;
    var x2 = .5;
    var y2 = 0;
    var fig = new go.PathFigure(mx1 * w, (1 - my1) * h, false);
    geo.add(fig);
  
    fig.add(new go.PathSegment(go.PathSegment.Bezier, x1 * w, y1 * h, x1 * w, .7 * h,
    x1 * w, y1 * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, (x2 + cx) * w, (y2 + cx) * h, (.5 + r + cx) * w, (.5 - d + cx) * h,
    (.5 + d + cx) * w, (.5 - r + cx) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, (.5 - r + cx) * w, (.5 + cy) * h, (.5 - d + cx) * w, (.5 - r + cy) * h,
    (.5 - r + cx) * w, (.5 - d + cy) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, (.35 + cx) * w, .9 * h, (.5 - r + cx) * w, (.5 + d + cy) * h,
    (.5 - d + cx) * w, .9 * h));
    // Arrowhead
    fig.add(new go.PathSegment(go.PathSegment.Move, (.25 + cx) * w, 0.8 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, (.35 + cx) * w, 0.9 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, (.20 + cx) * w, 0.95 * h));
    return geo;
  });