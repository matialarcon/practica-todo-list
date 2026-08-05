import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { TodoProvider } from './context/TodoProvider.jsx'
import 'todomvc-app-css/index.css'

createRoot(document.getElementById('root')).render(
  <TodoProvider>
    <App />
  </TodoProvider>
)
