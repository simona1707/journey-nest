'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image"
import HeartButton from "../HeartButton";

import { useState } from "react";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region} , ${location?.label}`}
            />
            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                
                "
                onClick={toggleModal}
            >
                <Image
                    fill
                    alt="Image"
                    src={imageSrc}
                    className="object-cover w-full cursor-pointer"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black
                        bg-opacity-50
                        flex
                        justify-center
                        items-center
                        z-50  
                    "
                    onClick={toggleModal}
                >
                    <div
                        className="
                            relative
                            z-50
                            bg-white
                            rounded-xl
                            p-8
                            max-w-[80vw]
                            max-h-[80vh]
                            overflow-auto
                            z-50  
                        "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={imageSrc}
                            alt="Image"
                            width={800}
                            height={600}
                            className="object-cover w-full h-full"
                        />
                        <button
                            className="
                                absolute
                                top-3
                                right-3
                                bg-white
                                text-black
                                rounded-full
                                p-2
                                hover:bg-gray-200
                                focus:outline-none
                                z-50

                                "
                            onClick={toggleModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ListingHead;
