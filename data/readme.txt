visibility   int 权限，0：公有；1：保护；2：私有；3，default（包权限）
classType	int	类的类型，0：普通类；1：抽象类；2：接口类
relaType	int	关联关系类型，1：关联；2：依赖，
             3:继承，4：实现，5：聚合 6:组合
Importance  int 表示类的重要性，用于类图中边框颜色的确定
                1到3，重要性依次降低
otherinfo string 连接的标注信息（非必需）
degree int(0-100) 连接的某种属性程度，反映在连接的粗细长度改变上（非必需）