// 特效性:
// 查看更多后缀/隐藏更多后缀
const moreSuffix2 = document.querySelector('.more-suffix2');
const searchInputBoxHdd = document.querySelector('.search-input-box-hdd');

wei.handleEvent.addEvent(moreSuffix2, 'click', function () {
    if(searchInputBoxHdd.classList.contains('display-none')) {
        moreSuffix2.innerText = '隐藏更多后缀';
        searchInputBoxHdd.classList.replace('display-none', 'display-block');
    } else {
        moreSuffix2.innerText = '查看更多后缀';
        searchInputBoxHdd.classList.replace('display-block', 'display-none');
    }
})

// 加入购物车一行fix定位
const uiFix1 = document.querySelector('.ui-fix-1');
wei.listenerScrollEvent.all(window, function (e) {
    if(wei.getScrollTop() < 500) {
        uiFix1.classList.add('fix');
    } else {
        uiFix1.classList.remove('fix');
    }
})

// 功能性:
// 最开始绑定按钮点击事件
// 首先获取所有的多选框的值存到数组suffixs中
    // 首先获得所有的checkbox,然后判断checked属性是否为true,若为true,则将其value存入suffixs中
// 然后获取用户输入存到name中
// 然后将二者结合,存到新数组domainNames中
// 向后台发送请求,promise.all
// 创建2个ul元素
// 将返回结果包装进dom节点中并插入到新创建的li元素中
// 然后将li元素依次插入到ul中
// 最后将ul渲染到页面

const inquiryButton = document.querySelector('.inquiry-button');
const allCheckBox2 = document.querySelectorAll('div.search-input-box > ul > li > input[type="checkbox"].domain_suffix');
const domainTextarea = document.querySelector('.domain-textarea');
const checkall = document.querySelector('.checkall');

// 初始ul
const resultIssale = document.querySelector('.result-issale');
// 未注册ul
const resultIsyijia = document.querySelector('.result-isyijia');
// 已注册ul
const resultIsunreg = document.querySelector('.result-isunreg');
// 后缀不支持
const resultUnknow = document.querySelector('.result-unknow');

// 初始化li
let initTempate = function (initDName) {
    return `<span class="icon-waiting">
                <img class="icon-waiting-img" src="../../img/wait.gif">
            </span>
            ${initDName}
            <span class="status red">(正在查询)</span>`;
}
// 未被注册
let unregisteredTemplate = function (resResult, premiumDisplay, shoppingIcon, shoppingText) {
    return    `<input checked="" type="checkbox" name="checkboxname" class="canregdomain" value="12.shop" data-price="25000">
                ${resResult.obj[0].name}
                <span class="status green">(未注册)</span>
                <div class="share-list-right">
                    <span class="premium" style="display:${premiumDisplay}">【溢价域名】 </span>
                    <del class="originalPrice">原价${resResult.obj[0].price}</del>
                    <span class="redt">现价${resResult.obj[0].originalPrice}</span>
                    元/首年
                    <a class="hui-button add-cart-bnt" onclick="ToCart(this)" name="${resResult.obj[0].name}">
                        <span class="${shoppingIcon} hidden-xs"></span>
                        <span>${shoppingText}</span>
                    </a>
                    
                    <a class="hui-button fast-register-bnt" href="/gwc/queren.aspx?fastdomain=12.shop&amp;price=25000" target="_blank">
                        <span class="icon-fast-register hidden-xs"></span>
                        快速注册
                    </a>
                </div>`
};
// 已被注册
let alreadyRegisterTemplate = function (resResult)  {
    return `<span class="icon-error"></span>
            ${resResult.obj[0].name}
            <span class="status huit">(已被注册)</span>
            <div class="share-list-right">
                <a target="_blank" class="hui-button buy-register-bnt" href="http://www.${resResult.obj[0].name}">访问</a>
                <a target="_blank" class="hui-button buy-register-bnt" href="https://am.22.cn/domain/buy_12.cn_www22cn.html">
                    联系经纪人购买
                </a>
                <a href="https://whois.xdns.cn/whois.jsp?domain=${resResult.obj[0].name}" target="_blank" class="bluet">查询whois</a>
            </div>`
};
// 后缀不支持
let notSupportTemplate = function (resResult) {
    return `<span class="icon-rr-tip"></span>
                ${resResult.obj[0].name}
            <span class="status huit">(后缀不支持)</span>
            <div class="share-list-right">
                    <a href="javascript:;" onclick="ReCheck('dsada.org')" class="bluet">重新查询</a>
            </div>`
};


