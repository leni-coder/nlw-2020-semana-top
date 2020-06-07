/*Para buscar APIS  do IBGE acesse o site 
https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-Municipios-estadosUFMunicipiosGet*/
//Utilizando API do IBG para estados e cidades
/*configuração de comandos para utilizar a API do IBGE
para estados*/ 
function populateUfs(){
const ufselect = document.querySelector("select[name=uf]")
//Chamada da API do IBGE
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
.then(res => res.json())
.then(states =>{
for(const state of states){
    ufselect.innerHTML += `<option value="${state.id}">
    ${state.nome}</option>`
}

})


}
populateUfs()
//Função de chamada da API do IBGE para cidades por estado
function getCities(event){
const citySelect = document.querySelector("select[name=city]")
const ufvalue = event.target.value
//Então eu criei a variável e chamei a tag input hidden pra ele mandar pra ela os valores e daí deu certo.
//A variável que criei está abaixo
const stateInput = document.querySelector('input[name=state]')
const indexOfSelectedstate = event.target.selectedIndex
//Aqui nessa variável stateInput ele não havia chamado a tag input hidden que está abaixo
stateInput.value = event.target.options[indexOfSelectedstate].text

//Endereço da url da API do IBGE para cidades
const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`
citySelect.innerHTML = "<option value>selecione a cidade</option>"
citySelect.disabled = true
fetch(url).then(res => res.json())
.then(cities =>{
   
    for(const city of cities){
        citySelect.innerHTML +=`<option value="${city.nome}">
        ${city.nome}</option>`
    }
    citySelect.disabled = false
})





}
//Criação de evento para fazer a mudança nas caixas de UF e CITY
document.querySelector("select[name=uf]")
.addEventListener("change", getCities)

//Itens de coleta
//Pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")
for(const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}
const collectedItems=document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma class em js
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
//Conferindo os valores do da variável itemId
console.log('ITEM-ID: ',itemId)

//Verificar se existem itens selecinados, se sim
//se pega os itens selecionados
const alreadySelected = selectedItems.findIndex( item => item == itemId)

//Se já estiver selecionado,

if(alreadySelected >= 0){
   // tirar a seleção
   const filteredItems = selectedItems.filter(item => {
       const itemIsDifferent = item != itemId //False
       return itemIsDifferent
   })
   selectedItems = filteredItems
}else{
    //Se não estiver selecionado
    //Adicionar à seleção
    selectedItems.push(itemId)
}
console.log('selectedItems: ',selectedItems)

collectedItems.value = selectedItems

}