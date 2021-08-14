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

document.addEventListener('scroll', () => {

})



// Show "arrow up" button when scrolling


const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if( window.scrollY > homeHeight / 2){
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
});


// Handle CLick on the arrow up button

arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
})


// Projects

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');

const projects = document.querySelectorAll('.projects');
//class = projects 인 값들을 ALl 모두 모아서 projects라는 배열안에 담은 것.

workBtnContainer.addEventListener('click',(e)=> {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    //button 안에 나타나는 숫자는 span으로서, filter값이 주어지지 않아 있기 때문에,
    // filter값이 undefined나타난다.이럴떈, span의 parentNode 값(class = category__btn)의 filter를 불러오면 된다.
    //둘은 ||(or)로 연결해준다.
    console.log(filter);
    if (filter == null){
        return;
    }
    projectContainer.classList.add('anim-out');
    
    setTimeout( () => {
        projects.forEach( (project) => {
            console.log(project.dataset.type);
            if( filter ==='*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300)
    //위에서 anim-out을 준 이유는 사라졌다가 서서히 나타나는 효과를 주기위함인데,
    //add anim-out 하면 opacity가 0으로 유지되서 invisible클래스가 제거되도 보이지가 않는 문제발생.
    // 따라서, anim-out이 일정시간이 지나면 사라지도록 해야 projects가 나타날 수있다.

});

    // if (filter == null) {
    //     return; //null이면 아무 action도 취하지 않는다.
    // }
    // projects.forEach((project) => {
    //     // console.log(project.dataset.type);
    //     if(filter ==='*' || filter ===project.dataset.type){
    //         project.classList.remove('.invisible');
    //     } else{
    //         project.classList.add('.invisible');
    //     }
    // });


    // projects 배열에서 project라는 원소를 하나씩 받아와
    // loop를 돌리는 것이다.

    // 아래의 for of , for문과 같은 의미이다.

    // let project;
    // for(let i = 0 ;  i <projects.length; i++) {
    //     project = projects[i];
    //     console.log(project);
    // }

    // for(let project of projects) {
    //     console.log(project);
    // }


function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}