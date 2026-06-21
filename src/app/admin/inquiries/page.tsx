import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">All Inquiries</h1>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No inquiries yet.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 tracking-wider">
                  NAME
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 tracking-wider hidden md:table-cell">
                  SERVICE
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 tracking-wider hidden md:table-cell">
                  EVENT DATE
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 tracking-wider hidden lg:table-cell">
                  EVENT TYPE
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 tracking-wider">
                  STATUS
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 tracking-wider">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/inquiries/${inquiry.id}`}
                      className="font-medium text-gray-900 hover:text-brand-700"
                    >
                      {inquiry.firstName} {inquiry.lastName}
                    </Link>
                    <p className="text-sm text-gray-500 md:hidden mt-1">
                      {inquiry.serviceRequired}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                    {inquiry.serviceRequired}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                    {inquiry.eventDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                    {inquiry.eventType}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded ${
                        inquiry.status === "new"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
