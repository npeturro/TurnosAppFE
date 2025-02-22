import AppRoutes from './routes/routes';
import { Toaster } from 'sonner';

const App = () => {

  return (
    <div className="App">
      <Toaster richColors closeButton position="top-center" />
      <AppRoutes />

    </div>
  );
};

export default App;