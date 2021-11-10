import { useRef } from 'react';
import { Toast } from 'native-base';

export default () => {
  const toastRef = useRef();

  const show = (message) => {
    if (toastRef.current) {
      Toast.close(toastRef.current);
    }

    toastRef.current = Toast.show({
      description: message,
      duration: 3000,
    });
  };

  const close = () => Toast.closeAll();

  return { show, close };
};