const submitFun = function () {
    
    let suffixs = [];//用于存放域名
    let dName = domainTextarea.value;
    if(dName === '') {
        alert('请输入您要搜索的域名!')
        return;
    }
    // 先将所有的li清除掉
    resultIsyijia.innerHTML = '';
    resultIsunreg.innerHTML = '';
    resultUnknow.innerHTML = '';
    resultIssale.innerHTML = '';

    allCheckBox2.forEach(function (v, i) {
        if(v.checked) {
            suffixs.push(dName.concat(v.value));
            // 将初始化的li放进去
            let licc = document.createElement('li');
            licc.id = dName.concat(v.value).split('.').join('-');
            licc.innerHTML = initTempate(dName.concat(v.value));
            resultIssale.appendChild(licc);
        }
    })

// 测试 -->
    let resResult = [
        {
            "success":true,//是否成功的查询到,true正常显示,false(后缀不支持)
            "msg":"",
            "obj":[
                {
                    "name":"12.com",//域名
                    "avail":true,//是否可以注册,true是,false否
                    "price":3333.0,//原价
                    "premium":true,//是否溢价,true是,false否
                    "activityMsg":null,
                    "errMsg":null,
                    "productId":"7d118bde8d074e4e85a10fba1d56e155",
                    "period":1,
                    "originalPrice":3000.0,//现价
                    "reason":null,
                    "shopping":true//是否在购物车
                }
            ]
        },
        {
            "success":true,
            "msg":"",
            "obj":[
                {
                    "name":"12.net",
                    "avail":false,
                    "price":10000.0,
                    "premium":false,
                    "activityMsg":null,
                    "errMsg":null,
                    "productId":"f4a6545ee4ed433da61f2085186c8812",
                    "period":1,
                    "originalPrice":7000.0,
                    "reason":"In use",
                    "shopping":true
                }
            ]
        },
        {
            "success":true,
            "msg":"",
            "obj":[
                {
                    "name":"12.cn",
                    "avail":false,
                    "price":10000.0,
                    "premium":false,
                    "activityMsg":null,
                    "errMsg":null,
                    "productId":"f4a6545ee4ed433da61f2085186c8812",
                    "period":1,
                    "originalPrice":7000.0,
                    "reason":"In use",
                    "shopping":true
                }
            ]
        },
        {
            "success":true,
            "msg":"",
            "obj":[
                {
                    "name":"12.com.cn",
                    "avail":false,
                    "price":10000.0,
                    "premium":false,
                    "activityMsg":null,
                    "errMsg":null,
                    "productId":"f4a6545ee4ed433da61f2085186c8812",
                    "period":1,
                    "originalPrice":7000.0,
                    "reason":"In use",
                    "shopping":true
                }
            ]
        },
        {
            "success":true,
            "msg":"",
            "obj":[
                {
                    "name":"12.vip",
                    "avail":false,
                    "price":10000.0,
                    "premium":false,
                    "activityMsg":null,
                    "errMsg":null,
                    "productId":"f4a6545ee4ed433da61f2085186c8812",
                    "period":1,
                    "originalPrice":7000.0,
                    "reason":"In use",
                    "shopping":true
                }
            ]
        },
        {
            "success":true,
            "msg":"",
            "obj":[
                {
                    "name":"12.shop",
                    "avail":false,
                    "price":10000.0,
                    "premium":false,
                    "activityMsg":null,
                    "errMsg":null,
                    "productId":"f4a6545ee4ed433da61f2085186c8812",
                    "period":1,
                    "originalPrice":7000.0,
                    "reason":"In use",
                    "shopping":true
                }
            ]
        },
        {
            "success":true,
            "msg":"",
            "obj":[
                {
                    "name":"12.club",
                    "avail":false,
                    "price":10000.0,
                    "premium":false,
                    "activityMsg":null,
                    "errMsg":null,
                    "productId":"f4a6545ee4ed433da61f2085186c8812",
                    "period":1,
                    "originalPrice":7000.0,
                    "reason":"In use",
                    "shopping":true
                }
            ]
        },
        {
            "success":false,
            "msg":"",
            "obj":[
                {
                    "name":"12.cc",
                    "avail":false,
                    "price":null,
                    "premium":false,
                    "activityMsg":null,
                    "errMsg":null,
                    "productId":null,
                    "period":null,
                    "originalPrice":null,
                    "reason":"12.telcheck失败!",
                    "shopping":false
                }
            ]
        }
    ];

    resResult.forEach(function (v, i) {
        wei.sleep(i *= 500).then(function () {
            let premiumDisplay = v.obj[0].premium ? 'inline-block' : 'none';
            // let addToShoppingCart = v.obj[0].shopping ? 'inline-block' : 'none';
            // let addedToShoppingCart = v.obj[0].shopping ? 'none' : 'inline-block';
            let shoppingIcon = v.obj[0].shopping ? 'icon-bnt-cart' : 'icon-remove-cart';
            let shoppingText = v.obj[0].shopping ? '加入购物车' : '已加入购物车';
            let liTemplate = ``;
            // 先删除初始化li
            let liId = v.obj[0].name.split('.').join('-');
            resultIssale.removeChild(document.getElementById(liId));
            if(v.success) {
                if(v.obj[0].avail) {
                    // 可以注册
                    liTemplate = unregisteredTemplate(v, premiumDisplay, shoppingIcon, shoppingText);
                    let li = document.createElement('li');
                    li.className = v.obj[0].name;
                    li.innerHTML = liTemplate;
                    resultIsyijia.appendChild(li);
                } else {
                    // 已经被注册了
                    liTemplate = alreadyRegisterTemplate(v);
                    let li = document.createElement('li');
                    li.innerHTML = liTemplate;
                    resultIsunreg.appendChild(li);
                }
            } else {
                // 后缀不支持
                liTemplate = notSupportTemplate(v);
                let li = document.createElement('li');
                li.innerHTML = liTemplate;
                resultUnknow.appendChild(li);
            }
        })
    })
//  <--测试



    // 请求
    // suffixs.forEach(function (v, i) {
    //     fetch('http://test.pip.cn/domain/web/registerDomain/checkDomain', {
    //         method: 'POST',
    //         body: JSON.stringify(v),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }).then(function (response)  {
    //         if(response.status === 200 && response.readystate === 4) {
    //             let resResult = response.statusText;
    //             let premiumDisplay = resResult.obj[0].premium ? 'inline-block' : 'none';
    //             let addToShoppingCart = resResult.obj[0].shopping ? ''inline-block' : 'none';
    //             let addedToShoppingCart = resResult.obj[0].shopping ? 'none' : 'inline-block';
    //             let liTemplate = ``;
    //             先删除初始化li
    //             let liId = v.obj[0].name.split('.').join('-');
    //             resultIssale.removeChild(document.getElementById(liId));
    //             if(resResult.success) {
    //                 if(resResult.obj[0].avail) {
    //                     // 可以注册
    //                     liTemplate = unregisteredTemplate(resResult, premiumDisplay, addToShoppingCart, addedToShoppingCart);
    //                     let li = document.createElement('li');
    //                     li.innerHTML = liTemplate;
    //                     resultIsyijia.appendChild(li);
    //                 } else {
    //                     // 已经被注册了
    //                     liTemplate = alreadyRegisterTemplate(resResult);
    //                     let li = document.createElement('li');
    //                     li.innerHTML = liTemplate;
    //                     resultIsunreg.appendChild(li);
    //                 }
    //             } else {
    //                 // 后缀不支持
    //                 console.log('后缀不支持')
    //                 liTemplate = notSupportTemplate(resResult);
    //                 let li = document.createElement('li');
    //                 li.innerHTML = liTemplate;
    //                 resultUnknow.appendChild(li);
    //             }
    //         } else {
    //             console.log('服务器返回状态码有问题! status:${response.status}, readystate:${response.readystate}',)
    //         }
    //     }).catch(function (err)> {
    //         console.error(err);
    //     })
    // })
};

