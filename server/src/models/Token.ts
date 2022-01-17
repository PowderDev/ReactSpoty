import { DataTypes, Model } from 'sequelize'
import sequelize from '../database';

interface TokenInstance extends Model {
    user: number;
    refreshToken: string;
}


const Token = sequelize.define<TokenInstance>('token', {
    refreshToken: { type: DataTypes.STRING, allowNull: false },
});




export default Token