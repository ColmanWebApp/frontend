 let genreCountList=[];
 let lastTenDaysCountSales=[];
async function fetchSalesPerGenre(){
    await $.ajax({
    url: `http://localhost:6969/statistics/salesPerGenre`,
      type: "GET",
      contentType: "application/json",
      secure: true,
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      success:function(res){
        genreCountList=res;
      },
      error:function(error){
        alert("error fetching Genere Count List");
      }
  })
}

async function fetchLastTenDaysSales(){
  await $.ajax({
  url: `http://localhost:6969/statistics/lastTenDaysSales`,
    type: "GET",
    contentType: "application/json",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    success:function(res){
      lastTenDaysCountSales=res;
    },
    error:function(error){
      alert("error fetching Last Ten Days Sales Count List");
    }
})
}


async function lastTenDaysSalesStatistics(){
  await fetchLastTenDaysSales();
  let lastTenDays = new Map();
  // add the last 10 days in format dd-mm-yyyy
  for (let i = 0; i < 10; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i);
    lastTenDays.set(`${date.getDate()}-${(date.getMonth() + 1>9) ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}-${date.getFullYear()}`,0);
  }
  lastTenDaysCountSales.forEach(date=>{
    lastTenDays.set(date._id, date.count)
  });
  const xValues = [];
  const yValues = [];
  lastTenDays.forEach((value,key)=>{
    xValues.push(key);
    yValues.push(value);
  });
  xValues.reverse();
  yValues.reverse();
  
  let max=yValues[0];
  for (let i=1;i<yValues.length;i++){
    if(max<yValues[i])
      max=yValues[i];
  }
  
    const barColors = [
    '#FF5733', '#FFBD33', '#FFD633', '#FFEE33', '#D9FF33',
    '#7DFF33', '#33FF7E', '#33FFB9', '#33FFE5', '#33E5FF',
    '#33B9FF', '#337EFF', '#334CFF', '#7A33FF', '#B933FF',
    '#E533FF', '#FF33F1', '#FF33B9', '#FF3398', '#FF336A',
    '#FF334C', '#FF5D33', '#FF8333', '#FFA833', '#FFD133'
];
const graph=document.getElementById("genresChart2")
new Chart(graph, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      color:"black",
      backgroundColor: "black",
      borderColor: "rgb(46, 204, 113)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:max}}],
    },
    title: {
      display: true,
    
    }
  }
  });
}

async function salesStatisticPerGenre(){
    await fetchSalesPerGenre();
    const xValues = [];
    const yValues = [];
    genreCountList = genreCountList.sort((a,b)=>a._id.localeCompare(b._id));
    genreCountList.forEach(genre=>{
        xValues.push(genre._id);
        yValues.push(genre.count);
    });  
    yValues.push(0);

  const barColors = [
      '#FF5733', '#FFBD33', '#FFD633', '#FFEE33', '#D9FF33',
      '#7DFF33', '#33FF7E', '#33FFB9', '#33FFE5', '#33E5FF',
      '#33B9FF', '#337EFF', '#334CFF', '#7A33FF', '#B933FF',
      '#E533FF', '#FF33F1', '#FF33B9', '#FF3398', '#FF336A',
      '#FF334C', '#FF5D33', '#FF8333', '#FFA833', '#FFD133'
  ];

  new Chart("genresChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }],
      
    },
    options: {
      legend: {
         labels: {
            fontColor: 'white' 
         },
         display:false
      }
   }
  });
}

