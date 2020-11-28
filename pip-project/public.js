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
const radioNIndex = document.querySelector('#radio-n-index');
let thePublic = document.querySelector('.the-public');
let thePublicImg = document.querySelector('.the-public-img');
let smallProgram = document.querySelector('.small-program');
let smallProgramImg = document.querySelector('.small-program-img');

// input-top
for (let i of navCheckLi) {
    wei.handleEvent.addEvent(i, 'click', () => {
        for (let j of navCheckLi) { 
            j.classList.remove('active');
        }
        i.classList.add('active');
    })
}
//   nav-bar
for (let i in domNode1) {
    wei.handleEvent.addEvent(domNode1[i], 'mouseover', function () {
        if(window.innerWidth <= 768) {return}
        domNode2[i + '1'].classList.remove('display-none')
        domNode2[i + '1'].classList.add('display-block')
    })
    wei.handleEvent.addEvent(domNode1[i], 'mouseout', function () {
        if(window.innerWidth <= 768) {return}
        domNode2[i + '1'].classList.remove('display-block')
        domNode2[i + '1'].classList.add('display-none')
    })
    wei.handleEvent.addEvent(domNode2[i + '1'], 'mouseover', function () {
        if(window.innerWidth <= 768) {return}
        domNode2[i + '1'].classList.remove('display-none')
        domNode2[i + '1'].classList.add('display-block')
    })
    wei.handleEvent.addEvent(domNode2[i + '1'], 'mouseout', function () {
        if(window.innerWidth <= 768) {return}
        domNode2[i + '1'].classList.remove('display-block')
        domNode2[i + '1'].classList.add('display-none')
    })
}
// nav-bar-header
wei.handleEvent.addEvent(menuNavbarHeader, 'click', () => { 
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

// 底部两个图片切换:
wei.handleEvent.addEvent(thePublic, 'mouseover', (e) => {
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
wei.handleEvent.addEvent(smallProgram, 'mouseover', (e) => {
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
//以上是头部和底部的公共js