import { Link } from "react-router-dom";
import "./ListedAssets.scss";
import Moment from 'react-moment';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";



const ListingAssets = ({ id, data, onDelete, onEdit }) => {

    console.log(data);

    return (
        <>
            {/* when we click on a listing component we redirect to a particular page */}
            <section className="listing_assets" key={id.id}>
                <div className="img">
                    {/* here we don't want all the images, we want only first image that's why we use "imgUrls[0]" */}
                    <Link to={`/category/${data.type}/${id}`}>
                        <img src={data.imgUrls[0]} alt="" />
                    </Link>
                </div>

                <div className="prop_details">{data.description}</div>

                <div className="prop_features">
                    <ul>
                        <li className="y_axis_center"><span>name:</span> {data.name}</li>
                        <li className="y_axis_center"><span>address:</span> {data.address}</li>
                        <li className="y_axis_center">
                            <span>no. of bedrooms:</span>
                            {data.bedrooms > 1 ? `${data.bedrooms} Beds` : "1 Bed"}
                        </li>
                        <li className="y_axis_center">
                            <span>no. of bathrooms:</span>
                            {data.bathrooms > 1 ? `${data.bathrooms} Baths` : "1 Bath"}
                        </li>
                        <li className="y_axis_center">
                            <span>date added:</span>
                            {/* <Moment>{data.timezone}</Moment> */}
                            <Moment fromNow>{data.timezone}</Moment>
                        </li>
                        <li>
                            <span>price:</span>
                            ${data.offer ? data.discountPrice : data.regularPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            {data.type === "rent" && " / month"}
                        </li>
                    </ul>
                    <div className="edit_delete_btn y_axis_center">
                        <div className="edit x_y_axis_center" onClick={() => onEdit(data.id)}>
                            {
                                onEdit && (<FaEdit className="edit_svg" />)
                            }
                        </div>
                        <div className="delete x_y_axis_center" onClick={() => onDelete(data.id)}>
                            {
                                onDelete && (< RiDeleteBack2Fill />)
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};



export default ListingAssets;