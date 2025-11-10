import UserWrapper from '@/app/components/view/user'
import React from 'react'

const ReferralAgentGuide = () => {
  const referralUsername = 'stephenyemmitty' // This would be dynamically set in a real app

  return (
    <UserWrapper noFooter>
      <div className="max-w-4xl mx-auto !px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">
            Corisio Referral Agent Portal
          </h1>
          <p className="text-lg text-gray-600">
            Maximize your earnings by referring businesses to Corisio
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Your Referral Toolkit
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              Your Personal Referral Link
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <code className="text-indigo-600 break-all">
                https://corisio.com/dashboard/register?ref={referralUsername}
              </code>
            </div>
            <p className="text-gray-600 mb-4">
              This is your master referral link. Any business that registers
              through this link will be credited to your account.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              Specialized Registration Pages
            </h3>
            <p className="text-gray-600 mb-4">
              We provide different registration page variants tailored to
              specific business types. Using the right variant can improve
              conversion rates:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <h4 className="font-semibold text-gray-800">
                    Store Admin Personal Info
                  </h4>
                  <h4>Step 1</h4>
                </div>
                <div className="bg-gray-50 p-3 rounded mb-2">
                  <code className="text-sm text-indigo-600 break-all">
                    https://corisio.com/dashboard/register?ref=
                    {referralUsername}
                    &p=0
                  </code>
                </div>
                <p className="text-sm text-gray-600">
                  The store super-admin personal information page
                </p>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <h4 className="font-semibold text-gray-800">
                    Business Profile Tab
                  </h4>
                  <h4>Step 2</h4>
                </div>
                <div className="bg-gray-50 p-3 rounded mb-2">
                  <code className="text-sm text-indigo-600 break-all">
                    https://corisio.com/dashboard/register?ref=
                    {referralUsername}
                    &p=1
                  </code>
                </div>
                <p className="text-sm text-gray-600">
                  Business details page.(e.g. Business name, address etc)
                </p>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <h4 className="font-semibold text-gray-800">Verification</h4>
                  <h4>Step 3</h4>
                </div>
                <div className="bg-gray-50 p-3 rounded mb-2">
                  <code className="text-sm text-indigo-600 break-all">
                    https://corisio.com/dashboard/register?ref=
                    {referralUsername}
                    &p=2
                  </code>
                </div>
                <p className="text-sm text-gray-600">
                  Email Verification, otp will be sent to admin perrsonal info
                </p>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center mb-2">
                  <h4 className="font-semibold text-gray-800">Set Location</h4>
                  <h4>Step 4</h4>
                </div>
                <div className="bg-gray-50 p-3 rounded mb-2">
                  <code className="text-sm text-indigo-600 break-all">
                    https://corisio.com/dashboard/register?ref=
                    {referralUsername}
                    &p=3
                  </code>
                </div>
                <p className="text-sm text-gray-600">
                  Set location for the business from the map view
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            How to Maximize Your Referrals
          </h2>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4">
                <div className="bg-blue-100 text-blue-800 rounded-lg p-3 text-center">
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">Target Right</span>
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Identify Ideal Businesses
                </h3>
                <p className="text-gray-600">
                  Focus on businesses that benefit most from local discovery:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>New businesses needing exposure</li>
                    <li>Stores with unique inventory</li>
                    <li>Businesses in competitive areas</li>
                    <li>Those without strong online presence</li>
                  </ul>
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4">
                <div className="bg-purple-100 text-purple-800 rounded-lg p-3 text-center">
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="font-medium">Personal Outreach</span>
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Effective Communication
                </h3>
                <p className="text-gray-600">
                  When contacting potential referrals:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      Lead with benefits (more customers, easy management)
                    </li>
                    <li>Share your referral link on social media.</li>
                    <li>Offer to guide them through registration</li>
                    <li>Follow up within 48 hours</li>
                  </ul>
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4">
                <div className="bg-green-100 text-green-800 rounded-lg p-3 text-center">
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="font-medium">Track & Optimize</span>
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Monitor Your Performance
                </h3>
                <p className="text-gray-600">
                  Use your referral dashboard to:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Track which links perform best</li>
                    <li>See conversion rates by business type</li>
                    <li>Monitor your earnings and bonuses</li>
                    <li>Identify your most effective outreach methods</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Referral Compensation
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tier
                  </th>
                  <th
                    scope="col"
                    className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Referrals
                  </th>
                  <th
                    scope="col"
                    className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Commission Rate
                  </th>
                  <th
                    scope="col"
                    className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Bonus
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Bronze
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1-5
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5%
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    100 points
                  </td>
                </tr>
                <tr>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Silver
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    6-20
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    7%
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    300 points
                  </td>
                </tr>
                <tr>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Gold
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    20-40
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    10%
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    400 points + featured item (shirt, hoodie, etc)
                  </td>
                </tr>
                <tr>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Platinum
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    41+
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    12%
                  </td>
                  <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    500 points + Ambassadorship (salary + featured items)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Commissions are paid monthly based on the referred store's
                  transaction volume. Tier upgrades happen automatically when
                  you reach the required number of active referrals.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://corisio.com/referral"
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors flex items-center"
            >
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  Referral Dashboard
                </h3>
                <p className="text-sm text-gray-600">
                  Track your referrals and earnings
                </p>
              </div>
            </a>

            <a
              href={`https://corisio.com/dashboard/register?ref=${referralUsername}`}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors flex items-center"
            >
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  Standard Registration
                </h3>
                <p className="text-sm text-gray-600">Your main referral link</p>
              </div>
            </a>

            {/* <a
              href={`https://corisio.com/dashboard/register?ref=${referralUsername}&p=1`}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors flex items-center"
            >
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  Food Business Link
                </h3>
                <p className="text-sm text-gray-600">
                  For restaurants and cafes
                </p>
              </div>
            </a>

            <a
              href={`https://corisio.com/dashboard/register?ref=${referralUsername}&p=3`}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors flex items-center"
            >
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  Professional Services
                </h3>
                <p className="text-sm text-gray-600">
                  For doctors, lawyers, etc.
                </p>
              </div>
            </a> */}
          </div>
        </div>
      </div>
    </UserWrapper>
  )
}

export default ReferralAgentGuide
