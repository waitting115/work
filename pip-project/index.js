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

 