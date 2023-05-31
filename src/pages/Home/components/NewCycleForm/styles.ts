import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
  // para quebrar a linha quando a tela for diminuida
  flex-wrap: wrap;
`;

// componente de estilo base onde  os dois coponentes a baixo vao herdar os styles
const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme["gray-100"]};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["green-500"]};
  }

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }

  margin-top: 1px;
`;

export const TaskInput = styled(BaseInput)`
  /* Para ocupar todo o espaço */
  flex: 1;

  // remove a setinha do lado do input q vem por padrao
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmounthImput = styled(BaseInput)`
  width: 4rem;
`;
