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
            }
            else {
                alert("Error")
            }
        }

        // Add data to send with request
        const data = new FormData();
        data.append('name', name);

        // Send request
        request.send(data);
        return false;
    };

});
