// window.onload = function () {
//     if(location.search !== '') {
//         let msg1 = location.search.split('');
//         msg1.splice(0, 5);
//         msg1.splice(msg1.length - 1, 1);//去掉最后一个逗号
//         msg1 = msg1.join('');
//         msg1 = msg1.split(',');
//         msg = msg1;
//     }
// }

const mycartcheckall = document.querySelector('.my-cart-accounts > div.fixbar-text > input[type="checkbox"]');
let allCheckbox = document.querySelectorAll('.cart-accounts-list > ul > li > span.w-name > input');
const priceNode = document.querySelector('.price');
const myCartDeletes = document.querySelectorAll('.my-cart-delete');
const deleteSelectBox = document.querySelector('.mc-delete-select')
// console.log(deleteSelectBox);
// 价格(闭包)
function handlePrice() {
    let sumPrice = 0;
    return function (price) {
        sumPrice += Number(price);
        priceNode.innerText = sumPrice + '.00';
    }
}
let priceFn = handlePrice();

// 首先计算页面加载完的所有域名价格并首屏渲染
function computedFirstPrice() {
    Array.from(allCheckbox).forEach(function (v, i) {
        if(v.checked) {
            let price =v.parentNode.parentNode.children[5].innerText;
            priceFn(price);
        }
    })
}
computedFirstPrice();

// 全选
wei.handleEvent.addEvent(mycartcheckall, 'click', function () {
    allCheckbox = document.querySelectorAll('.cart-accounts-list > ul > li > span.w-name > input');
    if(mycartcheckall.checked) {
        Array.from(allCheckbox).forEach(function (v, i) {
            if(!v.checked) {
                let price = v.parentNode.parentNode.children[5].innerText;
                v.checked = true;
                priceFn(price);
            }
        })
    } else {
        Array.from(allCheckbox).forEach(function (v, i) {
            if(v.checked) {
                let price = v.parentNode.parentNode.children[5].innerText;
                v.checked = false;
                priceFn('-' + price);
            }
            
        })
    }
})

// li选中导致价格变化
Array.from(allCheckbox).forEach(function (v, i) {
    wei.handleEvent.addEvent(v, 'click', function () {
        let price = v.parentNode.parentNode.children[5].innerText;
        if(v.checked) {
            priceFn(price);
        } else {
            priceFn('-' + price);
        }
    })
})

// 删除
myCartDeletes.forEach(function (v, i) {
    wei.handleEvent.addEvent(v, 'click', function () {
        let res = confirm('您确定要删除此域名吗?');
        if(res) {
            let ul = v.parentNode.parentNode.parentNode;
            let li = v.parentNode.parentNode;
            let price = v.parentNode.parentNode.children[5].innerText;
            let checkbox = li.children[0].children[0];
            ul.removeChild(li);
            if(checkbox.checked) {
                priceFn('-' + price);
            }
        }
    })
})

// 删除选中产品
wei.handleEvent.addEvent(deleteSelectBox, 'click', function () {
    let res = confirm('您确定要删除所选的域名吗?')
    if(res) {
        // 获得所有选中的checkBox,然后删除,并且减去价格
        allCheckbox = document.querySelectorAll('.cart-accounts-list > ul > li > span.w-name > input');
        Array.from(allCheckbox).forEach(function (v, i) {
            if(v.checked) {
                let price = v.parentNode.parentNode.children[5].innerText;
                priceFn('-' + price);
                let ul = v.parentNode.parentNode.parentNode;
                let li = v.parentNode.parentNode;
                ul.removeChild(li);
            }
        })
    }
})

