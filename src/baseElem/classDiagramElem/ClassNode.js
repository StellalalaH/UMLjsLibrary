//var $ = go.GraphObject.make;

class ClassNode {

  constructor() {

    /**
     * 传入数据时数据对应的Key，以下为默认值，
     *  使用库时可采用set和get函数来进行赋值和取值
     */
    //属性名称：（对应的json数据类型是字符串）
    this.classNameDataKey = "className";
    //属性数组
    this.propertiesDataKey = "properties";
    //属性名称（value是json字符串）
    this.propertieNameDataKey = "propertieName";
    //属性权限 ：value是json数字
    //0：public；1，protect 2：private 3：default
    this.propertieVisibilityDataKey = "visibility";
    //属性类型 ：value是json字符串
    //例如："int","double"
    this.propertieTypeDataKey = "type";
    //类方法数组
    this.methodsDataKey = "methods";
    //方法名称：value是json数组
    this.methodNameDataKey = "methodName";
    //方法权限：value是json数字
    //0：public；1，protect 2：private 3：default
    this.methodVisibilityDataKey = "visibility";
    //方法返回类型：：value是json字符串
    this.methodReturnTypeDataKey = "returnType";
    //方法参数数组：value是json数组
    this.methodParametersDataKey = "parameters";
    //参数名称，value是json字符串
    this.methodParamNameDataKey = "name";
    //参数类型，value是json字符串
    this.methodParamTypeDataKey = "type";
    //判断该方法是否为构造函数
    this.methodIsConstructorDataKey = "isConstructor";

    //判断该方法是否为静态函数
    //待补充

    //类的类型，json值是数字
    //0：普通类；1：抽象类；2：接口类
    this.classTypeDataKey = "classType";

    //待确定是否使用
    //
    this.importanceDataKey = "importance";

    //类的分析信息 ，value是json字符串//暂定
    this.annotationDataKey = "annotation";


    /**
     * 不同类显示的属性设置，在构造函数中设置默认值
     * 如在使用时不额外设置将使用默认值
     * 同样可以用get和set函数来查看和设置
     */

    //普通类的显示属性
    this.classBackgroundColor = "#FFF8DC";
    this.classBorderWidth = "3";
    this.classBorderColor = "#000000";

    //抽象类显示属性
    this.abstractClassBackgroundColor = "#FFB6C1";
    this.abstractClassBorderWidth = "3";
    this.abstractClassBorderColor = "#000000";

    //接口类显示属性
    this.interfaceBackgroundColor = "#6495ED";
    this.interfaceBorderWidth = "3";
    this.interfaceBorderColor = "#000000";

    //分析信息显示属性
    this.annotationBackgroundColor = "#E6E6FA"
  }

  /**
   * 对象属性的get函数，用于外界访问
   */

  getClassNameDataKey() {
    return this.classNameDataKey;
  }
  getPropertiesDataKey() {
    return this.propertiesDataKey;
  }
  getPropertieNameDataKey() {
    return this.propertieNameDataKey;
  }
  getPropertieVisibilityDataKey() {
    return this.propertieVisibilityDataKey;
  }
  getPropertieTypeDataKey() {
    return this.propertieTypeDataKey;
  }
  getMethodsDataKey() {
    return this.methodsDataKey;
  }
  getMethodNameDataKey() {
    return this.methodNameDataKey;
  }
  getMethodVisibilityDataKey() {
    return this.methodVisibilityDataKey;
  }
  getMethodReturnTypeDataKey() {
    return this.methodReturnTypeDataKey;
  }
  getMethodParametersDataKey() {
    return this.methodParametersDataKey;
  }
  getMethodParamNameDataKey() {
    return this.methodParamNameDataKey;
  }
  getMethodParamTypeDataKey() {
    return this.methodParamTypeDataKey;
  }
  getMethodIsConstructorDataKey() {
    return this.methodIsConstructorDataKey;
  }
  getClassTypeDataKey() {
    return this.classTypeDataKey;
  }
  getImportanceDataKey() {
    return this.importanceDataKey;
  }
  getAnnotationDataKey() {
    return this.annotationDataKey;
  }

  //普通类显示属性
  getClassBackgroundColor() {
    return this.classBackgroundColor;
  }
  getClassBorderWidth() {
    return this.classBorderWidth;
  }
  getClassBorderColor() {
    return this.classBorderColor;
  }

