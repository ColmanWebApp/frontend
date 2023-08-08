const createFooter = ()=> {
    document.querySelector('#footer').innerHTML =
    `<footer class="container-fluid px-5 py-4 d-flex align-items-center justify-content-between">
    <a class="text-light text-decoration-none fs-3 fw-bold" href="#">MusicApp</a>
    <p class="copyright-text p-0 m-0">2023 © All Right Reserved <span class="d-lg-inline d-none">To Yuval Ofek, Tal Mekler, Omer Ben David and Liav Burger</span></p>
    <a href="#navbar" class="btn" id="back-to-top-btn">
      Back To Top
      <i class="fa-solid fa-chevron-up ms-2"></i>
    </a>
  </footer>`
}

createFooter();