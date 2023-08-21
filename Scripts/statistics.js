 let genreCountList=[];
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
        alert("error fetching song list");
      }
})
}
async function salesStatisticPerGenre(){
    console.log("ani ba funkzia")
    await fetchSalesPerGenre();
    console.log("genreCountList",genreCountList);
    const xValues = [];
    const yValues = [];
    genreCountList = genreCountList.sort((a,b)=>a._id.localeCompare(b._id));
    genreCountList.forEach(genre=>{
        xValues.push(genre._id);
        yValues.push(genre.count);
    });
    console.log("xValues",xValues);
    console.log("yValues",yValues);

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
            fontColor: 'white' //set your desired color
         }
      }
   }
  });
}
salesStatisticPerGenre();

