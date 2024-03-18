import { Link } from "react-router-dom"

export const ListingAssets = ({ listItems, id }) => {
    return (
        <>
            <Link to={`/category/${listItems.type}/${id}`}>
                <img src={listItems.imgUrls[0]} alt="" />
            </Link>
        </>
    )
};