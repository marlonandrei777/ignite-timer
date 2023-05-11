// importamos a funcao createGlobalStyle
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme["green-500"]};
    }

    body {
        background: ${(props) => props.theme["gray-900"]};
        color: ${(props) => props.theme["gray-300"]};
        -webkit-font-smoothing: antialiased;
    }

    /* por padrao esses elementos nao erdam a font do body por isso q definimos eles */
    body, input, textarea, button {
      font: 400 1rem "Roboto", sans-serif;
    } 

    button {
      cursor: pointer;
    }
`;