wei.handleEvent.addEvent(inquiryButton, 'click', submitFun);

// 主页跳转过来直接获取数据开始搜索
window.onload = function () {
    if(location.search !== '') {
        let msg = location.search.split('');
        msg.splice(0, 5);
        msg = msg.join('');
        domainTextarea.value = msg;
        wei.simulationOfEvents(inquiryButton, 'click');
    }
}

// 全选
wei.handleEvent.addEvent(checkall, 'click', function () {
    let resultCheckBox = document.querySelectorAll('.result-isyijia > li > input[type="checkbox"]');
    if(checkall.checked) {
        resultCheckBox.forEach(function (v, i) {
            v.checked = true;
        })
    } else {
        resultCheckBox.forEach(function (v, i) {
            v.checked = false;
        })
    }
})

// 加入购物车/已加入购物车按钮切换
// 我的购物车
let shoppingUl = document.querySelector('.register-cart-hd > ul');
let shoppingNum = document.querySelector('.register-cart-hd > h3 > span.cheng');
let enptyCart = document.querySelector('.register-cart-hd > h3 > a.empty-cart');
let noNamePNode = document.querySelector('.register-cart-hd > P');
let gotoCartBtn = document.querySelector('.register-cart-hd > div > button');
let DNameLi = function (name) {
    return `<span class="name">[注册]</span>
            <span>${name}</span>
            <span class="close rr-close" onclick="RemoveCart(this)"></span>`;
}
function ToCart(target) {
    if(target.children[0].classList.contains('icon-bnt-cart')) {
        //加入购物车 -->  已加入购物车
        target.children[0].classList.replace('icon-bnt-cart', 'icon-remove-cart');
        target.children[1].innerText = '已加入购物车';
        // 添加到购物车
        let name = target.name;
        let li = document.createElement('li');
        li.className = name;
        li.innerHTML = DNameLi(name);
        shoppingUl.appendChild(li);
        // +1
        shoppingNum.innerText = Number(shoppingNum.innerText) + 1;
        if(shoppingUl.children.length > 0) {
            noNamePNode.classList.replace('display-block', 'display-none');
            gotoCartBtn.classList.replace('display-none', 'display-block');
        }
    } else {
        //已加入购物车 -->  加入购物车
        // 按钮变化
        target.children[0].classList.replace('icon-remove-cart', 'icon-bnt-cart');
        target.children[1].innerText = '加入购物车';
        // 总数-1
        shoppingNum.innerText = Number(shoppingNum.innerText) > 0 ? Number(shoppingNum.innerText) - 1 : 0;
        // 购物车对应li消失:
        // console.log(shoppingUl.children instanceof Object)
        for(let item of shoppingUl.children) {
            // console.log(item)
            if(item.className === target.name) {
                shoppingUl.removeChild(item);
            }
        }
        
        // 购物车效果变化
        if(shoppingUl.children.length === 0) {
            noNamePNode.classList.replace('display-none', 'display-block');
            gotoCartBtn.classList.replace('display-block', 'display-none');
        }
    }
}
function RemoveCart(arg1) {
    shoppingUl.removeChild(arg1.parentNode);
    shoppingNum.innerText = Number(shoppingNum.innerText) - 1;
    if(shoppingUl.children.length === 0) {
        noNamePNode.classList.replace('display-none', 'display-block');
        gotoCartBtn.classList.replace('display-block', 'display-none');
    }
    // 购物车按钮变化:
    for(let item of resultIsyijia.children) {
        let cls = arg1.parentNode.className;
        if(item.className === cls) {
            let node = item.children[2].children[3];
            node.children[0].classList.replace('icon-remove-cart', 'icon-bnt-cart');
            node.children[1].innerText = '加入购物车';
        }
    }
}
//  清空购物车
wei.handleEvent.addEvent(enptyCart, 'click', function (){
    shoppingUl.innerHTML = '';
    shoppingNum.innerText = 0;
    noNamePNode.classList.replace('display-none', 'display-block');
    gotoCartBtn.classList.replace('display-block', 'display-none');
    // 所有的 已加入购物车都变为 加入购物车
    for(let item of resultIsyijia.children) {
        let node = item.children[2].children[3]
        node.children[0].classList.replace('icon-remove-cart', 'icon-bnt-cart');
        node.children[1].innerText = '加入购物车';
    }
})

