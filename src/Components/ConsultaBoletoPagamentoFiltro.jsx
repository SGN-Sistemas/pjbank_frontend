
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';
import Falha from '../img/falha.webp';
import Sucesso from '../img/sucesso.webp';

function ConsultaBoletoPagamentoFiltro() {

  const [loading, setLoading] = useState(true);
  const [msgVazio, setMsgVazio] = useState(false);
  const [dadosBoletos, setDadosBoletos] = useState(null);
  const [msgErro, setMsgErro] = useState('');

  let params = useParams();

  let empresa = params.empresa;
  let data_inicio = params.data_inicio;
  let data_fim = params.data_fim;
  let status = params.status;

  const consultaPagamentoBoletoFiltro = (data_inicio, data_fim, status , empresa) => {

    var config = {
      method: 'GET',
      url: `http://sgnsistemas.ddns.net:5988/boleto/pagamentos/filtros?data_inicio=${data_inicio}&data_fim=${data_fim}&status=${status}&empresa=${empresa}`
    };

    axios(config)
      .then(function (response) {

          console.log(response.data);

          if(response.data.length > 0){

            setDadosBoletos(response.data);

          }else{

            setMsgVazio(true);
            setMsgErro('Sem pagamentos registratos neste intervalo!');
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

    consultaPagamentoBoletoFiltro(data_inicio, data_fim, status, empresa);

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

                {dadosBoletos.map((item) => {
                        <div>
                            <p> <pan>ID operação: {item.id_operacao}</pan> </p>
                            <p> <pan>Identificador: {item.identificador}</pan> </p>
                            <p> <pan>Vencimento: {item.data_vencimento}</pan> </p>
                            <p> <pan>Agendamento: {item.data_agendamento}</pan> </p>
                            <p> <pan>Pagamento: {item.data_pagamento}</pan> </p>
                            <p> <pan>Valor: {item.valor}</pan> </p>
                            <p> <pan>Descrição: {item.descricao}</pan> </p>
                            <p> <pan>Favorecido: {item.nome_favorecido}</pan> </p>
                        </div>
                })}

           </div>
        </div>
        
      }

      {
        msgVazio &&
        <div className="container">
            <h2 className="titulo">Informações do boleto</h2>

            <h4>{msgErro}</h4>
            <img src={Falha} className="imagem"/>
        </div>
      }

    </div>
  );
}

export default ConsultaBoletoPagamentoFiltro;