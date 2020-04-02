/* Usei o express para criar e configurar o meu servidor */
const express = require("express")
const server = express()

const db = require("./db")

/*const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        url: "https://willdetilli.site/ebook-7-regras"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729021.svg",
        title: "Jogar Vídeo Game",
        category: "Entretenimento",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        url: "https://tvgameover.com.br/"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2737/2737039.svg",
        title: "Tocar um instrumento musical",
        category: "Arte",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        url: "https://www.aulasfabiolima.com.br/"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title: "Pintura",
        category: "Arte",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        url: "https://br.pinterest.com/dorafragoso/pintores-famosos/"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729076.svg",
        title: "Assistir a Rocketseat",
        category: "Estudo",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        url: "https://www.youtube.com/channel/UCSfwM5u0Kce6Cce8_S72olg"
    }
]*/

/* configurar arquivos estáticos (css, scripts, imagens) */
server.use(express.static("public"))

/* Habilitar uso do req.body */
server.use(express.urlencoded({ extended: true }))

/* configuração do nunjucks */
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, 
})

/* Criei uma rota com o / e capturo o pedido do cliente para responder */
server.get("/", function(req, res){
    /* Consultar dados na tabela */
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for(let idea of reversedIdeas){
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }  
        }

    return res.render("index.html", { ideas: lastIdeas })
        
    })

    
})

server.get("/ideias", function(req, res){
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()


        return res.render("ideias.html", { ideas: reversedIdeas })
    })

})

server.post("/", function(req, res) {
    /* Inserir dados na tabela */
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES(?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]
    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
        
    })
})

/* Liguei o servidor na porta 3000 */
server.listen(3000)


/* Parei no vídeo 5 as 00:40:34 */