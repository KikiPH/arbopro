
// set parallax image height and position
window.onload = () => {
    let backgroundImage = document.querySelector('.parallax-image');
    if (backgroundImage) {
        backgroundImage.style.height = `${document.body.offsetHeight - window.innerHeight}px`;
        backgroundImage.style.top = `${-0.8*window.innerHeight}px`; // lower value = higher image starting position (-0.9 right under hero section)
    }
}

// background parallax effect
window.addEventListener('scroll', () => {

    // scroll parallax image
    let scrollTop = window.pageYOffset;
    let backgroundImage = document.querySelector('.parallax-image');
    if (backgroundImage) backgroundImage.style.transform = `translateY(${scrollTop * -0.4}px)`; // lower value = faster scroll speed

    // show scroll to top button after scrolling down 200px
    let scrollToTopButton = document.getElementById('button-scroll-to-top');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }

    // dinamically update active button in navigation bar
    let sections = document.getElementsByTagName('section');
    if (sections.length > 1) { // if there is more than one section on the page (about page only contains the footer section)
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
        if (isFullyVisible(lastSection) && isFullyVisible(footerSection)) {
            document.getElementById(`button${sections.length}`).classList.remove('active');
        }

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

// scrolls to top of page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

// copies email address to clipboard
function copyMail(iconId, addressId) {
    const icon = document.getElementById(iconId);
    const address = document.getElementById(addressId);
    navigator.clipboard.writeText(address.innerText);

    // display that the email address has been copied
    icon.classList.remove('fa-envelope');
    icon.classList.add('fa-check');
    
    // reset icon after 1 second
    setTimeout(() => {
        icon.classList.remove('fa-check');
        icon.classList.add('fa-envelope');
    }, 1000);
}