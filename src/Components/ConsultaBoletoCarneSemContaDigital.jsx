
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';
import Falha from '../img/falha.webp';
import Sucesso from '../img/sucesso.webp';

function ConsultaBoletoCarneSemContaDigital() {

  const [loading, setLoading] = useState(true);
  const [msgVazio, setMsgVazio] = useState(false);
  const [dadosBoletos, setDadosBoletos] = useState(null);
  const [msgErro, setMsgErro] = useState('');

  let params = useParams();

  let empresa = params.empresa;
  let pedido = params.pedido;

  const consultaPagamentoBoletoCarneSemContaDigital = (pedido, empresa) => {

    var config = {
      method: 'POST',
      url: `${process.env.REACT_APP_PRE_URL_API}/boleto_recebimento/carne?pedido=${pedido}&empresa=${empresa}`
    };

    axios(config)
      .then(function (response) {

          console.log(response.data)

          if(response.data.erro){

            setMsgVazio(true);
            setMsgErro(response.data.erro);

          }else{

            setDadosBoletos(response.data);

          }

          setLoading(false);

      })
      .catch(function (error) {
        console.log("Problema ao tentar consultar os boletos!\n");
        console.log(error);
      });

  }

  useEffect(() => {

    consultaPagamentoBoletoCarneSemContaDigital(pedido, empresa);

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
           <div className='containerInterno'>
                <h2 className="titulo">Informações do boleto</h2>

                <p> <span className="label">Status:</span> {dadosBoletos.status} </p>
                <p> <span className="label">Boleto:</span> <a href={""+ dadosBoletos.linkBoleto + ""}> {dadosBoletos.linkBoleto} </a> </p>
                <div className="containerImagem">
                    <img src={Sucesso} className="imagem" />
                </div>
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

export default ConsultaBoletoCarneSemContaDigital;