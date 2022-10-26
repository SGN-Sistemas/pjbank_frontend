
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';

function InvalidarBoleto() {

  const [loading, setLoading] = useState(true);
  const [emitidos, setEmitidos] = useState(false);
  const [dadosBoletos, setDadosBoletos] = useState(null);

  let params = useParams();

  let empresa = params.empresa;
  let pedido = params.pedido_numero;

  const invalidarBoleto = (pedido, empresa) => {

    var config = {
      method: 'DELETE',
      url: `http://localhost:7000/boleto?pedido=${pedido}&empresa=${empresa}`
    };

    axios(config)
      .then(function (response) {

          console.log(response.data)
          setDadosBoletos(response.data);
          console.log(dadosBoletos);

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

      {loading && <Loading mensagem="Inválidando boleto" />}

      {
        loading &&
        <DoubleBubble width={"150px"} height={"150px"}></DoubleBubble>
      }

      {
        dadosBoletos &&
        <div className="container">
            <h2 className="titulo">Informações do boleto</h2>

            <p> <span className="label">Mensagem:</span> {dadosBoletos.msg} </p>
            <p> <span className="label">Status:</span> {dadosBoletos.status} </p>
   
        </div>
      }

    </div>
  );
}

export default InvalidarBoleto;