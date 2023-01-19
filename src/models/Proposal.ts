export interface Proposal {
  content: string;
  score: string;
}


export const ProposalDB = sequelize.define('proposal', {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  score: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
