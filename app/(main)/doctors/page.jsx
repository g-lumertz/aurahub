import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SPECIALTIES } from "@/lib/specialities";

export default async function DoctorsPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <h1 className="text-3xl font-bold text-(--black01) mb-2">
          Encontre seu Profissional
        </h1>
        <p className="text-(--black01)/50 text-md">
          Busque por especialidade e encontre o profissional ideal para suas
          necessidades de saúde
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {SPECIALTIES.map((specialty) => (
          <Link key={specialty.name} href={`/doctors/${specialty.name}`}>
            <Card className="border-(--primary03)/50 hover:border-(--primary03) transition-all cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="w-12 h-12 rounded-full bg-(--primary03)/30 flex items-center justify-center mb-4">
                  <div className="text-(--primary01)">{specialty.icon}</div>
                </div>
                <h3 className="font-medium text-(--black01)">
                  {specialty.name}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
