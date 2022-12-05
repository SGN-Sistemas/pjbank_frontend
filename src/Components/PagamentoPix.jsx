
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';
import Falha from '../img/falha.webp';
import Sucesso from '../img/sucesso.webp';

function PagamentoPix() {

  const [loading, setLoading] = useState(true);
  const [msgVazio, setMsgVazio] = useState(false);
  const [dadosPix, setDadosPix] = useState(null);
  const [msgErro, setMsgErro] = useState('');

  let params = useParams();

  let empresa = params.empresa;
  let favorecido = params.nome_favorecido;
  let cnpj_favorecido = params.cnpj_favorecido;
  let valor = params.valor;
  let vencimento = params.vencimento;
  let data_pagamento = params.data_pagamento;

  const pagamentoPix = () => {

    let info = {
        "empresa": empresa,
        "favorecido": favorecido,
        "cnpj_favorecido": cnpj_favorecido,
        "valor": valor,
        "data_vencimento": vencimento,
        "data_pagamento": data_pagamento
    };

    var config = {
      method: 'POST',
      url: `http://sgnsistemas.ddns.net:5988/pix/pagamento`,
      data: info
    };

    axios(config)
      .then(function (response) {

          console.log(response.data)

             if(response.data.status){

                if(response.data.status != '403')
                    setDadosPix(response.data);
    
              }else{
    
                setMsgVazio(true);
                setMsgErro(response.data.msg);
              }
    
          
          console.log(dadosPix);

          setLoading(false);

      })
      .catch(function (error) {
        console.log("Problema ao tentar consultar os boletos!\n");
        console.log(error);
      });

  }

  useEffect(() => {

    pagamentoPix();

  }, []);

  return (
    <div className="App">

      {
        loading &&
        <DoubleBubble width={"150px"} height={"150px"}></DoubleBubble>
      }

      {
        dadosPix &&
        <div className="container">
           <div className='containerInterno'>
                <h2 className="titulo">Informações da transação</h2>

                <p> <span className="label">Status:</span> {dadosPix[0].status} </p>
                <p> <span className="label">Mensagem:</span> {dadosPix[0].msg} </p>
                <p> <span className="label">ID da operação:</span> {dadosPix[0].id_operacao} </p>
                <p> <span className="label">Data pagamento:</span> {dadosPix[0].data_pagamento} </p>
                <div className="containerImagem">
                    <img src={Sucesso} className="imagem" />
                </div>
           </div>
        </div>
        
      }

      {
        msgVazio &&
        <div className="container">
            <h2 className="titulo">Informações da transação!</h2>

            <h4>{msgErro}</h4>
            <img src={Falha} className="imagem"/>
        </div>
      }

    </div>
  );
}

export default PagamentoPix;