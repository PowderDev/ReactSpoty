import { DataTypes } from 'sequelize'
import sequelize from '../database';

const RecentlyListened = sequelize.define('recentlyListened', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
}, {
    timestamps: true
});

export default RecentlyListened