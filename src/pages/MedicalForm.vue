<template>
  <q-page padding class="flex flex-center bg-grey-2">
    <div class="q-pa-md" style="width: 100%; max-width: 900px;">

      <q-btn label="Volver al inicio" icon="home" color="primary" flat class="q-mb-md" @click="router.push('/')" />

      <div class="text-h4 text-center text-primary q-mb-md">Ficha de Paciente - Estética Médica</div>
      <p class="text-subtitle1 text-center text-grey-7 q-mb-lg">
        Formulario de ingreso y seguimiento para nuevos pacientes.
      </p>

      <q-form @submit.prevent="onSubmit" class="q-gutter-y-lg" :class="{ 'read-only-form': isViewMode }">

        <!-- 1. Datos de Identificación -->
        <q-expansion-item expand-separator icon="fas fa-address-card" label="1. Datos de Identificación"
          header-class="text-h6 text-primary bg-blue-1 non-truncated-header" default-opened
          class="rounded-borders shadow-2">
          <q-card>
            <q-card-section class="q-pa-md">
              <div class="row q-col-gutter-md">
                <q-input outlined v-model="formData.nombreCompleto" label="Nombre completo" class="col-12 col-md-6" />
                <q-input outlined v-model="formData.edad" label="Edad" type="number" class="col-12 col-md-6" />
                <q-input outlined v-model="formData.fechaNacimiento" mask="date" label="Fecha de nacimiento"
                  class="col-12 col-md-6">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formData.fechaNacimiento">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input outlined v-model="formData.documento" label="Documento de identidad" class="col-12 col-md-6" />
                <q-input outlined v-model="formData.telefono" label="Teléfono / Celular" class="col-12 col-md-6" />
                <q-input outlined v-model="formData.email" label="Correo electrónico" type="email"
                  class="col-12 col-md-6" />
                <q-input outlined v-model="formData.ocupacion" label="Ocupación" class="col-12 col-md-6" />
                <q-input outlined v-model="formData.ciudadResidencia" label="Ciudad de residencia"
                  class="col-12 col-md-6" />
                <q-input outlined v-model="formData.fechaConsulta" mask="date" label="Fecha de la consulta"
                  class="col-12">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formData.fechaConsulta">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- 2. Motivo de Consulta y Antecedentes -->
        <q-expansion-item expand-separator icon="fas fa-notes-medical" label="2. Motivo de Consulta y Antecedentes"
          header-class="text-h6 text-primary bg-blue-1 non-truncated-header" class="rounded-borders shadow-2">
          <q-card>
            <q-card-section class="q-pa-md q-gutter-y-md">
              <div class="text-subtitle1 text-weight-bold">Motivo de Consulta Estética</div>
              <q-input outlined v-model="formData.motivoConsulta.deseoMejora" type="textarea"
                label="¿Qué desea mejorar?" />
              <q-input outlined v-model="formData.motivoConsulta.expectativas" type="textarea"
                label="Expectativas del tratamiento" />
              <q-input outlined v-model="formData.motivoConsulta.tiempoCondicion"
                label="Tiempo con la condición estética actual" />

              <q-separator class="q-my-md" />

              <div class="text-subtitle1 text-weight-bold">Antecedentes Médicos Relevantes</div>
              <q-input outlined v-model="formData.antecedentes.enfermedades" type="textarea"
                label="Enfermedades previas o actuales" />
              <q-input outlined v-model="formData.antecedentes.cirugiasEsteticas" type="textarea"
                label="Cirugías estéticas previas" />
              <q-input outlined v-model="formData.antecedentes.alergias" type="textarea" label="Alergias conocidas" />
              <q-input outlined v-model="formData.antecedentes.medicamentos" type="textarea"
                label="Uso de medicamentos" />
              <q-input outlined v-model="formData.antecedentes.tratamientosPrevios" type="textarea"
                label="Tratamientos estéticos previos y resultados" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- 3. Evaluaciones Estéticas -->
        <q-expansion-item expand-separator icon="fas fa-user-check"
          label="3. Evaluaciones Estéticas (Facial y Corporal)"
          header-class="text-h6 text-primary bg-blue-1 non-truncated-header" class="rounded-borders shadow-2">
          <q-card>
            <q-card-section class="q-pa-md q-gutter-y-md">
              <div class="text-subtitle1 text-weight-bold">Evaluación Facial Estética</div>
              <q-select outlined v-model="formData.evaluacionFacial.tipoPiel"
                :options="['Seca', 'Grasa', 'Mixta', 'Sensible']" label="Tipo de piel" />
              <q-input outlined v-model="formData.evaluacionFacial.lesionesActivas"
                label="Lesiones activas (acné, rosácea, manchas, cicatrices)" />
              <q-input outlined v-model="formData.evaluacionFacial.arrugas" label="Arrugas (ubicación y profundidad)" />
              <q-input outlined v-model="formData.evaluacionFacial.laxitudCutanea" label="Laxitud cutánea" />
              <q-input outlined v-model="formData.evaluacionFacial.hiperpigmentaciones" label="Hiperpigmentaciones" />
              <q-input outlined v-model="formData.evaluacionFacial.flacidezMuscular" label="Flacidez muscular facial" />
              <q-input outlined v-model="formData.evaluacionFacial.hidratacion" label="Hidratación y luminosidad" />
              <q-input outlined v-model="formData.evaluacionFacial.simetria" label="Simetría facial y proporciones" />

              <q-separator class="q-my-md" />

              <div class="text-subtitle1 text-weight-bold">Evaluación Corporal Estética</div>
              <q-input outlined v-model="formData.evaluacionCorporal.grasaLocalizada"
                label="Zonas de grasa localizada" />
              <q-input outlined v-model="formData.evaluacionCorporal.flacidezCutanea" label="Flacidez cutánea" />
              <q-input outlined v-model="formData.evaluacionCorporal.celulitis" label="Celulitis (grado)" />
              <q-input outlined v-model="formData.evaluacionCorporal.estrias" label="Estrías" />
              <q-input outlined v-model="formData.evaluacionCorporal.tonicidadMuscular" label="Tonicidad muscular" />
              <q-input outlined v-model="formData.evaluacionCorporal.retencionLiquidos"
                label="Retención de líquidos o edemas" />
              <div class="row q-col-gutter-sm">
                <q-input outlined v-model="formData.evaluacionCorporal.peso" label="Peso (kg)" type="number"
                  class="col-4" />
                <q-input outlined v-model="formData.evaluacionCorporal.talla" label="Talla (cm)" type="number"
                  class="col-4" />
                <q-input outlined v-model="formData.evaluacionCorporal.imc" label="IMC" type="number" class="col-4"
                  readonly />
              </div>
              <q-file v-model="formData.evaluacionCorporal.analisisInBodyFiles" label="Análisis InBody (subir fotos)"
                outlined multiple accept="image/*" counter>
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <div class="row q-col-gutter-sm q-mt-sm">
                <div v-for="(img, idx) in formData.evaluacionCorporal.analisisInBody" :key="idx" class="col-6 col-md-3">
                  <img :src="img" alt="Análisis InBody" style="max-width: 100%; max-height: 100px;" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- 4. Estilo de Vida -->
        <q-expansion-item expand-separator icon="fas fa-heart-pulse" label="4. Estilo de Vida"
          header-class="text-h6 text-primary bg-blue-1 non-truncated-header" class="rounded-borders shadow-2">
          <q-card>
            <q-card-section class="q-pa-md q-gutter-y-md">
              <q-input outlined v-model="formData.estiloVida.alimentacion" label="Alimentación" />
              <q-input outlined v-model="formData.estiloVida.hidratacion" label="Hidratación" />
              <q-input outlined v-model="formData.estiloVida.actividadFisica" label="Actividad física" />
              <q-input outlined v-model="formData.estiloVida.calidadSueno" label="Calidad del sueño" />
              <q-input outlined v-model="formData.estiloVida.estres" label="Estrés percibido" />
              <q-input outlined v-model="formData.estiloVida.tabaquismoAlcohol" label="Tabaquismo / alcohol" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- 5. Escalas de Evaluación -->
        <q-expansion-item expand-separator icon="fas fa-ruler-combined" label="5. Escalas de Evaluación"
          header-class="text-h6 text-primary bg-blue-1 non-truncated-header" class="rounded-borders shadow-2">
          <q-card>
            <q-card-section class="q-pa-md q-gutter-y-lg">
              <q-option-group :options="glogauOptions" type="radio" v-model="formData.escalas.glogau"
                label="Escala de Glogau (Envejecimiento)">
                <template v-slot:label="opt">
                  <div class="row items-center">
                    <span class="text-weight-bold q-mr-sm">{{ opt.label }}</span>
                    <span>{{ opt.description }}</span>
                  </div>
                </template>
              </q-option-group>
              <q-separator />
              <div class="text-subtitle1 text-weight-bold">Escala de Baumann (Tipo de Piel)</div>
              <div class="row q-col-gutter-md">
                <q-select class="col-6 col-md-3" outlined v-model="formData.escalas.baumann.humedad"
                  :options="['Seca', 'Grasa']" label="Humedad" />
                <q-select class="col-6 col-md-3" outlined v-model="formData.escalas.baumann.sensibilidad"
                  :options="['Sensible', 'Resistente']" label="Sensibilidad" />
                <q-select class="col-6 col-md-3" outlined v-model="formData.escalas.baumann.pigmentacion"
                  :options="['Pigmentada', 'No Pigmentada']" label="Pigmentación" />
                <q-select class="col-6 col-md-3" outlined v-model="formData.escalas.baumann.firmeza"
                  :options="['Arrugada', 'Firme']" label="Firmeza" />
              </div>
              <q-input outlined v-model="formData.escalas.baumann.combinacion"
                label="Combinación final del tipo de piel" />
              <q-separator />
              <q-option-group :options="fitzpatrickOptions" type="radio" v-model="formData.escalas.fitzpatrick"
                label="Escala de Fitzpatrick (Fototipo)">
                <template v-slot:label="opt">
                  <div class="row items-center">
                    <span class="text-weight-bold q-mr-sm">{{ opt.label }}</span>
                    <span>{{ opt.description }}</span>
                  </div>
                </template>
              </q-option-group>
              <q-separator />
              <q-option-group :options="fotoenvejecimientoOptions" type="radio"
                v-model="formData.escalas.fotoenvejecimiento" label="Escala de Fotoenvejecimiento (Daño Solar)">
                <template v-slot:label="opt">
                  <div class="row items-center">
                    <span class="text-weight-bold q-mr-sm">{{ opt.label }}</span>
                    <span>{{ opt.description }}</span>
                  </div>
                </template>
              </q-option-group>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- 6. Análisis Avanzados -->
        <q-expansion-item expand-separator icon="fas fa-microscope"
          label="6. Análisis Avanzados (Impedanciometría y Cleopatra)"
          header-class="text-h6 text-primary bg-blue-1 non-truncated-header" class="rounded-borders shadow-2">
          <q-card>
            <q-card-section class="q-pa-md q-gutter-y-md">
              <div class="text-subtitle1 text-weight-bold">Evaluación por Impedanciometría Corporal</div>
              <div class="row q-col-gutter-sm">
                <q-input outlined v-model="formData.impedanciometria.grasaCorporal" label="% de grasa corporal"
                  class="col-6 col-md-4" />
                <q-input outlined v-model="formData.impedanciometria.masaMuscular" label="Masa muscular"
                  class="col-6 col-md-4" />
                <q-input outlined v-model="formData.impedanciometria.masaOsea" label="Masa ósea"
                  class="col-6 col-md-4" />
                <q-input outlined v-model="formData.impedanciometria.aguaCorporal" label="Agua corporal total"
                  class="col-6 col-md-4" />
                <q-input outlined v-model="formData.impedanciometria.grasaVisceral" label="Índice de grasa visceral"
                  class="col-6 col-md-4" />
                <q-input outlined v-model="formData.impedanciometria.edadMetabolica" label="Edad metabólica"
                  class="col-6 col-md-4" />
              </div>
              <q-separator class="q-my-md" />

              <div class="text-subtitle1 text-weight-bold">Análisis Facial con Sistema Cleopatra</div>
              <q-input outlined v-model="formData.cleopatra.resultadoGeneral" type="textarea"
                label="Resultado del escaneo facial computarizado" />
              <div class="row q-col-gutter-sm">
                <q-input outlined v-model="formData.cleopatra.hidratacion" label="% de hidratación"
                  class="col-6 col-md-4" />
                <q-input outlined v-model="formData.cleopatra.elasticidad" label="% de elasticidad"
                  class="col-6 col-md-4" />
                <q-input outlined v-model="formData.cleopatra.poros" label="Poros (tamaño y cantidad)"
                  class="col-12 col-md-4" />
              </div>
              <q-input outlined v-model="formData.cleopatra.manchas"
                label="Presencia de manchas (cantidad y profundidad)" />
              <q-input outlined v-model="formData.cleopatra.arrugas" label="Detección de arrugas finas y profundas" />
              <q-input outlined v-model="formData.cleopatra.evaluacionZonas"
                label="Evaluación por zonas: frente / mejillas / mentón / nariz" />
              <q-file outlined v-model="formData.cleopatra.fotoAntesFile" label="Foto comparativa (Antes)"
                class="col-12 col-md-6" accept="image/*" />
              <img v-if="formData.cleopatra.fotoAntes" :src="formData.cleopatra.fotoAntes" alt="Foto Antes"
                class="q-mt-sm" style="max-width: 100%; max-height: 200px;" />
              <q-file outlined v-model="formData.cleopatra.fotoDespuesFile" label="Foto comparativa (Después)"
                class="col-12 col-md-6" accept="image/*" />
              <img v-if="formData.cleopatra.fotoDespues" :src="formData.cleopatra.fotoDespues" alt="Foto Después"
                class="q-mt-sm" style="max-width: 100%; max-height: 200px;" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- 7. Diagnóstico y Plan de Tratamiento -->
        <q-expansion-item expand-separator icon="fas fa-clipboard-list" label="7. Diagnóstico y Plan de Tratamiento"
          header-class="text-h6 text-primary bg-blue-1 non-truncated-header" class="rounded-borders shadow-2">
          <q-card>
            <q-card-section class="q-pa-md q-gutter-y-md">
              <div class="text-subtitle1 text-weight-bold">Diagnóstico Estético</div>
              <q-input outlined v-model="formData.diagnostico.facial" type="textarea" label="Facial" />
              <q-input outlined v-model="formData.diagnostico.corporal" type="textarea" label="Corporal" />
              <q-input outlined v-model="formData.diagnostico.global" type="textarea" label="Diagnóstico global" />
              <q-separator class="q-my-md" />
              <div class="text-subtitle1 text-weight-bold">Plan de Tratamiento Estético</div>
              <q-input outlined v-model="formData.planTratamiento.procedimientosFaciales" type="textarea"
                label="Procedimientos propuestos (faciales)" />
              <q-input outlined v-model="formData.planTratamiento.procedimientosCorporales" type="textarea"
                label="Procedimientos propuestos (corporales)" />
              <q-input outlined v-model="formData.planTratamiento.sesiones" label="Número de sesiones estimadas"
                type="number" />
              <q-input outlined v-model="formData.planTratamiento.indicaciones" type="textarea"
                label="Indicaciones pre y post tratamiento" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- 8. Consentimientos y Firmas -->
        <q-expansion-item expand-separator icon="fas fa-file-signature" label="8. Consentimientos y Firmas"
          header-class="text-h6 text-primary bg-blue-1 non-truncated-header" class="rounded-borders shadow-2">
          <q-card>
            <q-card-section class="q-pa-md">
              <q-checkbox v-model="formData.consentimientos.firmados"
                label="Se entregan y firman los consentimientos correspondientes a los procedimientos acordados." />
              <div class="row q-mt-xl q-col-gutter-xl items-end">
                <div class="col-12 col-md-6">
                  <q-file v-model="formData.firmas.pacienteFile" label="Subir firma del paciente" outlined
                    accept="image/*">
                    <template v-slot:prepend>
                      <q-icon name="signature" />
                    </template>
                  </q-file>
                  <img v-if="formData.firmas.paciente" :src="formData.firmas.paciente" alt="Firma del paciente"
                    style="max-height: 100px; max-width: 100%;" class="q-mt-sm" />
                  <div class="signature-line q-mt-sm"></div>
                  <div class="text-subtitle2 text-center">Firma del paciente</div>
                </div>
                <div class="col-12 col-md-6 text-center">
                  <img :src="formData.firmas.tratante" alt="Firma del tratante"
                    style="max-height: 100px; max-width: 100%;" />
                  <div class="signature-line"></div>
                  <div class="text-subtitle2">Firma del profesional tratante</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <div class="row justify-end q-mt-xl" v-if="!isViewMode">
          <q-btn label="Guardar Paciente" type="submit" color="primary" icon="save" size="lg" />
        </div>

      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const mode = computed(() => route.query.mode || 'create')
