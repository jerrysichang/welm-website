const downloadModal = document.querySelector(".download-modal");
const downloadOpenButtons = document.querySelectorAll("[data-download-open]");

if (downloadModal && downloadOpenButtons.length) {
  downloadOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      downloadModal.showModal();
    });
  });

  downloadModal.addEventListener("click", (event) => {
    if (event.target === downloadModal) {
      downloadModal.close();
    }
  });
}
