<template>
  <q-page padding class="flex flex-center">
    <div class="row q-col-gutter-md" style="width: 100%; max-width: 600px;">
      <div class="col-12 col-md-6">
        <q-card class="cursor-pointer q-pa-lg" @click="$router.push('/registro')">
          <q-card-section class="text-center">
            <q-icon name="person_add" size="48px" class="text-primary q-mb-sm" />
            <div class="text-h5">Registro de Paciente</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card class="cursor-pointer q-pa-lg" @click="$router.push('/pacientes')">
          <q-card-section class="text-center">
            <q-icon name="assignment_ind" size="48px" class="text-primary q-mb-sm" />
            <div class="text-h5">Pacientes registrados</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({ name: 'Home' })
</script>