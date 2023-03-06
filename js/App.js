// console.log("Hello World");

const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerText = " ";
  // display 20 phones only

  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  // display no Phones found

  const noPhone = document.getElementById("no-found-message");

  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const divPhone = document.createElement("div");
    divPhone.classList.add("col");
    divPhone.innerHTML = `
    <div class="card p-4 h-100">
            <img src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal"
              data-bs-target="#phoneDetailModal">Show Details</button>
              
            

            </div>
          </div>
    `;
    phoneContainer.appendChild(divPhone);
  });
  //stop spinner or loader
  toggleSpinner(false);
};

//double function
const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  //start spinner or loader
  processSearch(10);
});

document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    // console.log(e.key);
    if (e.key === "Enter") {
      // code for enter
      processSearch(10);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  // console.log(phone);
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
  <p>Release Date: ${
    phone.releaseDate ? phone.releaseDate : "No ReleaseDate"
  }</p>

  <p>Storage: ${
    phone.mainFeatures ? phone.mainFeatures.storage : "No Storage"
  }</p>
  <p>Others: ${phone.others ? phone.others.Bluetooth : "No Bluetooth"}</p>
   <img class="img-fluid" src="${phone.image}">
 

  `;
};
// loadPhones("apple");
