import React, { FC } from "react"
import { useNavigate } from "react-router-dom"
import { IUser } from "../../../../shared/models"
import { editTitle } from "../../helpers/helperFuctions"

interface Props {
  card: any
  type: "horizontal" | "vertical"
  url?: string
  collectionType: "user" | "album" | "playlist"
}

const Card: FC<Props> = ({ card, type, url, collectionType }) => {
  const nav = useNavigate()
  const authors = card.users?.map((u: IUser) => u.nickname).join(", ") || card?.author?.nickname
  const { image, title, id, nickname } = card

  return (
    <div
      className={`${type}_card`}
      onClick={() =>
        nav(
          collectionType == "album"
            ? `/album/${id}`
            : collectionType == "user"
            ? `/profile/${id}`
            : `/playlist/${url || id}`
        )
      }
    >
      <img src={image} alt="" />
      {collectionType == "user" ? (
        <strong>{editTitle(nickname, 25)}</strong>
      ) : (
        <strong>{editTitle(title, 25)}</strong>
      )}
      {type == "vertical" && collectionType != "user" && <small>{editTitle(authors, 30)}</small>}
    </div>
  )
}

export default Card
