
function populateStates(){
    const stateSelect = document.querySelector("select[name=state]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        for(const state of states){
            stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }

    })
};
populateStates();

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]")


    console.log(event.target.value);
    const stateValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

        }
        citySelect.disabled = false;

    })
}

document
    .querySelector("select[name=state]")
    .addEventListener("change", getCities);

// collect items

const itemsToCollect = document.querySelectorAll(".items-grid li");

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}



const collectedItems = document.querySelector("input[name=items")

let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;
    //add or remove class
    itemLi.classList.toggle("selected")
    const itemId = event.target.dataset.id;

    const alreadySelected = selectedItems.findIndex(item => {
        return item == itemId;
    })

    if (alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems;

}