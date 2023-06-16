import { ReactNode, createContext, useReducer, useState } from 'react'
import { ActionTypes, Cycle, cyclesReducer } from '../reducers/cycles'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

// quais sao as infos q vamos armazenar dentro do contexto
interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsfinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCicle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

// criando do contexto
export const CyclesContext = createContext({} as CycleContextType)

type CylclesContextProviderProps = {
  children: ReactNode
}

// crianco o componente principal
export function CyclesContextProvider({
  children,
}: CylclesContextProviderProps) {
  // agr com o dispatch, vamos disparar a ação
  // cyclesReducer -> funcao onde ta os reducers em uma page separada. cycles.ts
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsfinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        data: activeCycleId,
      },
    })
  }

  /* data: dados dos nossos inputs do formulario */
  function createNewCicle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    /* dentro do dispatch enviamos alguma info q lá dentro do reducer
    consegamos distinguir uama action da outra, ou seja, enviamos um objeto
    enviamos um type e dentro desse type dizemos qual ação queremos realizar */
    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    })

    /* padrao de add estado
    Sempre q uma alteracao de estado depender do valor anterior
    usamos o formato de arrow function; */
    /* setCycles((state) => [...state, newCycle]) */
    setAmountSecondsPassed(0)
  }

  // parando o ciclo e colocando a hora do ciclo pausado na variavel interruptedDate
  function interruptCurrentCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsfinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCicle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
