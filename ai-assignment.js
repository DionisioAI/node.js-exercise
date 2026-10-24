const http = require("http");
const fs = require("fs");



const server = http.createServer((req, res) => {
    const url = req.url;
    
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write("<html>");
        res.write("<h1>Hello world from Node.js server :D</h1>");
        res.write("<a href='/student'>Click here to see the students table</a><br>");
        res.write("<a href='/approved'>Click here to see the approved students table</a>");
        res.write("</html>");
        res.end();
    }
    if (url === '/student') {
        res.setHeader('Content-Type', 'text/html');
        res.write("<html>");
        res.write("<h1>Students table</h1>");
        res.write("<a href='/'>Click here to come back</a>");
        res.write("</html>");       
        res.end();
    }
    if (url === '/approved') {
        res.setHeader('Content-Type', 'text/html');
        res.write("<html>");
        res.write("<h1>Approved students table</h1>");
        res.write("<a href='/'>Click here to come back</a>");
        res.write("</html>");
        res.end();
    }
});



server.listen(4000);
console.log('Server is online on port 4000');


/*
finish the ai assignment
watch more udemy videos 
*/