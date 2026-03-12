const addNapBtn = document.getElementById("addNap");
const napContainer = document.getElementById("napContainer");

let napCount = 1;

addNapBtn.addEventListener("click", () => {
  if (napCount >= 3) {
    alert("Maximum 3 nap times allowed");
    return;
  }

  const input = document.createElement("input");

  input.type = "time";
  input.name = "nap";

  napContainer.appendChild(input);

  napCount++;
});

const form = document.getElementById("intakeForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const childName = document.getElementById("childName").value;
  const age = document.getElementById("age").value;

  const naps = [];

  document.querySelectorAll("input[name='nap']").forEach((n) => {
    naps.push(n.value);
  });

  const res = await fetch("/api/intake", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      childName,
      age,
      naps,
    }),
  });

  const data = await res.json();

  alert(data.message);
});
