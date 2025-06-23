import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons"
import { initSocket } from "@/services/socket/socket"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export function Notification() {
    const [notifications, setNotifications] = useState([])
    const [socket, setSocket] = useState(null)
    const token = Cookies.get('token')

    useEffect(() => {
        const token = Cookies.get('token')
        const newSocket = initSocket(token)
        setSocket(newSocket)

        // 🔄 Cambia "notification" por "newOrder"
        newSocket.on('newOrder', (data) => {
            setNotifications((prev) => [...prev, data])
        })

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id)
        })

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected')
        })

        return () => {
            newSocket.off('newOrder')
            newSocket.disconnect()
            setSocket(null)
        }
    }, [])


    return (
        <Popover >
            <PopoverTrigger >
                <div className="relative">
                    <Button size="icon">
                        <Icons.notify className="h-5 w-5" />
                    </Button>
                    {
                        notifications.length > 0 && (
                            <div className="absolute -top-1 -right-1">
                                <span className="bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                                    {notifications.length}
                                </span>
                            </div>
                        )
                    }
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end" sideOffset={5}>
                <div className="p-4">
                    <h2 className="text-lg font-semibold">Notificaciones</h2>
                    <div className="max-h-60 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div key={index} className="p-2 border-b last:border-b-0">
                                    <p className="text-sm text-gray-700">
                                        {notification.message}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No hay notificaciones</p>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}