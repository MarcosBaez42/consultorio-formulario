<template>
  <q-page padding class="flex flex-center bg-grey-2">
    <div class="q-pa-md" style="width: 100%; max-width: 900px;">
      <q-btn
        label="Volver al inicio"
        icon="home"
        color="primary"
        flat
        class="q-mb-md"
        @click="router.push('/')"
      />

      <div class="text-h4 text-center text-primary q-mb-md">
        Ficha de Paciente - Estética Médica
      </div>
      <p class="text-subtitle1 text-center text-grey-7 q-mb-lg">
        Formulario de ingreso y seguimiento para nuevos pacientes.
      </p>

      <q-form
        ref="form"
        @submit.prevent="onSubmit"
        class="q-gutter-y-lg"
        :class="{ 'read-only-form': isViewMode }"
      >
        <q-stepper
          v-model="step"
          animated
          flat
          bordered
          vertical
          color="primary"
          header-nav
        >
          <!-- 1. Datos de Identificación -->
          <q-step
            :name="1"
            title="1. Datos de Identificación"
            icon="fas fa-address-card"
          >
            <q-card>
              <q-card-section class="q-pa-md">
                <div class="row q-col-gutter-md">
                  <q-input
                    outlined
                    v-model="formData.nombreCompleto"
                    label="Nombre completo"
                    class="col-12 col-md-6"
                    :rules="[required]"
                    lazy-rules
                  />
                  <q-input
                    outlined
                    v-model="formData.edad"
                    label="Edad"
                    type="number"
                    class="col-12 col-md-6"
                    :rules="[positive]"
                    lazy-rules
                  />
                  <q-input
                    outlined
                    v-model="formData.fechaNacimiento"
                    mask="date"
                    label="Fecha de nacimiento"
                    class="col-12 col-md-6"
                    :rules="[required]"
                    lazy-rules
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="formData.fechaNacimiento">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Cerrar"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    outlined
                    v-model="formData.documento"
                    label="Documento de identidad"
                    class="col-12 col-md-6"
                    :rules="[required]"
                    lazy-rules
                  />
                  <q-input
                    outlined
                    v-model="formData.telefono"
                    label="Teléfono / Celular"
                    class="col-12 col-md-6"
                  />
                  <q-input
                    outlined
                    v-model="formData.email"
                    label="Correo electrónico"
                    type="email"
                    class="col-12 col-md-6"
                    :rules="[emailRule]"
                    lazy-rules
                  />
                  <q-input
                    outlined
                    v-model="formData.ocupacion"
                    label="Ocupación"
                    class="col-12 col-md-6"
                  />
                  <q-input
                    outlined
                    v-model="formData.ciudadResidencia"
                    label="Ciudad de residencia"
                    class="col-12 col-md-6"
                  />
                  <q-input
                    outlined
                    v-model="formData.fechaConsulta"
                    mask="date"
                    label="Fecha de la consulta"
                    class="col-12"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="formData.fechaConsulta">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Cerrar"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </q-card-section>
            </q-card>
            <q-stepper-navigation>
              <q-btn color="primary" label="Siguiente" @click="step++" />
            </q-stepper-navigation>
          </q-step>

          <!-- 2. Motivo de Consulta y Antecedentes -->
          <q-step
            :name="2"
            title="2. Motivo de Consulta y Antecedentes"
            icon="fas fa-notes-medical"
          >
            <q-card>
              <q-card-section class="q-pa-md q-gutter-y-md">
                <div class="text-subtitle1 text-weight-bold">
                  Motivo de Consulta Estética
                </div>
                <q-input
                  outlined
                  v-model="formData.motivoConsulta.deseoMejora"
                  type="textarea"
                  label="¿Qué desea mejorar?"
                />
                <q-input
                  outlined
                  v-model="formData.motivoConsulta.expectativas"
                  type="textarea"
                  label="Expectativas del tratamiento"
                />
                <q-input
                  outlined
                  v-model="formData.motivoConsulta.tiempoCondicion"
                  label="Tiempo con la condición estética actual"
                />

                <q-separator class="q-my-md" />

                <div class="text-subtitle1 text-weight-bold">
                  Antecedentes Médicos Relevantes
                </div>
                <q-input
                  outlined
                  v-model="formData.antecedentes.enfermedades"
                  type="textarea"
                  label="Enfermedades previas o actuales"
                />
                <q-input
                  outlined
                  v-model="formData.antecedentes.cirugiasEsteticas"
                  type="textarea"
                  label="Cirugías estéticas previas"
                />
                <q-input
                  outlined
                  v-model="formData.antecedentes.alergias"
                  type="textarea"
                  label="Alergias conocidas"
                />
                <q-input
                  outlined
                  v-model="formData.antecedentes.medicamentos"
                  type="textarea"
                  label="Uso de medicamentos"
                />
                <q-input
                  outlined
                  v-model="formData.antecedentes.tratamientosPrevios"
                  type="textarea"
                  label="Tratamientos estéticos previos y resultados"
                />
              </q-card-section>
            </q-card>
            <q-stepper-navigation>
              <q-btn flat color="primary" label="Atrás" @click="step--" class="q-mr-sm" />
              <q-btn color="primary" label="Siguiente" @click="step++" />
            </q-stepper-navigation>
          </q-step>

          <!-- 3. Evaluaciones Estéticas -->
          <q-step
            :name="3"
            title="3. Evaluaciones Estéticas (Facial y Corporal)"
            icon="fas fa-user-check"
          >
            <q-card>
              <q-card-section class="q-pa-md q-gutter-y-md">
                <div class="text-subtitle1 text-weight-bold">
                  Evaluación Facial Estética
                </div>
                <q-select
                  outlined
                  v-model="formData.evaluacionFacial.tipoPiel"
                  :options="['Seca', 'Grasa', 'Mixta', 'Sensible']"
                  label="Tipo de piel"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionFacial.lesionesActivas"
                  label="Lesiones activas (acné, rosácea, manchas, cicatrices)"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionFacial.arrugas"
                  label="Arrugas (ubicación y profundidad)"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionFacial.laxitudCutanea"
                  label="Laxitud cutánea"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionFacial.hiperpigmentaciones"
                  label="Hiperpigmentaciones"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionFacial.flacidezMuscular"
                  label="Flacidez muscular facial"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionFacial.hidratacion"
                  label="Hidratación y luminosidad"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionFacial.simetria"
                  label="Simetría facial y proporciones"
                />

                <q-separator class="q-my-md" />

                <div class="text-subtitle1 text-weight-bold">
                  Evaluación Corporal Estética
                </div>
                <q-input
                  outlined
                  v-model="formData.evaluacionCorporal.grasaLocalizada"
                  label="Zonas de grasa localizada"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionCorporal.flacidezCutanea"
                  label="Flacidez cutánea"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionCorporal.celulitis"
                  label="Celulitis (grado)"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionCorporal.estrias"
                  label="Estrías"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionCorporal.tonicidadMuscular"
                  label="Tonicidad muscular"
                />
                <q-input
                  outlined
                  v-model="formData.evaluacionCorporal.retencionLiquidos"
                  label="Retención de líquidos o edemas"
                />
                <div class="row q-col-gutter-sm">
                  <q-input
                    outlined
                    v-model="formData.evaluacionCorporal.peso"
                    label="Peso (kg)"
                    type="number"
                    class="col-4"
                  />
                  <q-input
                    outlined
                    v-model="formData.evaluacionCorporal.talla"
                    label="Talla (cm)"
                    type="number"
                    class="col-4"
                  />
                  <q-input
                    outlined
                    v-model="formData.evaluacionCorporal.imc"
                    label="IMC"
                    type="number"
                    class="col-4"
                    readonly
                  />
                </div>
                <q-file
                  v-model="formData.evaluacionCorporal.analisisInBodyFiles"
                  label="Análisis InBody (subir fotos)"
                  outlined
                  multiple
                  accept="image/*"
                  counter
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
                <div class="row q-col-gutter-sm q-mt-sm">
                  <div
                    v-for="(img, idx) in formData.evaluacionCorporal.analisisInBody"
                    :key="idx"
                    class="col-6 col-md-3 text-center"
                  >
                    <q-img
                      :src="img.url"
                      alt="Análisis InBody"
                      style="max-width: 100%; max-height: 100px;"
                      @click="openViewer(img)"
                      class="cursor-pointer"
                    />
                    <div class="text-caption q-mt-xs">{{ img.name }}</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <q-stepper-navigation>
              <q-btn flat color="primary" label="Atrás" @click="step--" class="q-mr-sm" />
              <q-btn color="primary" label="Siguiente" @click="step++" />
            </q-stepper-navigation>
          </q-step>

          <!-- 4. Estilo de Vida -->
          <q-step
            :name="4"
            title="4. Estilo de Vida"
            icon="fas fa-heart-pulse"
          >
            <q-card>
              <q-card-section class="q-pa-md q-gutter-y-md">
                <q-input
                  outlined
                  v-model="formData.estiloVida.alimentacion"
                  label="Alimentación"
                />
                <q-input
                  outlined
                  v-model="formData.estiloVida.hidratacion"
                  label="Hidratación"
                />
                <q-input
                  outlined
                  v-model="formData.estiloVida.actividadFisica"
                  label="Actividad física"
                />
                <q-input
                  outlined
                  v-model="formData.estiloVida.calidadSueno"
                  label="Calidad del sueño"
                />
                <q-input
                  outlined
                  v-model="formData.estiloVida.estres"
                  label="Estrés percibido"
                />
                <q-input
                  outlined
                  v-model="formData.estiloVida.tabaquismoAlcohol"
                  label="Tabaquismo / alcohol"
                />
              </q-card-section>
            </q-card>
            <q-stepper-navigation>
              <q-btn flat color="primary" label="Atrás" @click="step--" class="q-mr-sm" />
              <q-btn color="primary" label="Siguiente" @click="step++" />
            </q-stepper-navigation>
          </q-step>

          <!-- 5. Escalas de Evaluación -->
          <q-step
            :name="5"
            title="5. Escalas de Evaluación"
            icon="fas fa-ruler-combined"
          >
            <q-card>
              <q-card-section class="q-pa-md q-gutter-y-lg">
                <q-option-group
                  :options="glogauOptions"
                  type="radio"
                  v-model="formData.escalas.glogau"
                  label="Escala de Glogau (Envejecimiento)"
                >
                  <template v-slot:label="opt">
                    <div class="row items-center">
                      <span class="text-weight-bold q-mr-sm">{{ opt.label }}</span>
                      <span>{{ opt.description }}</span>
                    </div>
                  </template>
                </q-option-group>
                <q-separator />
                <div class="text-subtitle1 text-weight-bold">
                  Escala de Baumann (Tipo de Piel)
                </div>
                <div class="row q-col-gutter-md">
                  <q-select
                    class="col-6 col-md-3"
                    outlined
                    v-model="formData.escalas.baumann.humedad"
                    :options="['Seca', 'Grasa']"
                    label="Humedad"
                  />
                  <q-select
                    class="col-6 col-md-3"
                    outlined
                    v-model="formData.escalas.baumann.sensibilidad"
                    :options="['Sensible', 'Resistente']"
                    label="Sensibilidad"
                  />
                  <q-select
                    class="col-6 col-md-3"
                    outlined
                    v-model="formData.escalas.baumann.pigmentacion"
                    :options="['Pigmentada', 'No Pigmentada']"
                    label="Pigmentación"
                  />
                  <q-select
                    class="col-6 col-md-3"
                    outlined
                    v-model="formData.escalas.baumann.firmeza"
                    :options="['Arrugada', 'Firme']"
                    label="Firmeza"
                  />
                </div>
                <q-input
                  outlined
                  v-model="formData.escalas.baumann.combinacion"
                  label="Combinación final del tipo de piel"
                />
                <q-separator />
                <q-option-group
                  :options="fitzpatrickOptions"
                  type="radio"
                  v-model="formData.escalas.fitzpatrick"
                  label="Escala de Fitzpatrick (Fototipo)"
                >
                  <template v-slot:label="opt">
                    <div class="row items-center">
                      <span class="text-weight-bold q-mr-sm">{{ opt.label }}</span>
                      <span>{{ opt.description }}</span>
                    </div>
                  </template>
                </q-option-group>
                <q-separator />
                <q-option-group
                  :options="fotoenvejecimientoOptions"
                  type="radio"
                  v-model="formData.escalas.fotoenvejecimiento"
                  label="Escala de Fotoenvejecimiento (Daño Solar)"
                >
                  <template v-slot:label="opt">
                    <div class="row items-center">
                      <span class="text-weight-bold q-mr-sm">{{ opt.label }}</span>
                      <span>{{ opt.description }}</span>
                    </div>
                  </template>
                </q-option-group>
              </q-card-section>
            </q-card>
            <q-stepper-navigation>
              <q-btn flat color="primary" label="Atrás" @click="step--" class="q-mr-sm" />
              <q-btn color="primary" label="Siguiente" @click="step++" />
            </q-stepper-navigation>
          </q-step>

          <!-- 6. Análisis Avanzados -->
          <q-step
            :name="6"
            title="6. Análisis Avanzados (Impedanciometría y Cleopatra)"
            icon="fas fa-microscope"
          >
            <q-card>
              <q-card-section class="q-pa-md q-gutter-y-md">
                <div class="text-subtitle1 text-weight-bold">
                  Evaluación por Impedanciometría Corporal
                </div>
                <div class="row q-col-gutter-sm">
                  <q-input
                    outlined
                    v-model="formData.impedanciometria.grasaCorporal"
                    label="% de grasa corporal"
                    class="col-6 col-md-4"
                  />
                  <q-input
                    outlined
                    v-model="formData.impedanciometria.masaMuscular"
                    label="Masa muscular"
                    class="col-6 col-md-4"
                  />
                  <q-input
                    outlined
                    v-model="formData.impedanciometria.masaOsea"
                    label="Masa ósea"
                    class="col-6 col-md-4"
                  />
                  <q-input
                    outlined
                    v-model="formData.impedanciometria.aguaCorporal"
                    label="Agua corporal total"
                    class="col-6 col-md-4"
                  />
                  <q-input
                    outlined
                    v-model="formData.impedanciometria.grasaVisceral"
                    label="Índice de grasa visceral"
                    class="col-6 col-md-4"
                  />
                  <q-input
                    outlined
                    v-model="formData.impedanciometria.edadMetabolica"
                    label="Edad metabólica"
                    class="col-6 col-md-4"
                  />
                </div>
                <q-separator class="q-my-md" />

                <div class="text-subtitle1 text-weight-bold">
                  Análisis Facial con Sistema Cleopatra
                </div>
                <q-input
                  outlined
                  v-model="formData.cleopatra.resultadoGeneral"
                  type="textarea"
                  label="Resultado del escaneo facial computarizado"
                />
                <div class="row q-col-gutter-sm">
                  <q-input
                    outlined
                    v-model="formData.cleopatra.hidratacion"
                    label="% de hidratación"
                    class="col-6 col-md-4"
                  />
                  <q-input
                    outlined
                    v-model="formData.cleopatra.elasticidad"
                    label="% de elasticidad"
                    class="col-6 col-md-4"
                  />
                  <q-input
                    outlined
                    v-model="formData.cleopatra.poros"
                    label="Poros (tamaño y cantidad)"
                    class="col-12 col-md-4"
                  />
                </div>
                <q-input
                  outlined
                  v-model="formData.cleopatra.manchas"
                  label="Presencia de manchas (cantidad y profundidad)"
                />
                <q-input
                  outlined
                  v-model="formData.cleopatra.arrugas"
                  label="Detección de arrugas finas y profundas"
                />
                <q-input
                  outlined
                  v-model="formData.cleopatra.evaluacionZonas"
                  label="Evaluación por zonas: frente / mejillas / mentón / nariz"
                />
                <q-file
                  outlined
                  v-model="formData.cleopatra.fotoAntesFiles"
                  label="Foto comparativa (Antes)"
                  multiple
                  counter
                  accept="image/*"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
                <div class="row q-col-gutter-sm q-mt-sm">
                  <div
                    v-for="(img, idx) in formData.cleopatra.fotoAntes"
                    :key="idx"
                    class="col-6 col-md-3 text-center"
                  >
                    <q-img
                      :src="img.url"
                      alt="Foto Antes"
                      style="max-width: 100%; max-height: 100px;"
                      @click="openViewer(img)"
                      class="cursor-pointer"
                    />
                    <div class="text-caption q-mt-xs">{{ img.name }}</div>
                  </div>
                </div>
                <q-file
                  outlined
                  v-model="formData.cleopatra.fotoDespuesFiles"
                  label="Foto comparativa (Después)"
                  multiple
                  counter
                  accept="image/*"
                  class="q-mt-md"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
                <div class="row q-col-gutter-sm q-mt-sm">
                  <div
                    v-for="(img, idx) in formData.cleopatra.fotoDespues"
                    :key="idx"
                    class="col-6 col-md-3 text-center"
                  >
                    <q-img
                      :src="img.url"
                      alt="Foto Después"
                      style="max-width: 100%; max-height: 100px;"
                      @click="openViewer(img)"
                      class="cursor-pointer"
                    />
                    <div class="text-caption q-mt-xs">{{ img.name }}</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <q-stepper-navigation>
              <q-btn flat color="primary" label="Atrás" @click="step--" class="q-mr-sm" />
              <q-btn color="primary" label="Siguiente" @click="step++" />
            </q-stepper-navigation>
          </q-step>

          <!-- 7. Diagnóstico y Plan de Tratamiento -->
          <q-step
            :name="7"
            title="7. Diagnóstico y Plan de Tratamiento"
            icon="fas fa-clipboard-list"
          >
            <q-card>
              <q-card-section class="q-pa-md q-gutter-y-md">
                <div class="text-subtitle1 text-weight-bold">
                  Diagnóstico Estético
                </div>
                <q-input
                  outlined
                  v-model="formData.diagnostico.facial"
                  type="textarea"
                  label="Facial"
                />
                <q-input
                  outlined
                  v-model="formData.diagnostico.corporal"
                  type="textarea"
                  label="Corporal"
                />
                <q-input
                  outlined
                  v-model="formData.diagnostico.global"
                  type="textarea"
                  label="Diagnóstico global"
                />
                <q-separator class="q-my-md" />
                <div class="text-subtitle1 text-weight-bold">
                  Plan de Tratamiento Estético
                </div>
                <q-input
                  outlined
                  v-model="formData.planTratamiento.procedimientosFaciales"
                  type="textarea"
                  label="Procedimientos propuestos (faciales)"
                />
                <q-input
                  outlined
                  v-model="formData.planTratamiento.procedimientosCorporales"
                  type="textarea"
                  label="Procedimientos propuestos (corporales)"
                />
                <q-input
                  outlined
                  v-model="formData.planTratamiento.sesiones"
                  label="Número de sesiones estimadas"
                  type="number"
                />
                <q-input
                  outlined
                  v-model="formData.planTratamiento.indicaciones"
                  type="textarea"
                  label="Indicaciones pre y post tratamiento"
                />
              </q-card-section>
            </q-card>
            <q-stepper-navigation>
              <q-btn flat color="primary" label="Atrás" @click="step--" class="q-mr-sm" />
              <q-btn color="primary" label="Siguiente" @click="step++" />
            </q-stepper-navigation>
          </q-step>

          <!-- 8. Consentimientos y Firmas -->
          <q-step
            :name="8"
            title="8. Consentimientos y Firmas"
            icon="fas fa-file-signature"
          >
            <q-card>
              <q-card-section class="q-pa-md">
                <q-checkbox
                  v-model="formData.consentimientos.firmados"
                  label="Se entregan y firman los consentimientos correspondientes a los procedimientos acordados."
                />
                <div class="row q-mt-xl q-col-gutter-xl items-end">
                  <div class="col-12 col-md-6">
                    <q-file
                      v-model="formData.firmas.pacienteFile"
                      label="Subir firma del paciente"
                      outlined
                      accept="image/*"
                    >
                      <template v-slot:prepend></template>
                    </q-file>
                    <q-img
                      v-if="formData.firmas.paciente"
                      :src="formData.firmas.paciente"
                      alt="Firma del paciente"
                      style="max-height: 100px; max-width: 100%;"
                      class="q-mt-sm cursor-pointer"
                      @click="openViewer({ url: formData.firmas.paciente, name: formData.firmas.pacienteName || 'Firma del paciente' })"
                    />
                    <div v-if="formData.firmas.pacienteName" class="text-caption q-mt-xs text-center"></div>
                    <div class="signature-line q-mt-sm"></div>
                    <div class="text-subtitle2 text-center">
                      Firma del paciente
                    </div>
                  </div>
                  <div class="col-12 col-md-6 text-center">
                    <q-img
                      :src="formData.firmas.tratante"
                      alt="Firma del tratante"
                      style="max-height: 100px; max-width: 100%;"
                      class="cursor-pointer"
                      @click="openViewer({ url: formData.firmas.tratante, name: formData.firmas.tratanteName || 'Firma del tratante' })"
                    />
                    <div v-if="formData.firmas.tratanteName" class="text-caption q-mt-xs"></div>
                    <div class="signature-line"></div>
                    <div class="text-subtitle2">
                      Firma del profesional tratante
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <q-stepper-navigation>
              <q-btn flat color="primary" label="Atrás" @click="step--" class="q-mr-sm" />
              <q-btn
                v-if="!isViewMode"
                label="Guardar Paciente"
                type="submit"
                color="primary"
                icon="save"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-form>
    </div>

    <q-dialog v-model="viewerOpen">
      <q-card class="bg-transparent" style="width: 90vw; max-width: 90vw;">
        <q-img :src="selectedImage.url" fit="contain" style="max-height: 90vh;">
          <template v-slot:top-right>
            <q-btn icon="close" flat round dense @click="viewerOpen = false" color="white" class="bg-grey-8" />
          </template>
          <template v-slot:after>
            <div class="absolute-bottom text-center bg-black text-white q-pa-sm">
              {{ selectedImage.name }}
            </div>
          </template>
        </q-img>
      </q-card>
    </q-dialog>
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

