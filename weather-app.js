// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
// api.openweathermap.org/data/2.5/weather?q={city}&appid={ipKey}&units=metric



const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".msg")
const list = document.querySelector(".cities")


const ipKey = "63c945742724ec4ec0f6d12255bd844d";
form.addEventListener("submit", e => {
    e.preventDefault();
    let inputval = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputval}&appid=${ipKey}&units=metric`
    fetch(url)
    .then(Response => Response.json())
    .then(data => {
        // console.log(data);
        const {main, name, sys, weather} = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
        const li = document.createElement("li")
        li.classList.add("city");
        const markup = `
        <h1 class = 'city-name' data-name${name},${sys.country}>
            <span>${name}</span>
            <span>${sys.country}</span>
        </h1>
        <div class = 'city-temp'>${Math.round(main.temp)}</div>
        <figure>
            <img class = 'city-icon' src = '${icon}' alt = 'no connect'>
            <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        `;
        li.innerHTML = markup;
        list.appendChild(li);
        msg.innerText = "";
        input.value = ""
    })
    .catch(() => {
        msg.innerText = "search for a valid city"
    })

})