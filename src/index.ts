import ConfigureServerMiddlewares from "./server/MiddlewaresConfig";
import ReduceRouters from "./server/RoutesReducer";
import InitializeServer from "./server/ServerInitializer";

const app = InitializeServer();

ConfigureServerMiddlewares(app);

ReduceRouters(app);
