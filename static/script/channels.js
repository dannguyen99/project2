document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#form').onsubmit = () => {

        // Initialize new request
        const request = new XMLHttpRequest();
        const name = document.querySelector('#group_name').value;
        const password = document.querySelector('#group_password').value;
        const description = document.querySelector('#message-text').value;
        request.open('POST', '/channels');

        // Callback function for when request completes
        request.onload = () => {

            // Extract JSON data from request
            const data = JSON.parse(request.responseText);

            // Update the result div
            if (data.success) {
              alert("Success");
              // Create new item for list
              var div = document.createElement("div");
              div.className = "card";
              div.style = "width:80%";
              var body = document.createElement('div');
              body.className = 'card-body'
              var h5 = document.createElement('h5')
              h5.className = 'class-title';
              h5.innerHTML = name
              var cardtext = document.createElement('p');
              cardtext.className = "card-text";
              cardtext.innerHTML = description;
              var go = document.createElement('a');
              go.className = 'btn btn-primary';
              go.href = "http://127.0.0.1:5000/channels/" + name;
              go.innerHTML = 'Go to the chat room';
              var del = document.createElement('a');
              del.className = 'btn btn-danger';
              del.innerHTML = 'Delete this group';
              body.appendChild(h5);
              body.appendChild(cardtext);
              body.appendChild(go);
              body.appendChild(del);
              div.appendChild(body);
              document.querySelector('.container').appendChild(div);
              // <p class="card-text">{{ channel.description }}</p>
              // <a class="btn btn-primary">Go to the chat room</a>
              // <a class="btn btn-danger">Delete this group</a>
              $('#exampleModal').modal('hide');
              // Stop form from submitting
            }
            else {
                alert("Error: There is a channel with that existing name")
            }
        }

        // Add data to send with request
        const data = new FormData();
        data.append('name', name);
        data.append('password',password)
        data.append('description', description)

        // Send request
        request.send(data);
        return false;
    };
    \
    'JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf
    querySelector'

    document.querySelectorAll('button.btn.btn-danger').forEach(button => {
              button.onclick = () => {
                  const selection = button.dataset.vote;
                  socket.emit('submit vote', {'selection': selection});
              };
          });
      });
});
