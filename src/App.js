
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Loading from './Loading/Loading'
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BarLoader, DoubleBubble, SlidingPebbles, DoubleOrbit } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';
import Sucesso from './img/sucesso.webp';
import Falha from './img/falha.webp';

function App() {

  const bol = [{ id: 1, link: 'link1' }, { id: 2, link: 'link2' }];

  const [boletos, setBoletos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emissaoSucesso, setEmissaoSucesso] = useState(false);
  const [emitidos, setEmitidos] = useState(false);

  let params = useParams();

  let parc = params.parcelas.split(',');

  let parc_int = parc.map((item) => parseInt(item));

  const dados = { parcelas: parc_int, cliente_cod: params.id, empresa_cod: params.empresa_id };

  const gerarBoleto = () => {

    var config = {
      method: 'post',
      url: 'http://localhost:7000/boleto',
      data: dados
    };

    axios(config)
      .then(function (response) {

        console.log(response.data)
        if (response.data == 'Existem parcelas que já foram emitidas!') {
          setEmitidos(true);
        }

        console.log(response.data)
      
        if (response.data.boleto){
            setBoletos([...response.data.boleto]);
            setEmissaoSucesso(true);
        }
          

          setLoading(false);

          console.log(boletos);

      })
      .catch(function (error) {
        console.log("Problema ao tentar gerar os boletos!\n");
        console.log(error);
      });
  }


  useEffect(() => {

    gerarBoleto();

  }, [])

  return (
    <div className="App">

      {
        !loading && 
        <div>
            <h2>Boletos gerados</h2>
        </div>
      }

        <ul className='listaBoletos'>
          {boletos.map((boleto) =>
              
                <li key={boleto.id} > <span className='label'> Boleto {boleto.id}: </span> <a href={"" + boleto.link + ""}> {boleto.link} </a> </li>
          )}

            {
              emissaoSucesso &&
              <div className="containerImagem" style={{marginTop: 10}}>
                    <img src={Sucesso} className="imagem" />
              </div> 
            }
        </ul>

      {
        loading &&
        <DoubleBubble width={"150px"} height={"150px"}></DoubleBubble>
      }

      {
        emitidos &&
        <div className='container'>
          <div className='containerInterno'>
              <h2>Existem parcelas que já foram emitidas!</h2>
              <div className="containerImagem">
                <img className="imagem" src={Falha} />
              </div>
          </div>
        </div> 
  
       
      }

    </div>
  );
}

export default App;