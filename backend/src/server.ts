
import http from "http";
import app from "@/App";

const serverHttp = http.createServer(app);

const PORT: number = Number(process.env.PORT) || 8080;
const HOST: string = String(process.env.HOST) || 'localhost';

serverHttp.listen(PORT, HOST, () => {
    console.log(`Ouvindo: ${HOST}:${PORT}`)
})
