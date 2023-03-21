
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import Sucesso from '../img/sucesso.webp';
import Falha from '../img/falha.webp';
import { DoubleBubble} from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';

function InfoCriptografado() {

  const [resposta, setResposta] = useState(true);
  const [loading, setLoading] = useState(true);
  const [msgErro, setMsgErro] = useState('');
  const [erros, setErros] = useState(false);

  let params = useParams();
   
  useEffect(() => {

    let empresa = params.empresa;
    let repasse_cod = params.repasse_cod;
  
    var config = {

        method: 'POST',
        url: `${process.env.REACT_APP_PRE_URL_API}/conta_recebimento?empresa=${empresa}&repasse_cod=${repasse_cod}`
    };

    axios(config)
        .then(function (response) {

              setLoading(false);
              
              if(response.data.msg){

                console.log(response.data.msg)
                setErros(true);
                setMsgErro(response.data.msg);

              }else{

                console.log(response)
                setResposta(response)
              }
  
     })
    .catch(function (error) {

              setLoading(false);

              setErros(true);
              setMsgErro(error.response.data.message);
    });


  }, []);

  return (
    <div className="App">
        
        <h2>{resposta}</h2>

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
  );
}

export default InfoCriptografado;