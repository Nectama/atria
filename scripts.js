window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    var body = document.getElementById('body');

    var isAnimationShown = sessionStorage.getItem('animationShown');
    if (isAnimationShown) {
        loader.style.display = 'none';
        body.style.overflowY = 'scroll';
    } else {
        // Simulate the loading process, this page is too light it barely takes time to load so i'm just pretending here because the owner wanted a loading animation
        setTimeout(function () {
            loader.style.display = 'none';
            body.style.overflowY = 'scroll';
            sessionStorage.setItem('animationShown', true);
        }, 2000); // Change the duration as needed
    }
});

function hamburgerMenu() {
    var x = document.getElementById("menuLinks");
    if (x.style.display === "flex") {
        x.style.display = "none";
        document.getElementById("smallHeader").style.position = "sticky";
        document.getElementById("vid").style.marginTop = "0";
    } else {
        x.style.display = "flex";
        document.getElementById("smallHeader").style.position = "fixed";
        document.getElementById("vid").style.marginTop = "64px";
    }
}

// Close the menu when clicking outside
document.addEventListener("click", function (event) {
    const menu = document.getElementById("menuLinks");
    const icon = document.querySelector(".icon");

    // Check if the clicked element is outside the menu and the icon
    if (
        !menu.contains(event.target) &&
        !icon.contains(event.target)
    ) {
        menu.style.display = "none";
        document.getElementById("smallHeader").style.position = "sticky";
        document.getElementById("vid").style.marginTop = "0";
    }
});

function fadeInElements() {
    const elements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Adjust this threshold to control when the fade-in effect triggers
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
}

window.addEventListener('load', fadeInElements);
window.addEventListener('scroll', fadeInElements);

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se envíe el formulario de forma predeterminada

    var nombre = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("idea").value;

    Email.send({
        SecureToken : "7dee78e6-a993-4886-8b95-4a5cac8f950d",
        To: "info@atria-studio.com.ar",
        From: "atria.contentcreators@gmail.com",
        Subject: "Nuevo mensaje del formulario de contacto",
        Body: "Nombre: " + nombre + "<br>Email: " + email + "<br>Mensaje: " + mensaje,
    }).then(function (response) {
        if (response === "OK") {
            alert("El correo electrónico se ha enviado correctamente.");
            document.getElementById("contactForm").reset(); // Reinicia el formulario
        } else {
            alert("Hubo un error al enviar el correo electrónico. Por favor, inténtalo nuevamente.");
        }
    });
});