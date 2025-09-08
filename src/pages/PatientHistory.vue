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
        <q-btn color="primary" flat label="Ver" @click="viewRecord(props.row)" />
        <q-btn color="secondary" flat label="Editar" class="q-ml-sm" @click="editRecord(props.row)" />
        <q-btn color="negative" flat label="Eliminar" class="q-ml-sm" @click="deleteRecord(props.row)" />
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const patientId = Number(route.query.id)

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

function viewRecord (record) {
  router.push({ path: '/registro', query: { patientId, recordId: record.id, mode: 'view' } })
}

function editRecord (record) {
  router.push({ path: '/registro', query: { patientId, recordId: record.id, mode: 'edit' } })
}

function deleteRecord (record) {
  const patients = JSON.parse(localStorage.getItem('patients') || '[]')
  const patient = patients.find(p => p.id === patientId)
  if (patient) {
    patient.records = patient.records.filter(r => r.id !== record.id)
    if (patient.records.length === 0) {
      const idx = patients.findIndex(p => p.id === patientId)
      patients.splice(idx, 1)
      localStorage.setItem('patients', JSON.stringify(patients))
      router.push('/pacientes')
      return
    }
    localStorage.setItem('patients', JSON.stringify(patients))
    records.value = patient.records
  }
}
</script>