// 加入购物车 大按钮
const addCartBtn = document.querySelector('.b-add-cart');
wei.handleEvent.addEvent(addCartBtn, 'click', function () {
    // 首先找到所有的checkbox,然后筛选出选中的checkbox,然后添加到购物车,然后将对应的加入购物车都变为已加入
    let resultCheckBox = document.querySelectorAll('.result-isyijia > li > input[type="checkbox"]');
    let checkedBox = Array.from(resultCheckBox).filter(function (v, i) {return v.checked = true})
    checkedBox.forEach(function (v, i) {
        let target = v.parentNode.children[2].children[3];
        target.children[0].classList.replace('icon-bnt-cart', 'icon-remove-cart');
        target.children[1].innerText = '已加入购物车';

        // 添加到购物车
        // 先遍历购物车中是否有该li
        // for(let item of shoppingUl.children) {
        //     // console.log(item.className);
        //     if(item.className === target.name)
        // }
        let exist = Array.from(shoppingUl.children).some(function (v, i) {return v.className === target.name});
        if(!exist) {
            let name = target.name;
            let li = document.createElement('li');  
            li.className = name;
            li.innerHTML = DNameLi(name);
            shoppingUl.appendChild(li);
            // +1
            shoppingNum.innerText = Number(shoppingNum.innerText) + 1;
        }
        if(shoppingUl.children.length > 0) {
            noNamePNode.classList.replace('display-block', 'display-none');
            gotoCartBtn.classList.replace('display-none', 'display-block');
        }
    })
})

// 去往购物车
function GoToCart() {
    // 遍历购物车数据,然后找到原始数据,打包发送到购物车页面
    let href = '../shoppingCart/shoppingCart.html?msg=';
    Array.from(shoppingUl.children).forEach(function (v, i) {
        href += (v.className + ',');
    })
    window.location.href=href;
}

