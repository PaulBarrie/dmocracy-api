import Express from "express";
import Cors from "cors";
import { VotingSessionService } from "./services/VotingSessionService";
import { queryParamsToNumber } from "./utils/query-params-parser";
import { get } from "env-var";
import { PageResponse } from "./utils/page-response";
import { initListeners } from "./infrastructure/ContractListeners";
import {BlockchainVotingSessionService} from "./infrastructure/BlockchainVotingSessionService";

const APP_URL = get("APP_URL").default("http://localhost:3000/").asString();
const PORT = get("PORT").default(3000).asPortNumber();

const service: VotingSessionService = new BlockchainVotingSessionService();

(async function bootstrap() {
  const app = Express();
  app.use(Cors({ origin: true }));

  app.get("/voting-sessions", async (req, res) => {
    const limit = queryParamsToNumber(req.query.limit, 20);
    const offset = queryParamsToNumber(req.query.offset, 0);

    service.listAllOpen(limit, offset)
      .then(vs => {
        const url = new URL(req.baseUrl + req.path, APP_URL);
        return res.json(new PageResponse(vs, url))
      })
      .catch(err => res.status(404).json({ message: err.message }));
  });

  app.get("/voting-sessions/chairman/:chairmanId", async (req, res) => {
    const limit = queryParamsToNumber(req.query.limit, 20);
    const offset = queryParamsToNumber(req.query.offset, 0);
    const chairmanId = req.params.chairmanId;

    service.listAllByChairman(chairmanId, limit, offset)
      .then(vs => {
        const url = new URL(req.baseUrl + req.path, APP_URL);
        return res.json(new PageResponse(vs, url))
      })
      .catch(err => res.status(404).json({ message: err.message }));
  });

  app.get("/voting-sessions/:id", async (req, res) => {
    const id = req.params.id;

    service.getById(id)
      .then(vs => res.json(vs))
      .catch(err => res.status(400).json({ message: err.message }));
  })

  app.get("/voting-sessions/:id/winner", async (req, res) => {
    const id = req.params.id;

    service.getWinnerById(id)
        .then(vs => res.json(vs))
        .catch(err => res.status(400).json({ message: err.message }));
  })

  app.listen(PORT, () => {
    initListeners(service);
    console.log(`App deployed on ${APP_URL}`)
  });

})().catch(console.error);