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
  const activityEl = document.querySelector("#activity");
  const weightEl = document.querySelector("#weight");

  console.log(
    "These are the addActivity values from the query selector",
    durationEl.value,
    distanceEl.value,
    entryDateEl.value,
    activityEl.value,
    weightEl.value,
  );

  // this condition isn't working
  // if (activityEl.value.toLowerCase() != "running" && "biking" && "swimming") {
  //   alert("please enter only running, biking, or swimming");
  //   return;
  // }

  try {
    const response = await fetch("/api/user/activity", {
      method: "POST",
      body: JSON.stringify({
        // user_id: "1",
        entry_date: entryDateEl.value,
        duration: durationEl.value,
        distance: distanceEl.value,
        activity_type: activityEl.value.toLowerCase().trim(),
        weigh_in: weightEl.value,
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
