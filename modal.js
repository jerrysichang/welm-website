const downloadModal = document.querySelector(".download-modal");
const downloadOpenButtons = document.querySelectorAll("[data-download-open]");
const downloadCloseButton = downloadModal?.querySelector("[data-download-close]");

function lockBodyScroll() {
  const scrollY = window.scrollY;
  document.body.classList.add("modal-open");
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.dataset.scrollY = String(scrollY);
}

function unlockBodyScroll() {
  const scrollY = Number(document.body.dataset.scrollY || "0");
  document.body.classList.remove("modal-open");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  delete document.body.dataset.scrollY;
  window.scrollTo(0, scrollY);
}

if (downloadModal && downloadOpenButtons.length) {
  downloadOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      lockBodyScroll();
      downloadModal.showModal();
    });
  });

  downloadCloseButton?.addEventListener("click", () => {
    downloadModal.close();
  });

  downloadModal.addEventListener("click", (event) => {
    if (event.target === downloadModal) {
      downloadModal.close();
    }
  });

  downloadModal.addEventListener("close", () => {
    unlockBodyScroll();
  });
}
