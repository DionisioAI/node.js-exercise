const http = require("http");
const fs = require("fs");



const server = http.createServer((req, res) => {
    const url = req.url;


    const students = [
        { name: "Alice", grades: [8, 7, 9] },
        { name: "Bob", grades: [5, 6, 4] },
        { name: "Charlie", grades: [10, 9, 10] },
        { name: "Diana", grades: [6, 7, 8] },
        { name: "Melo", grades: [1, 10, 6] },
        { name: "Mist", grades: [4, 7, 7] },
        { name: "Ant", grades: [10, 9, 8] }
    ];

    const getAverage = grades => {
        let average = sumGrades(grades);
        return average / grades.length;
    };

    const sumGrades = grades => {
        let sum = 0;
        for (i = 0; i < grades.length; i++) {
            sum = sum + grades[i];
        }
        return sum;
    };

    const getStudentReport = student => {
        const average = getAverage(student.grades);
        let isApproved = isStudentApproved(student.grades);
        const studentReport = {
            Name: student.name,
            Average: average,
            Approved: isApproved
        }
        return studentReport;
    };

    const isStudentApproved = grades => {
        if (getAverage(grades) >= 7) {
            return true;
        } else {
            return false;
        };
    };

    const reports = students.map((student) => getStudentReport(student));

    const approvedStudents = reports.filter((student) => student.Approved === true);

    const sortedReports = [...reports].sort((a, b) => b.Average - a.Average);

    const buildTable = reports => {
    const rows = reports.map(r => `
        <tr>
            <td>${r.Name}</td>
            <td>${r.Average.toFixed(2)}</td>
            <td>${r.Approved ? 'Approved' : 'Not approved'}</td>
        </tr>`).join('');

        return `
            <table>
                <thead>
                    <tr><th>Name</th><th>Average</th><th>Status</th></tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            `;
};

    
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write("<html>");
        res.write("<h1>Hello world from Node.js server :D</h1>");
        res.write("<a href='/student'>Click here to see the students table</a><br>");
        res.write("<a href='/approved'>Click here to see the approved students table</a>");
        res.write("</html>");
        console.log(sortedReports);
        res.end();
    }
    if (url === '/student') {
        res.setHeader('Content-Type', 'text/html');
        res.write("<html>");
        res.write("<h1>Students table</h1>");
        res.write(buildTable(sortedReports));
        res.write("<br>");
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

