import { DataTypes, Model } from 'sequelize'
import { IUser } from '../../../shared/models';
import sequelize from '../database';
import { IFollower } from '../types/types';
import Album from './Album';
import Playlist from './Playlist';
import RecentlyListened from './RecentlyListened';
import Song from './Song';
import Token from './Token';

interface UserInstance extends Model, IUser { }

const User = sequelize.define<UserInstance>('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg'
    },
    listeners: {
        type: DataTypes.INTEGER,
        defaultValue: 0 
    }
}, {
    timestamps: true
});



interface FollowerInstance extends Model, IFollower { }

export const Follower = sequelize.define<FollowerInstance>('follower', {});




Follower.belongsTo(User)

Follower.belongsToMany(Song, { through: "FollowerSong" })
Song.belongsToMany(Follower, { through: "FollowerSong" })

Song.belongsToMany(User, {through: "UserSong"})
User.belongsToMany(Song, {through: "UserSong"})

Token.belongsTo(User)

Playlist.belongsToMany(Song, { through: "PlaylistSong" })
Song.belongsToMany(Playlist, { through: "PlaylistSong" })

Playlist.belongsToMany(Follower, { through: "FollowerPlaylist" })
Follower.belongsToMany(Playlist, { through: "FollowerPlaylist" })

Playlist.belongsTo(User, { as: "author" })


Album.belongsToMany(Song, { through: "AlbumSong" })
Song.belongsToMany(Album, { through: "AlbumSong" })

Album.belongsToMany(Follower, { through: "FollowerAlbum" })
Follower.belongsToMany(Album, { through: "FollowerAlbum" })

Album.belongsToMany(User, { through: "UserAlbum" })
User.belongsToMany(Album, { through: "UserAlbum" })


RecentlyListened.belongsTo(User)
RecentlyListened.belongsTo(Song)


export default User
export const { FollowerSong, PlaylistSong, FollowerPlaylist, 
    FollowerAlbum, UserSong, UserAlbum, AlbumSong } = sequelize.models
