'use strict';

// Make navbar transparent when it is on the top

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll' , () => {
    // document.addEventListener은 전체문서에 함수를 추가하겠다는의미이다.
    // console.log(window.scrollY);
    // console.log(navbarHeight);
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }else{
        navbar.classList.remove('navbar--dark');
    }
}
);

// Handle scrolling when tapping on the navbat menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    
    // dataset안에 우리가 부여한 data-link값이 저장되어있다.
    // 항목이 아닌 빈 navbar를 클릭하면 undefined 가 나오는 문제가 발생
    const target = event.target;
    const link = target.dataset.link;
    if(link == null) {
        return;
    }else{
        console.log(event.target.dataset.link);
        scrollIntoView(link);
    }
});

const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {
    scrollIntoView('#contact');
    
})

// Make home slowly faded to transparent as the window scrolls down

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () =>{
    home.style.opacity = 1- window.scrollY / homeHeight ;
})





function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}