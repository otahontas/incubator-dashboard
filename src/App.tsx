import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

const App: React.FC = () => {
  const appRoutes = useRoutes(routes);
  return <>{appRoutes}</>;
};

export default App;
