import { VotingSession } from "../models/VotingSession";
import { VotingSessionList } from "../models/VotingSessionList";

export interface VotingSessionService {
  add(votingSession: VotingSession): Promise<void>;
  close(id: string): Promise<void>;
  getById(id: string): Promise<VotingSession>;
  getWinnerById(id: string): Promise<string>;
  listAllOpen(limit: number, offset: number): Promise<VotingSessionList>;
  listAllByChairman(chairman: string, limit: number, offset: number): Promise<VotingSessionList>;
}