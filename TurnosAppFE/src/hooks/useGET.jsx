import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const baseURL = "https://67ba591efbe0387ca1372908.mockapi.io/turnos/";

export const useGET = (consult) => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);

  useEffect(() => {
    if (!consult) return;

    const fetchData = async () => {
      setLoading(true);
      const maxRetries = 3;
      let attempt = 0;
      let success = false;

      while (attempt < maxRetries && !success) {
        try {
          const response = await axios.get(`${baseURL}${consult}`);

          if (response.status < 200 || response.status >= 300) {
            throw new Error("Error en la red: " + response.statusText);
          }

          setData(response.data);
          setError(null);
          success = true; // Termina el bucle si la petición es exitosa
        } catch (error) {
          attempt++;
          if (attempt >= maxRetries) {
            setError(error); // Almacena el error después del último intento fallido
          }
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [consult]);

  return [Data, Loading, Error];
};

useGET.propTypes = {
  consult: PropTypes.string,
};
