import { useState, useEffect } from 'react'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmounthImput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { differenceInSeconds } from 'date-fns'

/* schema de validacao. validar os dados do form baseado no formato a baixo */
const newCyrcleFormValidateionSchema = zod.object({
  /* task vai ser uma string onde vai ter no minimo 1 caracter, e se n tiver
  vamos colocar um alerta "Informe a Tarefa" */
  task: zod.string().min(1, 'Informe a Tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

/* tipagem dos inputs do form tirados de dentro do schema do zod */
type NewCycleFromData = zod.infer<typeof newCyrcleFormValidateionSchema>
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  /* passamos para o useFrom o objeto de configuracoes */
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFromData>({
    /* passamos para dentro de zod zodResolver, qual é o schema de validacao,
    ou seja, de q forma queremos validar os dados q temos nos inputs,
    as regras de validação */
    resolver: zodResolver(newCyrcleFormValidateionSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  /* tentar com find */
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // intervalor
  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    /* quando executar o useeffect de novo, vamos fazer algo
    para limpar/resetar o useEfect anterior */
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

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

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // atualizando o titulo da aba da pagina
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  /* observando o campo de task */
  const task = watch('task')
  // variavel auxiliar p facilitar quem ta lendo o codigo
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          {/* lista de sugestoes para um imput */}
          <datalist id="task-suggestions">
            {/* cada sugestao vai ser uma option */}
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmounthImput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5} // vai pulando o contado de 5 em 5
            min={5} // vai definir o contadosetado em 5, sendo o seu valor minimo tbm
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
