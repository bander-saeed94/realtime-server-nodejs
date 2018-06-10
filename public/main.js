
var statusElm = document.getElementById('status')
var socket = io();
socket.on('connected', () => {
    statusElm.textContent = 'connected'
});