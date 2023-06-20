import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (inicialState) => {
      // pegando os dados salvos no storage
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      /* quando nao tiver nada no storage, retorna o reducer vazio
      ou seja retorna o valor do segundo parametro  como valor inicial
      pro reducer */
      return inicialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  // salvando os dados no storage
  useEffect(() => {
    /* o local storage so suporta q salve textos, entao vaos converter
    o estado usando o stringfy */
    const stateJSON = JSON.stringify(cyclesState)

    // vamos dar um nome e setar o valor
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsfinished() {
    dispatch(markCurrentCycleAsFinishedAction())
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
    dispatch(addNewCycleAction(newCycle))

    /* padrao de add estado
    Sempre q uma alteracao de estado depender do valor anterior
    usamos o formato de arrow function; */
    /* setCycles((state) => [...state, newCycle]) */
    setAmountSecondsPassed(0)
  }

  // parando o ciclo e colocando a hora do ciclo pausado na variavel interruptedDate
  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
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
