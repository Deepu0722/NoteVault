import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

//End Point declaration
app.get('/api/notes', async (req, res)=>{
    res.json({message: "success !"});
});

app.listen(5000, () => {
    console.log("server running on localhost:5000");
});