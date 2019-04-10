document.addEventListener('DOMContentLoaded', () => {

      // Connect to websocket
      var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

      // When connected, configure buttons
      socket.on('connect', () => {

          // Each button should emit a "submit vote" event
          document.querySelector('#form').onsubmit = () => {
                  const message = document.querySelector('#mess').value;
                  socket.emit('submit message', {'mess': message});
              };
          });

      // When a new vote is announced, add to the unordered list
      socket.on('announce message', data => {
          const h2 = document.createElement('h2');
          h2.innerHTML = data.mess;
          document.querySelector('.container').appendChild(h2);
      });
  });
