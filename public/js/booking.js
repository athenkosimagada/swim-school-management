const form = document.getElementById("bookingForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const day = document.getElementById("day").value;
  const time = document.getElementById("time").value;

  const res = await fetch("/api/booking", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      day,
      time,
    }),
  });

  const data = await res.json();

  alert(data.message);
});
