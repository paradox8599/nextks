import { PageContainer } from "@keystone-6/core/admin-ui/components";
import "../src/app/globals.css";

export default function AdminPageLayout({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <PageContainer
      header={<h1 className="text-[#111827] text-xl font-[700]">{header}</h1>}
    >
      {children}
    </PageContainer>
  );
}