const isViewMode = computed(() => mode.value === 'view')
const patientId = computed(() => route.query.patientId ? String(route.query.patientId) : null)
const recordId = computed(() => route.query.recordId ? String(route.query.recordId) : null)

const formData = ref({
  // 1. Datos de Identificación
  nombreCompleto: '',
  edad: null,
  fechaNacimiento: '',
  documento: '',
  telefono: '',
  email: '',
  ocupacion: '',
  ciudadResidencia: '',
  fechaConsulta: new Date().toISOString().substr(0, 10).replace(/-/g, '/'),

  // 2. Motivo de Consulta
  motivoConsulta: {
    deseoMejora: '',
    expectativas: '',
    tiempoCondicion: '',
  },

  // 3. Antecedentes
  antecedentes: {
    enfermedades: '',
    cirugiasEsteticas: '',
    alergias: '',
    medicamentos: '',
    tratamientosPrevios: '',
  },

  // 4. Evaluación Facial
  evaluacionFacial: {
    tipoPiel: null,
    lesionesActivas: '',
    arrugas: '',
    laxitudCutanea: '',
    hiperpigmentaciones: '',
    flacidezMuscular: '',
    hidratacion: '',
    simetria: '',
  },

  // 5. Evaluación Corporal
  evaluacionCorporal: {
    grasaLocalizada: '',
    flacidezCutanea: '',
    celulitis: '',
    estrias: '',
    tonicidadMuscular: '',
    retencionLiquidos: '',
    peso: null,
    talla: null,
    imc: null,
    analisisInBody: [], // paths to uploaded images
    analisisInBodyFiles: [],
  },

  // 6. Estilo de Vida
  estiloVida: {
    alimentacion: '',
    hidratacion: '',
    actividadFisica: '',
    calidadSueno: '',
    estres: '',
    tabaquismoAlcohol: '',
  },

  // Escalas
  escalas: {
    glogau: null,
    baumann: {
      humedad: null,
      sensibilidad: null,
      pigmentacion: null,
      firmeza: null,
      combinacion: '',
    },
    fitzpatrick: null,
    fotoenvejecimiento: null,
  },

  // Impedanciometría
  impedanciometria: {
    grasaCorporal: '',
    masaMuscular: '',
    masaOsea: '',
    aguaCorporal: '',
    grasaVisceral: '',
    edadMetabolica: '',
  },

  // Cleopatra
  cleopatra: {
    resultadoGeneral: '',
    hidratacion: '',
    elasticidad: '',
    manchas: '',
    arrugas: '',
    poros: '',
    evaluacionZonas: '',
    fotoAntes: null,
    fotoDespues: null,
    fotoAntesFile: null,
    fotoDespuesFile: null,
  },

  // Diagnóstico y Plan
  diagnostico: {
    facial: '',
    corporal: '',
    global: '',
  },
  planTratamiento: {
    procedimientosFaciales: '',
    procedimientosCorporales: '',
    sesiones: null,
    indicaciones: '',
  },

  // Consentimientos y Firmas
  consentimientos: {
    firmados: false
  },
  firmas: {
    paciente: null,
    pacienteFile: null,
    // IMPORTANTE: Reemplaza esta URL con la ruta a la imagen de la firma del profesional
    // Puede ser una ruta local (ej. '/signatures/doctor-signature.png') si está en tu carpeta /public
    // O una URL completa si está alojada en otro lugar.
    tratante: 'https://placehold.co/250x100/000000/FFFFFF?text=Firma+Doctor&font=script'
  }

});

