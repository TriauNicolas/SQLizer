import { useEffect, useState } from 'react';
import { socket } from '../components/Canvas/CanvasElement';

export const useSocketListeners = () => {
  const [ eventToTrigger, setEventToTrigger ] = useState('');
  const [ relatedData, setRelatedData ] = useState<any | null>(null);

  useEffect(() => {
    const handleResponseCreateTable = (data: any) => {
      console.log(data);
      setEventToTrigger("oui");
      setRelatedData(data);
    };

    socket?.on("responseCreateTable", handleResponseCreateTable);

    // Clean up the listener when the component is unmounted or if any dependency changes
    return () => {
      socket?.off("responseCreateTable", handleResponseCreateTable);
    };
  }, []);


  return { eventToTrigger, relatedData }
};
