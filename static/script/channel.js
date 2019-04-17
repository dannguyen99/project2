document.addEventListener('DOMContentLoaded', () => {

      // Connect to websocket
      var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

      // When connected, configure buttons
      socket.on('connect', () => {

          // Each button should emit a "submit vote" event
          document.querySelector('#form').onsubmit = () => {
                  const message = document.querySelector('#mess').value;
                  document.querySelector('#mess').innerHTML = "";
                  const title = document.title;
                  socket.emit('submit message', {'mess': message, 'title':title});
                  return false;
              };
          });

      // When a new vote is announced, add to the unordered list
      // <div class="container darker">
      //   <img src="{{ url_for('static', filename='images/avatar1.jpg') }}" alt="Avatar" class="right">
      //   <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
      //   <span class="time-left">11:05</span>
      //   </div>
      socket.on('announce message', data => {
        const div = document.createElement('div');
        div.className = "container darker";
        const h6 = document.createElement('h6');
        h6.innerHTML = data.user;
        const img = document.createElement('img');
        img.src = "https://png.pngtree.com/svg/20160826/5edcf67c9c.svg"
        img.className = "left"
        const p = document.createElement('p');
        p.innerHTML = data.mess;
        const span = document.createElement('span');
        span.className = "time-right";
        span.innerHTML = data.time;
        div.appendChild(img);
        div.appendChild(h6);
        div.appendChild(p);
        div.appendChild(span);
        document.querySelector('.message-body').appendChild(div);
      });
  });
