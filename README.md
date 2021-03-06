# Javascript I18N 国际化方案

本项目提供了一个js脚本以及一组python实用工具，以此来解决web项目前端国际化中js部分的需求。

### 用法
#### 1. 在页面合适的位置引入js资源，应保证`enjoy.common.i18n.js`出现在待翻译脚本之前。
```html
    <script type="text/javascript" src="../vendors/enjoy/enjoy.common.i18n.js"></script>
```
#### 2. 为项目js文件中待翻译的文本增加函数标记
```javascript
    var text = "测试文本";  ===>  var text = lang("测试文本");
```
#### 3. 使用poedit对待翻译文件进行词汇提取

#### 4. 使用实用工具对js中的可翻译文本进行提取
```bash
    python potojs.py --po=..\sample\zh.po --export=..\i18n\ --lang=us-en
```
##### 参数说明
--po        要转换的po文件路径

--export    生成文件要保存的位置，默认i18n

--lang      要生成的资源语言类型，默认zh-cn

#### 5. 将生成的国际化js资源文件引入到项目中，请保证引入的位置在`enjoy.common.i18n.js`之前。
```html
    <script type="text/javascript" src="../i18n/us-en.js"></script>
```
