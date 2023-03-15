const ctx = document.getElementById("activityGraph");
// const second = document.getElementById("secondChart");
// const third = document.getElementById("thirdChart");

const getActivities = async () => {
  try {
    const response = await fetch("/api/graph/all/activities", {
      method: "GET",
    });
    console.log("This is the response for getActivities", response);
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

// const getGoals = async () => {
//   try {
//     const response = await fetch("/api/graph/goals");
//     const data = response.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

const activityData = async () => {
  const data = await getActivities();
  console.log(data);
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map((row) => row.entry_date),
      datasets: [
        {
          label: "Duration",
          data: data.map((row) => row.duration),
          borderWidth: 2,
          borderColor: "rgb(170, 74, 68)",
          backgroundColor: "rgb(170, 74, 68)",
          type: "line",
          order: 0,
        },
        {
          label: "Distance",
          data: data.map((row) => row.distance),
          borderWidth: 2,
          backgroundColor: "rgb(0, 0, 255, 0.7)",
          order: 1,
        },
      ],
    },
    options: {
      plugin: {
        title: {
          display: true,
          positon: "top",
          align: "center",
          text: "Your Weekly Fitness!",
        },
      },
      scales: {
        y: {
          position: "left",
          beginAtZero: true,
          title: {
            display: true,
            text: "Time (Minutes)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date (YYYY/MM/DD)",
          },
        },
      },
    },
  });
};

activityData();

// const goalsData = async () => {
//   const data = await getGoals();
//   new Chart(second, {
//     type: "bar",
//     data: {
//       labels: data.map((row) => row.activity_type),
//       datasets: [
//         {
//           label: "duration",
//           data: data.map((row) => row.duration),
//           borderWidth: 1,
//         },
//       ],
//     },
//   });
// };

// goalsData();

// const myData3 = async () => {
//   const data = await getData();
//   new Chart(third, {
//     type: "polarArea",
//     data: {
//       labels: data.map((row) => row.entry_date),
//       datasets: [
//         {
//           label: "duration",
//           data: data.map((row) => row.duration),
//           borderWidth: 1,
//         },
//       ],
//     },
//   });
// };

// myData3();
