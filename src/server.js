//Atribuindo o pacote instalado a uma variável em for de função
const express = require("express")
//A variável que recebeu o pacote se transforma em uma
//função e daí pode ser utilizada
const server = express()
//Pegar o banco de dados
const db = require("./database/db.js")

//Configurar a pasta publica
server.use(express.static("public"))
//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended:true}))


//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})


//Configurar caminhos da minha aplicação
//Página inicial
//req: Requisição
//res:Resposta
server.get("/",(req,res) =>{
return res.render("index.html",{title:"Um titulo"})
} )
server.get("/create-point",(req,res) =>{
  //req.query: Query Strings da nossa url
  //Com esse método se consegue pegar as informações da
  //url do servidor como por exemplo: nome, endereço, etc.


  return  res.render("create-point.html")

    } )
server.post("/savepoint", (req,res) =>{
//req.body: o corpo de nosso formulário
//console.log(req.body)

//Iserir dados no banco de dados
const query = `
INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
) VALUES (?,?,?,?,?,?,?);`

const values = [
req.body.image,
req.body.name,
req.body.address,
req.body.address2,
req.body.state,
req.body.city,
req.body.items

]


function afterInsertData(err){
if(err){
    console.log(err)
    return res.send("Erro no cadastro!")
}

console.log("Cadastrado com sucesso")
console.log(this)

return res.render("create-point.html",{saved: true})
}
db.run(query, values, afterInsertData)

 
})



server.get("/search", (req,res) => {

const search = req.query.search

if(search == ""){
//Pesquisa vazia
return res.render("search-results.html",{ total:0})

}


//Pegar os dados do banco de dados
db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows){
  if(err){
      return console.log(err)
  }
const total = rows.length

console.log("Aqui estão seus registros: ")
//Mostrar a página html com os dados do banco de dados
return  res.render("search-results.html",{places: rows,total:total})
})
  
    } )
      



//Ligar o servidor. chamando o servidor
server.listen(3000)