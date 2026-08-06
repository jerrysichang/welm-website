const downloadModal = document.querySelector(".download-modal");
const downloadOpenButtons = document.querySelectorAll("[data-download-open]");
const downloadCloseButton = downloadModal?.querySelector("[data-download-close]");
const FADE_MS = 280;

let isClosingDownloadModal = false;
let scrollPosition = 0;

function lockBodyScroll() {
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.documentElement.classList.add("modal-open");
  document.body.classList.add("modal-open");
}

function unlockBodyScroll() {
  document.documentElement.classList.remove("modal-open");
  document.body.classList.remove("modal-open");
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
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
