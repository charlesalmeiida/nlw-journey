import { UserRoundPlus, ArrowRight } from "lucide-react"
import { Button } from "../../../components/Button"

interface InviteGuestsStepProps {
  openGuestsModal: () => void
  emailsToInvite: string[]
  openConfirmTripModal: () => void
}

export function InviteGuestsStep({
  openGuestsModal,
  emailsToInvite,
  openConfirmTripModal,
}: InviteGuestsStepProps) {
  return (
    <div className="pl-6 pr-4 h-16 bg-zinc-900 rounded-xl mt-4 flex items-center shadow-shape">
      <button
        onClick={openGuestsModal}
        type="button"
        className="flex flex-1 items-center gap-2"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100 text-lg flex-1 text-left">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-zinc-400 text-lg flex-1 text-left">
            Quem estará na viagem?
          </span>
        )}
      </button>
      <div className="w-px mr-5 h-6 bg-zinc-800"></div>
      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}
