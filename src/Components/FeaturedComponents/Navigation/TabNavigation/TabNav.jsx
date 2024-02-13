import "./TabNav.css";



const tabs = [
    {
        id: 1,
        name: "Buy",
        activeImg: "",
        inActiveImg: "",
        backdrop: "",
    },
    {
        id: 2,
        name: "Sell",
        activeImg: "",
        inActiveImg: "",
        backdrop: "",
    },
    {
        id: 3,
        name: "Rent",
        activeImg: "",
        inActiveImg: "",
        backdrop: "",
    }
]

const TabNav = ({ activeTab, setActiveTab }) => {

    return (
        <>
            <div className="tab_navigation x_y_axis_center">
                <div className="tab_wrapper y_axis_center">
                    {
                        tabs.map((tab) => {
                            return (
                                <div
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`tab_container x_y_axis_center ${activeTab === tab.name && "active_tab"}`}
                                    key={tab.name}
                                >
                                    <div className="tab_name">
                                        {tab.name}
                                    </div>

                                    {/* <img
                                        src={activeTab === tab.name ? tab.active_img : tab.inactive_img}
                                        alt={tab.name}
                                        className="tab_image"
                                    /> */}
                                </div>
                            )
                        })
                    }
                </div>

                {/* <div className="prop_search">
                    <input type="text" />
                </div> */}

            </div>
        </>
    )
}



export default TabNav;