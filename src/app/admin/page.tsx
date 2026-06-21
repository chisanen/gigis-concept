import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const totalInquiries = await prisma.inquiry.count();
  const newInquiries = await prisma.inquiry.count({ where: { status: "new" } });
  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Total Inquiries</p>
          <p className="text-4xl font-light text-gray-900">{totalInquiries}</p>
        </div>
        <div className="bg-white p-6 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">New (Unread)</p>
          <p className="text-4xl font-light text-brand-700">{newInquiries}</p>
        </div>
        <div className="bg-white p-6 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-500 mb-1">Reviewed</p>
          <p className="text-4xl font-light text-gray-900">
            {totalInquiries - newInquiries}
          </p>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
          <Link
            href="/admin/inquiries"
            className="text-sm text-brand-700 hover:underline"
          >
            View all
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No inquiries yet. They&apos;ll appear here when someone submits the contact form.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentInquiries.map((inquiry) => (
              <Link
                key={inquiry.id}
                href={`/admin/inquiries/${inquiry.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {inquiry.firstName} {inquiry.lastName}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {inquiry.serviceRequired} &middot; {inquiry.eventType}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded ${
                        inquiry.status === "new"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
