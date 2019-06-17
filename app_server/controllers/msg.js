'use strict';

// Require React & React DOM
const React = require('react');
const ReactDOMServer = require('react-dom/server');

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Transpile and Add React Components
require("@babel/register") ({
    presets: [ '@babel/preset-react' ]
});
const Header = React.createFactory(require('../components/Header.jsx'));
const Footer = React.createFactory(require('../components/Footer.jsx'));
const MsgBoard = React.createFactory(require('../components/MsgBoard.jsx'));

// render index handler
const renderIndex = (req, res, msgs) => {
    res.render('index', {
        title: 'ICS 221 Universal JS Msg Board',
        header: ReactDOMServer.renderToString(Header()),
        footer: ReactDOMServer.renderToString(Footer()),
        msgBoard: ReactDOMServer.renderToString(MsgBoard(
            { messages: msgs }
        )),
        props: '<script>let messages=' + JSON.stringify(msgs) + '</script>'
    });
};

// get message function
const getMessages = (req, res) => {
    fetch(`${process.env.API_URL}/msgs`)
    .then(response=> handleHTTPErrors(response))
    .then(result=> result.json())
    .then(result=> {
        if (!(result instanceof Array)) {
            console.error('API lookup error');
            result = []
        } else {
            renderIndex(req, res, result);
        }
    })
    .catch(error=> {
        console.log(error);
    });
}

// handles errors
function handleHTTPErrors(response) {
    if (!response.ok) throw Error(response.status + ': ' + response.statusText);
    return response;
}

// exports
module.exports = {
    getMessages
};