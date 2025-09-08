<template>
  <q-page padding>
    <q-btn
      label="Volver"
      icon="arrow_back"
      color="primary"
      flat
      class="q-mb-md"
      @click="router.push('/pacientes')"
    />
    <div class="text-h5 q-mb-md">Historial de Consultas</div>
    <q-table :rows="records" :columns="columns" row-key="id" class="full-width">
      <template v-slot:top-right>
        <q-btn color="primary" flat label="Nuevo registro" @click="newRecord" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-btn color="secondary" flat label="Editar" @click="editRecord(props.row)" />
        <q-btn
          color="negative"
          flat
          label="Eliminar"
          class="q-ml-sm"
          @click="confirmDelete(props.row.id)"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const patientId = route.query.id ? String(route.query.id) : null

const records = ref([])

const columns = [
  { name: 'fechaConsulta', label: 'Fecha', field: 'fechaConsulta', align: 'left' },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
]

onMounted(() => {
  const patients = JSON.parse(localStorage.getItem('patients') || '[]')
  const patient = patients.find(p => p.id === patientId)
  if (patient && patient.records) {
    records.value = patient.records
  } else {
    router.push('/pacientes')
  }
})

function newRecord () {
  router.push({ path: '/registro', query: { patientId, mode: 'new' } })
}

function editRecord (record) {
  router.push({ path: '/registro', query: { patientId, recordId: record.id, mode: 'edit' } })
}

function confirmDelete (id) {
  $q.dialog({
    title: 'Confirmar',
    message: '¿Está seguro de eliminar este registro?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    deleteRecord(id)
  })
}

function deleteRecord (id) {
  const patients = JSON.parse(localStorage.getItem('patients') || '[]')
  const patient = patients.find(p => p.id === patientId)
  if (patient) {
    const idx = patient.records.findIndex(r => r.id === id)
    if (idx !== -1) {
      patient.records.splice(idx, 1)
      localStorage.setItem('patients', JSON.stringify(patients))
      $q.notify({ type: 'positive', message: 'Registro eliminado' })
      records.value = [...patient.records]
    } else {
      $q.notify({ type: 'negative', message: 'Registro no encontrado' })
    }
  } else {
    $q.notify({ type: 'negative', message: 'Paciente no encontrado' })
  }
}
</script>