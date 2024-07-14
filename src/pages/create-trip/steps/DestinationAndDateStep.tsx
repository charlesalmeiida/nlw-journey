import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react"
import { Button } from "../../../components/Button"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { format } from "date-fns"

interface DestinationAndDateStepProps {
  isGuestsVisible: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setDestination: (destination: string) => void
  setEventDate: (dates: DateRange | undefined) => void
  eventDate: DateRange | undefined
}

export function DestinationAndDateStep({
  isGuestsVisible,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setEventDate,
  eventDate,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false)

  function openDatePicker() {
    setDatePickerOpen(true)
  }

  function closeDatePicker() {
    setDatePickerOpen(false)
  }

  const displayedDate =
    eventDate && eventDate.from && eventDate.to
      ? format(eventDate.from, "d' de 'LLL'")
          .concat(" até ")
          .concat(format(eventDate.to, "d' de 'LLL'"))
      : null

  return (
    <div className="pl-6 pr-4 h-16 bg-zinc-900 rounded-xl mt-10 flex items-center shadow-shape">
      <div className="flex items-center gap-2 flex-1 max-w-[376px]">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          disabled={isGuestsVisible}
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <button
        disabled={isGuestsVisible}
        onClick={openDatePicker}
        className="flex items-center gap-2 outline-none ml-auto mr-5"
      >
        <Calendar className="size-5 text-zinc-500" />
        <span className="text-lg text-zinc-400 text-left">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Selecione a data</h2>
              <button
                onClick={closeDatePicker}
                className="text-zinc-400 size-5"
              >
                <X />
              </button>
            </div>

            <DayPicker
              mode="range"
              selected={eventDate}
              onSelect={setEventDate}
            />
          </div>
        </div>
      )}

      <div className="w-px mr-5 h-6 bg-zinc-800"></div>
      {isGuestsVisible ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}
