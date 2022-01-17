import { DataTypes } from 'sequelize'
import sequelize from '../database';

const Playlist = sequelize.define('playlist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFcGpNbVI7WssLc9sZ_H0Xi0saSTNi2JqQ2A&usqp=CAU"
    },
    listeners: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
});

export default Playlist