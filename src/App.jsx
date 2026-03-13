import { RouterProvider } from 'react-router';
import { router } from './router';
import Dialog from './components/Dialog';
import Notify from './components/Notify';
import { DialogProvider } from './provider/DialogProvider';

function App() {
  return (
    <>
      <DialogProvider>
        <Dialog />
        <Notify />
        <RouterProvider router={router} />
      </DialogProvider>
    </>
  );
}

export default App;
