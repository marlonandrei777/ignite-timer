import { FormContainer, MinutesAmounthImput, TaskInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

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
        min={5} // vai definir o contadosetado em 5, sendo o seu valor minimo tbm
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
