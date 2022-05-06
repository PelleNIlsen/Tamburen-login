var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
      console.log("you are in fileupload");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(fields.filetoupload);
        var name = fields.filetoupload + "\n";
        var newpath = './log.txt';
        fs.appendFile(newpath, name, function (err) {
            if (err) throw err;
            console.log('Saved!');
            res.write('<div style="text-align:center">');
            res.write('<h1 style="position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);font-size:5rem;font-family:sans-serif">Takk for innmeldelsen!</h1>');
            res.write('<h2 style="position:absolute;top:60%;left:50%;transform:translate(-50%,-50%);font-size:2rem;font-family:sans-serif">Du kan lukke vinduet.</h2>');
            res.write('</div>');
            res.end();
        });
    });
    } else {
        //Count how many names in log.txt
        // app.use('/static', express.static(__dirname + '/static'));        

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<head>');
        res.write('<link rel="preconnect" href="https://fonts.googleapis.com">');
        res.write('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
        res.write('<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">');
        res.write('<link rel="stylesheet" href="./public/style.css">');
        res.write('</head>');
        res.write('<body style="background:rgb(131,58,180);background:linear-gradient(40deg,rgba(131,58,180,1)0%,rgba(253,29,29,1)50%,rgba(252,176,69,1)100%);color:white">');
        res.write('<div class="title" style="font-size:3rem;text-align:center;">');
        res.write('<h1 style="font-family:sans-serif;" class="tittel">TAMBUREN</h1>');
        res.write('</div>');
        res.write('<div class="informasjon">');
        res.write('<p style="font-family:sans-serif;">');
        res.write('<p style="font-family:sans-serif;position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);">Skriv inn navnet ditt under for innmelding</p>');
        res.write('</div>');
        res.write('<div class="form" style="text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">');
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input style="width:40rem;height:3rem;font-size:2rem" type="text" name="filetoupload"><br>');
        res.write('<input style="width:5rem;height:1.5rem;font-size:1rem;background-color:white;border:none;border-bottom:1px solid black;" type="submit">');
        res.write('</form>');
        res.write('</div>');
        res.write('<br><br>');
        res.write('<table border="0" style="position:absolute;top:2%;left:2%;font-size:1.5rem;font-family:sans-serif">');
        res.write('<thead><tr><th>Innmeldte</th></tr></thead><tbody>');
        var newpath = './log.txt';
        var count = 0;
        fs.readFile(newpath, function (err, data) {
            // console.log("1");
            if (err) throw err;
            var names = data.toString().split("\n");
            count = names.length;
            // console.log("2");
            // console.log(count);
            // console.log(names[1]);
            for (var i = 1; i < count; i++) {
                // console.log(names[i]);
                // console.log("3");
                res.write('<tr><td>' + names[i] + '</td></tr>');
            }
            // console.log("4");
            res.write('</tbody></table>');
            res.write('</body>');
            return res.end();
        });
        // console.log("5");
    }
}).listen(8080);