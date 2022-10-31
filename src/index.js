import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ConsultaBoleto from './Components/ConsultaBoleto';
import InvalidarBoleto from './Components/InvalidarBoleto';
import ContaDigital from './Components/ContaDigital';
import ConsultaBoletoLote from './Components/ConsultaBoletoLote';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
     <BrowserRouter>
          <Routes>
              <Route path="boletos/parcelas/:parcelas/" element={<App />} exact > </Route>
              <Route path="boletos/:pedido_numero/empresa/:empresa" element={<ConsultaBoleto />} exact > </Route>
              <Route path="boletos/:pedido_numero/empresa/:empresa" element={<InvalidarBoleto />} exact > </Route>
              <Route path="conta_pjbank/empresa/:empresa" element={<ContaDigital />} exact > </Route>
              <Route path="boleto/lote/:pedido/empresa/:empresa" element={<ConsultaBoletoLote />} exact > </Route>
        </Routes>
     </BrowserRouter>
  
);

reportWebVitals();
