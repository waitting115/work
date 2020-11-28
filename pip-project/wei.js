const wei = {
    // 事件绑定(兼容)
    handleEvent : {
        addEvent(target, type, callback) {
            if(target.addEventListener) {
                target.addEventListener(type, callback, false);
            }else if (target.attachEvent) {
                target.attachEvent('on' + type, function () {
                    callback.call(target);
                })
            } else {
                element['on' + type] = handler;
            }
        },
        removeEvent(target, type, callback) {
            if(target.removeEventListener) {
                target.removeEventListener(type, callback, false);
            } else if (target.detachEvent) {
                target.detachEvent('on' + type, function () {
                    callback.call(target);
                })
            } else {
                target['on' + type] = null;
            }
        }
    },
    // 事件代理
    eventAgent : function (parentNode, childNode, eventType, callback) {
        if(parentNode.addEventListener) {
            parentNode.addEventListener(eventType, function (e)  {
                let targetNode = e.target;
                console.log(targetNode)
                if(targetNode.nodeName.toLowerCase() === childNode) {
                    //将真正需要绑定监听事件的子节点传入回掉函数
                    callback(targetNode);
                }
            })
        } else if (parentNode.attachEvent) {
            parentNode.attachEvent('on' + eventType, function () {
                let targetNode = window.event.target;
                if(targetNode.nodeName.toLowerCase() === childNode) {
                    callback(targetNode);
                }
            })
        } else {
            parentNode['on' + eventType] = function (e)  {
                let targetNode = e.target;
                if(targetNode.nodeName.toLowerCase() === childNode) {
                    callback(targetNode);
                }
            }
        }
    },
    // 阻止事件冒泡
    stopBubble : function (e) {
        if(e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
    },
    // 取消默认事件
    cancelDefaultEvent : function (e) {
        if(e && e.preventDefault ) {
            e.preventDefault();
        } else {
            window.event.returnValue = false;
        }
    },
    // (并不是任何时候都可以使用事件代理,如果希望的targetNode有子节点,那么点击到其子节点上面就不会触发targetNode的事件处理函数,这与事件冒泡是无关的,因为我们希望的节点根本就没有挂载上事件处理函数)
    // 页面滚动事件监听(兼容firefox)
    listenerScrollEvent: {
        // 监听向上/向下滑事件
        all(target, slideCallback) {
            slideCallback = slideCallback || function () {};
            if(window.navigator.userAgent.indexOf("Firefox")== -1) {//不是firefox
                wei.handleEvent.addEvent(target, 'mousewheel', function (e)  {
                    slideCallback.call(target, e);
                });
            } else {//firefox
                wei.handleEvent.addEvent(target, 'DOMMouseScroll', function (e)  {
                    slideCallback.call(target, e)
                });
            }   
        },
        // 监听向下滑事件
        slideDown(target, slideCallback) {
            slideCallback = slideCallback || function () {};
            if(window.navigator.userAgent.indexOf("Firefox")== -1) {//不是firefox
                wei.handleEvent.addEvent(target, 'mousewheel', function (e) {
                    if(e.wheelDelta === -120) {
                        slideCallback.call(target, e);
                    }
                });
            } else {//firefox
                wei.handleEvent.addEvent(target, 'DOMMouseScroll', function (e) {
                    if(e.detail === 3) {
                        slideCallback.call(target, e);
                    }
                });
            }   
        },
        // 监听向上滑事件
        slideUp(target, slideCallback) {
            slideCallback = slideCallback || function () {};
            if(window.navigator.userAgent.indexOf("Firefox")== -1) {//不是firefox
                wei.handleEvent.addEvent(target, 'mousewheel', function (e)  {
                    if(e.wheelDelta === 120) {
                        slideCallback.call(target, e);
                    }
                });
            } else {//firefox
                wei.handleEvent.addEvent(target, 'DOMMouseScroll', function (e) {
                    if(e.detail === -3) {
                        slideCallback.call(target, e);
                    }
                });
            }  
        }
    },
    // 获取页面滚动高度(兼容IE)
    getScrollTop : function ()  {
        return document.documentElement.scrollTop || document.body.scrollTop;
    },
    // sleep
    sleep : function (time) {
        return new Promise(function (res) {
            setTimeout(res, time)
        });
    },
    // 用法:wei.sleep(500).then(() => {
        // 在这里做500ms之后的事情
    // })

    // 模拟事件触发(兼容IE6-10)
    simulationOfEvents : function (target, type)  {
        if(target.dispatchEvent) {//普通浏览器
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(type, false, false);
            target.dispatchEvent(evt);
        } else {//ie6-10
            target.fireEvent('on' + type);
        }
    },
    // createEvent()方法返回新创建的Event对象，支持一个参数，表示事件类型,具体见下表：
            //     参数 	事件接口	    初始化方法
            // HTMLEvents	HTMLEvent	initEvent()
            // MouseEvents	MouseEvent	initMouseEvent()
            // UIEvents	    UIEvent	    initUIEvent()
            // initEvent()方法用于初始化通过DocumentEvent接口创建的Event的值。支持三个参数：initEvent(eventName, canBubble, preventDefault)分别表示：事件名称,是否可以冒泡,是否阻止事件的默认操作

    // ajax封装(兼容低版本IE)(目前只支持get和post)
    ajax : function (options)  {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();//默认get
        options.dataType = options.dataType || 'json';//默认json
        options.formatParam = options.formatParam || false;//默认不格式化参数
        options.data = !options.formatParam ? optionsd.data : function () {
            var arr = [];
            for (var item in options.data) {
                // 把字符串作为 URI 组件进行编码。 ://  -->  %3A%2F%2F
                arr.push(encodeURIComponent(item) + '=' + encodeURIComponent(options.data[item]));
            }
            arr.push(('v=' + Math.random()).replace('.', ''));
            return arr;
        };//是否格式化参数

        var xhr;
        if(window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject){
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        if(method === 'GET' || method === 'get') {
            if(data) {
                url += '?';
                url += data;
            }
            xhr.open('get', url, true);
            xhr.send(null);
        } else if (method === 'POST' || method === 'post') {
            xhr.open('post', url, true);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            if(data) {
                xhr.send(data);
            } else {
                xhr.send(null);
            }
        } else {
            throw new Error('method is not defined!');
        }

        // 设置有效时间
        // 如果该请求已被发出，XMLHttpRequest.abort() 方法将终止该请求。当一个请求被终止，它的  readyState 将被置为 XMLHttpRequest.UNSENT (0)，并且请求的 status 置为 0。
        setTimeout(function () {
            xhr.abort();
            console.log('请求超时!')
        }, timeout)
        
        xhr.onreadystatechange = function () {
            if((status>=200&& status<300 || status==304) && this.readystate === 4) {
                if(success) {
                    success(this.responseText);
                } else {
                    options.error&&options.error(status);
                    console.error('请求出错啦,状态码为:',this.status);
                }
                return this.responseText;
            }
        }
    },
    //使用
//     ajax({
//         url:"http://server-name/login",
//         type:'post',
//         data:{
//             username:'username',
//             password:'password'
//         },
//         dataType:'json',
//         timeout:10000,
//         contentType:"application/json",
//         success:function(data){
// 　　　　　　。。。。。。//服务器返回响应，根据响应结果，分析是否登录成功
//         },
//         //异常处理
//         error:function(e){
//             console.log(e);
//         }
//     })

    // 返回浏览器信息
    browserInfomation : function () {
        var userAgent =navigator.userAgent;
        if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1) {
            // 因为Chrome的代理字符串中有Safari
            return 'Chrome';
        } else if(userAgent.indexOf('Firefox') > -1) {
            return 'Firefox';
        } else if (userAgent.indexOf('Safari') > -1) {
            return 'Safari';
        }else if (userAgent.indexOf('Opera') > -1) {
            return 'Opera';
        }else if(userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11') > -1) {
            return 'IE 11+';
        } else if(userAgent.indexOf('MSIE') > -1 && userAgent.indexOf('Trident') > -1) {
            return 'IE 8 - 10';
        } else if(userAgent.indexOf('MSIE') > -1) {
            return 'IE 6 - 7';
        } else {
            return userAgent;
        }
    },
    // 双向数据绑定
    dataBinding(targetId, dataObj) {
        function proxyBind (target) {
            return new Proxy (target, {
                get(obj, prop) {},
                set(obj, prop, newValue) {
                    // 更改数据
                    obj[prop] = newValue;
                    // 双向数据绑定
                    document.getElementById(targetId).innerHTML = dataObj.data;
                    console.log('a')
                    return;
                }
            })
        }
        // 创建proxy实例
        targetIdBind = proxyBind(dataObj);
        console.log(targetIdBind)
    }
    // 防抖
    // debounce : function (fn, delay) {
    //     var timer = null;
    //     return function () {
    //         timer && clearInterval(timer);
    //         setTimeout(fn, delay);
    //     }
    // }
    // 防抖
    // 节流
    
    // 原生组件api

}

// export default wei;