
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';

function ConsultaBoleto() {

  const [loading, setLoading] = useState(true);
  const [emitidos, setEmitidos] = useState(false);
  const [dadosBoletos, setDadosBoletos] = useState(null);

  let params = useParams();

  let empresa = params.empresa;
  let pedido = params.pedido_numero;

  const consultaPagamentoBoleto = (pedido, empresa) => {

    var config = {
      method: 'GET',
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
        console.log("Problema ao tentar consultar os boletos!\n");
        console.log(error);
      });

  }

  useEffect(() => {

    consultaPagamentoBoleto(pedido, empresa);

  }, []);

  return (
    <div className="App">

      {loading && <Loading />}

      {
        loading &&
        <DoubleBubble width={"150px"} height={"150px"}></DoubleBubble>
      }

      {
        dadosBoletos &&
        <div className="container">
            <h2 className="titulo">Informações do boleto</h2>

            <p> <span className="label">Id único:</span> {dadosBoletos[0].id_unico} </p>
            <p> <span className="label">Pagador:</span> {dadosBoletos[0].pagador} </p>
            <p> <span className="label">Status:</span> {dadosBoletos[0].registro_sistema_bancario} </p>
            <p> <span className="label">Boleto:</span> <a href={""+ dadosBoletos[0].link + ""}> {dadosBoletos[0].link} </a> </p>
            <p> <span className="label">Mais informações:</span> <a href={""+ dadosBoletos[0].link_info + ""}> {dadosBoletos[0].link_info} </a> </p>
        </div>
      }

      {
        emitidos ? <div><h2>Existem parcelas que já foram emitidas!</h2></div> : ''
      }

    </div>
  );
}

export default ConsultaBoleto;