onMounted(() => {
  if (patientId.value) {
    const patients = JSON.parse(localStorage.getItem('patients') || '[]')
    const patient = patients.find(p => p.id === patientId.value)
    if (patient && patient.records) {
      let record
      if (recordId.value) {
        record = patient.records.find(r => r.id === recordId.value)
      } else {
        record = patient.records[patient.records.length - 1]
      }
      if (record) {
        formData.value = JSON.parse(JSON.stringify(record))
      }
    }
  }
})

// Calcula el IMC automáticamente
watch(() => [formData.value.evaluacionCorporal.peso, formData.value.evaluacionCorporal.talla], ([peso, talla]) => {
  if (peso > 0 && talla > 0) {
    const tallaMetros = talla / 100;
    formData.value.evaluacionCorporal.imc = (peso / (tallaMetros * tallaMetros)).toFixed(2);
  } else {
    formData.value.evaluacionCorporal.imc = null;
  }
});

// Opciones para las escalas
const glogauOptions = [
  { label: 'I. Leve', value: 'I', description: '(mínimas arrugas, sin maquillaje)' },
  { label: 'II. Moderado', value: 'II', description: '(arrugas al gesto, daño solar visible)' },
  { label: 'III. Avanzado', value: 'III', description: '(arrugas persistentes, pigmentación irregular)' },
  { label: 'IV. Severo', value: 'IV', description: '(piel suelta, fotoenvejecimiento avanzado)' }
];

