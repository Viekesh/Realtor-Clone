import React, { useState } from 'react';
import Buy from '../Components/Pages/Buy/Buy';
import Sell from '../Components/Pages/Sell/Sell';
import Rent from '../Components/Pages/Rent/Rent';
import TabNav from '../Components/FeaturedComponents/Navigation/TabNavigation/TabNav';
import NavigationTop from '../Components/FeaturedComponents/Navigation/TopNav/NavigationTop';



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
                {/* <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

                {getTabScreen(activeTab)} */}
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
