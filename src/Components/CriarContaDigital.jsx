
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';
import Falha from '../img/falha.webp';
import Sucesso from '../img/sucesso.webp';

function CriarContaDigital() {

  let params = useParams();

  let empresa_cod = params.empresa;

  const [loading, setLoading] = useState(true);
  const [conta, setConta] = useState(null);
  const [erro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState('')

  const criarContaDigital = () => {

    var config = {
      method: 'POST',
      url: `${process.env.REACT_APP_PRE_URL_API}/conta?empresa=${empresa_cod}`
    };

    axios(config)
      .then(function (response) {

            if(response.data.erro){
                setErro(true);
                setMsgErro(response.data.erro.msg);
                console.log(response.data.erro.msg);

            }else{
                console.log('else')
                console.log(response.data);
                setConta(response.data);
            }

            setLoading(false);

      })
      .catch(function (error) {
            console.log("Problema ao tentar criar uma nova conta digital!\n");
            console.log(error);
            
      });

  }

  useEffect(() => {

    criarContaDigital();

  }, []);

  return (
    <div className="App">

      {
        loading &&
        <DoubleBubble width={"150px"} height={"150px"}></DoubleBubble>
      }

      {
        conta && !erro &&
        <div className="container">

            <div className='containerInterno'>

                <h2 className="titulo">Credenciais da conta digital PJBANK</h2>

                <p> <span className="label">Credencial:</span> {conta.credencial} </p>
                <p> <span className="label">Chave:</span> {conta.chave} </p>
                <p> <span className="label">Chave do webhook:</span> {conta.webhook_chave} </p>
                <div className="containerImagem">
                    <img src={Sucesso} className="imagem" />
                </div>

            </div>

            
        </div>
      }

      {
        erro &&
        <div className="container">
            <div className='containerInterno'>
                <h3 className='titulo'>{msgErro}</h3>
                <div className="containerImagem">
                    <img src={Falha} className="imagem"/>
                </div>
            </div>
        </div>
      }

    </div>
  );
}

export default CriarContaDigital;