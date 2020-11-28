
var mySwiper = new Swiper ('.swiper1', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    // 分页器
    pagination: {
        el: '.swp1',
    },
    // 前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // 滚动条
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})   
var mySwiper2 = new Swiper ('.swiper2', {
    slidesPerView: 4,
    spaceBetween: 30,
})   
var mySwiper3 = new Swiper ('.swiper3', {
    slidesPerView: 6,
    spaceBetween: 30,
})
var mySwiper4 = new Swiper ('.swiper4', {
    slidesPerView: 3,
    spaceBetween: 30,
})
var mySwiper5 = new Swiper ('.swiper5', {
    slidesPerView: 2,
    spaceBetween: 30,
})

var mySwiper6 = new Swiper ('.swiper6', {
    slidesPerView: 4,
    spaceBetween: 30,
})
var mySwiper7 = new Swiper ('.swiper7', {
    slidesPerView: 2,
    spaceBetween: 30,
})

const domNode1 = {
    'zhuce' : document.getElementsByClassName('zhuce')[0],
    'jingjia': document.getElementsByClassName('jingjia')[0],
    'maimai' : document.getElementsByClassName('maimai')[0],
    'shangbiao': document.getElementsByClassName('shangbiao')[0],
    'yunjisuan': document.getElementsByClassName('yunjisuan')[0],
    'zhengshu': document.getElementsByClassName('zhengshu')[0],
    'jianshe': document.getElementsByClassName('jianshe')[0],
    'shichang': document.getElementsByClassName('shichang')[0]
}
const domNode2 = {
    'zhuce1': document.getElementById('register'),
    'jingjia1': document.getElementById('yuding'),
    'maimai1': document.getElementById('trade'),
    'shangbiao1': document.getElementById('brand'),
    'jianshe1': document.getElementById('guan'),
    'yunjisuan1': document.getElementById('yun'),
    'zhengshu1': document.getElementById('ssl'),
    'shichang1': document.getElementById('headline'),
}
const navCheck = document.getElementById('navCheck');
const navCheckLi = navCheck.children;
const menuNavbarHeader = document.querySelector('.menu-navbar-header');
const menuContent = document.querySelector('.menu-content');
const searchTextInput = document.querySelector('.search-text');
const searchMore = document.querySelector('.search-more');
const searchInputHd = document.querySelector('.search-input-hd');
const bannerSearch = document.querySelector('.banner-search');
const radioAllIndex = document.querySelector('#radio-all-index');
const radioNotallIndex = document.querySelector('#radio-notall-index');
const radioNIndex = document.querySelector('#radio-n-index');
const searchCheckboxs = document.querySelectorAll('.search-checkboxs > li > input');
const searchButton = document.querySelector('.search-button');
const searchText = document.querySelector('.search-text');

let autoTrade = document.querySelectorAll('.auto-trade');
let autoTradeBox = document.querySelectorAll('.auto-trade-box');
let thePublic = document.querySelector('.the-public');
let thePublicImg = document.querySelector('.the-public-img');
let smallProgram = document.querySelector('.small-program');
let smallProgramImg = document.querySelector('.small-program-img');

// console.log(searchInputHd)

const handleEvent = {
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
}
// input-top
for ( let i of navCheckLi) {
    handleEvent.addEvent(i, 'click', function ()  {
        for (let j of navCheckLi) { 
            j.classList.remove('active');
        }
        i.classList.add('active');
    })
}
//   nav-bar
for (let i in domNode1) {
    handleEvent.addEvent(domNode1[i], 'mouseover', function () {
        if(window.innerWidth <= 768) {return}
        domNode2[i + '1'].classList.remove('display-none')
        domNode2[i + '1'].classList.add('display-block')
    })
    handleEvent.addEvent(domNode1[i], 'mouseout', function () {
        if(window.innerWidth <= 768) {return}
        domNode2[i + '1'].classList.remove('display-block')
        domNode2[i + '1'].classList.add('display-none')
    })
    handleEvent.addEvent(domNode2[i + '1'], 'mouseover', function () {
        if(window.innerWidth <= 768) {return}
        domNode2[i + '1'].classList.remove('display-none')
        domNode2[i + '1'].classList.add('display-block')
    })
    handleEvent.addEvent(domNode2[i + '1'], 'mouseout', function () {
        if(window.innerWidth <= 768) {return}
        domNode2[i + '1'].classList.remove('display-block')
        domNode2[i + '1'].classList.add('display-none')
    })
}
// nav-bar-header
handleEvent.addEvent(menuNavbarHeader, 'click', function ()  { 
    if(!menuContent.classList.contains('display-block') && !menuContent.classList.contains('display-none')) {
        menuContent.classList.add('display-block');
    } else if (menuContent.classList.contains('display-none')) {
        // alert(2)
        menuContent.classList.replace('display-none','display-block');
    } else if (menuContent.classList.contains('display-block')) {
        // alert(1)
        menuContent.classList.replace('display-block','display-none');
    }
})

