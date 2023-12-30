import React, { useState } from 'react';

import "./CreateList.scss";
import { auth, database, storage } from '../../FirebaseConfig';
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Nav from '../Navigation/Nav';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const CreateList = () => {

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

    // In this form we have some condition because we have true or false, we have number and files and also text from the name and the address input

    const afterClickOnCreateListInput = (event) => {

        // based on the input we are going to change this boolean true or false and use that boolean to change the state in the "formData"

        let boolean = null;

        // if the "event" (input or event.target.value) equal to "true" then we want this boolean equal to "true"

        if (event.target.value === "true") {
            boolean = true;
        }

        if (event.target.value === "false") {
            boolean = false;
        }



        // this is for files, if input is files so in this case set form data
        if (event.target.files) {

            // first here we get prvious state, so in case that we have the files, we want to set the images to
            // either target that files
            setFormData((prevState) => ({
                ...prevState,
                images: event.target.files,
            }));
        }

        // this is for booleans/text/numbers. if we don't have the images/files and the boolean values, then with the help of "useState" function "setFormData" we going to return an object
        if (!event.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [event.target.id]: boolean ?? event.target.value
            }));
        }
    }



    const [loading, setLoading] = useState(false);

    const [progress, setProgress] = useState(null);



    const submitCreateListing = async (event) => {

        // first we need to prevent the defualt behavior of refreshing the page by just getting event here

        event.preventDefault();

        setLoading(true);

        // the discounted price is always less than regular price if this is not happen then we can send error to the user, so for this we make a condition sometimes in the form the number is considered as a string, so here we use "+" sign to prevent that problem by converting it string into number.

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

                // In order to keep image completly unique, for ex the person upload the same image two times then we add some random numbers and letters, in order to do that we use a package called "uuid".

                const filename = `${auth.currentUser.uid} - ${image.name} - ${uuidv4()}`

                const storageRef = ref(storage, filename);

                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on("state_changed", (snapshot) => {

                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

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
                    // Handle successful uploads
                    reject(error);
                }, () => {

                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        resolve(downloadUrl);
                        console.log("Images uploaded successfully. Link : ", downloadUrl);
                    });
                });


            })
        }

        // console.log(storeImage);

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

        // if offer is not available
        !formDataCopy.offer && delete formDataCopy.discountPrice;

        // delete formDataCopy.logitude;
        // delete formDataCopy.latitude;

        try {

            const docRef = await addDoc(collection(database, "RealtorCloneListing"), {
                ...formDataCopy,
            });
            setLoading(false);
            alert("Form Successfully Submitted");

            // we just navigate the user to this url and the url is dynamic because we want the url to be based on the listing id
            // we check here there is the "rent" or the "sale" so we get this

            navigate(`/category/${formDataCopy.type}/${docRef.id}/`)

        } catch (error) {

            console.log(error.message);

        }
    }



    if (loading) {
        return <Spinner />
    }



    return (
        <>
            <Nav />
            <div className='create_list'>
                <div className="heading">
                    <h1>Enter Details</h1>
                </div>

                <form className="create_list_form" onSubmit={submitCreateListing}>

                    <div className="list_elements">
                        <div className="form_buttons">
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
                        <div className="form_buttons">
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
                        <div className="form_buttons">
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
                                <div className="form_buttons">
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
                            <div className="list_elements">
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

export default CreateList;



// .
