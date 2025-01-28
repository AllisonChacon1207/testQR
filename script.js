qrcode.js
function generateQRCode() {
    qrcode.js
    const text = document.getElementById('textInput').value;
    const qrcodeContainer = document.getElementById('qrcode');
    
    // Limpiar cualquier QR anterior
    qrcodeContainer.innerHTML = '';

    if (text) {
        QRCode.toCanvas(qrcodeContainer, text, function (error) {
            if (error) console.error(error);
            console.log("QR generado con éxito");
        });
    } else {
        alert("Por favor, ingresa un texto.");
    }
}
