document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelector('.menu a.active')?.classList.remove('active');
        this.classList.add('active');
    });
});
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.menu a');

// Function to remove the active class from all links
function removeActiveClasses() {
    navLinks.forEach(link => link.classList.remove('active'));
}

// Function to add the active class to the corresponding link
function addActiveClass(id) {
    removeActiveClasses();
    document.querySelector(`.menu a[href="#${id}"]`).classList.add('active');
}

// Intersection Observer callback function
function onScroll(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            addActiveClass(entry.target.id);
        }
    });
}

// Create an Intersection Observer
const observer = new IntersectionObserver(onScroll, {
    threshold: 0.5 // Trigger when 50% of the section is in view
});

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});
