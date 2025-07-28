const http = require("http");

const server = http.createServer(async (req, res) => {
    const {url, method} = req;
    
    // const data = {name: "saif"};

    // res.writeHead(200, {"content-type": "application/json"});
    // res.end(JSON.stringify(data));

    if(method === "POST" && url === "/data"){
        let body = "";
        req.on("data", chunk =>{
            body += chunk.toString();
        });
        req.on("end", () => {
            const parsed = JSON.parse(body);
            console.log(parsed);
            res.writeHead(201, {"content-type": "application/json"});
            res.end(JSON.stringify({message: "Data received"}));
        });
    }
 });

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});