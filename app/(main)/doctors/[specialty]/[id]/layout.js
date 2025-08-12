import { getDoctorById } from "@/actions/appointments";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/page-header";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const { doctor } = await getDoctorById(id);
  return {
    title: `${doctor.name} - AuraHub`,
    description: `Agendar encontro com ${doctor.name}, especialista em ${doctor.specialty} e com ${doctor.experience} anos de experiência.`,
  };
}

export default async function DoctorProfileLayout({ children, params }) {
  const { id } = await params;
  const { doctor } = await getDoctorById(id);

  if (!doctor) redirect("/doctors");

  return (
    <div className="container mx-auto">
      <PageHeader
        // icon={<Stethoscope />}
        title={doctor.name}
        backLink={`/doctors/${doctor.specialty}`}
        backLabel={`Voltar para ${doctor.specialty}`}
      />

      {children}
    </div>
  );
}
