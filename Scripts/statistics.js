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
  const xValues = [];
  const yValues = [];
    lastTenDaysCountSales.forEach(date=>{
      xValues.push(date._id);
      yValues.push(date.count);
  });

const barColors = [
    '#FF5733', '#FFBD33', '#FFD633', '#FFEE33', '#D9FF33',
    '#7DFF33', '#33FF7E', '#33FFB9', '#33FFE5', '#33E5FF',
    '#33B9FF', '#337EFF', '#334CFF', '#7A33FF', '#B933FF',
    '#E533FF', '#FF33F1', '#FF33B9', '#FF3398', '#FF336A',
    '#FF334C', '#FF5D33', '#FF8333', '#FFA833', '#FFD133'
];
const graph=document.getElementById("genresChart2")
new Chart(graph, {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: [...yValues,0],
      label:''
    }],
    
  },
  options: {
    legend:{
      display:false
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

  const barColors = [
      '#FF5733', '#FFBD33', '#FFD633', '#FFEE33', '#D9FF33',
      '#7DFF33', '#33FF7E', '#33FFB9', '#33FFE5', '#33E5FF',
      '#33B9FF', '#337EFF', '#334CFF', '#7A33FF', '#B933FF',
      '#E533FF', '#FF33F1', '#FF33B9', '#FF3398', '#FF336A',
      '#FF334C', '#FF5D33', '#FF8333', '#FFA833', '#FFD133'
  ];

  new Chart("genresChart", {
    type: "doughnut",
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
         }
      }
   }
  });
}


salesStatisticPerGenre();
lastTenDaysSalesStatistics();

