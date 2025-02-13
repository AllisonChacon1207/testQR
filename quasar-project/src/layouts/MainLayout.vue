<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Tabla de Datos
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
<!--------------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------------->
    <div>
      <!-- Tabla de Quasar -->
      <q-table
        title="Mi Tabla"
        :rows="rows"
        :columns="columns"
        row-key="name"
        @row-click="onRowClick"
      />
<!--------------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------------->
      <!-- la información de la celda y generar QR -->
      <q-dialog v-model="dialogVisible">
        <q-card>
          <q-card-section>
            <div class="text-h6">Información de la Celda</div>
          </q-card-section>

          <q-card-section>
            {{ cellInfo }}
          </q-card-section>
<!--------------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------------->
          <!-- Botón para generar QR -->
          <q-card-section>
            <q-btn
              label="Generar QR"
              color="primary"
              @click="generateQR"
            />
          </q-card-section>
<!--------------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------------->
          <!-- Mostrar el código QR generado -->
          <q-card-section v-if="qrCodeVisible">
            <div ref="qrCodeElement">
              <qrcode-vue :value="qrValue" :size="200" level="H" />
            </div>
          </q-card-section>
<!--------------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------------->
          <!-- Botón para descargar el QR -->
          <q-card-section v-if="qrCodeVisible">
            <q-btn
              label="Descargar QR"
              color="secondary"
              @click="downloadQR"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-layout>
</template>
<!--------------------------------------------------------------------------------------->
<!--------------------------------------------------------------------------------------->
<script>
import { ref } from 'vue';
import QrcodeVue from 'qrcode.vue'; // Importar la librería para generar QR
import html2canvas from 'html2canvas'; // Importar html2canvas para capturar el QR

export default {
  components: {
    QrcodeVue, // Registrar el QR
  },
  setup() {
    const dialogVisible = ref(false);
    const cellInfo = ref('');
    const qrCodeVisible = ref(false); // VER QR
    const qrValue = ref(''); // Valor para generar el QR
    const qrCodeElement = ref(null); // Referencia al elemento del QR

    const columns = [
      { name: 'name', label: 'Nombre', field: 'name', align: 'left' },
      { name: 'age', label: 'Edad', field: 'age', align: 'left' },
      { name: 'address', label: 'Dirección', field: 'address', align: 'left' },
    ];
//<!--------------------------------------------------------------------------------------->
//<!--------------------------------------------------------------------------------------->
    const rows = [
      { name: 'Juan', age: 19, address: 'La Joya 123' },
      { name: 'Ana', age: 29, address: 'Residencial 456' },
      { name: 'Luis', age: 55, address: 'Barrio 789' },
      { name: 'Mario', age: 35, address: 'Las Uvas 123' },
      { name: 'Allison', age: 32, address: 'Arboleda 456' },
      { name: 'Carlos', age: 27, address: 'Kennedy 789' },
      { name: 'Eduardo', age: 25, address: 'Cañada 123' },
      { name: 'Anahi', age: 30, address: 'Pedregal 456' },
      { name: 'Lazaro', age: 35, address: 'Peña 789' },
      { name: 'Noe', age: 19, address: 'Hoya 0101' },
    ];
//<!--------------------------------------------------------------------------------------->
//<!--------------------------------------------------------------------------------------->
    const onRowClick = (evt, row) => {
      // Mostrar la información de la fila
      cellInfo.value = `Nombre: ${row.name}, Edad: ${row.age}, Dirección: ${row.address}`;
      qrCodeVisible.value = false; // Ocultar el QR al cambiar de fila
      dialogVisible.value = true;
    };
//<!--------------------------------------------------------------------------------------->
//<!--------------------------------------------------------------------------------------->
    const generateQR = () => {
      // QR información de la celda
      qrValue.value = cellInfo.value;
      qrCodeVisible.value = true; // Mostrar el QR
    };
//<!--------------------------------------------------------------------------------------->
//<!--------------------------------------------------------------------------------------->
    const downloadQR = () => {
      // QR y convertirlo en una imagen
      html2canvas(qrCodeElement.value).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr-code.png';
        link.click();
      });
    };

    return {
      columns,
      rows,
      dialogVisible,
      cellInfo,
      qrCodeVisible,
      qrValue,
      qrCodeElement,
      onRowClick,
      generateQR,
      downloadQR,
    };
  },
};
</script>