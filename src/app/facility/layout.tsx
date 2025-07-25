import React, { Suspense } from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <Suspense>
            <div>{children}</div>
        </Suspense>
    )
}

export default Layout