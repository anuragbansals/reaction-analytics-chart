var chart;
var options = {
  series: [
    {
      name: "ExpoSim Virtual Convention and Summit 2023",
      data: [],
    },
  ],
  noData: {
    text: "Loading...",
  },
  chart: {
    type: "bar",
    stacked: false,
    height: 350,
    zoom: {
      type: "x",
      enabled: true,
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: "zoom",
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  title: {
    text: "Meeting Analytics",
    align: "left",
  },
  fill: {
    // opacity: 0.16,
    type: "solid",
    // colors: ["red"]
  },
  yaxis: {},
  xaxis: {
    // type: "datetime",
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function (val) {
        return val.toFixed(0);
      },
    },
  },
};

window.ApexCharts &&
  (chart = new ApexCharts(document.querySelector("#chart"), options)).render();

refreshLiveUserStat();

async function refreshLiveUserStat() {
  let response = await fetch("https://demo.exposim.io/api/all-analytics", {
    headers: {
      Authorization:
        "Bearer " +
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGFjYTc0YWFhNDNlMzM2NzM5OWUyNzg1NTY4M2ViZTBiZDI4ZTdlN2ZmMGVkZTllNWU0N2ExY2U3YzJiMTE5Y2UzMTZkN2E2YzEzNWM0YzEiLCJpYXQiOjE3MTY2MjAwNzUuMzM0MTQ5LCJuYmYiOjE3MTY2MjAwNzUuMzM0MTUsImV4cCI6MTc0ODE1NjA3NS4zMjc4NDEsInN1YiI6IjE3NjM3OCIsInNjb3BlcyI6W119.c4Jc69f25Qi_AiT-6Tn4kBOgFqH19nC8dbX0xLIiIYDrObLXmfNNYm-As7G9bbuUcXk9GWOnqwghFahXrnt0Dnrvem3U-CoP9J91e-JaaxrZM_807WidwoMVkTxcIo_LOBmkFy-suqfE2mZkUjs0NhK0BDsS4FGbCYTYSnGZEwRtntpOVKA6Ch2v63BmA2ffymph7cRjyPNfA1H9a05jTyZ6TImT-0nE8T4nxTyQUJcS3NWINQEh10_TAv25mXic5Af-Ug-wMtXoigM0emT-x7s5bCmOCOcH7qWwf0J22TD2P0qZh5wLWZeiQxo0yDd9JJLSazi51RBeehKSPtbWlKQjdbKUNSqoowB4GG2RnlPgJ-MkkIZurgr_UUaoOzSHa7pfdQUfxQVzWRR3wL7iLgGz_QwdlHtxC0suDWAWaa12A_RfF_qODzTZEX-jYFa5pNoROiViq8l417K2W1nvG8fGyekDjQE10Pnz-kWmpvPmn8z5cQ08avThYsU4Txy6lnGl--Ual1t-YrOSdLuG9APCCutSSN9cb1YbkUi-QsyFsXL8VL18S3T_YjwfQJJ1EpYRFcAFO9VsKeexLAzQhPgWflGxl-Vi3ATZz_sYCxboxizmvz3IELMrKWBECGzkf_QXo82_GD_3SqUb-Bq5ljV50E02wR1WLqIzebjNg5k",
    },
  });
  let data = await response.json();
  console.log(data.reactionAnalytics);
  let analyticsData = [];
  Object.keys(data.reactionAnalytics).forEach((item) => {
    let obj = {
      x: item,
      y: data.reactionAnalytics[item],
    };
    analyticsData.push(obj);
  });
  chart.updateSeries([
    {
      data: analyticsData,
    },
  ]);
}