const fitzpatrickOptions = [
  { label: 'I', value: 'I', description: 'Siempre se quema, nunca se broncea (piel muy clara)' },
  { label: 'II', value: 'II', description: 'Se quema fácilmente, se broncea mínimamente' },
  { label: 'III', value: 'III', description: 'Se quema moderadamente, se broncea gradualmente' },
  { label: 'IV', value: 'IV', description: 'Se quema mínimamente, se broncea bien' },
  { label: 'V', value: 'V', description: 'Raramente se quema, se broncea intensamente' },
  { label: 'VI', value: 'VI', description: 'Nunca se quema (piel muy oscura)' }
];

const fotoenvejecimientoOptions = [
  { label: 'Grado 1', value: 1, description: 'Arrugas finas, pigmentación leve' },
  { label: 'Grado 2', value: 2, description: 'Arrugas moderadas, textura áspera, pigmentación visible' },
  { label: 'Grado 3', value: 3, description: 'Arrugas profundas, flacidez, discromías marcadas' },
  { label: 'Grado 4', value: 4, description: 'Fotoenvejecimiento severo, piel muy delgada y flácida' }
];

const uploadImage = async (file) => {
  const data = new FormData();
  data.append('image', file);
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
      method: 'POST',
      body: data
    });
    if (!res.ok) {
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Error al subir la imagen'
      });
      return null;
    }
    const json = await res.json();
    return json.path;
  } catch (e) {
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: 'Error al subir la imagen'
    });
    return null;
  }
};

