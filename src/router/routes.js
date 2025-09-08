import MainLayout from '../layouts/MainLayout.vue'
import MedicalForm from '../pages/MedicalForm.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: MedicalForm }
    ]
  }
]

export default routes