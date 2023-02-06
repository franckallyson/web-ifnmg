function Menu(e){
    let list = document.querySelector('ul');

    e.name === 'menu-outline' ? (e.name = "close-outline", list.classList.add('top-[80px]'), list.classList.add('opacity-100')) : (e.name = "menu-outline", list.classList.remove('top-[80px]'), list.classList.remove('opacity-100'))

}