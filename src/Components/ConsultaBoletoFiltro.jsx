
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
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

  const consultaPagamentoBoleto = (data_inicio, data_fim, pago, empresa) => {

    var config = {
      method: 'GET',
      url: `http://localhost:7000/boleto/filtros?data_inicio=${data_inicio}&data_fim=${data_fim}&pago=${pago}&empresa=${empresa}`
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

    consultaPagamentoBoleto(data_inicio, data_fim, pago, empresa);

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
                        <p> <span className="label">Id único:</span> {parcela.id_unico} </p>
                        <p> <span className="label">Pagador:</span> {parcela.pagador} </p>
                        <p> <span className="label">Vencimento:</span> {parcela.data_vencimento} </p>
                        <p> <span className="label">Status:</span> {parcela.registro_sistema_bancario} </p>
                        <p> <span className="label">Grupo de boletos:</span> <a href={""+ parcela.linkGrupo + ""}> {parcela.linkGrupo} </a> </p>
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