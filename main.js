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




// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    
    // dataset안에 우리가 부여한 data-link값이 저장되어있다.
    // 항목이 아닌 빈 navbar를 클릭하면 undefined 가 나오는 문제가 발생
    const target = event.target;
    const link = target.dataset.link;
    if(link == null) {
        return;
    }
    navbarMenu.classList.remove('open');    
        scrollIntoView(link);
     
});

// Navbar toggle btn for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
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

    // Remove Selection from the previous one and Select the new one
    const active = document.querySelector('.category__btn.selected')
    active.classList.remove('selected');
    
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    // 클릭한게 숫자가 아니라 버튼이면 그대로 갖다쓰고, 
    // 아닐경우(숫자 ->span)클릭한 경우, parentNode( 즉, BUTTON)을 갖다쓰자.

    target.classList.add('selected');
    //기존에 selected된것을 지우고 새로 선택한 버튼에 selected붙인다.
    //여기서 버튼의 번호(즉,span)을 클릭하면 error가 발생하는데 ,그 이유는
    // span에 selected 클래스가 생겨버려서, 작동을 안하는 것이다.
    //따라서, 버튼의 번호를 누르게 되면, span의 parentNode에 selected를 할당해줘야 한다.

    projectContainer.classList.add('anim-out');

    // projects.forEach( (project) => {
    //     console.log(project.dataset.type);
    //     if( filter ==='*' || filter === project.dataset.type) {
    //         project.classList.remove('invisible');
    //     }else{
    //         project.classList.add('invisible');
    //     }
    // });
    
    // 위의 invisible추가,제거하는 행위를 anim-out하고 바로 실행하게 되면
    // 이미 filtering 된 후에 쓸데없는 애니메이션을 추가한 느낌을 줄 수있다.
    //따라서,anim-out을 준 후에, 0.3초뒤에 필터링을 하게 위 함수를
    //setTimeout안에 넣어주도록 하자.

    setTimeout( () => {
        projects.forEach( (project) => {
            console.log(project.dataset.type);
            if( filter ==='*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        }); //setTimeout안에 넣어줌으로써, 사라졌다가 필터링 되고 나타나게 만든다.
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



// < 스크롤 되면서 특정 섹션 지나가면 해당 섹션 navbar메뉴 활성화 시키기>
// 1.모든 섹션 요소들을 가지고 온다.
// 2.IntersectionObserver를 이용해 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴아이템을 활성화 시킨다.

const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#works',
    '#testimonials',
    '#contact'
];

const sections = sectionIds.map(id => document.querySelector(id));
//배열을 각각 돌면서 새로운 돔을 만들 수 있는 기능 : map
const navItems = sectionIds.map(id => document.querySelector(`[data-link = '${id}']`));


let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem (selected) {
    selectedNavItem.classList.remove('active');
    //이전 인덱스 요소는remove 해준다.
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root:null,
    rootMargin:'0px',
    threshold: 0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0 ){
        // !entry.isIntersecting 
        //: 페이지가 안으로 들어오는게 아니고 ,밖으로 나가며
        // console.log(entry); : intersectipnRatio 가 0인 콜백함수가 자동으로 실행되버린다.
        //->시작하자마자 testimonials가 보더쳐져있는 이유이다.


        const index = sectionIds.indexOf(`#${entry.target.id}`);
        //스크롤링이 아래로 되어서 페이지가 올라옴.
        if(entry.boundingClientRect.y < 0){
            selectedNavIndex = index + 1;
        }else
            selectedNavIndex = index - 1;
        }
        
    }
    );
};



const observer = new IntersectionObserver(observerCallback,observerOptions);
// 새로운 옵저버를 만들어서 관찰하도록 한다.

sections.forEach(section => observer.observe(section));
// observer야 , sections 라는 배열 관찰좀 해줘

window.addEventListener('scroll', () => {
    if(window.scrollY ===0){
        selectedNavIndex = navItems[0];
        // 화면이 가장 위에 위치할 떄 (window.scrollY ===0)는 무조건 home에 border치기.

    }else if (
        window.scrollY + window.innerHeight ===
        document.body.clientHeight
        // 화면이 가장 아래에 위치할 때 는 무조건 contact( navItems배열의 가장 마지막 원소)
        // window.scrollY는 viewport의 가장 왼쪽위, window.innerHeight는 현재 브라우저 화면의 총 높이
        // document.body.clientHeight는 body의 총 높이를 말한다.(길이)
    ) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
    // console.log(navItems[selectedNavIndex]);
}
);



function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}