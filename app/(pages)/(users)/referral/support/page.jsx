import UserWrapper from '@/app/components/view/user'
import React from 'react'

const StoreRegistrationGuide = () => {
  return (
    <UserWrapper noFooter>
      <div className="max-w-4xl mx-auto !px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">
            Welcome to Corisio for Businesses
          </h1>
          <p className="text-lg text-gray-600">
            Get your store on our platform and start reaching more customers
            today
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Why Join Corisio?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-gray-700">
                Increase your store's visibility to local customers
              </span>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-gray-700">
                Manage inventory and product availability in real-time
              </span>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-gray-700">
                Offer flexible pickup or delivery options
              </span>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-gray-700">
                Manage multiple locations and staff members
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            How to Register Your Store
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Visit the Registration Page
                </h3>
                <p className="text-gray-600 mb-2">
                  Go to our store registration page using the link provided by
                  your referrer:
                </p>
                <a
                  href="https://corisio.com/dashboard/register?ref=stephenyemmitty"
                  className="text-indigo-600 hover:underline break-all"
                >
                  https://corisio.com/dashboard/register?ref=stephenyemmitty
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Fill Out Business Information
                </h3>
                <p className="text-gray-600">
                  Provide details about your business including:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                  <li>Business name and description</li>
                  <li>Contact information</li>
                  <li>Business address and location</li>
                  <li>Business category and type</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Set Up Your Account
                </h3>
                <p className="text-gray-600">
                  Create your administrator account with login credentials that
                  you'll use to access your dashboard.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  4
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Verify Your Account
                </h3>
                <p className="text-gray-600">
                  Check your email for a verification link to activate your
                  account.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  5
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Complete Store Setup
                </h3>
                <p className="text-gray-600">
                  Once verified, log in to your dashboard to:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                  <li>Add your products and inventory</li>
                  <li>Set up pickup/delivery options</li>
                  <li>Invite staff members (optional)</li>
                  <li>Configure your store settings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Referral Program Benefits
          </h2>
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              When you register through a referral link, both you and the
              referrer receive special benefits. Here's how it works:
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                For New Store Owners:
              </h3>
              <ul className="list-disc pl-5 text-blue-700 space-y-1">
                <li>Reduced commission rates for the first 3 months</li>
                <li>Priority support during onboarding</li>
                <li>
                  Featured placement in search results for the first month
                </li>
              </ul>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <h3 className="font-semibold text-purple-800 mb-2">
                For Referrers:
              </h3>
              <ul className="list-disc pl-5 text-purple-700 space-y-1">
                <li>Earn commission credits for each successful referral</li>
                <li>Increase your referral tier with more signups</li>
                <li>
                  Get access to premium features as you refer more businesses
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Referral Dashboard
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Track Your Referrals
              </h3>
              <p className="text-gray-600 mb-4">
                Once you're registered, you can access your referral dashboard
                to:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>See how many businesses you've referred</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Track which referrals have completed registration</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Monitor your earned rewards and benefits</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Share Your Referral Link
              </h3>
              <p className="text-gray-600 mb-4">
                Your personal referral link is available in your dashboard.
                Share it with other business owners to:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Help them get started with Corisio</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Earn rewards for each successful registration</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Build your network of partner stores</span>
                </li>
              </ul>
              <div className="mt-6">
                <a
                  href="https://corisio.com/referral"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 !px-6 rounded-lg transition duration-200"
                >
                  Access Your Referral Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-4">
            Register your store now and join the Corisio network
          </p>
          <a
            href="https://corisio.com/dashboard/register?ref=stephenyemmitty"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 !px-8 rounded-lg transition duration-200 shadow-md"
          >
            Register Your Store
          </a>
        </div>
      </div>
    </UserWrapper>
  )
}

export default StoreRegistrationGuide
