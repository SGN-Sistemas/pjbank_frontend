
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';
import Falha from '../img/falha.webp';
import Sucesso from '../img/sucesso.webp';

function AddSaldoContaDigital() {

  const [loading, setLoading] = useState(true);
  const [conta, setConta] = useState(null);
  const [erro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState('')

  let params = useParams();

  let empresa = params.empresa;
  let valor = params.valor;

  const addContaDigital = (empresa, valor) => {

    var config = {
      method: 'POST',
      url: `${process.env.REACT_APP_PRE_URL_API}/conta/add_saldo?empresa=${empresa}&valor=${valor}`
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

    addContaDigital(empresa, valor);

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

                <h2 className="titulo">Informações da conta digital PJBANK</h2>

                <p> <span className="label">Id único:</span> {conta.id_unico} </p>
                <p> <span className="label">Boleto:</span> {conta.link_boleto} </p>
                <p> <span className="label">E-mail:</span> {conta.linha_digitavel} </p>
            
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

export default AddSaldoContaDigital;