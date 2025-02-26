document.querySelectorAll(".vector-wrapper").forEach((wrapper) => {
  wrapper.addEventListener("click", () => {
    document.querySelectorAll(".vector-wrapper").forEach((el) => {
      el.classList.add("dimmed");
      el.classList.remove("active");
    });
    wrapper.classList.remove("dimmed");
    wrapper.classList.add("active");
  });
});
