// 左边栏列表嵌套效果
const allLi = document.querySelectorAll('.treeview');
for(let i of allLi) {
    wei.handleEvent.addEvent(i, 'click', function (e) {
        i.children[1].classList.toggle('display-none');
        i.children[0].children[2].classList.toggle('fa-rotate-270');
    })
}
const naemDeal = document.querySelector('#naemDeal');
const smallLi = Array.from(naemDeal.parentNode.children[1].children);
for(let i of smallLi) {
    wei.handleEvent.addEvent(i, 'click', function (e) {
        i.children[1].classList.toggle('display-none');
        i.children[0].children[2].classList.toggle('fa-rotate-270');
        // 阻止事件冒泡
        wei.stopBubble(e);
    })
}