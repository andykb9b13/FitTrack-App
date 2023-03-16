const saveGoalsForm = async function (event) {
    event.preventDefault();
  
    const totalHoursEl = document.querySelector("#total-hours");
    const daysOfExerciseEl = document.querySelector("#days-of-exercise");
    const targetweightEl = document.querySelector("#target-weight");

    const response = await fetch("/api/user/edit/goals", {
      method: "POST",
      body: JSON.stringify({
        hours_of_exercise: totalHoursEl.value,
        days_of_exercise: daysOfExerciseEl.value,
        weightloss_goal: targetweightEl.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
  
    if (response.ok) {
      document.location.replace("/goals");
      alert("Goals updated!");
    } else {
      alert("Failed to update profile.");
    }
  };
  
// //   const profileRedirect = async (event) => {
// //     event.preventDefault();
// //     document.location.replace("/profile");
// //   };
  
// //   document
// //     .querySelector("#saveProfileBtn")
// //     .addEventListener("click", saveProfileForm);
  
// //   document
//     .querySelector("#cancelChangesBtn")
//     .addEventListener("click", profileRedirect);
  