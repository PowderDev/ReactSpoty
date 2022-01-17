import { DataTypes } from 'sequelize'
import sequelize from '../database';

const Song = sequelize.define('song', {
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
        defaultValue: "https://media.istockphoto.com/vectors/music-note-icon-black-minimalist-icon-isolated-on-white-background-vector-id866757280?k=20&m=866757280&s=170667a&w=0&h=YdxJFddk-QZ-b2pg2VD7vEKDJDwNde6HmVMyYxL9Rg0="
    },
    audio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    album_title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    album_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    listeners: {
        type: DataTypes.INTEGER,
        defaultValue: 0 
    }

}, {
    timestamps: true
});

export default Song