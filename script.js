//fetching data from api
fetch("https://restcountries.com/v3.1/all")
  .then((resp) => resp.json())
  .then((data) => {
    //running the loop on array of data we got from api
    data.forEach((country) => {
      //creating a different card for each data to display on page
      const countriesContainer = document.querySelector(".countries-container");
      const countryCard = document.createElement("a");
      countryCard.classList.add("country-card");
      countryCard.href = `country.html?name=${country.name.common}`
      

      countryCard.innerHTML = `
<img src="${country.flags.svg}" alt="${country.name.common}">
<div class="card-text">
    <h3 class="card-title">${country.name.common}</h3>
    <p><b>Population :- </b>${country.population.toLocaleString('en-IN')}</p>
    <p><b>Region :- </b>${country.region}</p>
    <p><b>Capital :- </b>${country.capital}</p>
</div>
`;
      countriesContainer.append(countryCard);
    });
  });
