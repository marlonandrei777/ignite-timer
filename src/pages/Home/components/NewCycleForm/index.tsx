import { useFormAction } from 'react-hook-form'
import { FormContainer, MinutesAmounthImput, TaskInput } from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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

export function NewCycleForm() {
  /* passamos para o useFrom o objeto de configuracoes */
  const { register, handleSubmit, watch, reset } =
    useFormAction<NewCycleFromData>({
      /* passamos para dentro de zod zodResolver, qual é o schema de validacao,
    ou seja, de q forma queremos validar os dados q temos nos inputs,
    as regras de validação */
      resolver: zodResolver(newCyrcleFormValidateionSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle} /* !! converte pra booleam */
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
        disabled={!!activeCycle}
        step={5} // vai pulando o contado de 5 em 5
        min={1} // vai definir o contadosetado em 5, sendo o seu valor minimo tbm
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
