import { useState } from "react"
import { filterOptions } from "./consts"
import { CreateTodo } from "./components/CreateTodo"
import { Todos } from "./components/Todos"
import { Footer } from "./components/Footer"

function App() {
  //Declaración de un estado para almacenar el filtro seleccionado y modificarlo cuando se requiera.
  const [filterSelected, setFilterSelected] = useState(filterOptions[0].name)

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todo</h1>
          <CreateTodo />
        </header>
        <Todos filterSelected={filterSelected}/>
        <footer className="footer">
          <Footer filterSelected={filterSelected} setFilterSelected={setFilterSelected}/>
        </footer>
      </section>
    </>
  )
}

export default App
