import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

import { LayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      {/* da q pra baixo vai ser o codigo q vai mudar entre as paginas */}
      {/* se estivermos na home vai mostrar o conteudo da home, e assim pra history */}

      {/* o outlet é um espaço para ser inserido um conteudo q quando o reactrouterdom
      estiver utilizando esse layout, com o outlet, ele vai saber exatamente a
      onde ele tem q posicionar o conteudo q é especifico de uma pagina */}
      <Outlet />
    </LayoutContainer>
  )
}
