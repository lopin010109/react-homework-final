import { useState } from 'react';
import { DialogContext } from '../store/dialogContext';

export const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    title: '',
    message: '',
    mode: 'message', // message, form
    formData: null,
    confirmText: '確認',
    cancelText: '取消',
    confirmFn: () => {},
    adminType: 'adminProduct',
  });

  const setDialogOpt = (payload) => {
    setOptions({
      ...options,
      ...payload,
    });
  };

  const value = {
    isOpen,
    options,
    setIsOpen,
    setDialogOpt,
  };

  return (
    <>
      <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
    </>
  );
};
