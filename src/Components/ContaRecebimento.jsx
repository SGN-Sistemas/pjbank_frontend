
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading.jsx';
import { useParams } from "react-router-dom";
import {DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import '../Styles/Boleto.css';
import Falha from '../img/falha.webp';
import Sucesso from '../img/sucesso.webp';

function ContaRecebimento() {

  const [loading, setLoading] = useState(true);
  const [conta, setConta] = useState(null);
  const [erro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState('')

  let params = useParams();

  let empresa = params.empresa;

  const infoContaRecebimento = (empresa) => {

    var config = {
      method: 'GET',
      url: `${process.env.REACT_APP_PRE_URL_API}/conta_recebimento?empresa=${empresa}`
    };

    axios(config)
      .then(function (response) {

        if(response.data.erro){

            setLoading(false);
            setErro(true);
            setMsgErro(response.data.erro.msg);

        }else{

            console.log(response.data);
     
            setConta(response.data);
            setErro(false)
     
            setLoading(false);
        }
    
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

    infoContaRecebimento(empresa);

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

                <p> <span className="label">Empresa:</span> {conta.nome_empresa} </p>
                <p> <span className="label">CNPJ:</span> {conta.cnpj} </p>
                <p> <span className="label">E-mail:</span> {conta.email} </p>
                <p> <span className="label">Agência:</span>  {conta.agencia} </p>
                <p> <span className="label">Conta:</span>  {conta.conta} </p>
                <p> <span className="label">Banco:</span>  {conta.banco} </p>
                <p> <span className="label">Telefone:</span>  {conta.telefone} </p>
                <p> <span className="label">Status:</span>  {conta.status} </p>
                <p> <span className="label">Mensagem do status:</span>  {conta.msg_status_documentacao}  </p>
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

export default ContaRecebimento;