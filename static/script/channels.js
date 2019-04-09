document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#form').onsubmit = () => {

        // Initialize new request
        const request = new XMLHttpRequest();
        const name = document.querySelector('#group_name').value;
        const password = document.querySelector('#group_password').value;
        const description = document.querySelector('#group_desc').value;
        request.open('POST', '/channels');

        // Callback function for when request completes
        request.onload = () => {

            // Extract JSON data from request
            const data = JSON.parse(request.responseText);

            // Update the result div
            if (data.success) {
              alert(data.name);
              document.querySelector('.card-title').innerHTML = data.name;
              document.querySelector('.card-text').innerHTML = data.desc;
              // Create new item for list
              // <div class="card" style="width: 80%;">
              var div = document.createElement("div");
              div.className = "card";
              div.style = "width:80%";
              var body = document.createElement('div');
              body.className = 'card-body'
              var h5 = document.createElement('h5')
              h5.className = 'class-title';
              h5.innerHTML = data.name;
              body.appendChild(h5);
              div.appendChild(body)
              document.querySelector('.container').appendChild(div);
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

});
