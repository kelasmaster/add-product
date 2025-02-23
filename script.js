// script.js

document.getElementById('priceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;

    // Create a new row in the table
    const tableBody = document.querySelector('#productTable tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${name}</td>
        <td>${address}</td>
        <td>${phone}</td>
        <td>${productName}</td>
        <td>${productPrice}</td>
    `;

    tableBody.appendChild(newRow);

    // Clear the form
    document.getElementById('priceForm').reset();
});

// Send to WhatsApp functionality
document.getElementById('sendToWhatsApp').addEventListener('click', function() {
    const tableData = [];
    const rows = document.querySelectorAll('#productTable tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = {
            name: cells[0].innerText,
            address: cells[1].innerText,
            phone: cells[2].innerText,
            productName: cells[3].innerText,
            productPrice: cells[4].innerText
        };
        tableData.push(rowData);
    });

    // Convert table data to a string
    let whatsappMessage = 'Price List:\n\n';
    tableData.forEach((item, index) => {
        whatsappMessage += `Item ${index + 1}:\n`;
        whatsappMessage += `Name: ${item.name}\n`;
        whatsappMessage += `Address: ${item.address}\n`;
        whatsappMessage += `Phone: ${item.phone}\n`;
        whatsappMessage += `Product: ${item.productName}\n`;
        whatsappMessage += `Price: ${item.productPrice}\n\n`;
    });

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

    // Open WhatsApp with the message
    window.open(whatsappURL, '_blank');
});
