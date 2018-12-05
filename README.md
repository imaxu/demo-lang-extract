# Javascript I18N javascript国际化方案

本项目提供了一个js脚本以及一组python实用工具，以此来解决web项目前端国际化中js部分的需求。

### 用法
1. 在页面合适的位置引入js资源，应保证`enjoy.common.i18n.js`出现在待翻译脚本之前。
```html
    <script type="text/javascript" src="../vendors/enjoy/enjoy.common.i18n.js"></script>
```
2. 为项目js文件中待翻译的文本增加函数标记
```javascript
    var text = "测试文本";  ===>  var text = lang("测试文本");
```
3. 使用实用工具对js中的可翻译文本进行提取
```bash
    python lang_extract.py --source=..\sample\scripts\ --export=..\i18n\ --lang=us-en
```
4. 将生成的国际化jsw资源文件引入到项目中，请保证引入的位置在`enjoy.common.i18n.js`之前。
```html
    <script type="text/javascript" src="../i18n/us-en.js"></script>
```
