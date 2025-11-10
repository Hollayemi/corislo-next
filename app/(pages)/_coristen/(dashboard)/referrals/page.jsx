/* eslint-disable @next/next/no-img-element */
'use client'
import SuperLeftBar from '@/app/components/view/super/SuperLeftBar'
import { withdraw } from '@/app/redux/state/slices/agents/dispatches'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'

const AdminReferralDashboard = ({ params }) => {
  const dispatch = useDispatch()
  const { data } = useSWR('/agent/all')
  const agents = data?.data || []
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [sortConfig, setSortConfig] = useState({
    key: 'totalReferrals',
    direction: 'desc',
  })

  // Sort agents
  const sortedAgents = [...agents].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  // Filter agents based on search term and active tab
  const filteredAgents = sortedAgents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === 'withdrawal') {
      return matchesSearch && agent.pendingWithdrawal > 0
    }
    return matchesSearch
  })

  const handleSort = (key) => {
    let direction = 'desc'
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc'
    }
    setSortConfig({ key, direction })
  }

  const approveWithdrawal = (agentId) => {
    withdraw(dispatch, { id: agentId })
    setSelectedAgent(null)
  }

  const rejectWithdrawal = (agentId) => {
    setSelectedAgent(null)
  }

  const processCustomWithdrawal = () => {
    if (!selectedAgent || !withdrawalAmount || isNaN(withdrawalAmount)) return

    const amount = parseFloat(withdrawalAmount)
    if (amount <= 0) return
    setSelectedAgent(null)
    setWithdrawalAmount('')
  }

  return (
    <SuperLeftBar path={{ ...params, sidebar: 'referrals' }} loading={loading}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Referral Program Administration
            </h1>
            <p className="text-gray-600 mt-2">
              Manage agents, track performance, and process withdrawals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Agents
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {agents.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <svg
                    className="w-6 h-6"
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
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Active Referrals
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {agents.reduce(
                      (sum, agent) => sum + agent.activeReferrals,
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Pending Withdrawals
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    ₦
                    {agents
                      .reduce((sum, agent) => sum + agent.pendingWithdrawal, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`whitespace-nowrap py-4 !px-6 border-b-2 font-medium text-sm ₦{
                    activeTab === 'all'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  All Agents
                </button>
                <button
                  onClick={() => setActiveTab('withdrawal')}
                  className={`whitespace-nowrap py-4 !px-6 border-b-2 font-medium text-sm ₦{
                    activeTab === 'withdrawal'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pending Withdrawals (
                  {agents.filter((a) => a.pendingWithdrawal > 0).length})
                </button>
              </nav>
            </div>
            <div className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="relative w-full sm:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('name')}
                      >
                        Agent
                        {sortConfig.key === 'name' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th
                        scope="col"
                        className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('totalReferrals')}
                      >
                        Referrals
                        {sortConfig.key === 'totalReferrals' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th
                        scope="col"
                        className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('activeReferrals')}
                      >
                        Active
                        {sortConfig.key === 'activeReferrals' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th
                        scope="col"
                        className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('totalEarnings')}
                      >
                        Earnings
                        {sortConfig.key === 'totalEarnings' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th
                        scope="col"
                        className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('pendingWithdrawal')}
                      >
                        Pending
                        {sortConfig.key === 'pendingWithdrawal' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </th>
                      <th
                        scope="col"
                        className="!px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAgents.length > 0 ? (
                      filteredAgents.map((agent, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="!px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                                {!agent.userImage ? (
                                  agent.name.charAt(0)
                                ) : (
                                  <img
                                    src={agent.userImage}
                                    alt={agent.name}
                                    className="h-10 w-10 rounded-full"
                                  />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {agent.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {agent.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="!px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {agent.totalReferrals}
                            </div>
                            <div className="text-sm text-gray-500">
                              {agent.tier}
                            </div>
                          </td>
                          <td className="!px-6 py-4 whitespace-nowrap">
                            <span className="!px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {agent.activeReferrals} active
                            </span>
                          </td>
                          <td className="!px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div>Total: ₦{agent.totalEarnings.toFixed(2)}</div>
                            <div>Paid: ₦{agent.paidOut.toFixed(2)}</div>
                          </td>
                          <td className="!px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {agent.pendingWithdrawal > 0 ? (
                              <span className="text-red-600">
                                ₦{agent.pendingWithdrawal.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-gray-500">₦0.00</span>
                            )}
                          </td>
                          <td className="!px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {agent.pendingWithdrawal > 0 && (
                              <button
                                onClick={() => setSelectedAgent(agent)}
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                              >
                                Process
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedAgent(agent)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="!px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No agents found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal Modal */}
        {selectedAgent && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-end justify-center min-h-screen pt-4 !px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg !px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Process Withdrawal for {selectedAgent.name}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Current pending withdrawal:{' '}
                        <span className="font-semibold">
                          ₦{selectedAgent.pendingWithdrawal.toFixed(2)}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Total paid so far:{' '}
                        <span className="font-semibold">
                          ₦{selectedAgent.paidOut.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <div className="mb-4">
                    <label
                      htmlFor="withdrawalAmount"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Custom Amount (leave empty to process full amount)
                    </label>
                    <input
                      type="number"
                      id="withdrawalAmount"
                      className=" h-8 outline-none !px-5 border mb-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder={`₦{selectedAgent.pendingWithdrawal.toFixed(
                        2
                      )}`}
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm !px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                      onClick={() => approveWithdrawal(selectedAgent._id)}
                    >
                      Approve Full
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm !px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={processCustomWithdrawal}
                    >
                      Approve Custom
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm !px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={() => rejectWithdrawal(selectedAgent.id)}
                    >
                      Reject
                    </button>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent !px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none"
                      onClick={() => {
                        setSelectedAgent(null)
                        setWithdrawalAmount('')
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SuperLeftBar>
  )
}

export default AdminReferralDashboard
