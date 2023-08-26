const createFooter = async ()=> {
  let usdToILS = 0;
    await $.ajax({
    url: `https://api.apilayer.com/exchangerates_data/latest?symbols=ils&base=usd`,
    type: "GET",
    secure: true,
    cors: true,
    headers: {
      "apikey": "TFpsc4FIunqEjYbDuIpY6EBj4FV6hyfJ"
    },
  }).done((res)=>usdToILS = res.rates.ILS);




  document.querySelector('#footer').innerHTML =
  `<footer class="container-fluid px-5 py-4 d-flex align-items-center justify-content-between">
  <p class="copyright-text p-0 m-0 col-auto">2023 © All Right Reserved <span class="d-lg-inline d-none">To Yuval Ofek, Tal Mekler, Omer Ben David and Liav Burger</span></p>
  <p class="col-auto p-0 m-0 currency-text d-xl-inline d-none">Exchange rate: 1 USD = ${usdToILS} ILS</i></p>
  <a href="#navbar" class="btn col-auto" id="back-to-top-btn">
    Back To Top
    <i class="fa-solid fa-chevron-up ms-2"></i>
  </a>
</footer>`
}

createFooter();