// search-text-input
handleEvent.addEvent(searchTextInput, 'focus',function (e)  {
    e.target.placeholder = '';
})
handleEvent.addEvent(searchTextInput, 'blur', function (e)  {
    e.target.placeholder = '请输入您要查询的域名';
})

// searchMore
handleEvent.addEvent(bannerSearch, 'mouseover', function () {
    searchInputHd.classList.replace('display-none', 'display-block');
})
handleEvent.addEvent(bannerSearch, 'mouseout', function () {
    searchInputHd.classList.replace('display-block', 'display-none');
})
handleEvent.addEvent(searchInputHd, 'mouseover', function () {
    searchInputHd.classList.replace('display-none', 'display-block');
})
handleEvent.addEvent(searchInputHd, 'mouseout', function () {
    searchInputHd.classList.replace('display-block', 'display-none');
})
// 小屏三个点击切换表格
// 转换成数组操作,过滤掉多余的dom元素
autoTradeBox = Array.from(autoTradeBox);
autoTrade = Array.from(autoTrade);
autoTradeBox =  autoTradeBox.filter(function (v) { v.className === 'auto-trade-box'});
let autoTradeLen = autoTrade.length;
// 页面一共有k个需要这个效果的,为autotrade里面的a添加data-index自定义属性,来与autotradebox相对应变化
for (let k = 0; k < autoTradeLen; k ++) {
    wei.eventAgent(autoTrade[k].children[0], 'a', 'click',function (liItem)  {
        for (let j of autoTrade[k].children[0].children) {
            j.classList.remove('active');
            if(j.children.length > 1) {
                j.removeChild(j.children[1])
            }
        }
        const spanTradeArrow = document.createElement('span');
        spanTradeArrow.className = 'trade-arrow';
        liItem.parentNode.classList.add('active');
        liItem.parentNode.appendChild(spanTradeArrow);
        // 需要判断点击的是第几个a,然后变化与之相对应的table
        // console.log(autoTradeBox[k].children[0].getAttribute('data-index'))
        for (let i of autoTradeBox[k].children) {
            if(i.classList.contains('display-block')) {
                i.classList.replace('display-block', 'display-none');
            } else {
                i.classList.add('display-none');
            }
        }
        autoTradeBox[k].children[liItem.getAttribute('data-index')].classList.replace('display-none', 'display-block');
    })
}
// 底部两个图片切换:
wei.handleEvent.addEvent(thePublic, 'mouseover', function (e)  {
    if(thePublicImg.classList.contains('display-none')) {
        thePublicImg.classList.replace('display-none', 'display-block');
    } else {
        thePublicImg.classList.add('display-block');
    }
    if(smallProgramImg.classList.contains('display-block')) {
        smallProgramImg.classList.replace('display-block', 'display-none');
    } else {
        smallProgramImg.classList.add('display-none');
    }
})
wei.handleEvent.addEvent(smallProgram, 'mouseover', function (e)  {
    if(smallProgramImg.classList.contains('display-none')) {
        smallProgramImg.classList.replace('display-none', 'display-block');
    } else {
        smallProgramImg.classList.add('display-block');
    }
    if(thePublicImg.classList.contains('display-block')) {
        thePublicImg.classList.replace('display-block', 'display-none');
    } else {
        thePublicImg.classList.add('display-none');
    }
})
// 全选 全不
wei.handleEvent.addEvent(radioAllIndex, 'click', function () {
    searchCheckboxs.forEach(function (v, i)  {
        v.checked = true;
    })
})
wei.handleEvent.addEvent(radioNotallIndex, 'click', function () {
    searchCheckboxs.forEach(function (v, i)  {
        v.checked = false;
    })
})

// 下面搜索框跳转
wei.handleEvent.addEvent(searchButton, 'click', function () {
    // console.log(searchText.value);
    window.location.href="./page/dnqueryResult/dnqueryResult.html?msg=" + searchText.value;
})