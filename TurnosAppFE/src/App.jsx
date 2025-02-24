import { CssBaseline } from '@mui/joy';
import AppRoutes from './routes/routes';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <div className="App">
      <CssBaseline /> {/* Colócalo como un componente independiente */}
      <Toaster richColors closeButton position="top-center" />
      <AppRoutes />
    </div>
  );
};

export default App;
