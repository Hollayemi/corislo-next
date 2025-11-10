"use client"
import React, { use, useEffect } from 'react';
// import OrderTracking from '../(pages)/cart/component/completedProgress';
import { useRouter } from 'next/navigation';
import { OrderStages } from '../../order/timeline';
import { useUserData } from '@/app/hooks/useData';
import UserWrapper from '@/app/components/view/user';
import { useGetPickersQuery } from '@/app/redux/user/slices/orderSlice';

export default function OrderSuccess({ searchParams }) {
    const { slugs } = use(searchParams)
    const { data, isLoading } = useGetPickersQuery(slugs, { skip: !slugs })
    const { userInfo, launchConfetti } = useUserData()

    const pickers = data?.data || []
    console.log({ pickers, isLoading })

    const router = useRouter();
    useEffect(() => {
        launchConfetti(); launchConfetti(); launchConfetti(); launchConfetti()
    })
    return (
        <UserWrapper noFooter>
            <div className=" flex items-center  py-2 justify-center bg-white px-2 md:px-4">
                <div className="max-w-xl w-full text-center">
                    {/* Success Icon Placeholder */}
                    <div className="mb-6">
                        <img src="/images/misc/delivery.png" className="w-28 h-28 md:w-32 md:h-32 mx-auto" alt="done" />
                    </div>

                    {/* Header */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Thank you for your order, {userInfo.fullname?.split(" ")?.[0]}!
                    </h2>

                    {/* Subtext */}
                    <p className="text-gray-600 mb-4">
                        Your order has been successfully placed. We’re preparing it for pickup and will notify the picker shortly.
                    </p>

                    {/* Forwarding Note */}
                    {pickers.map((res, i) => (
                        res.picker && res.picker.phone && (
                            <div
                                key={i}
                                className="bg-brand-50 border-l-4 border-brand-200 text-brand-800 p-3 rounded mb-6"
                            >
                                <p className="text-sm leading-relaxed">
                                    <span className="font-semibold">📦 Sending this to {res.picker.name}</span>
                                    <br />
                                    Forward the message below to them on WhatsApp so they can receive the package on your behalf:
                                </p>

                                <div className="mt-3 p-3 bg-white border rounded text-sm">
                                    <p><b>📌 Picker ID:</b> {res.pickerSlug}</p>
                                    <p><b>🛒 Order ID:</b> {res.orderSlug}</p>
                                    <p><b>Note:</b> Please keep this information safe.</p>
                                </div>

                                <a
                                    href={`https://wa.me/${res.picker.phone}?text=${encodeURIComponent(
                                        `Hello ${res.picker.name},\n\nYou have been assigned to pick up an order.\n\n📌 Picker ID: ${res.pickerSlug}\n🛒 Order ID: ${res.orderSlug}\n\nPlease confirm once you receive it.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    📲 Send via WhatsApp
                                </a>
                            </div>
                        )
                    ))}

                    {/* Timeline Placeholder (your component goes here) */}
                    <div className="my-10">
                        <OrderStages
                            at={1}
                            price={500000}
                            delivery={"pickup"}
                        />
                    </div>

                    {/* Open Order Page Button */}
                    <button onClick={() => router.push(`/order/`)} className="bg-brand-600 !mt-10 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded w-full">
                        Open Order
                    </button>
                </div>
            </div>
        </UserWrapper>
    );
}
