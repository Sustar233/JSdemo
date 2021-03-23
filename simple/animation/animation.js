function animate(el, target, attr, callback) {
    // 确保只有一个定时器在执行
    clearInterval(el.timer);
    // 判断是否是一个有单位的数值，如果有则返回单位的字符串
    let targetUnit = target.replace(/[^a-zA-Z]/g,"");
    // 返回传入数值的数字部分
    let targetValue = target.replace(/[^0-9.0-9]/g,"");
    // 如果传入数值不含有单位 且 对象初始属性为数字时
    // 处理类似opacity一类属性
    if (!targetUnit) {
      // 初始值扩大100，为浮点数减小误差做准备
      targetValue *= 100;
    }

    // 获取el元素的attr属性的值，并去除字符串单位
    el.timer = setInterval(() => {
      // 无单位时以浮点数形式提取数值并扩大100倍防止浮点数计算误差
      let current = targetUnit ? parseInt(getStyle(el, attr)) : parseFloat(getStyle(el, attr) * 100);
      // 对象当前值 ≠ 目标值时，反复执行直到相等
      if (current != targetValue) {
        // 步长 = （目标值 - 当前值） / 缓动系数
        let step = (targetValue - current) / 10;
        // 步长取整数（防止浮点数运算出现误差
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (targetUnit) {
          // 元素值 = 当前值 + 步长
          el.style[attr] = current + step + targetUnit;
        } else {
          // 扩大的100倍实际添加时需要还原
          el.style[attr] = (current + step) / 100;
        }
      } else {
        clearInterval(el.timer);
        // 检测是否有回调函数，如果有则执行
        if (callback) {
          console.log('qwq');
          callback();
          return;
        }
      }
    }, 30)
  }

  // 获取元素最终样式
  function getStyle (obj, attr) {
    if (window.getComputedStyle) {
      // 返回obj元素的attr属性值
      return getComputedStyle(obj, false)[attr];
    } else {
      // 兼容写法
      return obj.cuurentStyle[attr];
    }
  }
  
  let sq = document.getElementById("move");
  let movesq = document.getElementById("movesq");
  movesq.addEventListener("click", function() {
    animate(sq, "100px", "left", function() {
      animate(sq, "0.5", "opacity", function() {
        animate(sq, "50px", "width");
      });
    });
  });

  
// // animate(obj,{'left': 100, 'width': 200})
// function animate(obj, json, callback) {
//   // 确保元素只有一个定时器执行
//   clearInterval(obj.timer);
//   // 运动核心就是 不断调整位置
//   obj.timer = setInterval(function() {
//     var current;
//     for (var attr in json) {
//       if (attr === "opacity") {
//         current = parseFloat(getStyle(obj, "opacity")) * 100;
//       } else if (attr === 'zIndex') {
//         current = parseInt(getStyle(obj,attr));
//       } else {
//         current = parseInt(getStyle(obj, attr));
//       }
//       var step = (json[attr] - current) / 10;
//       step = step > 0 ? Math.ceil(step) : Math.floor(step);
//       if (Math.round(current) == json[attr]) {
//         clearInterval(obj.timer);
//         if (callback) {
//           callback();
//           return;
//         }
//       }
//       if (attr === "opacity") {
//         obj.style[attr] = (current + step) / 100;
//       } else if (attr === 'zIndex') {
//         obj.style[attr] =  current + step;
//       } else {
//         obj.style[attr] = current + step + "px";
//       }
//     }
//   }, 30);
// }