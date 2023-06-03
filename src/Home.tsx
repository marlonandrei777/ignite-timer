/* nada mais é do q uma funcao */
import { createContext, useContext, useState } from 'react'

/* passamos o valor inicial do contexto  para dentro
de createContext */
const CyclesContext = createContext({} as any)

// simulando um componente
function NewCycleForm() {
  // utilizando o contexto dentro do componente
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)

  return (
    // aq podemos ter acesso ao estado definido no componente principal
    /* quando alteramos o valor do estado aq para 2, é refletido no componente
    CountDown tbm */
    <>
      <h1>NewCycleForm: {activeCycle}</h1>
      <button
        onClick={() => {
          setActiveCycle(2)
        }}
      >
        Alterar ciclo ativo
      </button>
    </>
  )
}

// simulando um componente
function CountDown() {
  // utilizando o contexto dentro do componente
  const { activeCycle } = useContext(CyclesContext)

  return <h1>CountDown: {activeCycle}</h1>
}

// Componente PRINCIPAL
export function Home() {
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    /* para os componentes receberem o contexto colocamos em volta deles o
    CyclesContext.Provider. CyclesContext seria o nome da variavel q criamos */

    /* nesse value, precisamos enviar quais info queremos
    q sejam compartilhadas entre todos os componentes q estao dentro
    do provider.  Passamos um obj com todas as infos q queremos enviar */
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <NewCycleForm />
      <CountDown />
    </CyclesContext.Provider>
  )
}
