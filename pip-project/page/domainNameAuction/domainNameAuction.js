// tab栏切换效果
const tabItem = document.querySelectorAll('.side-navtit > li');
for(let item of tabItem) {
    wei.handleEvent.addEvent(item, 'click', function () {
        for(let i of tabItem) {
            i.classList.contains('chose') && i.classList.remove('chose');
        }
        item.classList.add('chose');
    })
}
