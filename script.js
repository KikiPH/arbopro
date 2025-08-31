function scrollToSection(id) {
    // remove 'active' class from previous button
    const activeNavButton = document.getElementsByClassName('active');
    if (activeNavButton.length > 0) {
        activeNavButton[0].classList.remove('active');
    }
    
    // add 'active' class to clicked section button in navigation bar
    document.getElementById(`button${id}`)?.classList.add('active');

    // enable smooth scrolling between sections
    switch (id) {
        case 0:
            document.getElementById('button').classList.add('active'); // set first section as active
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            break;
        
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            document.getElementById(`section${id}`).scrollIntoView({ behavior: 'smooth' });
            break;
        
        case 6:
            document.getElementById(`footer`).scrollIntoView({ behavior: 'smooth' });
            break;
    }
}

window.onload = () => {
    document.querySelector('.parallax-image').style.height = `${document.body.offsetHeight - window.innerHeight}px`;
    document.querySelector('.parallax-image').style.top = `${-1.2*window.innerHeight}px`;
}

// background parallax effect
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset;
    document.querySelector('.parallax-image').style.transform = `translateY(${scrollTop * -0.3}px)`;
});

// on page refresh scroll to top
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
}