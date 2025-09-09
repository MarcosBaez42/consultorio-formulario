<template>
  <q-page padding>
    <div class="q-mb-md">
      <div class="text-h4">Bienvenido, Doctor(a)</div>
      <div class="text-subtitle1 text-grey-7">Resumen de su consultorio</div>
    </div>

    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-4">
        <q-card class="kpi-card">
          <q-card-section class="flex items-center">
            <q-icon name="people" size="40px" color="primary" class="q-mr-md" />
            <div>
              <div class="text-h6">{{ totalPatients }}</div>
              <div class="text-caption">Pacientes Totales</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="text-h5 q-mb-md">Acciones Rápidas</div>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="cursor-pointer action-card" v-ripple @click="$router.push('/registro')">
          <q-card-section class="text-center">
            <q-icon name="person_add" size="48px" class="text-primary q-mb-sm" />
            <div class="text-h6">Registrar Nuevo Paciente</div>
            <div class="text-caption text-grey-7">Crear una nueva ficha médica completa.</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card class="cursor-pointer action-card" v-ripple @click="$router.push('/pacientes')">
          <q-card-section class="text-center">
            <q-icon name="assignment_ind" size="48px" class="text-primary q-mb-sm" />
            <div class="text-h6">Buscar Pacientes</div>
            <div class="text-caption text-grey-7">Consultar historiales y fichas existentes.</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
defineOptions({ name: 'Home' })

const totalPatients = ref(0);

onMounted(() => {
  const stored = JSON.parse(localStorage.getItem('patients') || '[]');
  totalPatients.value = stored.length;
});
</script>

<style scoped>
.kpi-card {
  border-left: 5px solid var(--primary);
}
.action-card:hover {
  box-shadow: 0 4px 12px rgba(0, 121, 107, 0.2);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
</style>