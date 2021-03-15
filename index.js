import express from "express";
const app = express();

const PORT = 4000;

const handleListening = () => 
    console.log(`Listening on : http://loaclhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from my ass");

const handleProfile = (req, res) => res.send("You are on my profile");

const betweenHome = (req, res, next) => {
    console.log("Between");
    next();
}

//middleware(★순서 중요★)
//모든 라우터에 적용 : app.use(betweenHome);
//하나의 라우터에 적용 : app.get("/", betweenHome, handleHome);
app.use(betweenHome);

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);