  //抽象类显示属性
  getAbstractClassBackgroundColor() {
    return this.abstractClassBackgroundColor;
  }
  getAbstractClassBorderWidth() {
    return this.abstractClassBorderWidth;
  }
  getAbstractClassBorderColor() {
    return this.abstractClassBorderColor;
  }

  //接口类显示属性
  getInterfaceBackgroundColor() {
    return this.interfaceBackgroundColor;
  }
  getInterfaceBorderWidth() {
    return this.interfaceBorderWidth;
  }
  getInterfaceBorderColor() {
    return this.interfaceBorderColor;
  }

  //分析信息显示属性
  getAnnotationBackgroundColor() {
    return this.annotationBackgroundColor;
  }

  /**
   * 
   * 对象属性的set函数
   * 用于使用库时设置属性值 
   */

  /**
   * 
   * @param {string} keyStr 
   */
  setClassNameDataKey(keyStr) {
    this.classNameDataKey = keyStr;
  }
  setPropertiesDataKey(keyStr) {
    this.propertiesDataKey = keyStr;
  }
  setPropertieNameDataKey(keyStr) {
    this.propertieNameDataKey = keyStr;
  }
  setPropertieVisibilityDataKey(keyStr) {
    this.propertieVisibilityDataKey = keyStr;
  }
  setPropertieTypeDataKey(keyStr) {
    this.propertieTypeDataKey = keyStr;
  }
  setMethodsDataKey(keyStr) {
    this.methodsDataKey = keyStr;
  }
  setMethodNameDataKey(keyStr) {
    this.methodNameDataKey = keyStr;
  }
  setMethodVisibilityDataKey(keyStr) {
    this.methodVisibilityDataKey = keyStr;
  }
  setMethodReturnTypeDataKey(keyStr) {
    this.methodReturnTypeDataKey = keyStr;
  }
  setMethodParametersDataKey(keyStr) {
    this.methodParametersDataKey = keyStr;
  }
  setMethodParamNameDataKey(keyStr) {
    this.methodParamNameDataKey = keyStr;
  }
  setMethodParamTypeDataKey(keyStr) {
    this.methodParamTypeDataKey = keyStr;
  }
  setMethodIsConstructorDataKey(keyStr) {
    this.methodIsConstructorDataKey = keyStr;
  }
  setClassTypeDataKey(keyStr) {
    this.classTypeDataKey = keyStr;
  }
  setImportanceDataKey(keyStr) {
    this.importanceDataKey = keyStr;
  }
  setAnnotationDataKey(keyStr) {
    this.annotationDataKey = keyStr;
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
    this.classBackgroundColor = colorStr;
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
    this.classBorderWidth = widthNumStr;
  }
  setClassBorderColor(colorStr) {
    this.classBorderColor = colorStr;
  }

  //抽象类显示属性
  setAbstractClassBackgroundColor(colorStr) {
    this.abstractClassBackgroundColor = colorStr;
  }
  setAbstractClassBorderWidth(widthNumStr) {
    this.abstractClassBorderWidth = widthNumStr;
  }
  setAbstractClassBorderColor(colorStr) {
    this.abstractClassBorderColor = colorStr;
  }

  //接口类显示属性
  setInterfaceBackgroundColor(colorStr) {
    this.interfaceBackgroundColor = colorStr;
  }
  setInterfaceBorderWidth(widthNumStr) {
    this.interfaceBorderWidth = widthNumStr;
  }
  setInterfaceBorderColor(colorStr) {
    this.interfaceBorderColor = colorStr;
  }

  //分析信息显示属性
  setAnnotationBackgroundColor(colorStr) {
    this.annotationBackgroundColor = colorStr;
  }

  //显示方法的visibility
  convertVisibility(v) {
    switch (v) {
      case 0:
        return "+";
      case 1:
        return "#";
      case 2:
        return "-";
      case 3:
        return "~";
      default:
        return "~";
    }
  }

  //定义鼠标在节点上悬停显示的模板
  getInfoTemplate() {
    let $ = go.GraphObject.make;
    var tooltiptemplate =
      $("ToolTip", {
          "Border.fill": this.annotationBackgroundColor,
          "Border.stroke": "black",
        },
        $(go.Panel, {
            background: this.annotationBackgroundColor
          },
          $(go.TextBlock, {
              font: "bold 12pt Helvetica, bold Arial, sans-serif",
              wrap: go.TextBlock.WrapFit,
              margin: 5,

            },
            new go.Binding("text", "otherInfo"))
        )
      )
    return tooltiptemplate;
  }

