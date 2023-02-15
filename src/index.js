import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ConsultaBoleto from './Components/ConsultaBoleto.jsx';
import InvalidarBoleto from './Components/InvalidarBoleto.jsx';
import ContaDigital from './Components/ContaDigital.jsx';
import ConsultaBoletoLote from './Components/ConsultaBoletoLote.jsx';
import CriarContaDigital from './Components/CriarContaDigital.jsx';
import ConsultaBoletoFiltro from './Components/ConsultaBoletoFiltro.jsx';
import ConsultaBoletoPagamentoFiltro from './Components/ConsultaBoletoPagamentoFiltro.jsx';
import PagamentoPix from './Components/PagamentoPix.jsx';
import GerarBoletoSemContaDigital from './Components/GerarBoletoSemContaDigital.jsx';
import ConsultaBoletoLoteSemContaDigital from './Components/ConsultaBoletoLoteSemContaDigital.jsx';
import AddSaldoContaDigital from './Components/AddSaldoContaDigital.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
     <BrowserRouter>
          <Routes>
              <Route path="boletos/parcelas/:parcelas/email/:email" element={<App />} exact > </Route>
              <Route path="boletos_recebimentos/parcelas/:parcelas/email/:email/forma_pag/:form_pag" element={<GerarBoletoSemContaDigital />} exact > </Route>
              <Route path="conta_pjbank/add_saldo/empresa/:empresa/valor/:valor" element={<AddSaldoContaDigital />} exact > </Route>
              <Route path="boletos/:pedido_numero/empresa/:empresa" element={<ConsultaBoleto />} exact > </Route>
              <Route path="boletos/invalidar/:pedido_numero/empresa/:empresa" element={<InvalidarBoleto />} exact > </Route>
              <Route path="conta_pjbank/empresa/:empresa" element={<ContaDigital />} exact > </Route>
              <Route path="conta_pjbank/criar_conta/empresa/:empresa" element={<CriarContaDigital />} exact > </Route>
              <Route path="boleto/lote/:pedido/empresa/:empresa" element={<ConsultaBoletoLote />} exact > </Route>
              <Route path="boleto_recebimento/lote/:pedido/empresa/:empresa" element={<ConsultaBoletoLoteSemContaDigital />} exact > </Route>
              <Route path="boleto/filtros/data_inicio/:data_inicio/data_fim/:data_fim/pago/:pago/empresa/:empresa" element={<ConsultaBoletoFiltro />} exact > </Route>
              <Route path="boleto/pagamentos/filtros/data_inicio/:data_inicio/data_fim/:data_fim/status/:status/empresa/:empresa" element={<ConsultaBoletoPagamentoFiltro />} exact > </Route>
              <Route path="pagamento/pix/empresa/:empresa/nome_favorecido/:nome_favorecido/cnpj_favorecido/:cnpj/valor/:valor/vencimento/:vencimento/data_pagamento/:pagamento" element={<PagamentoPix />} exact > </Route>
        </Routes>
     </BrowserRouter>
  
)

reportWebVitals();