// import VanillaCalendar from "@uvarov.frontend/vanilla-calendar";
// import "@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css";
// import "@uvarov.frontend/vanilla-calendar/build/themes/light.min.css";
// import "@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css";

// //https://vanilla-calendar.frontend.uvarov.tech/api/ api documentation to reference later

// const calendar = new VanillaCalendar("#calendar");
// calendar.init();

const addActivity = async (event) => {
  event.preventDefault();

  const entryDateEl = document.querySelector("#date");
  const durationEl = document.querySelector("#duration");
  const distanceEl = document.querySelector("#distance");

  console.log(
    "These are the addActivity values from the query selector",
    durationEl.value,
    distanceEl.value,
    entryDateEl.value
  );

  try {
    const response = await fetch("/api/user/add/newActivity", {
      method: "POST",
      body: JSON.stringify({
        // user_id: "1",
        entry_date: entryDateEl.value,
        duration: durationEl.value,
        distance: distanceEl.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    alert("New Activity Created!");
    document.location.replace("/profile");
  } catch (err) {
    console.log("There was an error adding the activity", err);
  }
};

const profileRedirect = async (event) => {
  event.preventDefault();
  document.location.replace("/profile");
};

document.querySelector("#saveBtn").addEventListener("click", addActivity);
document
  .querySelector("#profileBtn")
  .addEventListener("click", profileRedirect);