  //定义类属性的模板
  getPropertyTemplate() {
    let $ = go.GraphObject.make;
    var propertyTemplate = $(go.Panel, "Horizontal",
      // property visibility/access
      $(go.TextBlock, {
          isMultiline: false,
          editable: false,
          width: 12,
          stroke: "Black"
        },
        new go.Binding("text", this.propertieVisibilityDataKey, this.convertVisibility)),
      // property name, underlined if scope=="class" to indicate static property
      $(go.TextBlock, {
          isMultiline: false,
          editable: true
        },
        new go.Binding("text", this.propertieNameDataKey).makeTwoWay(),
        new go.Binding("isUnderline", "scope", function (s) {
          return s[0] === 'c'
        })),
      // property type, if known
      $(go.TextBlock, "",
        new go.Binding("text", this.propertieTypeDataKey, function (t) {
          return (t ? ": " : "");
        })),
      $(go.TextBlock, {
          isMultiline: false,
          editable: true
        },
        new go.Binding("text", this.propertieTypeDataKey).makeTwoWay()),
      // property default value, if any
      $(go.TextBlock, {
          isMultiline: false,
          editable: false
        },
        new go.Binding("text", "default", function (s) {
          return s ? " = " + s : "";
        }))
    );
    return propertyTemplate;
  }
  //定义方法的模板
  getMethodTemplate() {
    let $ = go.GraphObject.make;
    var methodTemplate = $(go.Panel, "Horizontal",
      // method visibility/access
      $(go.TextBlock, {
          isMultiline: false,
          editable: false,
          width: 12
        },
        new go.Binding("text", this.methodVisibilityDataKey, this.convertVisibility)),
      // method name, underlined if scope=="class" to indicate static method
      $(go.TextBlock, {
          isMultiline: false,
          editable: true
        },
        new go.Binding("text", this.methodNameDataKey).makeTwoWay(),
        new go.Binding("isUnderline", "scope", function (s) {
          return s[0] === 'c'
        })),
      // method parameters
      $(go.TextBlock, "()",
        // this does not permit adding/editing/removing of parameters via inplace edits
        new go.Binding("text", this.methodParametersDataKey, function (parr) {
          var s = "(";
          for (var i = 0; i < parr.length; i++) {
            var param = parr[i];
            if (i > 0) s += ", ";
            s += param.name + ": " + param.type;
          }
          return s + ")";
        })),
      // method return type, if any
      $(go.TextBlock, "",
        new go.Binding("text", this.methodParamTypeDataKey, function (t) {
          return (t ? ": " : "");
        })),
      $(go.TextBlock, {
          isMultiline: false,
          editable: true
        },
        new go.Binding("text", this.methodReturnTypeDataKey).makeTwoWay())
    );

    return methodTemplate;
  }

  //定义普通类的模板，在文件ClassDiagram中被调用组成Map
  getNormalClassTemplate() {
    let $ = go.GraphObject.make;
    var normalClassTemplate = $(go.Node, "Auto", {
        locationSpot: go.Spot.Center,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
        //stroke: "#00A9C9",
        toolTip: this.getInfoTemplate(),
      },
      $(go.Shape,
        //定义边框的宽度
        {
          stroke: this.classBorderColor,
          strokeWidth: this.classBorderWidth,
          fill: this.classBackgroundColor
        }
      ),
      $(go.Panel, "Table", {
          defaultRowSeparatorStroke: "black"
        },
        // header
        $(go.Panel, "Vertical", {
            row: 0,
            columnSpan: 1,
            margin: 3,
            alignment: go.Spot.Center,
          },

          $(go.TextBlock, {
              row: 0,
              columnSpan: 2,
              margin: 3,
              alignment: go.Spot.Center,
              font: "bold 12pt sans-serif",
              isMultiline: false,
              editable: true
            },
            new go.Binding("text", this.classNameDataKey).makeTwoWay()),
        ),
        // properties
        $(go.TextBlock, "Properties", {
            row: 1,
            font: "italic 10pt sans-serif",
            //margin: this.classBorderWidth
          },
          new go.Binding("visible", "visible", function (v) {
            return !v;
          }).ofObject("PROPERTIES")),
        $(go.Panel, "Vertical", {
            name: "PROPERTIES",
            background: this.classBackgroundColor

          },
          new go.Binding("itemArray", this.propertiesDataKey), {
            row: 1,
            margin: parseInt(this.classBorderWidth),
            stretch: go.GraphObject.Fill,
            defaultAlignment: go.Spot.Left,
            //background: "lightyellow",
            itemTemplate: this.getPropertyTemplate()
          },
        ),
        $("PanelExpanderButton", "PROPERTIES", {
            row: 1,
            column: 1,
            alignment: go.Spot.TopRight,
            visible: false
          },
          new go.Binding("visible", this.propertiesDataKey, function (arr) {
            return arr.length > 0;
          })),
        // methods
        $(go.TextBlock, "Methods", {
            row: 2,
            font: "italic 10pt sans-serif"
          },
          new go.Binding("visible", "visible", function (v) {
            return !v;
          }).ofObject("METHODS")),
        $(go.Panel, "Vertical", {
            name: "METHODS"
          },
          new go.Binding("itemArray", this.methodsDataKey), {
            row: 2,
            margin: parseInt(this.classBorderWidth),
            stretch: go.GraphObject.Fill,
            defaultAlignment: go.Spot.Left,
            background: this.classBackgroundColor,
            itemTemplate: this.getMethodTemplate()
          },
        ),
        $("PanelExpanderButton", "METHODS", {
            row: 2,
            column: 1,
            alignment: go.Spot.TopRight,
            visible: false
          },
          new go.Binding("visible", this.methodsDataKey, function (arr) {
            return arr.length > 0;
          }))

      ))
    return normalClassTemplate;
  }

