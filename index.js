import express from "express";
import axios from "axios";


const app = express();
const port = 3000;

app.use(express.static("public"));

const API_url = "https://api.mangadex.org";

function getChapters(mangaId){

}


app.get("/", async (req, res) => {
    const result = await axios(API_url + "/manga/random");
    const val = result.data;
    console.log(val.data.id);
    const coverRelationship = val.data.relationships.find((obj) => obj.type === "cover_art");
    if (!coverRelationship) {
        throw new Error("Cover art not found for this manga.");
    }
    const coverId = coverRelationship.id;
    const fileData = await axios(API_url + "/cover/" + `${coverId}`);
    const data = fileData.data;
    const fileAddress = data.data.attributes.fileName;
    console.log(val.data.attributes.title.en);
    const value = val.data.attributes.title.en;
    res.render("index.ejs", {key : value,
        mangaId : val.data.id,
        fileName : fileAddress
    });
});

//implementing logic 01

app.get("/chapters", async (req, res) =>{
    const mangaId = req.query.mangaId;
    console.log(mangaId);
    // const result = await axios(`https://api.magadex.org/manga/${mangaId}/feed`);
    // const val = result.data;
    
})



app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
});

// module.exports = getChapters;