try{
  const BASE_URL =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Ql7qArS8s9EWWab6KBppuRpUo2dRhdu521qhAdCa";
  const BASE_URL2 ="https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_Ql7qArS8s9EWWab6KBppuRpUo2dRhdu521qhAdCa"


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns) {

  fetch(BASE_URL).then((res)=>{
      return res.json();
     }).then(data=>{
      // const l=data
  for (currCode in data.data) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
     
)
}


const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  
  const URL = `${BASE_URL}&currencies=${toCurr.value.toUpperCase()}&base_currency=${fromCurr.value.toUpperCase()}`;
  const URL2=`${BASE_URL2}&currencies=${toCurr.value.toUpperCase()}`
  const URL3=`${BASE_URL2}&currencies=${fromCurr.value.toUpperCase()}`
  
  let response = await fetch(URL);
  let response2 = await fetch(URL2);
  let response3 = await fetch(URL3);


  let data = await response.json();
  let data2 = await response2.json();
  let data3 = await response3.json();


  let rate = data.data[toCurr.value.toUpperCase()];
  let symbol1 = data2.data[toCurr.value.toUpperCase()];
  let symbol2 = data3.data[fromCurr.value.toUpperCase()];
  
  let finalAmount = amtVal * rate;

  msg.style.cssText="font-size:150%;display: flex;align-items: center"

 
  msg.innerText = `${amtVal} ${symbol2.symbol}(${symbol2.name})= ${finalAmount} ${symbol1.symbol}(${symbol1.name}) `;
};

const updateFlag = (element) => {
  let currCode = element.value;
  const countryCode = currCode.slice(0,2)
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;

};


btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

}
catch(error){
  alert(error);
}