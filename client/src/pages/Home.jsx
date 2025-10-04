import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListing, setOfferListing] = useState([]);
  const [rentList, setRentList] = useState([]);
  const [saleListing, setSaleListing] = useState([]);

  console.log("offerListing", offerListing);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/listing/get?offer=true&limit=4`
        );
        setOfferListing(res.data);
        fetchRentListing(res.data);
        fetchSaleListing(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListing = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/user/listing/get?type=rent&limit=4"
        );
        setRentList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListing = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/user/listing/get?type=sale&limit=4"
        );
        setSaleListing(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListing();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl ">
          Find your next <span className="text-slate-500">perfect</span> <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-sm sm:text-sm">
          Safi Estate is the best place to find your next perfect place to live{" "}
          <br />
          we have a wide range of property for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs text-blue-800 sm:text-sm font-bold hover:underline "
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px] w-full rounded-lg"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listings result */}

      <div className="max-w-6xl mx:auto p-3 flex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 ">
                Recent Offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-sm text-blue-800 hover:underline "
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentList && rentList.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 ">
                Recent Places for Rent
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-sm text-blue-800 hover:underline "
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentList.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListing && saleListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 ">
                Recent Places for sale
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-sm text-blue-800 hover:underline "
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
