import React, { useState } from 'react';
import Nav from '../Components/Navigation/Nav';
import "./CreateList.scss";

const CreateList = () => {

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

        if(+discountPrice >= +regularPrice) {
            setLoading(false);
            alert("Discount Price Needs To Be Less Than Regular Price");
            return;
        }
    }



    return (
        <>
            <Nav />
            <div className='create_list'>
                <div className="heading">
                    <h1>Enter Details</h1>
                </div>

                <form className="create_list_form">

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
                            onClick={afterClickOnCreateListInput}
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



                    {
                        type === "rent" && (
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
                        )
                    }



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
