const downloadModal = document.querySelector(".download-modal");
const downloadOpenButtons = document.querySelectorAll("[data-download-open]");
const downloadCloseButton = downloadModal?.querySelector("[data-download-close]");

if (downloadModal && downloadOpenButtons.length) {
  downloadOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
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
}
