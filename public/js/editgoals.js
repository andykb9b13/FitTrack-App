const saveGoalsForm = async function (event) {
  console.log("are we inside?")
    event.preventDefault();
  
    const totalHoursEl = document.querySelector("#total-hours");
    const daysOfExerciseEl = document.querySelector("#days-of-exercise");
    const targetweightEl = document.querySelector("#target-weight");

    try {
    const response = await fetch("/api/user/goals", {
      method: "POST",
      body: JSON.stringify({
        hours_of_exercise: totalHoursEl.value,
        days_of_exercise: daysOfExerciseEl.value,
        weightloss_goal: targetweightEl.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("goals response", response);
  
    if (response.ok) {
      document.location.replace("/goals");
      alert("Goals updated!");
    } else {
      alert("Failed to update profile.");
    }
  } catch (err) {
    console.log("error in goals", err)
  }
  };
  
  const profileRedirect = async (event) => {
    event.preventDefault();
    document.location.replace("/profile");
  };
  
  document
    .querySelector("#savegoals")
    .addEventListener("click", saveGoalsForm);
  
  document
     .querySelector("#cancelBtn")
   .addEventListener("click", profileRedirect);
  