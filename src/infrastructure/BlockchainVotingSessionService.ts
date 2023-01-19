import {VotingSession} from "../models/VotingSession";
import {VotingSessionList} from "../models/VotingSessionList";
import {VotingSessionService} from "../services/VotingSessionService";
import {votingSystem} from "./VotingSystem";
import {BigNumber} from "ethers";

export class BlockchainVotingSessionService implements VotingSessionService {
    private _sessions = new Array<VotingSession>();

    async add(votingSession: VotingSession): Promise<void> {
        this._sessions.push(votingSession);
    }

    async close(id: string): Promise<void> {
        const votingSession = this._sessions.find(vs => vs.id === id);
        if (!votingSession) {
            return;
        }
        votingSession.isOpen = false;
    }

    async getById(id: string): Promise<VotingSession> {
        const [description, isOpen]: [string, boolean] = await votingSystem.functions.getVotingSession(id);
        const [proposals]: [[string, BigNumber][]] = await votingSystem.functions.getProposals(id);

        return {
            id: id.toString(),
            chairman: "null",
            description,
            proposals: proposals.map(p => ({content: p[0], score: p[1].toString()})),
            isOpen
        };
    }

    async getWinnerById(id: string): Promise<string> {
        return await votingSystem.functions.getWinningProposal(id);
    }

    async listAllOpen(limit: number, offset: number): Promise<VotingSessionList> {
        const votingSessions: VotingSession[] = await votingSystem.functions.getVotingSessions(offset, offset + limit);
        return new VotingSessionList(votingSessions, votingSessions.length, limit, offset);
    }

    async listAllByChairman(chairman: string, limit: number, offset: number): Promise<VotingSessionList> {
        const maxIndex = offset + limit;
        const filteredResults = this._sessions.filter(s => s.chairman === chairman)
        const dataset = filteredResults.filter((_, idx) => offset <= idx && idx < maxIndex);
        return new VotingSessionList(dataset, filteredResults.length, limit, offset);
    }
}