# vue-tree-component

之前遇到过动态增减二叉树的场景，用的别人的库，但在使用过程中，发现难以和现有的需求吻合且十分难扩展， 因此我一并将此类Vue相关树形组件进行了一些封装，包括了展示树，二叉树，树，下拉选择树，树形表，二叉表等。

1.展示树：
用于平铺树形结构，可以动态增加减少节点。

![image](https://github.com/xiamingwei/vue-tree-component/blob/master/src/assets/trees/tree.png)

```
Api

datas: 
    nodes: 数据项
    lazy: 是否开启懒加载
    options: 配置项,  是一个对象, 包括如下
            label: 节点名, 默认为name
            recursion: 递归名, 默认为children
            expandLabel: 展开标识符, 默认为expand
methods: 
    @on-expand: 展开/收缩时候的回调, 返回值为当前节点的信息
    @loading-node: 懒加载调用方法
```

2.动态二叉树：
用于二叉决策，可以动态增加减少节点。

![image](https://github.com/xiamingwei/vue-tree-component/blob/master/src/assets/trees/binary-tree.png)

```
Api
    注意： 二叉节点key值根据二进制对应，例如第二层为：0 1 第三层所有节点为：00 01 10 11 ...
           若没有path, 则调用方法common/util/setPath去生成
    
datas: 
    nodes: 数据项
    options: 配置项,  是一个对象, 包括如下
		label: 节点名, 默认为name
		recursion: 递归名, 默认为children
            
methods: 
    @add-node: 点击某节点新增节点时, 返回参数为当前节点, 其下左子节点需要的路径, 其下右节点需要的路径, 自己按照场景组装
    @remove-node: 点击某节点删除节点时, 返回参数为当前节点父节点, 会删除另一个兄弟节点
    @select-node: 点击某节点, 返回参数为当前节点信息
```
3.折叠树：
用于展示属性结构，可配置右键操作项

![image](https://github.com/xiamingwei/vue-tree-component/blob/master/src/assets/trees/folder-tree.png)

```
Api
    
datas: 
    nodes: 数据项
    isMenu: 是否显示右边菜单栏, 默认是
    options: 配置项,  是一个对象, 包括如下
        label: 节点名, 默认为name
        recursion: 递归名, 默认为children
        expandLabel: 节点展开表示符, 默认值为expand,
        menuList为菜单右键菜单操作项, 其value为操作key值, label为显示名称,

methods: 
    @select-node: 点击某节点回调, 返回当前节点信息
    @select-menu: 点击某菜单项的选项, 返回 菜单的标识和当前节点信息
```

4.下拉选择树：
用于选择树形展示属性结构

![image](https://github.com/xiamingwei/vue-tree-component/blob/master/src/assets/trees/drop-tree.png)

```
Api

datas: 
    nodes: 数据项
    options: 配置项,  是一个对象, 包括如下
        label: 节点名, 默认为name
        recursion: 递归名, 默认为children
        expandLabel: 节点展开表示符, 默认值为expand
        clearable: 是否显示清除图标
        
methods: 
    @select-node: 点击某节点回调，返回当前节点信息
    @on-change: 每次变化时的回调, 返回变化的path值
```

5.树形表:
用于展示树形表，树的行信息扩展

![image](https://github.com/xiamingwei/vue-tree-component/blob/master/src/assets/trees/tree-table.png)

```
Api

datas: 
    nodes: 数据项
    columns: [] 列名
        key值为必填的字段标识
        title值为列中文名
        支持render函数写法, 因为是针对树形表所以在params中返回的参数 有当前节点信息, 其父级信息, 当前节点在父级中的索引。 根节点父级为root

    options: 配置项,  是一个对象, 包括如下
        recursion: 递归名, 默认为children
        expandLabel: 展开标识符, 默认为expand
     
methods: 
    @select-row: 点击某行, 返回当前行的信息, 第一个参数为当前行的信息, 第二个参数为其父节点便于删除的时候使用
```

6.动态二叉表:
用于二叉决策，是二叉决策表的另一种展现形式

![image](https://github.com/xiamingwei/vue-tree-component/blob/master/src/assets/trees/binary-tree.png)

```
Api
  
datas: 
    nodes: 数据项
    options: 配置项,  是一个对象, 包括如下
        label: 节点名, 默认为name
        recursion: 递归名, 默认为children
      
methods: 
    @onAddNode: 增加一个节点的回调
```
