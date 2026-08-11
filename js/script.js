// ===== Sticky Header on Scroll =====
var mainHeader = document.getElementById('main-header');
var lastScrollTop = 0;

window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // Add fixed class when scrolled past header height
    if (scrollTop > 40) {
        mainHeader.classList.add('et-fixed-header');
    } else {
        mainHeader.classList.remove('et-fixed-header');
    }
    lastScrollTop = scrollTop;
});

// ===== Mobile Menu Toggle =====
var mobileNav = document.querySelector('.mobile_nav');
var topMenuNav = document.getElementById('top-menu-nav');
var mobileMenuBar = document.querySelector('.mobile_menu_bar_toggle');

if (mobileNav) {
    mobileNav.addEventListener('click', function() {
        if (this.classList.contains('closed')) {
            this.classList.remove('closed');
            this.classList.add('opened');
            showMobileMenu();
        } else {
            this.classList.remove('opened');
            this.classList.add('closed');
            hideMobileMenu();
        }
    });
}

function showMobileMenu() {
    var mobileMenu = document.querySelector('.et_mobile_menu');
    if (!mobileMenu) {
        mobileMenu = document.createElement('ul');
        mobileMenu.className = 'et_mobile_menu';
        var topMenu = document.getElementById('top-menu');
        if (topMenu) {
            mobileMenu.innerHTML = topMenu.innerHTML;
            var subMenus = mobileMenu.querySelectorAll('.sub-menu');
            subMenus.forEach(function(sm) {
                sm.style.display = 'block';
                sm.style.position = 'static';
                sm.style.opacity = '1';
                sm.style.visibility = 'visible';
                sm.style.boxShadow = 'none';
                sm.style.borderTop = 'none';
                sm.style.padding = '0 0 0 20px';
                sm.style.width = 'auto';
                sm.style.background = 'transparent';
            });
        }
        topMenuNav.appendChild(mobileMenu);
        mobileMenu.style.cssText = 'display:none;position:absolute;top:100%;left:0;right:0;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.1);border-top:3px solid #ff6a88;z-index:9999;padding:20px 0;text-align:left;';
        var items = mobileMenu.querySelectorAll('li');
        items.forEach(function(li) {
            li.style.cssText = 'display:block;padding:0;margin:0;';
            var link = li.querySelector('a');
            if (link) {
                link.style.cssText = 'display:block;padding:10px 5%;font-size:14px;color:#666;border-bottom:1px solid rgba(0,0,0,.03);';
            }
        });
    }
    mobileMenu.style.display = 'block';
}

function hideMobileMenu() {
    var mobileMenu = document.querySelector('.et_mobile_menu');
    if (mobileMenu) {
        mobileMenu.style.display = 'none';
    }
}

// ===== Hide mobile menu on link click =====
document.addEventListener('click', function(e) {
    if (e.target.closest('.et_mobile_menu')) {
        var mobileNav = document.querySelector('.mobile_nav');
        if (mobileNav) {
            mobileNav.classList.remove('opened');
            mobileNav.classList.add('closed');
            setTimeout(hideMobileMenu, 100);
        }
    }
});

// ===== Simple fade-in animation for elements with et_animated class =====
var animatedElements = document.querySelectorAll('.et_animated');
var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

var animationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';
    animationObserver.observe(el);
});

// ===== Contact form prevent default =====
var contactForm = document.querySelector('.et_pb_contact_form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var messageDiv = document.querySelector('.et-pb-contact-message');
        if (messageDiv) {
            messageDiv.innerHTML = '<p style="color:#fff;padding:10px 0;">Thank you for your message. We will get back to you soon!</p>';
        }
        contactForm.reset();
    });
}
