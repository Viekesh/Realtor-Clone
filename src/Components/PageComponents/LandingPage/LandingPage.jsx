import React, { useState } from 'react';
import "./LandingPage.css";
import NavigationTop from '../../FeaturedComponents/Navigation/TopNav/NavigationTop';
import TabNav from '../../FeaturedComponents/Navigation/TabNavigation/TabNav';
import Buy from '../Buy/Buy';
import Sell from '../Sell/Sell';
import Rent from '../Rent/Rent';



const LandingPage = () => {

    // "TabOptions" have three different screens
    // we are use here "useState" hook, state will decide which screen we are seen crrently
    // "useState" hook provides a function and variable, we can able to change already stored value
    // in that variable
    // syntax :
    // const randomName [variable, function] = useState("initial value")

    // according to your current need you can paas value in "useState", sometimes you can pass
    // blank space because many cases there is no value we can pass in it
    // here we will use our initial value is "Delivery", it is one of the tab options screen
    // which we want to see on our screen, so our default screen is delivery.

    const [activeTab, setActiveTab] = useState("Buy");


    return (
        <>
            <header className="landing_page">

                <NavigationTop />

            </header>

            <main>
                <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="tab_screen">
                    {getTabScreen(activeTab)}
                </div>
            </main>
        </>
    )
}

const getTabScreen = (tab) => {
    switch (tab) {
        case "Buy":
            return <Buy />

        case "Sell":
            return <Sell />

        case "Rent":
            return <Rent />

        default:
            return <Buy />
    }
}

export default LandingPage;
