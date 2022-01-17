import { Sequelize } from "sequelize"


const sequelize = new Sequelize('Spotify_Clone', 'postgres', '1234', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres'
  })


export default sequelize