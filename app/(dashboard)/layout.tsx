export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex">
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <a href="/dashboard" className="text-gray-300 hover:text-white">Home</a>
                        </li>
                        <li className="mb-4">
                            <a href="/dashboard/wallets" className="text-gray-300 hover:text-white">Wallets</a>
                        </li>
                        <li className="mb-4">
                            <a href="/dashboard/transactions" className="text-gray-300 hover:text-white">Transactions</a>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-6 bg-gray-100">
                {children}
            </main>
        </div>
    )
}