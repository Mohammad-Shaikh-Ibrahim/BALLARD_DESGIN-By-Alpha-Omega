fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Logo
    const logoImg = document.getElementById("logo");
    logoImg.src = data.header.logoImage;
    logoImg.alt = "Ballard Desgins Logo"; 
    // Logo Scrolled
    const logoImgScrolled = document.getElementById("logo-scrolled");
    logoImgScrolled.src = data.header.logoImage;
    logoImgScrolled.alt = "Ballard Desgins Logo"; 

    // Navbar Dropdown
    const dropdownNavbarNew = document.getElementById("dropdownImgNew") 
    dropdownNavbarNew.src =data.header.navbarImages.new;

    const dropdownNavbarDorm = document.getElementById("dropdownImgDorm") 
    dropdownNavbarDorm.src =data.header.navbarImages.dorm;
  })
  .catch(error => console.error("Error loading logo:", error));
