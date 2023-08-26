const createFooter = ()=> {
  document.querySelector('#footer').innerHTML =
  `<footer class="container-fluid px-5 py-4 d-flex align-items-center justify-content-between">
  <a class="text-light text-decoration-none fs-3 fw-bold col-2" href="./">
      <span class="w-100">
      <svg style="max-height: 50px" viewBox="0 0 45 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.6652 12.472C15.1452 12.472 14.6732 12.368 14.2492 12.16C13.8332 11.944 13.5052 11.612 13.2652 11.164C13.0252 10.708 12.9052 10.124 12.9052 9.412V5.788H15.6172V8.944C15.6172 9.408 15.6932 9.732 15.8452 9.916C15.9972 10.1 16.2052 10.192 16.4692 10.192C16.6292 10.192 16.7772 10.152 16.9132 10.072C17.0572 9.984 17.1732 9.844 17.2612 9.652C17.3492 9.452 17.3932 9.192 17.3932 8.872V5.788H20.1052V12.352H17.5252V10.456L18.0412 10.972C17.8092 11.484 17.4772 11.864 17.0452 12.112C16.6212 12.352 16.1612 12.472 15.6652 12.472Z" fill="#ECFFE3"/>
      <path d="M23.8761 12.472C23.3161 12.472 22.7641 12.412 22.2201 12.292C21.6761 12.172 21.2361 12.016 20.9001 11.824L21.6441 10.036C21.9561 10.22 22.3161 10.364 22.7241 10.468C23.1401 10.572 23.5441 10.624 23.9361 10.624C24.2641 10.624 24.4841 10.596 24.5961 10.54C24.7161 10.484 24.7761 10.408 24.7761 10.312C24.7761 10.216 24.7081 10.148 24.5721 10.108C24.4361 10.06 24.2561 10.024 24.0321 10C23.8081 9.976 23.5601 9.948 23.2881 9.916C23.0241 9.876 22.7561 9.82 22.4841 9.748C22.2121 9.676 21.9641 9.568 21.7401 9.424C21.5161 9.28 21.3361 9.088 21.2001 8.848C21.0641 8.6 20.9961 8.288 20.9961 7.912C20.9961 7.496 21.1201 7.12 21.3681 6.784C21.6241 6.448 22.0001 6.18 22.4961 5.98C23.0001 5.772 23.6201 5.668 24.3561 5.668C24.8361 5.668 25.3161 5.712 25.7961 5.8C26.2761 5.888 26.6881 6.024 27.0321 6.208L26.2881 7.996C25.9521 7.812 25.6201 7.688 25.2921 7.624C24.9721 7.552 24.6721 7.516 24.3921 7.516C24.0481 7.516 23.8121 7.548 23.6841 7.612C23.5641 7.676 23.5041 7.748 23.5041 7.828C23.5041 7.924 23.5721 7.996 23.7081 8.044C23.8441 8.092 24.0241 8.128 24.2481 8.152C24.4721 8.176 24.7161 8.208 24.9801 8.248C25.2521 8.28 25.5201 8.336 25.7841 8.416C26.0561 8.488 26.3041 8.596 26.5281 8.74C26.7521 8.884 26.9321 9.08 27.0681 9.328C27.2041 9.568 27.2721 9.876 27.2721 10.252C27.2721 10.644 27.1481 11.012 26.9001 11.356C26.6521 11.692 26.2761 11.964 25.7721 12.172C25.2681 12.372 24.6361 12.472 23.8761 12.472Z" fill="#ECFFE3"/>
      <path d="M28.0933 12.352V5.788H30.8053V12.352H28.0933ZM29.4493 5.26C28.9533 5.26 28.5573 5.128 28.2613 4.864C27.9653 4.6 27.8173 4.272 27.8173 3.88C27.8173 3.488 27.9653 3.16 28.2613 2.896C28.5573 2.632 28.9533 2.5 29.4493 2.5C29.9453 2.5 30.3413 2.624 30.6373 2.872C30.9333 3.12 31.0813 3.44 31.0813 3.832C31.0813 4.248 30.9333 4.592 30.6373 4.864C30.3413 5.128 29.9453 5.26 29.4493 5.26Z" fill="#ECFFE3"/>
      <path d="M32.3073 12.352V6.112C32.3073 5.264 32.5593 4.588 33.0633 4.084C33.5753 3.58 34.2993 3.328 35.2353 3.328C35.5233 3.328 35.8113 3.356 36.0993 3.412C36.3953 3.46 36.6433 3.54 36.8433 3.652L36.1953 5.536C36.1073 5.496 36.0113 5.46 35.9073 5.428C35.8033 5.396 35.6953 5.38 35.5833 5.38C35.3913 5.38 35.2353 5.44 35.1153 5.56C34.9953 5.68 34.9353 5.872 34.9353 6.136V6.448L35.0193 7.564V12.352H32.3073ZM31.4073 8.128V6.148H36.3633V8.128H31.4073Z" fill="#ECFFE3"/>
      <path d="M38.6739 14.8C38.3139 14.8 37.9459 14.744 37.5699 14.632C37.2019 14.528 36.9059 14.388 36.6819 14.212L37.5819 12.352C37.7179 12.456 37.8699 12.54 38.0379 12.604C38.2139 12.668 38.3819 12.7 38.5419 12.7C38.7819 12.7 38.9659 12.648 39.0939 12.544C39.2219 12.448 39.3259 12.3 39.4059 12.1L39.6819 11.404L39.8739 11.14L41.9739 5.788H44.5419L41.8419 12.484C41.6019 13.084 41.3219 13.552 41.0019 13.888C40.6899 14.224 40.3379 14.46 39.9459 14.596C39.5619 14.732 39.1379 14.8 38.6739 14.8ZM39.3099 12.652L36.4539 5.788H39.2379L41.2059 10.9L39.3099 12.652Z" fill="#ECFFE3"/>
      <path d="M12 2.97077C12 3.31653 12 6.08403 12 6.2841V13.1474C12 14.0229 10.1601 14.7321 9.12494 14.7321C8.08981 14.7321 7.24998 14.0229 7.24998 13.1474C7.24998 12.2719 8.08981 11.5627 9.12494 11.5627C9.34369 11.5627 9.55462 11.5944 9.74993 11.6539V4.71526L8.65897 6.5071L7.24998 9.11508L5.6587 7.01425L4.75002 5.70346V7.37884L4.75002 14.4151C4.75002 15.2906 2.9101 15.9998 1.87497 15.9998C0.839829 15.9998 0 15.2906 0 14.4151C0 13.5396 0.839829 12.8305 1.87497 12.8305C2.09371 12.8305 2.30465 12.8622 2.49996 12.9216L2.49996 5.48121C2.49996 5.34937 2.49996 4.74748 2.51663 4.16527C2.53863 3.39681 3.11384 2.85987 3.86078 2.67797L4.39622 2.54758C4.46512 2.5308 4.53646 2.52643 4.60689 2.53468V2.53468C4.85638 2.56391 5.08018 2.70195 5.21826 2.91178L5.30762 3.04756L7.00062 5.48121L8.19658 3.57962L8.75776 2.68403C9.23636 1.92023 9.66678 1.22528 10.5389 0.997594V0.997594C10.9501 0.890252 11.8142 0.600334 11.9017 1.01618C12.0004 1.48484 12 2.40508 12 2.97077Z" fill="url(#paint0_linear_270_18)"/>
      <defs>
      <linearGradient id="paint0_linear_270_18" x1="6" y1="0.736328" x2="6" y2="16.0003" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00CF9D"/>
      <stop offset="1" stop-color="#00561D"/>
      </linearGradient>
      </defs>
      </svg>
      </span>
  </a>
  <p class="copyright-text p-0 m-0 col-auto">2023 © All Right Reserved <span class="d-lg-inline d-none">To Yuval Ofek, Tal Mekler, Omer Ben David and Liav Burger</span></p>
  <a href="#navbar" class="btn col-auto" id="back-to-top-btn">
    Back To Top
    <i class="fa-solid fa-chevron-up ms-2"></i>
  </a>
</footer>`
}

createFooter();