  //定义抽象类的模板
  getAbstractClassTemplate() {
    let $ = go.GraphObject.make;
    var abstractClassTemplate = $(go.Node, "Auto", {
        locationSpot: go.Spot.Center,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
        //fill: this.abstractClassBackgroundColor,
        toolTip: this.getInfoTemplate(),
      },
      $(go.Shape,
        //定义边框的宽度、颜色
        {
          stroke: this.abstractClassBorderColor,
          strokeWidth: this.abstractClassBorderWidth,
          fill: this.abstractClassBackgroundColor
        }
      ),
      $(go.Panel, "Table", {
          defaultRowSeparatorStroke: "black"
        },

        $(go.Panel, "Vertical", {
            row: 0,
            columnSpan: 1,
            margin: 3,
            alignment: go.Spot.Center,
          },
          //如果是特殊类就显示这一行:Abstract/Interface
          $(go.TextBlock, {
              alignment: go.Spot.Center,
              margin: 5,
              font: "Italic normal normal 12px Georgia, Serif",
              isMultiline: false,
              editable: true,
              text: "<<Abstract>>"
            },

          ),
          $(go.TextBlock, {
              row: 0,
              columnSpan: 2,
              margin: 3,
              alignment: go.Spot.Center,
              font: "bold 12pt sans-serif",
              isMultiline: false,
              editable: true
            },
            new go.Binding("text", this.classNameDataKey).makeTwoWay()),
        ),
        // properties
        $(go.TextBlock, "Properties", {
            row: 1,
            font: "italic 10pt sans-serif"
          },
          new go.Binding("visible", "visible", function (v) {
            return !v;
          }).ofObject("PROPERTIES")),
        $(go.Panel, "Vertical", {
            name: "PROPERTIES"
          },
          new go.Binding("itemArray", this.propertiesDataKey), {
            row: 1,
            margin: parseInt(this.abstractClassBorderWidth),
            stretch: go.GraphObject.Fill,
            defaultAlignment: go.Spot.Left,
            background: this.abstractClassBackgroundColor,
            itemTemplate: this.getPropertyTemplate()
          },
          //new go.Binding("background", "classType", this.getColor),
        ),
        $("PanelExpanderButton", "PROPERTIES", {
            row: 1,
            column: 1,
            alignment: go.Spot.TopRight,
            visible: false
          },
          new go.Binding("visible", this.propertiesDataKey, function (arr) {
            return arr.length > 0;
          })),
        // methods
        $(go.TextBlock, "Methods", {
            row: 2,
            font: "italic 10pt sans-serif"
          },
          new go.Binding("visible", "visible", function (v) {
            return !v;
          }).ofObject("METHODS")),
        $(go.Panel, "Vertical", {
            name: "METHODS"
          },
          new go.Binding("itemArray", this.methodsDataKey), {
            row: 2,
            margin: parseInt(this.abstractClassBorderWidth),
            stretch: go.GraphObject.Fill,
            defaultAlignment: go.Spot.Left,
            background: this.abstractClassBackgroundColor,
            itemTemplate: this.getMethodTemplate()
          },
          // new go.Binding("background", "classType", this.getColor),
        ),
        $("PanelExpanderButton", "METHODS", {
            row: 2,
            column: 1,
            alignment: go.Spot.TopRight,
            visible: false
          },
          new go.Binding("visible", this.methodsDataKey, function (arr) {
            return arr.length > 0;
          }))

      ))
    return abstractClassTemplate;
  }

