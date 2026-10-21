/**
 * RYVEXORA — PHP edition behaviour.
 * Small, dependency-free enhancements: sticky header state, mobile navigation,
 * scroll reveals and the contact form's client-side hints.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header background after scrolling */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile navigation */
  var toggle = document.querySelector('[data-menu-toggle]');
  var mobileNav = document.querySelector('[data-mobile-nav]');

  if (toggle && mobileNav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      mobileNav.hidden = !open;
      document.documentElement.classList.toggle('nav-open', open);
      if (open) {
        var first = mobileNav.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      }
    };

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    mobileNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
  }

  /* Reveal on scroll */
  var revealables = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (element) {
      element.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    revealables.forEach(function (element) {
      observer.observe(element);
    });
  }

  /* Back to top */
  document.querySelectorAll('[data-to-top]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });

  /* Contact form: keep the button from double-submitting */
  document.querySelectorAll('[data-contact-form]').forEach(function (form) {
    form.addEventListener('submit', function () {
      var button = form.querySelector('button[type="submit"]');
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }
    });
  });
})();
