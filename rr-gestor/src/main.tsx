import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/login/page.tsx';
import MenuLayout from './pages/menu/menuLayout.tsx';
import Home from './pages/home/home.tsx';
import ProximosTrabalhos from './pages/resumos/proximos-trabalhos.tsx';
import Trabalho from './pages/tabelas/trabalho.tsx';

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
        <Route index element={<Home />}/>
        <Route path="/proximas-entregas" element={<ProximosTrabalhos />} />
        <Route path="/trabalho/:id" element={<Trabalho />} /> 
      </Route>
    </Routes>
  </BrowserRouter>
);
