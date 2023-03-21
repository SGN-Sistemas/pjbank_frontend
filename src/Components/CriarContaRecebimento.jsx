
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';
import Falha from '../img/falha.webp';
import Sucesso from '../img/sucesso.webp';

function CriarContaRecebimento() {

  let params = useParams();

  let empresa_cod = params.empresa;
  let cobr_cod = params.cobr_cod;

  const [loading, setLoading] = useState(true);
  const [contaRecebimento, setContaRecebimento] = useState(null);
  const [erro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const [conta, setConta] = useState('');
  const [agencia, setAgencia] = useState('');
  const [banco, setBanco] = useState('');

  const criarContaRecebimento = () => {

    var config = {
      method: 'POST',
      url: `${process.env.REACT_APP_PRE_URL_API}/conta_recebimento?empresa=${empresa_cod}&cobr_cod=${cobr_cod}`
    };

    axios(config)
      .then(function (response) {

            console.log(response)

            if(response.data.erro){
      
                setErro(true);
                setMsgErro(response.data.erro.msg);
                console.log(response.data.erro.msg);

            }else if(response.data){
            
              setErro(true);
              setMsgErro(response.data);

            }else{
                console.log(response)
                console.log('else')
                console.log(response.data);
                setContaRecebimento(response.data);
            }

            setLoading(false);

      })
      .catch(function (error) {

            console.log(error);

            setErro(true);
            setMsgErro("Problema ao tentar criar uma nova conta digital!");
            //console.log("Problema ao tentar criar uma nova conta digital!\n");
            
      });

  }

  useEffect(() => {

    criarContaRecebimento();
    //console.log(conta)

  }, [conta]);

  return (
    <div className="App">

      {
        contaRecebimento && !erro &&
        <div className="container">

                <div className='containerInterno'>

                <h2 className="titulo">Informações da credencial da conta digital PJBANK</h2>

                <p> <span className="label">Status:</span>  {conta.status} </p>
                <p> <span className="label">Mensagem:</span> {conta.msg} </p>
                <p> <span className="label">Credencial:</span> {conta.credencial} </p>
                <p> <span className="label">Chave:</span>  {conta.chave} </p>
                <p> <span className="label">Chave webhook:</span>  {conta.chave_webhook} </p>
                <p> <span className="label">Conta virtual:</span>  {conta.conta_virtual} </p>
                <p> <span className="label">Agência virtual:</span>  {conta.agencia_virtual} </p>

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

export default CriarContaRecebimento;