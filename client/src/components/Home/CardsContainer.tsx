import React, { FC } from "react"
import Card from "./Card"

interface Props {
  title: string
  list: any[]
  type: "horizontal" | "vertical"
  collectionType: "user" | "album" | "playlist"
}

const CardsContainer: FC<Props> = ({ title, list, type, collectionType }) => (
  <div className="cards_container">
    <h2>{title}</h2>
    <div className={`${type}_cards_container`}>
      {list.length > 0 &&
        list.map((card) => (
          <Card
            collectionType={collectionType}
            type={type}
            key={card.id}
            url={card.url}
            card={card}
          />
        ))}
    </div>
  </div>
)

export default CardsContainer
