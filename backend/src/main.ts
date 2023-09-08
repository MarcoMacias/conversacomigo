import 'dotenv/config'
import Server from "@infra/http/App";
import logsole from "./vendor/logsole";

Server.listen(process.env.PORT, () => {
  logsole.success("Server listening at: " + process.env.PORT)
});