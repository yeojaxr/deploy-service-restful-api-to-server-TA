const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const {todo}=require("./models/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.post("/",(req,res)=>{
    res.json({message:"hello world"})
})

app.post("/inputdata", async(req,res) => {
    const payload = {
    title:req.body.title,
    description:req.body.description,
    starttime:req.body.starttime,
    status:req.body.status
}
    const proses = await todo.create({
        title: payload.title,
        description: payload.description,
        starttime: payload.starttime,
        status: payload.status
    })

    if(proses){
        res.json({
            message:"data berhasil ditambahkan",
        })
    }else{
        res.json({
            message:"data tidak berhasil ditambahkan"
        })
    }
})

app.get("/get/:id", async(req,res)=>{
    const ambilData = await todo.findAll({
        where: {
            id: req.params.id
        }
    })
    if(ambilData){
        res.json({
            message:"data ditemukan",
            ambilData
        })
    }else{
        res.json({
            message:"data tidak ditemukan",
            ambilData
        })
    }
})

app.put("/update/:id", async(req, res) => {
    const payload = {
        title:req.body.title,
        description:req.body.description,
        starttime:req.body.starttime,
        status:req.body.status
}
        const proses = await todo.update({
        title: payload.title,
        description: payload.description,
        starttime: payload.starttime,
        status: payload.status
        },{
            where: {
                id: req.params.id
            }
        })
        if(proses){
            res.json({
                message:"data anda berhasil diupdate",
                payload
            })
        }else{
            res.json({
                message:"data anda tidak berhasil diupdate",
                payload
            })
        }
})

app.delete("/delete/:id", async(req, res)=>{
    const hapus = await todo.destroy({
        where: {
            id: req.params.id
        }
    })
    if(hapus){
        res.json({
            message:"data berhasil dihapus"
        })
    }else{
        res.json({
            message:"data gagal dihapus"
        })
    }
}) 

app.get("/all", async(req,res)=>{
    const ambil=await todo.findAll()
    if(ambil){
        res.json({
            message:"data ditemukan",
            ambil
        })
    }else{
        res.json({
            message:"data tidak ditemukan",
            ambil
        })
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
