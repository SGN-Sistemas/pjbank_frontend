
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';
import Falha from '../img/falha.webp';
import Sucesso from '../img/sucesso.webp';

function ConsultaBoleto() {

  const [loading, setLoading] = useState(true);
  const [msgVazio, setMsgVazio] = useState(false);
  const [dadosBoletos, setDadosBoletos] = useState(null);
  const [msgErro, setMsgErro] = useState('');

  let params = useParams();

  let empresa = params.empresa;
  let pedido = params.pedido_numero;

  const consultaPagamentoBoleto = (pedido, empresa) => {

    var config = {
      method: 'GET',
      url: `http://sgnsistemas.ddns.net:5988/boleto?pedido=${pedido}&empresa=${empresa}`
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

          setLoading(false);

      })
      .catch(function (error) {
          console.log("Problema ao tentar consultar os boletos!\n");
          console.log(error.response.data.message);
          setMsgVazio(true);
          setMsgErro(error.response.data.message);
          setLoading(false);
      });

  }

  useEffect(() => {

    consultaPagamentoBoleto(pedido, empresa);

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

                <p> <span className="label">Id único:</span> {dadosBoletos[0].id_unico} </p>
                <p> <span className="label">Pagador:</span> {dadosBoletos[0].pagador} </p>
                <p> <span className="label">Status:</span> {dadosBoletos[0].registro_sistema_bancario} </p>
                <p> <span className="label">Boleto:</span> <a href={""+ dadosBoletos[0].link + ""}> {dadosBoletos[0].link} </a> </p>
                <p> <span className="label">Mais informações:</span> <a href={""+ dadosBoletos[0].link_info + ""}> {dadosBoletos[0].link_info} </a> </p>
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

export default ConsultaBoleto;