const step = ref(1)

const form = ref(null)
const required = (val) => !!val || 'Campo obligatorio'
const positive = (val) => (val !== null && val !== '' && Number(val) > 0) || 'Debe ser mayor a 0'
const emailRule = (val) => /.+@.+\..+/.test(val) || 'Correo electrónico inválido'

const viewerOpen = ref(false)
const selectedImage = ref({ url: '', name: '' })
const openViewer = (img) => {
  selectedImage.value = img
  viewerOpen.value = true
}

const extractFileName = (path) => {
  if (!path) return ''
  const parts = path.split('?')[0].split('/')
  return parts[parts.length - 1]
}

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
    analisisInBody: [], // array of { url, name }
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
    fotoAntes: [], // array of { url, name }
    fotoDespues: [],
    fotoAntesFiles: [],
    fotoDespuesFiles: [],
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
    pacienteName: '',
    // IMPORTANTE: Reemplaza esta URL con la ruta a la imagen de la firma del profesional
    // Puede ser una ruta local (ej. '/signatures/doctor-signature.png') si está en tu carpeta /public
    // O una URL completa si está alojada en otro lugar.
    tratante: 'https://placehold.co/250x100/000000/FFFFFF?text=Firma+Doctor&font=script',
    tratanteName: 'firma-tratante.png'
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
        if (formData.value.cleopatra) {
          const cleo = formData.value.cleopatra
          if (!Array.isArray(cleo.fotoAntes)) {
            cleo.fotoAntes = cleo.fotoAntes ? [{ url: cleo.fotoAntes, name: extractFileName(cleo.fotoAntes) }] : []
          }
          if (!Array.isArray(cleo.fotoDespues)) {
            cleo.fotoDespues = cleo.fotoDespues ? [{ url: cleo.fotoDespues, name: extractFileName(cleo.fotoDespues) }] : []
          }
        }
        formData.value.firmas.pacienteName = extractFileName(formData.value.firmas.paciente)
        formData.value.firmas.tratanteName = formData.value.firmas.tratanteName || extractFileName(formData.value.firmas.tratante)
      }
    }
  }
  formData.value.firmas.tratanteName = formData.value.firmas.tratanteName || extractFileName(formData.value.firmas.tratante)
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
    formData.value.firmas.pacienteName = file.name;
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

