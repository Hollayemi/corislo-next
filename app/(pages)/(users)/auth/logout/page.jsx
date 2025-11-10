'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LineLoading from '@/app/(pages)/(users)/loading'
import Link from 'next/link'
import { userLogout } from '@/app/redux/state/slices/auth/Login'
import { useUserData } from '@/app/hooks/useData'

const Logout = () => {
  const { userInfo } = useUserData()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userLogout())
  }, [dispatch])

  return (
    <div className="relative">
      <LineLoading />
      <div className="fixed bottom-16 left-0 flex flex-col justify-center items-center w-full ">
        <h5 className="!text-black mb-2">
          {userInfo?.username || 'Logged out'}
        </h5>
        {!userInfo?.username && <Link href="/auth/login">( Login ) </Link>}
      </div>
    </div>
  )
}

export default Logout
