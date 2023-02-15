
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';
import Falha from '../img/falha.webp';
import Sucesso from '../img/sucesso.webp';

function InvalidarBoleto() {

  const [loading, setLoading] = useState(true);
  const [emitidos, setEmitidos] = useState(false);
  const [dadosBoletos, setDadosBoletos] = useState(null);
  const [erro, setErro] = useState(false);

  let params = useParams();

  let empresa = params.empresa;
  let pedido = params.pedido_numero;

  const invalidarBoleto = (pedido, empresa) => {

    var config = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_PRE_URL_API}/boleto?pedido=${pedido}&empresa=${empresa}`
    };

    axios(config)
      .then(function (response) {

          console.log(response.data)
          setDadosBoletos(response.data);
          console.log(dadosBoletos);

          if(response.data.status == "404"){
            setErro(true);
          }

          setLoading(false);

      })
      .catch(function (error) {
        console.log("Problema ao tentar inválidar o boleto!\n");
        console.log(error);
      });

  }

  useEffect(() => {

    invalidarBoleto(pedido, empresa);

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

                <p> <span className="label">Mensagem:</span> {dadosBoletos.msg} </p>
                <p> <span className="label">Status:</span> {dadosBoletos.status} </p>

                {
                    (erro) ?
                    <div className="containerImagem">
                        <img src={Falha} className="imagem" />
                    </div>
                    :
                    <div className="containerImagem">
                        <img src={Sucesso} className="imagem" />
                    </div>
                }
            </div>
        </div>
      }

    </div>
  );
}

export default InvalidarBoleto;