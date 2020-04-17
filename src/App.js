import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 1rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 20px;
  margin-top: 20px;
  
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  //State para las monedas y criptomonedas
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);
  
  //useEffect para la moneda y criptomoneda seleccionada
  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      //Evitamos la ejecución la primera vez
      if(moneda === '') return;

      //Consultar la Api para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      //Mostrar el spinner
      guardarCargando(true);
      
      //Ocultar el spinner y mostrar el resultado
      setTimeout(() => {

        //Cambiar el estado del spinner
        guardarCargando(false);

        //Guardar cotización
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      },3000);
      
    }
    cotizarCriptomoneda();

  },[moneda, criptomoneda]);

  //Mostrar spinner o resúltado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Imagen Cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
