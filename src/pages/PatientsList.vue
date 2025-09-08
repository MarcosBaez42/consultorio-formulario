<template>
  <q-page padding>
    <q-btn
      label="Volver al inicio"
      icon="home"
      color="primary"
      flat
      class="q-mb-md"
      @click="router.push('/')"
    />
    <div class="text-h5 q-mb-md">Pacientes Registrados</div>
    <q-table :rows="patients" :columns="columns" row-key="id" class="full-width">
      <template v-slot:body-cell-actions="props">
        <q-btn color="primary" flat label="Ver" @click="viewPatient(props.row)" />
        <q-btn
          color="negative"
          flat
          label="Eliminar"
          class="q-ml-sm"
          @click="confirmDelete(props.row)"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

defineOptions({ name: 'PatientsList' })

const router = useRouter()
const $q = useQuasar()
const patients = ref([])

const columns = [
  { name: 'nombreCompleto', label: 'Nombre', field: 'nombreCompleto', align: 'left', style: 'width: 30%' },
  { name: 'edad', label: 'Edad', field: 'edad', align: 'center', style: 'width: 15%' },
  { name: 'documento', label: 'Documento', field: 'documento', align: 'center', style: 'width: 25%' },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center', style: 'width: 30%' }
]

onMounted(() => {
  const stored = JSON.parse(localStorage.getItem('patients') || '[]')
  patients.value = stored.map(p => {
    const records = p.records || []
    const latest = records[records.length - 1] || {}
    return {
      id: p.id,
      nombreCompleto: latest.nombreCompleto,
      edad: latest.edad,
      documento: latest.documento,
      records
    }
  })
})

function viewPatient (patient) {
  router.push({ path: '/historial', query: { id: patient.id } })
}

function confirmDelete (patient) {
  $q.dialog({
    title: 'Confirmar',
    message: '¿Está seguro de eliminar este paciente?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    deletePatient(patient)
  })
}

function deletePatient (patient) {
  const stored = JSON.parse(localStorage.getItem('patients') || '[]')
  const idx = stored.findIndex(p => p.id === patient.id)
  if (idx !== -1) {
    stored.splice(idx, 1)
    localStorage.setItem('patients', JSON.stringify(stored))
    patients.value = patients.value.filter(p => p.id !== patient.id)
  }
}
</script>