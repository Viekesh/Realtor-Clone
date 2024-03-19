import { Link } from "react-router-dom";
import "./ListedAssets.scss";

const ListingAssets = ({ id, data }) => {

    console.log(data);

    return (
        <>
            {/* <Link to={`/category/${data.type}/${id}`}>
                <img src={data.imgUrls[0]} alt="" />
            </Link> */}

            {/* when we click on a listing component we redirect to a particular page */}
            <section className="listing_assets" key={id.id}>
                <div className="img">
                    <Link to={`/category/${data.type}/${id}`}>
                        <img src={data.imgUrls[0]} alt="" />
                    </Link>
                </div>

                <div className="prop_details">{data.description}</div>

                <div className="prop_features">
                    <ul>
                        <li>{data.name}</li>
                        <li>{data.address}</li>
                        <li>{data.furnished}</li>
                        <li>{data.bedrooms}</li>
                        <li>{data.bathrooms}</li>
                        <li>{data.type}</li>
                    </ul>
                </div>
            </section>
        </>
    )
};



export default ListingAssets;