<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-h6">
          Consultorio Médico
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-md container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'MainLayout'
});
</script>