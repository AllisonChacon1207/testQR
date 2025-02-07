const contenedorQR = document.getElementById('contenedorQR');
const formulario = document.getElementById('formulario');
const downloadBtn = document.getElementById('downloadBtn');

// Initialize QRCode generator with contenedorQR as the container for the QR code
const QR = new QRCode(contenedorQR);

// Listen for form submission to generate the QR code
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    
    const linkValue = formulario.link.value; // Get the link entered by the user
    
    if (linkValue) {
        QR.makeCode(linkValue); // Generate QR code with the link value
    } else {
        alert("Please enter a link.");
    }
});

// Handle the download button click to generate the PDF
downloadBtn.addEventListener('click', () => {
    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Convert the QR code container to an image (in this case, a base64 string)
    const qrCanvas = contenedorQR.querySelector('canvas');
    if (qrCanvas) {
        const imgData = qrCanvas.toDataURL('image/png'); // Get the image data of the QR code

        // Add the image to the PDF
        doc.addImage(imgData, 'PNG', 10, 10, 100, 100); // Adjust the position and size of the image

        // Save the generated PDF with the QR code
        doc.save('qrcode.pdf');
    } else {
        alert("Please generate a QR code first.");
    }
});
