import { VotingSession } from "../models/VotingSession";
import { VotingSessionList } from "../models/VotingSessionList";
import { VotingSessionService } from "../services/VotingSessionService";

export class MockVotingSessionService implements VotingSessionService {
  getWinnerById(id: string): Promise<string> {
      throw new Error("Method not implemented.");
  }
  private _sessions = new Array<VotingSession>();

  async add(votingSession: VotingSession): Promise<void> {
    this._sessions.push(votingSession);
  }

  async close(id: string): Promise<void> {
    const votingSession = this._sessions.find(vs => vs.id === id);
    if (!votingSession) { return; }
    votingSession.isOpen = false;
  }

  async getById(id: string): Promise<VotingSession> {
    const res = this._sessions.find(s => s.id === id);
    if (res === undefined) {
      throw new Error("Not found");
    }
    return res;
  }

  async listAllOpen(limit: number, offset: number): Promise<VotingSessionList> {
    const maxIndex = offset + limit;
    const dataset = this._sessions.filter((s, idx) => s.isOpen && offset <= idx && idx < maxIndex);
    return new VotingSessionList(dataset, this._sessions.length, limit, offset);
  }

  async listAllByChairman(chairman: string, limit: number, offset: number): Promise<VotingSessionList> {
    const maxIndex = offset + limit;
    const filteredResults = this._sessions.filter(s => s.chairman === chairman)
    const dataset = filteredResults.filter((_, idx) => offset <= idx && idx < maxIndex);
    return new VotingSessionList(dataset, filteredResults.length, limit, offset);
  }
}