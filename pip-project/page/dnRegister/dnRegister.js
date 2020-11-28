// 以下是域名注册页面的js
const gj = document.querySelector('.domainsuffix_gj_all');
const gn = document.querySelector('.domainsuffix_gn_all');
const newName  = document.querySelector('.domainsuffix_newg_all');
const domainsuffix_gj = document.querySelectorAll('.domainsuffix_gj');
const domainsuffix_gn = document.querySelectorAll('.domainsuffix_gn');
const domainsuffix_newg = document.querySelectorAll('.domainsuffix_newg');
const arr1 =[gj, gn, newName];
const arr2 = [domainsuffix_gj, domainsuffix_gn, domainsuffix_newg];

for(let i = 0; i < 3; i ++) {
    wei.handleEvent.addEvent(arr1[i], 'click', function () {
        if(arr1[i].checked) {
            arr2[i].forEach(function (v, i)  {
                v.checked = true;
            })
        } else {
            arr2[i].forEach(function (v, i)  {
                v.checked = false;
            })
        }
    })
}

// 查看更多后缀
const moreSuffix = document.querySelector('.more-suffix');
const searchInputBoxHd = document.querySelector('.search-input-box-hd ');
wei.handleEvent.addEvent(moreSuffix, 'click', function ()  {
    if(searchInputBoxHd.classList.contains('display-none')) {
        moreSuffix.innerText = '隐藏更多后缀';
        searchInputBoxHd.classList.replace('display-none', 'display-block');
    } else {
        moreSuffix.innerText = '查看更多后缀';
        searchInputBoxHd.classList.replace('display-block', 'display-none');
    }
})

// 全选/全不选
const radioAllYmindex = document.querySelector('#radio-all-ymindex');
const radioNotallYmindex = document.querySelector('#radio-notall-ymindex');
const allCheckBox = document.querySelectorAll('.register-box-line input[type="checkbox"].icon-checkbox');
// console.log(allCheckBox);
wei.handleEvent.addEvent(radioAllYmindex, 'click', function ()  {
    allCheckBox.forEach(function (v, i) {
        v.checked = true;
    })
})
wei.handleEvent.addEvent(radioNotallYmindex, 'click', function () {
    allCheckBox.forEach(function (v, i) {
        v.checked = false;
    })
})

// // 搜索
// const searchButton = document.querySelector('.inquiry-button');
// const searchText = document.querySelector('.domain-textarea');

// wei.handleEvent.addEvent(searchButton, 'click', function () {
//     window.location.href="../dnqueryResult/dnqueryResult.html" 
// })