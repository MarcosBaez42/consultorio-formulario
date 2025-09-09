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
        <q-btn
          color="primary"
          flat
          round
          dense
          icon="visibility"
          @click="viewPatient(props.row)"
        />
        <q-btn
          color="negative"
          flat
          round
          dense
          icon="delete"
          class="q-ml-sm"
          @click="confirmDelete(props.row.id)"
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
  { name: 'nombreCompleto', label: 'Nombre', field: 'nombreCompleto', align: 'left', style: 'width: 20%' },
  { name: 'edad', label: 'Edad', field: 'edad', align: 'center', style: 'width: 13%' },
  { name: 'documento', label: 'Documento', field: 'documento', align: 'center', style: 'width: 15%' },
  { name: 'telefono', label: 'Teléfono', field: 'telefono', align: 'center', style: 'width: 13%' },
  { name: 'email', label: 'Email', field: 'email', align: 'center', style: 'width: 13%' },
  { name: 'fechaConsulta', label: 'Fecha Consulta', field: 'fechaConsulta', align: 'center', style: 'width: 13%' },
  { name: 'actions', label: 'Opciones', field: 'actions', align: 'center',}
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
      telefono: latest.telefono,
      email: latest.email,
      fechaConsulta: latest.fechaConsulta,
      records
    }
  })
})

function viewPatient (patient) {
  router.push({ path: '/historial', query: { id: patient.id } })
}

function confirmDelete (id) {
  $q.dialog({
    title: 'Confirmar',
    message: '¿Está seguro de eliminar este paciente?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    deletePatient(id)
  })
}

function deletePatient (id) {
  const stored = JSON.parse(localStorage.getItem('patients') || '[]')
  const idx = stored.findIndex(p => p.id === id)
  if (idx !== -1) {
    stored.splice(idx, 1)
    localStorage.setItem('patients', JSON.stringify(stored))
    $q.notify({ type: 'positive', message: 'Paciente eliminado' })
    patients.value = patients.value.filter(p => p.id !== id)
  } else {
    $q.notify({ type: 'negative', message: 'Paciente no encontrado' })
  }
}
</script>