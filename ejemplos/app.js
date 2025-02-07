const contenedorQR = document.getElementById('contenedorQR');
const formulario = document.getElementById('formulario');
const link = document.getElementById("link").value;

const QR = new QRCode(contenedorQR);

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	QR.makeCode(formulario.link.value);
})

;