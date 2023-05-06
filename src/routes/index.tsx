import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { History } from '../pages/History'
import { DefaultLayout } from '../layouts/DefaultLayout'

export function Router() {
  return (
    /* precisamos do componente BrowserRouter por volta de tudo */
    /* Esses componentes q ficam em volta de oltros componentes e nao produzem
    nada em tela e nao tem um visual ou interface, ssao chamados de CONTEXT PROVIDERS.
    Componentes q nao tem efeito nenhum visual, mas produzem um contexto pros
    componentes q estao dentro dele, ou seja, informacoes pros componentes 
    q estao dentro deles saberem do contexto de fora, assim obtendo informaçoes
    de fora */
    <BrowserRouter>
      {/* precisamos do componente Routes por volta de tudo */}
      <Routes>
        {/* para cada pagina da nossa app nos teremos uma rota <Route /> */}
        {/* recebe como propriedade o path q é qual endereço q a pessoa estara acessando */}
        {/* como é a pagina home, dentro de path colocamos uma barra */}
        {/* e o elemento q vai carregar (element), o componente q vai carregar quando
      estiver no caminho "/" é a home */}
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
