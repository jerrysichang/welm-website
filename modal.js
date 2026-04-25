const downloadModal = document.querySelector(".download-modal");
const downloadOpen = document.querySelector("[data-download-open]");

if (downloadModal && downloadOpen) {
  downloadOpen.addEventListener("click", () => {
    downloadModal.showModal();
  });

  downloadModal.addEventListener("click", (event) => {
    if (event.target === downloadModal) {
      downloadModal.close();
    }
  });
}
