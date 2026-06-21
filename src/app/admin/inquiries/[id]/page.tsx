import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StatusToggle } from "@/components/StatusToggle";

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry) notFound();

  return (
    <div>
      <Link
        href="/admin/inquiries"
        className="text-sm text-brand-700 hover:underline mb-6 inline-block"
      >
        &larr; Back to inquiries
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {inquiry.firstName} {inquiry.lastName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Submitted {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <StatusToggle id={inquiry.id} currentStatus={inquiry.status} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xs font-medium text-gray-500 tracking-wider mb-4">
              CONTACT INFO
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a href={`mailto:${inquiry.email}`} className="text-brand-700 hover:underline">
                  {inquiry.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a href={`tel:${inquiry.phone}`} className="text-brand-700 hover:underline">
                  {inquiry.phone}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-medium text-gray-500 tracking-wider mb-4">
              EVENT DETAILS
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Event Date</p>
                <p>{inquiry.eventDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p>{inquiry.eventLocation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Event Type</p>
                <p>{inquiry.eventType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service Required</p>
                <p>{inquiry.serviceRequired}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-medium text-gray-500 tracking-wider mb-4">
              ADDITIONAL INFO
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">How they heard about us</p>
                <p>{inquiry.hearAbout}</p>
              </div>
              {inquiry.promoCode && (
                <div>
                  <p className="text-sm text-gray-500">Promo Code</p>
                  <p>{inquiry.promoCode}</p>
                </div>
              )}
            </div>
          </div>

          {inquiry.message && (
            <div>
              <h2 className="text-xs font-medium text-gray-500 tracking-wider mb-4">
                MESSAGE
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {inquiry.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
