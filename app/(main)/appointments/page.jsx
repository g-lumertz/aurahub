import { getPatientAppointments } from "@/actions/patient";
import { AppointmentCard } from "@/components/appointment-card";
import { PageHeader } from "@/components/page-header";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/onboarding";

export default async function PatientAppointmentsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "PATIENT") {
    redirect("/onboarding");
  }

  const { appointments, error } = await getPatientAppointments();

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        icon={<Calendar />}
        title="Agendamentos"
        backLink="/doctors"
        backLabel="Buscar Profissionais"
      />

      <Card className="border-1 border-(--black04)/50 hover:bg-(--white02)/70">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-(--primary02) flex items-center">
            {/* <Calendar className="h-5 w-5 mr-2 text-(--primary02)" /> */}
            Seus serviços agendados
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-400">Error: {error}</p>
            </div>
          ) : appointments?.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  userRole="PATIENT"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium text-muted-foreground mb-2">
                Sem agendamentos registrados
              </h3>
              <p className="text-muted-foreground">
                Você ainda não tem agendamentos registrados. Navegue pelos
                nossos profissionais e agende sua primeira consulta.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
