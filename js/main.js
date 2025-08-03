function handleNav() {
  const navMenu = document.querySelector('.nav-menu');
  const menuToggler = document.querySelector('.menu-toggler');
  const navClose = document.querySelector('.nav-close');

  if (!navMenu || !menuToggler) return;

  menuToggler.addEventListener('click', () => {
    navMenu.classList.add('nav-menu-active');
  });
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('nav-menu-active');
  });

  handleResize(navMenu);
  
  window.addEventListener('resize', () => handleResize(navMenu));
}

function handleResize(navMenu) {
  if (window.innerWidth > 768) {
    navMenu.classList.remove('nav-menu-active');
  }
}

document.addEventListener('DOMContentLoaded', handleNav);

