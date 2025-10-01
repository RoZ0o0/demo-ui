import { useContext } from 'react';
import ClientFormContext from '../contexts/ClientFormContext';

export const useClientForm = () => {
  const context = useContext(ClientFormContext);
  if (!context) throw new Error('useClientForm must be used within ClientFormProvider');
  return context;
};
