import { VotingSession, VotingSessionDB } from "../models/VotingSession";
import { VotingSessionList } from "../models/VotingSessionList";
import { VotingSessionService } from "../services/VotingSessionService";

export class PostgresVotingSessionService implements VotingSessionService {
  getWinnerById(id: string): Promise<string> {
      throw new Error("Method not implemented.");
  }

  async add(votingSession: VotingSession): Promise<void> {
    return VotingSessionDB.create({
        id: votingSession.id,
        chairman: votingSession.chairman, 
        description: votingSession.description,
        proposals: votingSession.proposals,
        isOpen: votingSession.isOpen
    })
}

  async close(id: string): Promise<void> {
    return VotingSessionDB.update({isOpen: false}, {where: {id: id}})
  }

  async getById(id: string): Promise<VotingSession> {
    const res = await VotingSessionDB.findOne({where: {id: id}});
    if (res === undefined) {
      throw new Error("Not found");
    }
    return res;
  }

  async listAllOpen(limit: number, offset: number): Promise<VotingSessionList> {
    return VotingSessionDB.findAndCountAll({
      where: {isOpen: true},
      order: [['id', 'DESC']],
      limit: limit,
      offset: offset
    })
  }

  async listAllByChairman(chairman: string, limit: number, offset: number): Promise<VotingSessionList> {
    return VotingSessionDB.findAndCountAll({
      where: {chairman: chairman},
      order: [['id', 'DESC']],
      limit: limit,
      offset: offset
    })
  }
}