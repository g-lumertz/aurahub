import { redirect } from "next/navigation";
import { getDoctorsBySpecialty } from "@/actions/doctors-listing";
import { DoctorCard } from "../components/doctor-card";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

export default async function DoctorSpecialtyPage({ params }) {
  const { specialty } = await params;

  // Redirect to main doctors page if no specialty is provided
  if (!specialty) {
    redirect("/doctors");
  }

  // Fetch doctors by specialty
  const { doctors, error } = await getDoctorsBySpecialty(specialty);

  if (error) {
    console.error("Error fetching doctors:", error);
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={specialty.split("%20").join(" ")}
        backLink="/doctors"
        backLabel="Todas Especialidades"
      />

      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <Card className="border-1 border-(--black04)/50 hover:bg-(--white02)/70">
          <CardContent>
            <div className="text-center py-12">
              <Stethoscope className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium text-muted-foreground mb-2">
                Nenhum profissional encontrado
              </h3>
              <p className="text-muted-foreground">
                Atualmente não há profissionais verificados nesta especialidade.
                Por favor, verifique novamente mais tarde ou escolha outra
                especialidade.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
