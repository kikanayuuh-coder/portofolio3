document.getElementById("tahun").textContent = new Date().getFullYear();

// Animasi muncul saat di-scroll
var items = document.querySelectorAll("section .wrap > h2, .about > *, .card, .contact");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        el.classList.add("tampil");
        setTimeout(function () {
          el.classList.remove("reveal", "tampil");
          el.style.transitionDelay = "";
        }, 1500);
      });
    },
    { threshold: 0.15 },
  );
  items.forEach(function (el) {
    el.classList.add("reveal");
    if (el.classList.contains("card")) {
      var i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = i * 120 + "ms";
    }
    io.observe(el);
  });
}
document.getElementById("kontak").addEventListener("submit", function (e) {
  e.preventDefault();
  var nama = document.getElementById("nama").value;
  var pesan = document.getElementById("pesan").value;
  var subjek = encodeURIComponent("Pesan dari " + nama);
  var isi = encodeURIComponent(pesan);
  window.location.href = "mailto:email@kamu.com?subject=" + subjek + "&body=" + isi;
});

const scriptURL = "https://script.google.com/macros/s/AKfycbwAAB-Jn6t8XHxwr7xogpoX0CMTjbmIioQrw4oWU_okULZRQWfaMu27POhqfnhMr64/exec";
const form = document.forms["contact_form"];

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Mengirim...";

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
    });

    const result = await response.json();

    if (result.result === "success") {
      alert("Pesan berhasil dikirim!");
      form.reset();
    } else {
      alert("Gagal: " + result.message);
    }
  } catch (error) {
    alert("Terjadi kesalahan saat mengirim pesan.");
    console.error(error);
  } finally {
    button.disabled = false;
    button.textContent = "Kirim pesan";
  }
});
