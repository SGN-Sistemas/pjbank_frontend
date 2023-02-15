
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';
import Falha from '../img/falha.webp';
import Sucesso from '../img/sucesso.webp';

function TransferenciaTedDoc() {

  const [loading, setLoading] = useState(true);
  const [conta, setConta] = useState(null);
  const [erro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState('')

  let params = useParams();

  let empresa = params.empresa;
  let data_vencimento = params.data_vencimento;
  let data_pagamento = params.data_pagamento;
  let valor = params.valor
  let banco_favorecido = params.banco_favorecido;
  let agencia_favorecido = params.agencia_favorecido;
  let conta_favorecido = params.conta_favorecido;
  let cnpj_favorecido = params.cnpj_favorecido;
  let nome_favorecido = params.nome_favorecido;
  let descricao = params.descricao;
  let solicitante = params.solicitante;
  let tipo_conta_favorecido = params.tipo_conta_favorecido;

  let body;

  body.empresa = empresa;
  body.data_vencimento = data_vencimento;
  body.data_pagamento = data_pagamento;
  body.valor = valor;
  body.banco_favorecido = banco_favorecido;
  body.agencia_favorecido = agencia_favorecido;
  body.conta_favorecido = conta_favorecido;
  body.cnpj_favorecido = cnpj_favorecido;
  body.nome_favorecido = nome_favorecido;
  body.descricao = descricao;
  body.solicitante = solicitante;
  body.tipo_conta_favorecido = tipo_conta_favorecido;

  const transferenciaDocTed = (empresa, valor) => {

    var config = {
      method: 'POST',
      url: `${process.env.REACT_APP_PRE_URL_API}/conta/transferencia/doc_ted?empresa=${empresa}`,
      data: body
    };

    axios(config)
      .then(function (response) {

            console.log('deu certo');

            if(response.data.msg){
                setMsgErro(response.data.msg);
                setErro(true);

                console.log(response.data.msg);

            }else{

                setConta(response.data);
                setErro(false)
            }

            setLoading(false);

      })
      .catch(function (error) {

            console.log( 'entrou no catch')
            console.log("Problema ao tentar consultar os dados da conta!\n");
            setLoading(false);
            setErro(true);
            setMsgErro(error.response.data.message);
            console.log(error.response.data);
      });

  }

  useEffect(() => {

    transferenciaDocTed(empresa, valor);

  }, []);

  return (
    <div className="App">

      {
        loading &&
        <DoubleBubble width={"150px"} height={"150px"}></DoubleBubble>
      }

      {
        conta &&
        <div className="container">

            <div className='containerInterno'>

                <h2 className="titulo">Informações da transferência via DOC/TED</h2>

                <p> <span className="label">Status:</span> {conta.status} </p>
                <p> <span className="label">Mensagem:</span> {conta.msg} </p>
                <p> <span className="label">ID da operação:</span> {conta.id_operacao} </p>
                <p> <span className="label">Data pagamento:</span> {conta.data_pagamento} </p>
                <p> <span className="label">Identificador:</span> {conta.identificador} </p>
            
                <div className="containerImagem">
                    <img src={Sucesso} className="imagem" />
                </div>

            </div>

            
        </div>
      }

      {
        erro &&
        <div className="container">
            <p>{erro}</p>
            <h3>{msgErro}</h3>
            <img src={Falha} className="imagem"/>
        </div>
      }

    </div>
  );
}

export default TransferenciaTedDoc;