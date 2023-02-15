
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';
import Falha from '../img/falha.webp';
import Sucesso from '../img/sucesso.webp';

function ConsultaBoletoFiltro() {

  const [loading, setLoading] = useState(true);
  const [msgVazio, setMsgVazio] = useState(false);
  const [dadosBoletos, setDadosBoletos] = useState(null);
  const [msgErro, setMsgErro] = useState('');

  let params = useParams();

  let empresa = params.empresa;
  let data_inicio = params.data_inicio;
  let data_fim = params.data_fim;
  let pago = params.pago;

  const consultaRecebimentoBoleto = (data_inicio, data_fim, pago, empresa) => {

    var config = {
      method: 'GET',
      url: `${process.env.REACT_APP_PRE_URL_API}/boleto/filtros?data_inicio=${data_inicio}&data_fim=${data_fim}&pago=${pago}&empresa=${empresa}`
    };

    axios(config)
      .then(function (response) {

          console.log(response.data)

          if(response.data.length > 0){

            setDadosBoletos(response.data);

          }else{

            setMsgVazio(true);
            setMsgErro(response.data.erro);
          }
          
          console.log(dadosBoletos);
          setLoading(false);

      })
      .catch(function (error) {
        console.log("Problema ao tentar consultar os boletos!\n");
        console.log(error);
      });

  }

  useEffect(() => {

    consultaRecebimentoBoleto(data_inicio, data_fim, pago, empresa);

  }, []);

  return (
    <div className="App">

      {
        loading &&
        <DoubleBubble width={"150px"} height={"150px"}></DoubleBubble>
      }

      {
        dadosBoletos &&
        <div className="container">
           <div className='containerInternoParcela'>
            
                <h2 className="titulo">Informações do boleto</h2>

                {dadosBoletos.map(parcela => 
                    <div key={parcela.id_unico} className="containerParcela">
                        <div class="areaCard">
                              <p> <span className="label">Id único:</span> {parcela.id_unico} </p>
                              <p> <span className="label">Número do pedido:</span> {parcela.pedido_numero} </p>
                              <p> <span className="label">Pagador:</span> {parcela.pagador} </p>
                        </div>
                        <div class="areaCard">
                              <p> <span className="label">Vencimento:</span> {parcela.data_vencimento ? parcela.data_vencimento : 'XX/XX/XXXX'} </p>
                              <p> <span className="label">Data do pagamento:</span> {parcela.data_pagamento ? parcela.data_pagamento : 'XX/XX/XXXX'} </p>
                              <p> <span className="label">Data de crédito:</span> {parcela.data_credito ? parcela.data_credito : 'XX/XX/XXXX'} </p>
                        </div>

                        <div class="areaCard">
                              <p> <span className="label">Valor:</span> {parcela.valor ? parcela.valor : 0.0} </p>
                              <p> <span className="label">Valor Pago:</span> {parcela.valor_pago ? parcela.valor_pago : 0.0} </p>
                              <p> <span className="label">Valor liquido:</span> {parcela.valor_liquido ? parcela.valor_liquido : 0.0}</p>
                              <p> <span className="label">Status:</span> {parcela.registro_sistema_bancario} </p>
                        </div>
                        
                        <div class="areaCard">
                              <p> <span className="label">Grupo de boletos:</span> <a href={""+ parcela.linkGrupo + ""}> {parcela.linkGrupo} </a> </p>
                        </div>
                      
                        <div className="containerImagem">
                            <img src={Sucesso} className="imagem" />
                        </div>

                    </div>
                )}

           </div>
        </div>
        
      }

      {
        msgVazio &&
        <div className="container">
            <h2 className="titulo">Informações do boleto</h2>

            <h4>{msgErro}   '''</h4>
            <img src={Falha} className="imagem"/>
        </div>
      }

    </div>
  );
}

export default ConsultaBoletoFiltro;