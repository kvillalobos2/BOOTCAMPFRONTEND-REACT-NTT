import { useState, useEffect } from 'react';

interface District {
  id: number;
  name: string;
}

const useDistricts = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchDistricts = async () => {
      try {
        const response = await fetch('/json/districts.json');
        if (!response.ok) {
          throw new Error('Hubo un problema para cargar los distritos');
        }
        const data = await response.json();
        setDistricts(data.districts); 
      } catch (err) {
        setError('Error al cargar distritos');
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  return { districts, loading, error };
};

export default useDistricts;
