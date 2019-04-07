document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#form').onsubmit = () => {

        // Initialize new request
        const name = document.querySelector('#group_name').value;
        const password = document.querySelector('#group_password').value;
        const desciption = document.querySelector('#group_desc').value;
        const request = new XMLHttpRequest();
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
        data.append('currency', password);

        // Send request
        request.send(data);
        return false;
    };

});