watch(() => formData.value.firmas.pacienteFile, async (file) => {
  if (file) {
    const previewUrl = URL.createObjectURL(file);
    formData.value.firmas.paciente = previewUrl;
    const url = await uploadImage(file);
    URL.revokeObjectURL(previewUrl);
    if (url) {
      formData.value.firmas.paciente = url;
    } else {
      formData.value.firmas.paciente = null;
    }
    formData.value.firmas.pacienteFile = null;
  }
});

watch(() => formData.value.cleopatra.fotoAntesFile, async (file) => {
  if (file) {
    const previewUrl = URL.createObjectURL(file);
    formData.value.cleopatra.fotoAntes = previewUrl;
    const url = await uploadImage(file);
    URL.revokeObjectURL(previewUrl);
    if (url) {
      formData.value.cleopatra.fotoAntes = url;
    } else {
      formData.value.cleopatra.fotoAntes = null;
    }
    formData.value.cleopatra.fotoAntesFile = null;
  }
});

watch(() => formData.value.cleopatra.fotoDespuesFile, async (file) => {
  if (file) {
    const previewUrl = URL.createObjectURL(file);
    formData.value.cleopatra.fotoDespues = previewUrl;
    const url = await uploadImage(file);
    URL.revokeObjectURL(previewUrl);
    if (url) {
      formData.value.cleopatra.fotoDespues = url;
    } else {
      formData.value.cleopatra.fotoDespues = null;
    }
    formData.value.cleopatra.fotoDespuesFile = null;
  }
});

