import { Op } from 'sequelize';
import ApiError from "../../exceptions/exceptions";
import Album from '../../models/Album';
import Playlist from '../../models/Playlist';
import RecentlyListened from '../../models/RecentlyListened';
import Song from "../../models/Song";
import User, { UserSong } from '../../models/User';

interface SongCreationDto {
    id?: number;
    title: string;
    audio: string;
    image: string;
    duration: number;
    authors: number[]
}

interface AddListensDto {
    songId: number;
    playlistId?: number;
}


class SongService {
    async createSong(dto: SongCreationDto) {
        const candidates = await Song.findAll({ where: { title: dto.title } })

        if (candidates) {
            for (const c of candidates) {
                //@ts-expect-error
                const candidate = await UserSong.findOne({ where: { userId: { [Op.in]: dto.authors }, songId: c.id } })

                if (candidate) {
                    throw ApiError.BadRequest(`This Artist(s) already ha(s|ve) a song with title`)
                }
            }
        }

        const song = await Song.create({
            title: dto.title,
            audio: dto.audio,
            image: dto.image,
            duration: dto.duration,
        })

        for (const authorId of dto.authors) {
            const author = await User.findByPk(authorId)
            //@ts-expect-error
            await song.addUser(author)
        }



        return song
    }


    async updateSong(dto: SongCreationDto) {
        const candidate = await Song.findOne({ where: { id: dto.id } })

        if (!candidate) {
            throw ApiError.BadRequest(`This song doesn't exist`)
        }

        await candidate.update(dto)
        return candidate
    }


    async getAllSongs() {
        const songs = await Song.findAll({ limit: 10, include: {model: User} })
        return songs
    }


    async getUsersSongs(id: number) {
        const user = await User.findByPk(id)
        //@ts-expect-error
        const songs = user.getSongs({
            limit: 5, 
            include: [{model: User, attributes: ["nickname", "id"]}], 
            order: [["listeners", "DESC"]]
        })

        return songs
    }


    async getSongsByQuery(query: string) {
        const songs = await Song.findAll({ 
            where: { title: { [Op.iRegexp]: query } }, 
            limit: 10, 
            include: { model: User, attributes: ["nickname", "id"] }, 
            order: [["listeners", "DESC"]] 
        })
        return songs
    }


    async addListener(dto: AddListensDto, userId: number) {
        const song = await Song.findByPk(dto.songId)

        const list = await RecentlyListened.findAll({ where: { userId }, limit: 20, order: [["createdAt", "DESC"]] })
        //@ts-expect-error
        const IsThereThisSong = list.find(rl => rl.songId == song.id)
        
        if (!IsThereThisSong) {
            //@ts-expect-error
            await RecentlyListened.create({ songId: song.id, userId })
        }

        song?.increment("listeners")
        if (dto.playlistId) (await Playlist.findByPk(dto.playlistId))?.increment("listeners")
        //@ts-expect-error
        if (song.album_id) (await Album.findByPk(song.album_id))?.increment("listeners")

        //@ts-expect-error
        for (const author of await song.getUsers()) {
            author.increment("listeners")
        }
    }


    async userRecentlyListened(userId: number) {
        const songs = await RecentlyListened.findAll({ 
            where: { userId }, 
            include: [{model: Song, include: [{model: User, attributes: ["nickname", "id"]}]}], 
            limit: 20, 
            order: [["createdAt", "DESC"]]
        })

        //@ts-expect-error
        return songs.map(s => s.song)
    }


    async getMostPopular() {
        const songs = await Song.findAll({ 
            limit: 20, 
            order: [["listeners", "DESC"]], 
            include: [{model: User, attributes: ["nickname", "id"]}] 
        })
        
        return songs
    }
}


export default new SongService()