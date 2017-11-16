# 跨Container传值

加入有下面这样的业务场景，

![QQ20171115-192322](https://ws1.sinaimg.cn/large/006tNc79ly1flizqs6lmzj30gd0h1js2.jpg)

用户可以通过上面的输入框，下拉框，时间选择器来选定查询调用。 然后点击查询按钮之后，更新下面的表格内容。

使用RCRE，我们需要这样的思考方式。如果组件和组件之间的数据都是可以同享，不需要做任何鼠标键盘操作的，就可以放置在一个container下面。

在这个例子中，需求是用户点击了鼠标才会刷新下面的表格，而直接在输入框中输入内容，是不需要刷新表格的。

可见，输入框的数据和表格刷新查询用的数据是相互依赖的。因此就需要将他们分开。使用2个container来分别持有查询，和表格的数据。

再按钮上面加个`trigger`事件处理，然后拿到提交时传递的数据并递交到`DataCustomer`上，

再通过`DataCustomer`把数据传递到下面的Table所依赖的`container`组件

## 代码演示

{{demo}}

----
