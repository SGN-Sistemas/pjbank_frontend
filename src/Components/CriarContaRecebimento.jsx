
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

  const [loading, setLoading] = useState(true);
  const [contaRecebimento, setContaRecebimento] = useState(null);
  const [erro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState('')
  const [conta, setConta] = useState('')
  const [agencia, setAgencia] = useState('')
  const [banco, setBanco] = useState('')

  const criarContaRecebimento = (e) => {

    e.preventDefault();

    var config = {
      method: 'POST',
      url: `${process.env.REACT_APP_PRE_URL_API}/conta_recebimento?empresa=${empresa_cod}`,
      data: {"conta_repasse": conta, "agencia_repasse": agencia, "banco_repasse": banco}
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
                setContaRecebimento(response.data);
            }

            setLoading(false);

      })
      .catch(function (error) {
            console.log("Problema ao tentar criar uma nova conta digital!\n");
            console.log(error);
            
      });

  }

  function handleSubmit(e){
    alert('Um nome foi enviado: ' + conta);
    e.preventDefault();
  }

  useEffect(() => {

    //criarContaRecebimento();
    console.log(conta)

  }, [conta]);

  return (
    <div className="App">

        <form className='formulario' onSubmit={criarContaRecebimento}>

            <h1 className='titulo_form'>Dados da conta repasse</h1>

            <label className='labels'>
                Conta:
            </label>
            <input className='inputs' type="text" value={conta} onChange={(e) => setConta(e.target.value)} placeholder="Conta bancária, com dígito. Formato: 99999-9, 9999-99. (4-32 dígitos)" />

            <label className='labels'>
                Agência:
            </label>
            <input className='inputs' type="text" value={agencia} onChange={(e) => setAgencia(e.target.value)} placeholder="Agência, com ou sem dígito, dependendo do banco. Formato: 99999, 9999-9. (2-6 dígitos)" />

            <label className='labels'>
                Banco:
            </label>
            <input className='inputs' type="text" value={banco} onChange={(e) => setBanco(e.target.value)} placeholder="Número do banco, com 3 dígitos. (3 dígitos), exemplo= 033" />

            <input className='btn_formulario' type="submit" value="Enviar" />
      </form>

      {
        contaRecebimento && !erro &&
        <div className="container">

            <div className='containerInterno'>

                <h2 className="titulo">Credenciais da conta digital PJBANK</h2>

                <p> <span className="label">Credencial:</span> {contaRecebimento.credencial} </p>
                <p> <span className="label">Chave:</span> {contaRecebimento.chave} </p>
                <p> <span className="label">Chave do webhook:</span> {contaRecebimento.webhook_chave} </p>
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