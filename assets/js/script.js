var cityFormEl = document.querySelector("#city-form");

var formSubmitHandler = function (event) {
	event.preventDefault();

	var cityName = document.getElementById('cityName');
	var countryName = document.getElementById('countryName');

	if (cityName && countryName) {
		getCityName(cityName.value, countryName.value);
	}

}

function getCityName(cityName, countryName) {


	const optionsForPrices = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '9e4ee344femsh6a6226c9bee49aap12340ejsnef8844927025',
			'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
		}
	};

//fetch url
	fetch('https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=' + cityName + '&country_name=' + countryName, optionsForPrices)
		.then(response => response.json())   		//get response from url and convert to json format
		.then(json => {  							//obtain data
			let data = {};    						//create empty "box"
			for (const item of json.prices) {     	//run through json.prices

				if (!data[item.category_name]) {		//if statement with empty category items-check if theres a "box" inside
					data[item.category_name] = [];		//add categories to empty array
				}
				data[item.category_name].push(item);	//push items
			}

			const ElementUl = document.getElementById('table-contents');		//select elements of the list of categories
			ElementUl.innerHTML = ""											//refresh/remove
			for (const category in data) {										//run through each name of categories
				ElementUl.insertAdjacentHTML("beforeend", `<li> ${category} </li>`)		//add elements of names of categories list. 
			}										  									// backtick ` is a template literal

			const ElementCat = document.getElementById('category-contents');			//select the container of the categories
			ElementCat.innerHTML = ""													//refresh from console

			for (const category in data) {						//run through category
				let listItem = ""								//refresh from console so it doesn't accumulate
				for (const item of data[category]) {			//concatenate item name,currency,price using template literal
					listItem = listItem + `						
			<tr>
			<th scope="row"><li></li></th>
			<td>${item.item_name}</td>
			<td class="d-flex justify-content-end"><b>${item.currency_code}  ${item.avg}</b></td>
			</tr>`
				}
																//insert category and listItem to html dynamically
				ElementCat.insertAdjacentHTML("beforeend", `<div>
		<h3>${category}</h3>
		<table class="table" >
		<tbody>${listItem}	
		</tbody>
		</table>
	  `)
			}
		})
		.catch(err => console.error(err));				//catch error if fetch fails
}


cityFormEl.addEventListener("submit", formSubmitHandler);  //add eventlistener submit to event 