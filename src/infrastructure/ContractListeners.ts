import { BigNumber } from "ethers";
import { VotingSession } from "../models/VotingSession";
import { VotingSessionService } from "../services/VotingSessionService";
import { votingSystem } from "./VotingSystem";


export function initListeners(service: VotingSessionService) {
  votingSystem.on("VotingSessionCreated", async (id: BigNumber, chairman: string) => {
    try {
      const [description, isOpen]: [string, boolean] = await votingSystem.functions.getVotingSession(id);
      const [proposals]: [[string, BigNumber][]] = await votingSystem.functions.getProposals(id);

      const vs: VotingSession = {
        id: id.toString(),
        chairman,
        description,
        proposals: proposals.map(p => ({ content: p[0], score: p[1].toString() })),
        isOpen
      };
      await service.add(vs); 
      console.log("added");
      console.log(await service.getById(id.toString()))

    } catch(err) {
      console.error(err);
    }
  })

  votingSystem.on("VotingSessionClosed", async (id: BigNumber) => {
    try {
      await service.close(id.toString());

    } catch(err) {
      console.error(err);
    }
  })

  console.log("Contract listeners set !")
}