watch(() => formData.value.evaluacionCorporal.analisisInBodyFiles, async (files) => {
  if (files && files.length) {
    const paths = [];
    for (const f of Array.from(files)) {
      const path = await uploadImage(f);
      if (path) {
        paths.push(path);
      }
    }
    if (paths.length === files.length) {
      formData.value.evaluacionCorporal.analisisInBody = paths;
      formData.value.evaluacionCorporal.analisisInBodyFiles = [];
    }
  }
});

const onSubmit = () => {
  const patients = JSON.parse(localStorage.getItem('patients') || '[]')
  if (patientId.value) {
    const patient = patients.find(p => p.id === patientId.value)
    if (patient) {
      if (recordId.value && mode.value === 'edit') {
        const idx = patient.records.findIndex(r => r.id === recordId.value)
        if (idx !== -1) {
          patient.records[idx] = { id: recordId.value, ...JSON.parse(JSON.stringify(formData.value)) }
        }
      } else {
        patient.records.push({ id: crypto.randomUUID(), ...JSON.parse(JSON.stringify(formData.value)) })
      }
    }
  } else {
    const newRecord = { id: crypto.randomUUID(), ...JSON.parse(JSON.stringify(formData.value)) }
    const newPatient = { id: crypto.randomUUID(), records: [newRecord] }
    patients.push(newPatient)
  }
  localStorage.setItem('patients', JSON.stringify(patients))
  $q.notify({
    color: 'positive',
    textColor: 'white',
    icon: 'check_circle',
    message: 'Ficha del paciente guardada correctamente'
  })
  if (patientId.value) {
    router.push({ path: '/historial', query: { id: patientId.value } })
  } else {
    router.push('/pacientes')
  }
}

</script>

<style scoped>
.signature-line {
  border-bottom: 2px solid #616161;
  height: 1px;
  margin-bottom: 8px;
}

.rounded-borders {
  border-radius: 8px;
  overflow: hidden;
  /* Important for child elements to respect the border radius */
}

/* This class prevents the expansion item label from being truncated */
.non-truncated-header :deep(.q-item__label) {
  white-space: normal;
  line-height: 1.2 !important;
}

.read-only-form {
  pointer-events: none;
}
</style>