
const addActivity = async (event) => {
  event.preventDefault();

  const entryDateEl = document.querySelector("#date");
  const durationEl = document.querySelector("#duration");
  const distanceEl = document.querySelector("#distance");
  const activityEl = document.querySelector("#activity");

  console.log(
    "These are the addActivity values from the query selector",
    durationEl.value,
    distanceEl.value,
    entryDateEl.value,
    activityEl.value
  );

  // this condition isn't working
  // if (activityEl.value.toLowerCase() != "running" && "biking" && "swimming") {
  //   alert("please enter only running, biking, or swimming");
  //   return;
  // }

  try {
    const response = await fetch("/api/user/add/newActivity", {
      method: "POST",
      body: JSON.stringify({
        // user_id: "1",
        entry_date: entryDateEl.value,
        duration: durationEl.value,
        distance: distanceEl.value,
        activity_type: activityEl.value.toLowerCase().trim(),
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
