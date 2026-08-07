const downloadModal = document.querySelector(".download-modal");
const downloadOpenButtons = document.querySelectorAll("[data-download-open]");
const downloadCloseButton = downloadModal?.querySelector("[data-download-close]");
const FADE_MS = 280;

let isClosingDownloadModal = false;
let scrollPosition = 0;
let scrollbarWidth = 0;

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

function lockBodyScroll() {
  // Save current scroll position
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  // Calculate scrollbar width to prevent layout shift
  scrollbarWidth = getScrollbarWidth();
  
  // Apply position fixed to body with negative top to maintain visual position
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  
  // Compensate for scrollbar removal on both body and header
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    // Also compensate the header to prevent it from shifting
    const header = document.querySelector('.site-header');
    if (header) {
      header.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  
  // Add classes for additional styling if needed
  document.documentElement.classList.add("modal-open");
  document.body.classList.add("modal-open");
}

function unlockBodyScroll() {
  // Remove classes
  document.documentElement.classList.remove("modal-open");
  document.body.classList.remove("modal-open");
  
  // Remove all inline styles
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.paddingRight = '';
  
  // Remove header padding compensation
  const header = document.querySelector('.site-header');
  if (header) {
    header.style.paddingRight = '';
  }
  
  // Restore scroll position
  window.scrollTo(0, scrollPosition);
}

function preventModalScroll(event) {
  event.preventDefault();
}

function dismissDownloadModal() {
  if (!downloadModal?.open || isClosingDownloadModal) {
    return;
  }

  isClosingDownloadModal = true;
  downloadModal.classList.add("is-closing");

  let finished = false;
  const finish = () => {
    if (finished) {
      return;
    }
    finished = true;
    downloadModal.removeEventListener("animationend", onAnimationEnd);
    downloadModal.classList.remove("is-closing");
    isClosingDownloadModal = false;
    downloadModal.close();
  };

  const onAnimationEnd = (event) => {
    if (event.target === downloadModal) {
      finish();
    }
  };

  downloadModal.addEventListener("animationend", onAnimationEnd);
  window.setTimeout(finish, FADE_MS + 50);
}

if (downloadModal && downloadOpenButtons.length) {
  downloadOpenButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      if (isClosingDownloadModal) {
        return;
      }
      downloadModal.classList.remove("is-closing");
      lockBodyScroll();
      downloadModal.showModal();
    });
  });

  downloadCloseButton?.addEventListener("click", () => {
    dismissDownloadModal();
  });

  downloadModal.addEventListener("click", (event) => {
    if (event.target === downloadModal) {
      dismissDownloadModal();
    }
  });

  // Escape closes via cancel; prevent instant close so we can fade out
  downloadModal.addEventListener("cancel", (event) => {
    event.preventDefault();
    dismissDownloadModal();
  });

  downloadModal.addEventListener("close", () => {
    downloadModal.classList.remove("is-closing");
    isClosingDownloadModal = false;
    unlockBodyScroll();
  });

  // dialog can still receive wheel/touch scroll — block it while open
  downloadModal.addEventListener("wheel", preventModalScroll, { passive: false });
  downloadModal.addEventListener("touchmove", preventModalScroll, { passive: false });
}
