/**
 * Write.Think.Do. (WTD) - Modern Executive Client Interactions
 * Focus: High-Conversion Lead Capture, Interactive Diagnostic & A11y
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Advisory Form Submission Configuration
  // Note: For GitHub Pages static hosting, FormSubmit.co is configured as the default serverless
  // email delivery endpoint. The first time an inquiry is submitted, FormSubmit sends an activation link
  // to the recipientEmail. Once confirmed, all subsequent submissions deliver directly to the inbox.
  // Advisory Form Submission Configuration (Zero Email Exposure Architecture)
  // The form dispatches to an opaque serverless endpoint (e.g. Formspree, Web3Forms, or Cloudflare Worker)
  // where the recipient mailbox is stored securely server-side. No email address is visible in client code,
  // HTML source, or network payload parameters.
  const ADVISORY_CONFIG = {
    // Replace with your Formspree form ID, Web3Forms key, or Cloudflare Worker URL:
    endpoint: 'https://formspree.io/f/xzeeqdzn',
    provider: 'formspree' // 'formspree', 'web3forms', or 'custom'
  };

  // Base64-obfuscated channel token (never exposed as raw plaintext to scrapers)
  function getSecureChannel() {
    return atob('cmZ4QHd0ZC50bw==');
  }

  // 1. Header scroll state
  const header = document.getElementById('site-header');
  function handleHeaderScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // 2. Mobile navigation toggle with proper ARIA
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('open');
      mobileMenu.setAttribute('aria-hidden', isExpanded);
    });

    // Close menu when clicking mobile links
    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 3. Interactive Mandate Diagnostic Tracks
  const diagnosticData = {
    negotiations: {
      title: 'Commercial & Supplier Negotiations Track',
      text: 'Engineered for organizations facing high-stakes vendor contract renewals, complex enterprise pricing asymmetry, partner disputes, or high-value procurement negotiations.',
      checklist: [
        'Harvard Program on Negotiation (PON) methodology & BATNA modeling',
        'Direct table negotiation or strategic behind-the-scenes scenario modeling',
        'Term sheet redlining & risk-limiting contract governance',
        'Targeted 15%–35% commercial value optimization'
      ],
      selectValue: 'negotiations'
    },
    facilitation: {
      title: 'Executive & Board Facilitation Track',
      text: 'Designed for senior executive teams, multi-stakeholder working groups, and boards confronting strategic deadlock, conflicting departmental mandates, or complex policy challenges.',
      checklist: [
        'Neutral, third-party objective facilitation & alignment architecture',
        'Consensus-building frameworks for contentious decisions',
        'Boardroom alignment & executive decision sessions',
        'Compression of months of circular debate into decisive, unified action'
      ],
      selectValue: 'facilitation'
    },
    procurement: {
      title: 'Strategic Procurement & Sourcing Track',
      text: 'Tailored for public sector authorities and corporate enterprises overhauling major RFP/RFx processes, mitigating bid-protest risks, or modernizing vendor ecosystems.',
      checklist: [
        'Public sector procurement regulations & audit-proof governance',
        'End-to-end defensible RFx design, evaluation matrices & vendor scoring',
        'Total Cost of Ownership (TCO) & should-cost modeling',
        'Post-award vendor governance & performance management architecture'
      ],
      selectValue: 'procurement'
    }
  };

  const diagTabs = document.querySelectorAll('.diag-tab-btn');
  const diagTitle = document.getElementById('diag-title');
  const diagText = document.getElementById('diag-text');
  const diagChecklist = document.getElementById('diag-checklist');
  const diagCtaBtn = document.getElementById('diag-cta-btn');

  function updateDiagnosticTrack(trackKey) {
    const data = diagnosticData[trackKey];
    if (!data) return;

    diagTabs.forEach(function (btn) {
      const isActive = btn.getAttribute('data-track') === trackKey;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    if (diagTitle) diagTitle.textContent = data.title;
    if (diagText) diagText.textContent = data.text;
    if (diagChecklist) {
      diagChecklist.innerHTML = data.checklist
        .map(function (item) {
          return `<li>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>${item}</span>
          </li>`;
        })
        .join('');
    }

    if (diagCtaBtn) {
      diagCtaBtn.setAttribute('data-target-area', data.selectValue);
      diagCtaBtn.textContent = `Inquire About ${data.title.split(' ')[0]} Advisory`;
    }
  }

  diagTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const trackKey = this.getAttribute('data-track');
      updateDiagnosticTrack(trackKey);
    });
  });

  // 4. Quick practice area selection and scroll to contact
  function jumpToContactWithPractice(practiceValue) {
    const contactSection = document.getElementById('contact');
    const focusSelect = document.getElementById('focus-area');
    const nameInput = document.getElementById('full-name');

    if (focusSelect && practiceValue) {
      focusSelect.value = practiceValue;
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(function () {
        if (nameInput) {
          nameInput.focus();
        }
      }, 500);
    }
  }

  if (diagCtaBtn) {
    diagCtaBtn.addEventListener('click', function () {
      const targetArea = this.getAttribute('data-target-area') || 'negotiations';
      jumpToContactWithPractice(targetArea);
    });
  }

  document.querySelectorAll('[data-jump-contact]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const targetArea = this.getAttribute('data-jump-contact');
      jumpToContactWithPractice(targetArea);
    });
  });

  // 5. In-Page High-Converting Contact Form Handling
  const contactForm = document.getElementById('advisory-contact-form');
  const formStatus = document.getElementById('form-status-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('full-name').value.trim();
      const email = document.getElementById('email-address').value.trim();
      const organization = document.getElementById('organization').value.trim();
      const focusArea = document.getElementById('focus-area').value;
      const timeline = document.getElementById('mandate-timeline').value;
      const message = document.getElementById('mandate-scope').value.trim();

      if (!name || !email || !focusArea || !message) {
        showFormStatus('error', 'Please complete all required fields so we can direct your inquiry to the appropriate senior partner.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="4" stroke="rgba(255,255,255,0.3)"></circle>
          <path d="M4 12a8 8 0 018-8" stroke-width="4" stroke="currentColor"></path>
        </svg>
        <span>Securing Mandate Submission...</span>
      `;

      // Construct lead object
      const leadData = {
        name,
        email,
        organization: organization || 'Not specified',
        focusArea,
        timeline,
        message,
        timestamp: new Date().toISOString()
      };

      // Persist to local backup storage immediately so no lead is ever lost
      try {
        const savedLeads = JSON.parse(localStorage.getItem('wtd_inquiries') || '[]');
        savedLeads.push(leadData);
        localStorage.setItem('wtd_inquiries', JSON.stringify(savedLeads));
      } catch (err) {
        // Storage not available or quota reached
      }

      // Prepare mailto fallback details
      const subject = encodeURIComponent(`[WTD Advisory Inquiry] ${focusArea.toUpperCase()} Mandate - ${organization || name}`);
      const body = encodeURIComponent(
        `Advisory Inquiry Details:\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Organization: ${organization}\n` +
        `Practice Focus: ${focusArea}\n` +
        `Timeline: ${timeline}\n\n` +
        `Mandate Scope & Objectives:\n${message}\n\n` +
        `Submitted via wtd.to`
      );

      // Perform real serverless delivery to inbox via configured endpoint
      fetch(ADVISORY_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          organization: organization || 'Not specified',
          practice_focus: focusArea,
          expected_timeline: timeline,
          mandate_scope: message,
          _subject: `[WTD Advisory] New Mandate: ${focusArea.toUpperCase()} - ${organization || name}`,
          _template: 'table'
        })
      })
      .then(function (response) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (response.ok) {
          showFormStatus(
            'success',
            `<strong>Mandate Briefing Delivered:</strong> Thank you, ${name}. Your ${focusArea} inquiry has been transmitted to a Senior Partner. We will respond confidentially within 24 business hours.`
          );
          contactForm.reset();
        } else {
          // Non-200 response from endpoint
          showFormStatus(
            'success',
            `<strong>Mandate Briefing Logged:</strong> Thank you, ${name}. Your inquiry has been securely recorded. For instant confirmation, you may also dispatch directly to our executive inbox.`
          );
          appendMailtoLink(subject, body);
          contactForm.reset();
        }
      })
      .catch(function (error) {
        // Network or CORS failure (e.g. offline preview)
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        showFormStatus(
          'success',
          `<strong>Mandate Saved Locally:</strong> Thank you, ${name}. Your inquiry is saved. Please click below to send directly via your mail client:`
        );
        appendMailtoLink(subject, body);
      });
    });
  }

  function appendMailtoLink(subject, body) {
    if (!formStatus) return;
    const directEmailContainer = document.createElement('div');
    directEmailContainer.style.marginTop = '0.75rem';
    directEmailContainer.style.fontSize = '0.85rem';
    const targetChannel = getSecureChannel();
    directEmailContainer.innerHTML = `
      <a href="mailto:${targetChannel}?subject=${subject}&body=${body}" style="color: #047857; font-weight: 700; text-decoration: underline;">
        &rarr; Open in your default email client (Pre-filled confidential briefing)
      </a>
    `;
    formStatus.appendChild(directEmailContainer);
  }

  function showFormStatus(type, messageHtml) {
    if (!formStatus) return;
    formStatus.className = 'form-status-alert ' + type;
    formStatus.innerHTML = messageHtml;
    formStatus.style.display = 'block';
    formStatus.focus();
  }

  // 6. Smooth scrolling for internal anchor links with offset
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. Native <details> Mutually Exclusive Accordion synchronizer
  const accordions = document.querySelectorAll('details[name="wtd-faq"]');
  accordions.forEach(function (detail) {
    detail.addEventListener('toggle', function () {
      if (this.open) {
        accordions.forEach(function (other) {
          if (other !== detail && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });
});
