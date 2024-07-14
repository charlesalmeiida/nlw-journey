import { MapPin, Calendar, Settings2 } from "lucide-react"
import { Button } from "../../components/Button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { format } from "date-fns"

interface Trip {
  destination: string
  starts_at: string
  is_confirmed: boolean
  ends_at: string
  id: string
}

export function HeaderDetails() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL'")
        .concat(" até ")
        .concat(format(trip.ends_at, "d' de 'LLL'"))
    : null

  return (
    <div className="pl-6 pr-4 py-5 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
          <div className="w-px mr-5 h-6 bg-zinc-800 mx-5"></div>
          <Button variant="secondary" size="default">
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
