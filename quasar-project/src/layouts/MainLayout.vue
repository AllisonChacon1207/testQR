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
      <h3>Datos</h3>
<!------------------------------------------------------------------------->
<!------------------------------------------------------------------------->
    <div>
    <!-- Tabla de Quasar -->
    <q-table
      title="Mi Tabla"
      :rows="rows"
      :columns="columns"
      row-key="name"
      @row-click="onRowClick"
    />
<!------------------------------------------------------------------------->
<!------------------------------------------------------------------------->
    <!-- Diálogo para mostrar la información de la celda y generar QR -->
    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">Información de la Celda</div>
        </q-card-section>

        <q-card-section>
          {{ cellInfo }}
        </q-card-section>
<!------------------------------------------------------------------------->
<!------------------------------------------------------------------------->
        <!-- Botón para generar QR -->
        <q-card-section>
          <q-btn
            label="Generar QR"
            color="primary"
            @click="generateQR"
          />
        </q-card-section>
<!------------------------------------------------------------------------->
<!------------------------------------------------------------------------->
        <!-- Mostrar el código QR generado -->
        <q-card-section v-if="qrCodeVisible">
          <qrcode-vue :value="qrValue" :size="200" level="H" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
      </div>
  </q-layout>
</template>
<!------------------------------------------------------------------------->
<!------------------------------------------------------------------------->
<script>
import { ref } from 'vue';
import QrcodeVue from 'qrcode.vue'; // Importar la librería para generar QR

export default {
  components: {
    QrcodeVue, // Registrar el componente QR
  },
  setup() {
    const dialogVisible = ref(false);
    const cellInfo = ref('');
    const qrCodeVisible = ref(false); // Controlar la visibilidad del QR
    const qrValue = ref(''); // Valor para generar el QR

    const columns = [
      { name: 'name', label: 'Nombre', field: 'name', align: 'left' },
      { name: 'age', label: 'Edad', field: 'age', align: 'left' },
      { name: 'address', label: 'Dirección', field: 'address', align: 'left' },
    ];

    const rows = [
      { name: 'Juan', age: 25, address: 'Calle 123' },
      { name: 'Ana', age: 30, address: 'Avenida 456' },
      { name: 'Luis', age: 35, address: 'Plaza 789' },
    ];

    const onRowClick = (evt, row) => {
      // Mostrar la información de la fila
      cellInfo.value = `Nombre: ${row.name}, Edad: ${row.age}, Dirección: ${row.address}`;
      qrCodeVisible.value = false; // Ocultar el QR al cambiar de fila
      dialogVisible.value = true;
    };

    const generateQR = () => {
      // Generar el valor del QR con la información de la celda
      qrValue.value = cellInfo.value;
      qrCodeVisible.value = true; // Mostrar el QR
    };

    return {
      columns,
      rows,
      dialogVisible,
      cellInfo,
      qrCodeVisible,
      qrValue,
      onRowClick,
      generateQR,
    };
  },
};
</script>
<!------------------------------------------------------------------------->
<!------------------------------------------------------------------------->
<style scoped>
/* Estilos personalizados si es necesario */
</style>