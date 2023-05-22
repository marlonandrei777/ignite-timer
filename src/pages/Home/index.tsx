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

/* schema de validacao. validar os dados do form baseado no formato a baixo */
const newCyrcleFormValidateionSchema = zod.object({
  /* task vai ser uma string onde vai ter no minimo 1 caracter, e se n tiver
  vamos colocar um alerta "Informe a Tarefa" */
  task: zod.string().min(1, 'Informe a Tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type NewCycleFromData = {
  task: string
  minutesAmount: number
}

export function Home() {
  /* passamos para o useFrom o objeto de configuracoes */
  const { register, handleSubmit, watch } = useForm<NewCycleFromData>({
    /* passamos para dentro de zod zodResolver, qual é o schema de validacao,
    ou seja, de q forma queremos validar os dados q temos nos inputs,
    as regras de validação */
    resolver: zodResolver(newCyrcleFormValidateionSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  /* data: dados dos nossos inputs do formulario */
  function handleCreateNewCicle(data: any) {
    console.log(data)
  }

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
