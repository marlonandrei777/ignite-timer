import { useState, createContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

// quais sao as infos q vamos armazenar dentro do contexto
interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsfinished: () => void
  setSecondsPassed: (seconds: number) => void
}

// criando do contexto
export const CyclesContext = createContext({} as CycleContextType)

/* schema de validacao. validar os dados do form baseado no formato a baixo */
const newCyrcleFormValidateionSchema = zod.object({
  /* task vai ser uma string onde vai ter no minimo 1 caracter, e se n tiver
  vamos colocar um alerta "Informe a Tarefa" */
  task: zod.string().min(1, 'Informe a Tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

/* tipagem dos inputs do form tirados de dentro do schema do zod */
type NewCycleFromData = zod.infer<typeof newCyrcleFormValidateionSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  /* passamos para o useFrom o objeto de configuracoes */
  const newCycleForm = useForm<NewCycleFromData>({
    /* passamos para dentro de zod zodResolver, qual é o schema de validacao,
    ou seja, de q forma queremos validar os dados q temos nos inputs,
    as regras de validação */
    resolver: zodResolver(newCyrcleFormValidateionSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  /* tentar com find */
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsfinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  /* data: dados dos nossos inputs do formulario */
  function handleCreateNewCicle(data: NewCycleFromData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    /* padrao de add estado
    Sempre q uma alteracao de estado depender do valor anterior
    usamos o formato de arrow function; */
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  // parando o ciclo e colocando a hora do ciclo pausado na variavel interruptedDate
  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  /* observando o campo de task */
  const task = watch('task')
  // variavel auxiliar p facilitar quem ta lendo o codigo
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsfinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <CountDown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
