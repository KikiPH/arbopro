
// set parallax image height and position
window.onload = () => {
    document.querySelector('.parallax-image').style.height = `${document.body.offsetHeight - window.innerHeight}px`;
    document.querySelector('.parallax-image').style.top = `${-1.2*window.innerHeight}px`;
}

// background parallax effect
window.addEventListener('scroll', () => {

    // scroll parallax image
    let scrollTop = window.pageYOffset;
    document.querySelector('.parallax-image').style.transform = `translateY(${scrollTop * -0.3}px)`;

    // dinamically update active button in navigation bar
    let sections = document.getElementsByTagName('section');
    for (let i = 1; i <= sections.length + 1; i++) { // +1 for footer section

        let sectionButton = document.getElementById(`button${i}`);
        let sectionContent = document.getElementById(`section${i}-content`);

        if (isFullyVisible(sectionContent)) {
            sectionButton.classList.add('active');
        } else {
            // edge case:
            // while scrolling and between sections
            // only remove active class from previous section if next section is fully visible
            let activeSections = document.getElementsByClassName('active');
            if (activeSections.length > 1) sectionButton.classList.remove('active');
        }
    }
    
    // edge case:
    // if both the last section and the footer section are fully visible
    // only highlight the footer section button
    let lastSection = document.getElementById(`section${sections.length}-content`);
    let footerSection = document.getElementById(`section${sections.length + 1}-content`);
    console.log(lastSection, footerSection);
    if (isFullyVisible(lastSection) && isFullyVisible(footerSection)) {
        document.getElementById(`button${sections.length}`).classList.remove('active');
    }
});

// on page refresh scroll to top
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
}

// ------------------------------------------------
// helper functions
// ------------------------------------------------

// returns true if the entire HTML element is visible in the viewport
function isFullyVisible(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// scrolls to section and updates active button in navigation bar
function scrollToSection(id) {
    // remove 'active' class from previous button
    const activeNavButton = document.getElementsByClassName('active');
    if (activeNavButton.length > 0) {
        activeNavButton[0].classList.remove('active');
    }
    
    // add 'active' class to clicked section button in navigation bar
    document.getElementById(`button${id}`)?.classList.add('active');

    // enable smooth scrolling between sections
    document.getElementById(`section${id}`).scrollIntoView({ behavior: 'smooth' });
}

// redirects to homepage
function goToHomepage() {
    window.location = '/';
}