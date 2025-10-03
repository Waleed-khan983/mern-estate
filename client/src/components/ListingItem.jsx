import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { list } from "postcss";

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white flex shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`} className="w-full">
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          {/* Title */}
          <p className="text-lg font-semibold text-slate-700 truncate flex-1 min-w-0">
            {listing.name}
          </p>

          {/* Address */}
          <div className="flex items-center gap-2 min-w-0">
            <MdLocationOn className="size-4 text-green-700 font-semibold shrink-0" />
            <p className="text-sm text-gray-600 truncate flex-1 min-w-0">
              {listing.address}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 line-clamp-2">{listing.description}</p>
          <p className="text-slate-500 mt-2 font-semibold flex items-center">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-Us")}
            {listing.type === "rent" && "/month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.bethrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
