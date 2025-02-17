import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/login/page.tsx';
import MenuLayout from './pages/menu/menuLayout.tsx';
import Home from './pages/home/home.tsx';
import ProximosTrabalhos from './pages/resumos/proximos-trabalhos.tsx';
import Trabalho from './pages/tabelas/trabalho.tsx';
import CriarTrabalho from './pages/tabelas/criarTrabalho.tsx';
import MeusTrabalhos from './pages/resumos/meus-trabalhos.tsx';
import ProximasParcelas from './pages/resumos/proximas-parcelas.tsx';
import TodosTrabalhos from './pages/tabelas/todos-trabalhos.tsx';
import TodosClientes from './pages/tabelas/todos-clientes.tsx';
import CriarCliente from './pages/tabelas/criarCliente.tsx';
import Cliente from './pages/tabelas/cliente.tsx';
import EmConstrucao from './pages/outros/em-construcao.tsx';
import NaoAutorizado from './pages/outros/nao-autorizado.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MenuLayout />
          </ProtectedRoute>
        }
      >
        {/* Sub-rotas */}
        <Route index element={<MeusTrabalhos />}/>
        <Route path="/proximas-entregas" element={<ProximosTrabalhos />} />
        <Route path="/proximos-pagamentos" element={<ProximasParcelas />} />
        <Route path="/trabalho/:id" element={<Trabalho />} /> 
        <Route path="/cliente/:id" element={<Cliente />} /> 
        <Route path="/criar-trabalho" element={<CriarTrabalho />} /> 
        <Route path="/criar-cliente" element={<CriarCliente />} /> 
        <Route path="/todos-trabalhos" element={<TodosTrabalhos />} /> 
        <Route path="/todos-clientes" element={<TodosClientes />} />
        <Route path="/nao-autorizado" element={<NaoAutorizado />} />
        <Route path="/em-construcao" element={<EmConstrucao />} />

      </Route>
    </Routes>
  </BrowserRouter>
);
