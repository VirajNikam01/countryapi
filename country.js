const countryName = new URLSearchParams(window.location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const subRegion = document.querySelector('.sub-region')
const region = document.querySelector('.region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const themeChanger = document.querySelector('.theme-changer')

const borderCountries = document.querySelector('.border-countries')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((resp)=> resp.json())
.then(([country])=> {
    // console.log(country);
    flagImage.src = country.flags.svg
    countryNameH1.innerText = country.name.common
    if (country.name.nativeName) {
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
    }
    else{
        nativeName.innerText = country.name.common
    }
    population.innerText = country.population.toLocaleString('en-IN')
    if (country.subregion) {
        subRegion.innerText = country.subregion
    }
    region.innerText = country.region
    if (country.capital) {
        capital.innerText = country.capital?.[0]
    }
    topLevelDomain.innerHTML = country.tld?.[0]
    if (country.currencies) {
        currencies.innerText = Object.values(country.currencies).map((currency)=>currency.name).join(',')
    }
    if (country.languages) {
        languages.innerText = Object.values(country.languages).join(', ')
    }
    if (country.borders) {
        country.borders.forEach((border)=>{
            // console.log(border);
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((resp)=>resp.json())
            .then(([borderCountry])=>{
                // console.log(borderCountry);
               const borderCountryTag =  document.createElement('a')
               borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
               borderCountryTag.innerText = borderCountry.name.common
            //    console.log(borderCountryTag);
               borderCountries.append(borderCountryTag)
            })
        })
    }
})

themeChanger.addEventListener('click', ()=>{
    document.body.classList.toggle('dark')
    
  })