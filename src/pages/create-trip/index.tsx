import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestesModal } from "./invite-guets-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDateStep } from "./steps/DestinationAndDateStep"
import { InviteGuestsStep } from "./steps/InviteGuestsStep"
import { DateRange } from "react-day-picker"
import { api } from "../../lib/axios"

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsVisible, setIsInputGuestsOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState([
    "charlesalmeida844@gmail.com",
  ])
  const [isConfirmTripModalOpen, setConfirmTripModalOpen] = useState(false)
  const [destination, setDestination] = useState("")
  const [OwnerName, setOwnerName] = useState("")
  const [OwnerEmail, setOwnerEmail] = useState("")
  const [eventDate, setEventDate] = useState<DateRange | undefined>()

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(destination)
    console.log(OwnerName)
    console.log(OwnerEmail)
    console.log(eventDate)
    console.log(emailsToInvite)

    if (!destination) {
      return
    }

    if (!eventDate?.from || !eventDate.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!OwnerName || !OwnerEmail) {
      return
    }

    const response = await api.post("/trips", {
      destination: destination,
      starts_at: eventDate?.from,
      ends_at: eventDate?.to,
      emails_to_invite: emailsToInvite,
      owner_name: OwnerName,
      owner_email: OwnerEmail,
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  function openGuestsInput() {
    setIsInputGuestsOpen(true)
  }

  function closeGuestsInput() {
    setIsInputGuestsOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get("email")?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])
    event.currentTarget.reset()
  }

  function removeEmailToInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    )
    setEmailsToInvite(newEmailList)
  }

  function openConfirmTripModal() {
    setConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setConfirmTripModalOpen(false)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-4xl w-full px-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <img src="/logo.svg" alt="Logo plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            openGuestsInput={openGuestsInput}
            isGuestsVisible={isGuestsVisible}
            setDestination={setDestination}
            setEventDate={setEventDate}
            eventDate={eventDate}
          />
        </div>
        {isGuestsVisible && (
          <InviteGuestsStep
            openGuestsModal={openGuestsModal}
            emailsToInvite={emailsToInvite}
            openConfirmTripModal={openConfirmTripModal}
          />
        )}
        <p className="text-zinc-500 mt-10">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br /> com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline " href="#">
            políticas de privacidade
          </a>
          .
        </p>
        {isGuestsModalOpen && (
          <InviteGuestesModal
            addNewEmailToInvite={addNewEmailToInvite}
            emailsToInvite={emailsToInvite}
            closeGuestsModal={closeGuestsModal}
            removeEmailToInvite={removeEmailToInvite}
          />
        )}
        {isConfirmTripModalOpen && (
          <ConfirmTripModal
            createTrip={createTrip}
            closeConfirmTripModal={closeConfirmTripModal}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
          />
        )}
      </div>
    </div>
  )
}
