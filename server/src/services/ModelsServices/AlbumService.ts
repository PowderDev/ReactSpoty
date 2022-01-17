import { Op } from 'sequelize';
import ApiError from '../../exceptions/exceptions';
import Album from "../../models/Album";
import Song from '../../models/Song';
import User, { AlbumSong, UserAlbum, UserSong } from '../../models/User';

interface ISongDto {
    audio: string;
    duration: number;
    title: string;
}

interface AlbumDto {
    title: string;
    image: string;
    authors: number[]; 
    songs: ISongDto[];
}


class AlbumService {
    async createAlbum(dto: AlbumDto) {
        const candidates = await Album.findAll({ where: { title: dto.title } })

        if (candidates) {
            for (const c of candidates) {
                //@ts-expect-error
                const candidate = await UserAlbum.findOne({ where: { userId: { [Op.in]: dto.authors }, albumId: c.id } })

                if (candidate) {
                    throw ApiError.BadRequest("You already have an album with this title")
                }
            }
        }

        const album = await Album.create({
            title: dto.title,
            image: dto.image
        })

        for (const authorId of dto.authors) {
            const author = await User.findByPk(authorId)
            //@ts-expect-error
            await UserAlbum.create({userId: author.id, albumId: album.id})
        }

        for (const s of dto.songs) {
            const song = await Song.create({
                title: s.title,
                image: dto.image,
                audio: s.audio,
                duration: s.duration,
                album_title: dto.title,
                //@ts-expect-error
                album_id: album.id
            })
            for (const authorId of dto.authors) {
                //@ts-expect-error
                await UserSong.create({ songId: song.id, userId: authorId })
            }
    
            //@ts-expect-error
            await AlbumSong.create({ albumId: album.id, songId: song.id })
        }


        return album
    }


    async getAlbumById(id: number) {
        const album = await Album.findByPk(id, { include: [
            { model: Song, as: "songs", include: [{ model: User, attributes: ["nickname", "id"] }] }, 
            { model: User, attributes: ["nickname", "id"] }
        ] })
        return album
    }


    async getUsersAlbums(id: number) {
        const user = await User.findByPk(id)
        //@ts-expect-error
        const ua = await UserAlbum.findAll({ where: { userId: user.id } })
        if (ua) {
            //@ts-expect-error
            const albums_ids = ua.map(obj => obj.albumId)
            const albums = await Album.findAll({ 
                where: { id: {[Op.in]: albums_ids} }, 
                include: {model: User, attributes: ["nickname"]} 
            })

            return albums
        }
        else {
            return []
        }
    }


    async getMostPopularAlbums() {
        const albums = await Album.findAll({ 
            order: [['listeners', 'DESC']], 
            limit: 10, 
            include: {model: User, attributes: ["nickname", "id"]} })
        return albums
    }


    async getAlbumsByQuery(query: string) {
        const albums = await Album.findAll({ 
            where: { title: { [Op.iRegexp]: query } }, 
            order: [["listeners", "DESC"]], 
            limit: 10, 
            include: { model: User, attributes: ["nickname", "id"] } })
        return albums
    }
}

export default new AlbumService()