watch(() => formData.value.cleopatra.fotoAntesFiles, async (files) => {
  if (files && files.length) {
    for (const f of Array.from(files)) {
      const url = await uploadImage(f);
      if (url) {
        formData.value.cleopatra.fotoAntes.push({ url, name: f.name });
      }
    }
    formData.value.cleopatra.fotoAntesFiles = [];
  }
});

watch(() => formData.value.cleopatra.fotoDespuesFiles, async (files) => {
  if (files && files.length) {
    for (const f of Array.from(files)) {
      const url = await uploadImage(f);
      if (url) {
        formData.value.cleopatra.fotoDespues.push({ url, name: f.name });
      }
    }
    formData.value.cleopatra.fotoDespuesFiles = [];
  }
});

watch(() => formData.value.evaluacionCorporal.analisisInBodyFiles, async (files) => {
  if (files && files.length) {
    for (const f of Array.from(files)) {
      const url = await uploadImage(f);
      if (url) {
        formData.value.evaluacionCorporal.analisisInBody.push({ url, name: f.name });
      }
    }
    formData.value.evaluacionCorporal.analisisInBodyFiles = [];
  }
});

const onSubmit = () => {
  form.value.validate().then(success => {
    if (!success) {
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Por favor completa los campos requeridos'
      })
      return
    }

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
  })
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