  //定义接口的模板
  getInterfaceTemplate() {
    let $ = go.GraphObject.make;
    var interfaceTemplate = $(go.Node, "Auto", {
        locationSpot: go.Spot.Center,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,

        toolTip: this.getInfoTemplate(),
      },
      $(go.Shape,
        //定义边框的宽度、颜色
        {
          fill: this.interfaceBackgroundColor,
          stroke: this.interfaceBorderColor,
          strokeWidth: this.interfaceBorderWidth
        }
      ),
      $(go.Panel, "Table", {
          defaultRowSeparatorStroke: "black"
        },

        $(go.Panel, "Vertical", {
            row: 0,
            columnSpan: 1,
            margin: 3,
            alignment: go.Spot.Center,
          },
          //如果是特殊类就显示这一行:Abstract/Interface
          $(go.TextBlock, {
              alignment: go.Spot.Center,
              margin: 5,
              font: "Italic normal normal 12px Georgia, Serif",
              isMultiline: false,
              editable: true,
              text: "<<Interface>>"
            },

          ),
          $(go.TextBlock, {
              row: 0,
              columnSpan: 2,
              margin: 3,
              alignment: go.Spot.Center,
              font: "bold 12pt sans-serif",
              isMultiline: false,
              editable: true
            },
            new go.Binding("text", this.classNameDataKey).makeTwoWay()),
        ),
        // properties
        $(go.TextBlock, "Properties", {
            row: 1,
            font: "italic 10pt sans-serif"
          },
          new go.Binding("visible", "visible", function (v) {
            return !v;
          }).ofObject("PROPERTIES")),
        $(go.Panel, "Vertical", {
            name: "PROPERTIES"
          },
          new go.Binding("itemArray", this.propertiesDataKey), {
            row: 1,
            margin: parseInt(this.interfaceBorderWidth),
            stretch: go.GraphObject.Fill,
            defaultAlignment: go.Spot.Left,
            background: this.interfaceBackgroundColor,
            itemTemplate: this.getPropertyTemplate()
          },
          //new go.Binding("background", "classType", this.getColor),
        ),
        $("PanelExpanderButton", "PROPERTIES", {
            row: 1,
            column: 1,
            alignment: go.Spot.TopRight,
            visible: false
          },
          new go.Binding("visible", this.propertiesDataKey, function (arr) {
            return arr.length > 0;
          })),
        // methods
        $(go.TextBlock, "Methods", {
            row: 2,
            font: "italic 10pt sans-serif"
          },
          new go.Binding("visible", "visible", function (v) {
            return !v;
          }).ofObject("METHODS")),
        $(go.Panel, "Vertical", {
            name: "METHODS"
          },
          new go.Binding("itemArray", this.methodsDataKey), {
            row: 2,
            margin: parseInt(this.interfaceBorderWidth),
            stretch: go.GraphObject.Fill,
            defaultAlignment: go.Spot.Left,
            background: this.interfaceBackgroundColor,
            itemTemplate: this.getMethodTemplate()
          },
          // new go.Binding("background", "classType", this.getColor),
        ),
        $("PanelExpanderButton", "METHODS", {
            row: 2,
            column: 1,
            alignment: go.Spot.TopRight,
            visible: false
          },
          new go.Binding("visible", this.methodsDataKey, function (arr) {
            return arr.length > 0;
          }))

      ))
    return interfaceTemplate;
  }


  //调用创建三种类模板的函数，组成Map
  //返回Map
  getClassTemplateMap() {
    let $ = go.GraphObject.make;
    var classTemplateMap = new go.Map();
    classTemplateMap.add("class", this.getNormalClassTemplate());
    classTemplateMap.add("abstractClass", this.getAbstractClassTemplate());
    classTemplateMap.add("interface", this.getInterfaceTemplate());
    return classTemplateMap;
  }
}

export {
  ClassNode
}
