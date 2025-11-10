"use client"
import GroupAvatar from '@/app/components/cards/GroupImage';
import { formatDateToMonthShort } from '@/app/utils/format';
import { Box } from '@mui/material';
import { CircleCheck, Clock10 } from 'lucide-react';
import { useState, useCallback } from 'react';


const RatingDisplayLength = ({
    stage
}) => {
    const getColor = (color) => {
        if (color >= 85) return "bg-green-500";
        if (color >= 70) return "bg-teal-500";
        if (color >= 50 && color < 70) return "bg-blue-500";
        if (color > 30 && color < 50) return "bg-gray-500";
        return "bg-red-500";
    };

    const percentage = stage * 25

    return (
        <Box className="flex items-center mt-0 w-44">
            <h5 className="">{percentage}%</h5>
            <Box className="flex-1 mx-2.5 bg-gray-200 h-1.5 rounded-full">
                <Box
                    className={`h-full rounded-full ${getColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                ></Box>
            </Box>
            <h5 className="">100%</h5>
        </Box>
    );
};


export const RegisteredStores = ({ image, businessName, stage, stagesLeft, setStagesLeft, createdAt }) => {
    const handleClick = () => {
        if (stage !== 4) {
            setStagesLeft(stagesLeft);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`flex items-center justify-between flex-1 my-3 mx-1 border border-gray-300 rounded-xl px-1.5 py-3 md:p-3 ${stage !== 4 ? 'cursor-pointer' : 'cursor-default'
                }`}
        >
            <div className="flex items-center  md:p-2">
                <div className="  bg-red-400  rounded-full items-center justify-center mr-6">
                    <GroupAvatar images={[image]} />
                </div>
                <div className=" md:!pl-3">
                    <div className="text-gray-900  text-xl mb-3 font-medium truncate">
                        {businessName}
                    </div>
                    <RatingDisplayLength stage={stage} />
                </div>
            </div>

            <div className="!pr-4 flex items-center">
                {stage === 4 ? (
                    <CircleCheck color="#22c55e" />
                ) : (
                    <Clock10 color="#555" size={20} />
                )}
                <div className="text-gray-500  text-sm ml-2 mt-2">
                    {formatDateToMonthShort(createdAt)}
                </div>
            </div>
        </div>
    );
};

export const Referrals = ({ isLoading, refetch, data, setStagesLeft }) => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    return (
        <div className="flex-1 w-full pb-4">
            <div className="flex-1 py-3 px-2 bg-white rounded-2xl  overflow-auto">
                {data.length ? (
                    data.map((e, index) => (
                        <RegisteredStores key={e.id || index} {...e} setStagesLeft={setStagesLeft} />
                    ))
                ) : (
                        // <NoRecord />
                        <></>
                )}
            </div>
        </div>
    );
};

export const stageNote = {
    location: "Store location is missing. Please set the store's coordinates with a valid latitude so customers can easily find you on the map.",
    products: "Store currently have fewer than 5 products listed. Add at least 5 products to showcase what they offer and improve the store's visibility.",
    gallery: "Your store gallery is empty. Upload at least 1 clear and attractive picture so customers can visually connect with your store."
};