import { useContext } from 'react'
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
import { CyclesContext } from '../../contexts/CyclesContext'

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
  const { activeCycle, createNewCicle, interruptCurrentCycle } =
    useContext(CyclesContext)

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

  const { handleSubmit, watch /* reset */ } = newCycleForm

  /* observando o campo de task */
  const task = watch('task')
  // variavel auxiliar p facilitar quem ta lendo o codigo
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCicle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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
