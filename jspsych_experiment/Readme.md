<br>
<h1>jsPsych心理学实验设计教程</h1>

## 简介

本教程将指导您如何使用jsPsych库来设计和实现一个心理学实验。jsPsych是一个JavaScript库，用于创建和运行心理学实验、调查和演示。

## 前提条件

- 基本的HTML、CSS和JavaScript知识。
- 一个代码编辑器，如Visual Studio Code或Sublime Text。
- 一个简单的Web服务器环境来运行您的HTML文件。

## 1. 创建基础HTML文件

首先，创建一个HTML文件，引入jsPsych及其插件的脚本和样式表。插件可在jspsych网站中(<https://www.jspsych.org/v7/>)找到并直接复制保存为js文件，也可以直接添加地址引用插件。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My jsPsych Experiment</title>
    <!-- 引入jsPsych及其插件 -->
    <script src="jspsych7.3.4.js"></script>
    <!-- 其他插件脚本 -->
    <script src="htmlKeyboardResponse.js"></script>
    <!-- ... 其他脚本文件 ... -->
    <link href="jspsych.css" rel="stylesheet" type="text/css" />
    <link href="style.css" rel="stylesheet" type="text/css" /> <!-- 自定义样式 -->
  </head>
  <body></body>
</html>
```
## 2.初始化jsPsych
在`<body>`标签的底部`</body>`之前，初始化jsPsych并设置实验的全局参数。
```html
<script>
  const jsPsych = initJsPsych({
    use_webaudio: true,
    on_finish: function() {
      const allData = jsPsych.data.get().csv();
      saveTextToFile(allData, '实验结果.csv');
    }
  });
</script>
```
## 3.定义相关辅助函数
定义保存数据到文件的辅助函数，以.csv的格式保存被试的实验数据。
saveTextToFile函数用于将数据保存为csv文件。

```html
<script>
    function saveTextToFile(textstr, filename,type='text/csv') {
        const blobToSave = new Blob([textstr], {
            type: type,
        });
        let blobURL = "";
        if (typeof window.webkitURL !== "undefined") {
            blobURL = window.webkitURL.createObjectURL(blobToSave);
        }
        else {
            blobURL = window.URL.createObjectURL(blobToSave);
        }
        const link = document.createElement("a");
        link.id = "jspsych-download-as-text-link";
        link.style.display = "none";
        link.download = filename;
        link.href = blobURL;
        link.click();
    }
</script>
```
JSON2CSV函数用于将JSON格式的数据转换为CSV格式
```javascript
function JSON2CSV(objArray) {
    const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    let line = "";
    let result = "";
    result += "\uFEFF";
    const columns = [];
    for (const row of array) {
        for (const key in row) {
            let keyString = key + "";
            keyString = '"' + keyString.replace(/"/g, '""') + '",';
            if (!columns.includes(key)) {
                columns.push(key);
                line += keyString;
            }
        }
    }
    line = line.slice(0, -1); // removes last comma
    result += line + "\r\n";
    for (const row of array) {
        line = "";
        for (const col of columns) {
            let value = typeof row[col] === "undefined" ? "" : row[col];
            if (typeof value == "object") {
                value = JSON.stringify(value);
            }
            const valueString = value + "";
            line += '"' + valueString.replace(/"/g, '""') + '",';
        }
        line = line.slice(0, -1);
        result += line + "\r\n";
    }
    return result;
}
```

## 4.创建数据收集类
创建一个`DataCollection`类，用于管理实验数据并提供保存数据的方法。

```javascript
class DataCollection {
    constructor(data = []) {
        this.trials = data;
    }
    csv() {
        return JSON2CSV(this.trials);
    }
    json(pretty = false) {
        if (pretty) {
            return JSON.stringify(this.trials, null, "\t");
        }
        return JSON.stringify(this.trials);
    }
    localSave(format, filename) {
        format = format.toLowerCase();
        let data_string;
        if (format === "json") {
            data_string = this.json();
        }
        else if (format === "csv") {
            data_string = this.csv();
        }
        else {
            throw new Error('Invalid format specified for localSave. Must be "json" or "csv".');
        }
        saveTextToFile(data_string, filename,'text/csv');
    }}
```
## 5.设计实验流程
创建一个时间轴数组`timeline`，用于存放实验的所有步骤。

```javascript
let timeline = [];
```
### 5.1预加载资源
使用`jsPsychPreload`插件预加载实验中使用的图片和其他资源。

```javascript
let preload = {
  type: jsPsychPreload,
  auto_preload: true,
  paths: ['image/virtual_inf1.jpg']
};
timeline.push(preload);
```

### 5.2欢迎语
创建欢迎语页面，告知被试实验的目的和重要性。

```javascript
let welcome = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: `
  <h4 style="margin-bottom:10px">您好！非常感谢本此问卷调查是为了学术研究而进行的，因此您的回答对于本研究至关重要。<br></br>
  同时，本研究保证您所填写的信息将会被严格保密，所有题目都没有标准答案，只是想了解您的真实想法。<br></br>您的真实想法对我们非常重要，感谢您的合作与配合！<br></br></h4>
  `,
  button_label: ["开始"],
};
timeline.push(welcome);
```
### 5.3收集被试信息
使用`jsPsychSurveyHtmlForm`插件收集参与者的基本信息。
```javascript 
var participantInfo = {
  type: jsPsychSurveyHtmlForm,
  preamble: '请输入您的个人信息',
  html: `
  <div style="max-width: 400px; margin: 0 auto;font-size:24px">
  <!-- 表单输入字段 -->
  </div>
  `
};
timeline.push(participantInfo);
```
### 5.5实验任务开展
创建实验任务，使用`jsPsychSurveyLikert`插件来收集参与者对一系列问题的评分。
```javascript
let trail1 = {
  type: jsPsychSurveyLikert,
  preamble: function() {
    return `<div class="guidance-text">实验指导语</div>`;
  },
  questions: [
    // ...
  ],
  button_label: '下一题',
  on_finish: function(data) {
    // ...
  }
};
timeline.push(trail1);
```
### 5.5步骤添加至时间轴
完成对实验流程的步骤定义后，将各步骤按照时间顺序添加到时间轴。
```javascript
timeline.push(welcome);//欢迎语
timeline.push(preload);
timeline.push(participantInfo);//收集被试信息
timeline.push(trail1);//正式实验
// ... 其他步骤 ...
timeline.push(finish);//结束语
timeline.push(exit_fullscreen);//推出全屏
```
### 5.6结束实验
实验结束后，由页面展示结束语，同时提供给被试结束按钮，便于实验数据的收集。
```javascript
let finish = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    return '<h2>实验结束，感谢您的耐心作答！</h2>';
  },
  choices: ['结束']
};
timeline.push(finish);
```

### 5.7退出全屏
实验结束后，退出全屏模式。
```javascript
let exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false
};
timeline.push(exit_fullscreen);
```
## 6.运行实验
使用`jsPsych.run()`函数来启动实验。
```javascript
jsPsych.run(timeline);
```

## 7.数据收集与分析
jsPsych会在实验结束时收集所有实验过程中的数据内容，并允许您将其保存为CSV或JSON格式。


