import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

/* estamos guardando as propriedades de dentro do defaulttheme,
dentro da variavel ThemeType */
type ThemeType = typeof defaultTheme

// to criando uma tipagem pro module styledComponent
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
