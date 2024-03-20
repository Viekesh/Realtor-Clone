import { useEffect, useState } from "react";
import NavigationTop from "../Navigation/TopNav/NavigationTop";
import { auth, database } from "../../../FirebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import ListingAssets from "../AddProp/ListesdAssets/ListedAssets";
import { FaEdit } from "react-icons/fa";




const Profile = () => {

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { name, email } = formData;

    // Retrieves a navigation function for redirecting after logout.
    const navigateTo = useNavigate();

    const onLogOut = () => {
        auth.signOut();
        navigateTo("/");
        alert("You Are Successfully Logout");
    }



    const [propList, setPropList] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        try {

            const fetchUserPropList = async () => {

                const listRef = collection(database, "RealtorCloneListing");

                const qr = query(
                    listRef,
                    where("useRef", "==", auth.currentUser.uid),
                    orderBy("timestamp", "desc"),
                )

                const qrSnap = await getDocs(qr);

                let list = [];

                qrSnap.forEach((doc) => {
                    return (
                        list.push({
                            id: doc.id,
                            data: doc.data(),
                        })
                    );
                });

                setPropList(list);

                setLoading(false);
            }

            fetchUserPropList();
        } catch (error) {
            alert(error.message);
            console.log(error.message);
        };

    }, [auth.currentUser.uid]);



    const ListEdit = (listingId) => {
        navigateTo(`/edit-listing/${listingId}`);
    };



    const ListDelete = async (listingId) => {
        if (window.confirm("Are You Sure You Want To Delete?")) {
            await deleteDoc(doc(database, "RealtorCloneListing", listingId));
            const updatedListing = propList.filter(
                (listing) => listing.id !== listingId
            );

            setPropList(updatedListing);
            alert("You Have Successfully Deleted");
        }
    };



    return (
        <>
            <section className="profile">
                <NavigationTop />

                <div className="user_info">
                    <div className="user_name">
                        <input defaultValue={name} />
                        <input defaultValue={email} />
                    </div>
                    <div className="user_details y_axis_center">
                        <NavLink to="/CreateList" className="btn add_prop x_y_axis_center">add<br />property</NavLink>
                        <div className="btn log_out x_y_axis_center" onClick={onLogOut}>logout</div>
                    </div>
                </div>

                <div className="users_prop_data">

                    {
                        !loading && propList.length > 0 && (
                            <>
                                <div className="prop_head">
                                    <h2>property list:</h2>
                                </div>

                                {
                                    propList.map((listElements) => {
                                        return (
                                            <>
                                                <ListingAssets
                                                    key={listElements.id}
                                                    id={listElements.id}
                                                    data={listElements.data}
                                                    onEdit={() => ListEdit(listElements.id)}
                                                    onDelete={() => ListDelete(listElements.id)}
                                                />
                                            </>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                </div>

            </section>
        </>
    )
}



export default Profile;