const btn = document.querySelector('.btn');

btn.addEventListener('click', () =>{
    alert(`Размеры монитора ${window.screen.width}х${window.screen.height} 
Размер экрана с учетом полосы прокрутки ${window.innerWidth}х${window.innerHeight}
Размер экрана без учёта полосы прокрутки ${document.documentElement.clientWidth}х${document.documentElement.clientHeight}
    `);
})