
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../App.css';
import { useParams, useSearchParams } from "react-router-dom";
import { DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import Sucesso from '../img/sucesso.webp';
import Falha from '../img/falha.webp';

function GerarBoletoSplitRecebimento() {

  const bol = [{ id: 1, link: 'link1' }, { id: 2, link: 'link2' }];

  const [boletos, setBoletos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emissaoSucesso, setEmissaoSucesso] = useState(false);
  const [emitidos, setEmitidos] = useState(false);
  const [erros, setErros] = useState(false);
  const [msgErro, setMsgErro] = useState('');

  let params = useParams();

  let [queryString] = useSearchParams();

  console.log(queryString.get('nomeArq'))
  console.log(queryString.get('tr'))

  let nomeArq = queryString.get('nomeArq');
  let tr = queryString.get('tr');

  let caminho_arq = (queryString.get('path')) ? queryString.get('path').replaceAll('-', '/') : queryString.get('path');

    console.log(caminho_arq);

  let parc = params.parcelas.split('-');

  console.log(parc)

  let parc_int = parc.map((item) => parseInt(item));

  // const dados = { parcelas: parc_int, cliente_cod: params.id, empresa_cod: params.empresa_id, email: params.email, nome_arq: nomeArq, tr: tr, caminho_arq: caminho_arq};

  const dados = { parcelas: parc_int, email: params.email, nome_arq: nomeArq, tr: tr, caminho_arq: caminho_arq};
  const gerarBoleto = () => {

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_PRE_URL_API}/boleto_recebimento/split`,
      data: dados
    };

    axios(config)
      .then(function (response) {

        setLoading(false);

        console.log(response.data);

        if(response.data){

            if (response.data.boleto){
                setBoletos([...response.data.boleto]);
                setEmissaoSucesso(true);
            }else{
                setErros(true);
                setMsgErro(response.data.msg);
            }

        }

      })
      .catch(function (error) {
        setLoading(false);
        console.log("Problema ao tentar gerar os boletos!\n");
        console.log(error);
        setErros(true);
        setMsgErro(error.response.data.message);
        
      })
  }

  useEffect(() => {

    gerarBoleto();

  }, [])

  return (
    <div className="App">

          {
          
          (boletos && !loading && !emitidos && !erros)
          &&
          <div className="containerInterno"> <h2 className="titulo">Boletos gerados</h2>
          <ul className='listaBoletos'>
          {boletos.map((boleto) => 
              
                <li key={boleto.id} > <span className='label'> Boleto {boleto.id}: </span> <a href={"" + boleto.link + ""}> {boleto.link} </a> </li>
          )}
          </ul>
           </div>
          }

          {
              emissaoSucesso &&
              <div className="containerImagem" style={{marginTop: 10}}>
                    <img src={Sucesso} className="imagem" />
              </div> 
          }
        

      {
        loading &&
        <DoubleBubble width={"150px"} height={"150px"}></DoubleBubble>
      }

      {
        erros &&
        <div className='container'>
          <div className='containerInterno'>
              <h2>{msgErro}</h2>
              <div className="containerImagem">
                <img className="imagem" src={Falha} />
              </div>
          </div>
        </div> 
  
      }

    </div>
  )
}

export default GerarBoletoSplitRecebimento;