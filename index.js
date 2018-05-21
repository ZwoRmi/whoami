const restify = require('restify');

const server = restify.createServer();

function getOs(userAgent) {
    const matches = /\S+ \((.+)\) .+/.exec(userAgent);
    return matches[1];
}

const port = process.env.PORT;
server.listen(port, () => {
    server.get('/', (req, res) => {

        const requesterData = {
            ipaddress: req.connection.remoteAddress,
            language: req.header('accept-language').substring(0, 2),
            software: getOs(req.header('user-agent'))
        };
        res.send(requesterData);
    });
    console.log(`Server is listening`);
});
