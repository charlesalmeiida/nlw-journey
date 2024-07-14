import { User, Mail, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/Button"

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (ownerName: string) => void
  setOwnerEmail: (ownerEmail: string) => void
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Confirmar criação da viagem</h2>
          <button
            onClick={closeConfirmTripModal}
            className="text-zinc-400 size-5"
          >
            <X />
          </button>
        </div>
        <p className="text-zinc-400 text-sm text-left mt-2">
          Para concluir a criação da viagem para{" "}
          <span className="text-zinc-100 font-semibold">
            Florianópolis, Brasil
          </span>{" "}
          nas datas de{" "}
          <span className="text-zinc-100 font-semibold">
            16 a <br /> 27 de Agosto de 2024
          </span>{" "}
          preencha seus dados abaixo:
        </p>

        <form onSubmit={createTrip}>
          <div className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <User className="size-5 text-zinc-400" />
              <input
                onChange={(event) => setOwnerName(event.target.value)}
                type="text"
                name="name"
                placeholder="Seu nome completo"
                className="bg-transparent text-base placeholder-zinc-400 outline-none flex-1 "
              />
            </div>
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Mail className="size-5 text-zinc-400" />
              <input
                onChange={(event) => setOwnerEmail(event.target.value)}
                type="email"
                name="email"
                placeholder="Seu e-mail pessoal"
                className="bg-transparent text-base placeholder-zinc-400 outline-none flex-1 "
              />
            </div>
            <Button type="submit" size="full">
              Confirmar criação da viagem
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}