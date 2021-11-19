import {useRoutes, BrowserRouter} from 'react-router-dom'
import { routes } from './routes';

const App: React.FC = () => {
  
  const appRoutes = useRoutes(routes)
  console.log(appRoutes)
  return appRoutes
}

export default App;
