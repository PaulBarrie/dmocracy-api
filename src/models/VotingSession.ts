import { Proposal } from "./Proposal";

export interface VotingSession {
  id: string;
  chairman: string;
  description: string;
  proposals: Proposal[];
  isOpen: boolean;
}

export const VotingSessionDB = sequelize.define('voting_session', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  chairman: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  proposals: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false,
  },
  isOpen: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});