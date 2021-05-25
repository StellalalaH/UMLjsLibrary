class DataManager {

  /**
   * 为读取到的类节点数据添加category属性，以便能正确渲染
   * 
   * 由于使用了Map和gojs库本身的限制，渲染节点时使用map的哪一项要
   * 由json数据中的category属性来决定
   * 所以要调用数据处理函数，为json数据添加该属性并赋予相应的值
   * 官网相关内容网址：https://gojs.net/latest/intro/templateMaps.html
   * 
   * @param {string} classTypeDataKey  
   * json数据中代表类类型的key，Example：“classType”
   * @param {Array} classTypeValueArray   
   * 长度为三，数据中【值-类的类型】对应的数组。在数据中，键classTypeDataKey的值为classTypeValueArray[0],classTypeValueArray[1],classTypeValueArray[2]
   * 对应该节点的类类型为：普通类，抽象类，接口类
   * Example: var classTypeValueArray = [0, 1, 2];
   * @param {JSON 对象} json 
   * 读取到的数据，json
   */
  addCategoryToData(classTypeDataKey, classTypeValueArray, json) {
    var i;
    //便利对象数组中的每一个元素
    for (i in json) {
      switch (json[i][classTypeDataKey]) {
        //根据数据本身的值，为类元素的数据添加category属性并附上相应的值。
        case classTypeValueArray[0]:
          json[i]["category"] = "class";
          continue;
        case classTypeValueArray[1]:
          json[i]["category"] = "abstractClass";
          continue;
        case classTypeValueArray[2]:
          json[i]["category"] = "interface";
          continue;
      }
    }
    //这里引用类型传共享调用，所以不需要返回值，上面的数据修改是在原对象上进行的
  }
}
export {
  DataManager
}
