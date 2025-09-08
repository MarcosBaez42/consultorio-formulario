import MainLayout from '../layouts/MainLayout.vue'
import Home from '../pages/Home.vue'
import MedicalForm from '../pages/MedicalForm.vue'
import PatientsList from '../pages/PatientsList.vue'
import PatientHistory from '../pages/PatientHistory.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'registro', component: MedicalForm },
      { path: 'pacientes', component: PatientsList },
      { path: 'historial', component: PatientHistory }
    ]
  }
]

export default routes