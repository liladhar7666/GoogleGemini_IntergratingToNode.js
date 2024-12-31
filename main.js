const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); 
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get('/',(req, res) => {
   res.send('Hello, World! Gemini')
}) 

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how AI works";

const generate = async(prompt) => {
   try {
    const result = await model.generateContent(prompt);
    return result.response.text();
   } catch (error) {
    console.log(error);
   }
}

app.post('/api/content',async(req, res) => {
   try {
        const data = req.body.question; 
        const result = await generate(data);
        res.send({
            result : result ,
        });
   
   } catch (error) {
       res.send("error : "+error)
   }
})

// generate();

app.listen(3000, () =>{
   console.log('Server is Up and running on port 3000');
})
