import { loadBabylon } from './babylon'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')
if (app) {
  loadBabylon()
}
