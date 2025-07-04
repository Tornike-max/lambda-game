export function setupAgeModal() {
  const modal = document.getElementById("ageModal") as HTMLDivElement;
  const confirmBtn = document.getElementById("confirm-age") as HTMLButtonElement;
  const denyBtn = document.getElementById("deny-age") as HTMLButtonElement;

  if (!localStorage.getItem("isAdult")) {
    modal.style.display = "flex";
  }

  confirmBtn?.addEventListener("click", () => {
    localStorage.setItem("isAdult", "true");
    modal.style.display = "none";
  });

  denyBtn?.addEventListener("click", () => {
    alert("You must be 18+ to play this game.");
    window.location.href = "https://google.com";
  });
}
