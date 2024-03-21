import React, { useEffect, useState } from 'react';
import "../CreateList.scss";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, database, storage } from '../../../../FirebaseConfig';
import NavigationTop from '../../Navigation/TopNav/NavigationTop';
import Spinner from '../../../CommonModules/Spinner/Spinner';

const EditList = () => {

    const [loading, setLoading] = useState(false);

    const [list, setList] = useState([]);

    const navigate = useNavigate();

    // we create this hook to get initial state of the form, after user fill the data in this form then we update that data and send them by using the "useState" function (setFormData);

    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: "",
        bathrooms: "",
        furnished: false,
        parking: false,
        address: "",
        description: "",
        offer: false,
        regularPrice: "",
        discountPrice: "",
        images: [],
    });


    // destructure the initial values (formData information) which we have defined in the above "useState" hook otherwise we will get an error

    const {
        type,
        name,
        bedrooms,
        bathrooms,
        furnished,
        parking,
        address,
        description,
        offer,
        regularPrice,
        discountPrice,
        images,
    } = formData;



    const params = useParams;

    useEffect(() => {
        if (list && list.userRef !== auth.currentUser.uid) {
            alert("You can't edit this listing");
            navigate("/");
        }
    }, [auth.currentUser.uid, navigate, params.listingId]);


    useEffect(() => {

        try {
            setLoading(true);

            async function fetchListing() {
                const docRef = doc(database, "RealtorCloneListing", params.listingId);
                const docSnap = await getDoc(docRef);

                const docCopy = docSnap;

                if (docCopy !== undefined) {
                    setList(docCopy.data());
                    setFormData({ ...docSnap.data() });
                    setLoading(false);
                } else {
                    navigate("/");
                    alert("Listing does not exist");
                }
            }

            fetchListing();
        } catch (error) {
            alert(error.message);
            console.log(error.message);
        }


    }, [navigate, params.listingId]);



    const afterClickOnCreateListInput = (event) => {

        let boolean = null;

        if (event.target.value === "true") {
            boolean = true;
        }

        if (event.target.value === "false") {
            boolean = false;
        }



        if (event.target.files) {

            setFormData((prevState) => ({
                ...prevState,
                images: event.target.files,
            }));
        }

        if (!event.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [event.target.id]: boolean ?? event.target.value
            }));
        }
    }



    const [progress, setProgress] = useState(null);



    const submitCreateListing = async (event) => {

        event.preventDefault();

        setLoading(true);

        if (+discountPrice >= +regularPrice) {
            setLoading(false);
            alert("Discount Price Needs To Be Less Than Regular Price");
            return;
        }

        if (images.length > 6) {
            setLoading(false);
            alert("Maximum 6 Images Are Allowed");
            return;
        }

        const storeImage = async (image) => {

            return new Promise((resolve, reject) => {

                const filename = `${auth.currentUser.uid} - ${image.name} - ${uuidv4()}`

                const storageRef = ref(storage, filename);

                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on("state_changed", (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    console.log("Upload is " + progress + "% done.");

                    setProgress(progress);

                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload Is Paused");
                            break;

                        case "running":
                            console.log("Upload Is Running");
                            break;

                        case "canceled":
                            console.log("Upload Is Canceled");
                            break;

                        default:
                            break;
                    }
                }, (error) => {
                    reject(error);
                }, () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        resolve(downloadUrl);
                        console.log("Images uploaded successfully. Link : ", downloadUrl);
                    });
                });


            })
        }

        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))).catch((error) => {
                setLoading(false);
                alert("Images Not Uploaded");
                console.log(error.message);
                return;
            });

        const formDataCopy = {

            ...formData,
            imgUrls,
            // geolocation,
            timestamp: serverTimestamp(),
            useRef: auth.currentUser.uid,

        }

        delete formDataCopy.images;

        !formDataCopy.offer && delete formDataCopy.discountPrice;

        try {
            const docRef = await updateDoc(collection(database, "RealtorCloneListing", params.listingId), {
                ...formDataCopy,
            });
            setLoading(false);
            alert("Form Successfully Submitted");

            navigate(`/category/${formDataCopy.type}/${docRef.id}/`)

        } catch (error) {

            console.log(error.message);

        }
    };



    if (loading) {
        return <Spinner />
    };



    return (
        <>
            <NavigationTop />
            <div className='create_list'>
                <div className="heading">
                    <h1>Edit Details</h1>
                </div>

                <form className="create_list_form" onSubmit={submitCreateListing}>

                    <div className="list_elements">
                        <div className="form_buttons y_axis_center">
                            <button
                                type="button"
                                id="type"
                                value="rent"
                                onClick={afterClickOnCreateListInput}
                                className={`${type === "rent" ? "sell_btn" : "sell_back"}`}
                            >
                                rent
                            </button>

                            SELECT

                            <button
                                type="button"
                                id="type"
                                value="sell"
                                onClick={afterClickOnCreateListInput}
                                className={`${type === "sell" ? "sell_btn" : "sell_back"}`}
                            >
                                sell
                            </button>
                        </div>
                    </div>

                    <div className="list_elements">
                        <input
                            type="text"
                            placeholder="Enter Name"
                            id="name"
                            value={name}
                            onChange={afterClickOnCreateListInput}
                            minLength="9"
                            maxLength="90"
                            required
                        />
                    </div>

                    <div className="list_elements">
                        <input
                            type="number"
                            placeholder="No. Of Bedrooms"
                            id="bedrooms"
                            value={bedrooms}
                            onChange={afterClickOnCreateListInput}
                            min="1"
                            max="50"
                            required
                        />
                    </div>

                    <div className="list_elements">
                        <input
                            type="number"
                            placeholder="No. Of Bathrooms"
                            id="bathrooms"
                            value={bathrooms}
                            onChange={afterClickOnCreateListInput}
                            min="1"
                            max="50"
                            required
                        />
                    </div>

                    <div className="list_elements">
                        <div className="form_buttons y_axis_center">
                            <button
                                type="button"
                                id="furnished"
                                value={true}
                                onClick={afterClickOnCreateListInput}
                                className={`${furnished ? "sell_btn" : "sell_back"}`}
                            >
                                yes
                            </button>

                            furnished

                            <button
                                type="button"
                                id="furnished"
                                value={false}
                                onClick={afterClickOnCreateListInput}
                                className={`${!furnished ? "sell_btn" : "sell_back"}`}
                            >
                                no
                            </button>
                        </div>
                    </div>

                    <div className="list_elements">
                        <div className="form_buttons y_axis_center">
                            <button
                                type="button"
                                id="parking"
                                value={true}
                                onClick={afterClickOnCreateListInput}
                                className={`${parking ? "sell_btn" : "sell_back"}`}
                            >
                                yes
                            </button>

                            parking

                            <button
                                type="button"
                                id="parking"
                                value={false}
                                onClick={afterClickOnCreateListInput}
                                className={`${!parking ? "sell_btn" : "sell_back"}`}
                            >
                                no
                            </button>
                        </div>
                    </div>

                    <div className="list_elements">
                        <textarea
                            type="text"
                            placeholder="Enter Address"
                            id="address"
                            value={address}
                            onChange={afterClickOnCreateListInput}
                            min="1"
                            max="50"
                            required
                        />
                    </div>

                    <div className="list_elements">
                        <textarea
                            type="text"
                            placeholder="Enter Description"
                            id="description"
                            value={description}
                            onChange={afterClickOnCreateListInput}
                            min="1"
                            max="50"
                            required
                        />
                    </div>



                    {
                        type === "rent" && (
                            <div className="list_elements">
                                <div className="form_buttons y_axis_center">
                                    <button
                                        type="button"
                                        id="offer"
                                        value={true}
                                        onClick={afterClickOnCreateListInput}
                                        className={`${offer ? "sell_btn" : "sell_back"}`}
                                    >
                                        yes
                                    </button>

                                    offer

                                    <button
                                        type="button"
                                        id="offer"
                                        value={false}
                                        onClick={afterClickOnCreateListInput}
                                        className={`${!offer ? "sell_btn" : "sell_back"}`}
                                    >
                                        no
                                    </button>
                                </div>
                            </div>
                        )
                    }



                    {
                        offer && (
                            <div className="list_elements y_axis_center">
                                <input
                                    type="number"
                                    placeholder="Discount Price"
                                    id="discountPrice"
                                    value={discountPrice}
                                    onChange={afterClickOnCreateListInput}
                                    minLength="60"
                                    maxLength="9000000"
                                    required={offer}
                                    className="discount_price"
                                />
                                {type === "rent" && (
                                    <div>
                                        <p>$ / Months</p>
                                    </div>
                                )}
                            </div>
                        )
                    }




                    <div className="list_elements">
                        <input
                            type="number"
                            id="regularPrice"
                            placeholder="Regular Price"
                            value={regularPrice}
                            onChange={afterClickOnCreateListInput}
                            minLength="60"
                            maxLength="9000000"
                            className="regular_price"
                        />
                        <div>
                            <p>$ / Months</p>
                        </div>
                    </div>


                    <div className="list_elements">
                        <input
                            type="file"
                            id="images"
                            // accept=".jpg, .png, .jpeg"
                            onChange={afterClickOnCreateListInput}
                            multiple
                            required
                            className="type_file"
                        />
                    </div>

                    <div className="list_elements">
                        <button
                            type="submit"
                            className="submit_button"
                            disabled={progress !== null && progress < 100}
                        >
                            Submit Form
                        </button>
                    </div>

                </form >
            </div >
        </>
    )
}

export default EditList;



// .
