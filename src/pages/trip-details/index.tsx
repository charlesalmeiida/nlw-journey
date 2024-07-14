import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateActivyModal } from "./CreateActivityModal"
import { ImportantLinks } from "./ImportantLinks"
import { Guests } from "./Guests"
import { ActivitiesList } from "./ActivitiesList"
import { HeaderDetails } from "./HeaderDetails"
import { Button } from "../../components/Button"

export function TripDeailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  return (
    <div className="max-w-[1100px] px-6 py-10 mx-auto space-y-8">
      <HeaderDetails />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[32px] font-semibold">Atividades</h2>
            <Button variant="primary" onClick={openCreateActivityModal}>
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>
          {isCreateActivityModalOpen && (
            <CreateActivyModal
              closeCreateActivityModal={closeCreateActivityModal}
            />
          )}
          <ActivitiesList />
        </div>
        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full  h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>
    </div>
  )
}
