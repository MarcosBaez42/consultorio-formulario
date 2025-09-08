<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Pacientes Registrados</div>
    <q-table :rows="patients" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-btn color="primary" flat label="Ver" @click="viewPatient(props.row)" />
      </template>
    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="width:700px;max-width:90vw;">
        <q-card-section>
          <div class="text-h6">Detalles del Paciente</div>
        </q-card-section>
        <q-card-section style="max-height:70vh" class="scroll">
          <pre>{{ JSON.stringify(selectedPatient, null, 2) }}</pre>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineOptions({ name: 'PatientsList' })

const patients = ref([])
const dialog = ref(false)
const selectedPatient = ref(null)

const columns = [
  { name: 'nombreCompleto', label: 'Nombre', field: 'nombreCompleto', align: 'left' },
  { name: 'edad', label: 'Edad', field: 'edad', align: 'left' },
  { name: 'documento', label: 'Documento', field: 'documento', align: 'left' },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'right' }
]

onMounted(() => {
  patients.value = JSON.parse(localStorage.getItem('patients') || '[]')
})

function viewPatient (patient) {
  selectedPatient.value = patient
  dialog.value = true
}
</script>
