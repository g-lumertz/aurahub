export const metadata = {
  title: "Encontre Profissionais - AuraHub",
  description:
    "Busque e agende consultas com os melhores profissionais de saúde",
};

export default async function DoctorsLayout({ children }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto">{children}</div>
    </div>
  );
}
