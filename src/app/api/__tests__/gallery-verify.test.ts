import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../gallery/verify-password/route";
import { getPayload } from "@/lib/payload";

vi.mock("@/lib/payload", () => ({
  getPayload: vi.fn(),
}));

const mockedGetPayload = vi.mocked(getPayload);

function mockRequest(body: object): NextRequest {
  return new Request("http://localhost/api/gallery/verify-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as unknown as NextRequest;
}

describe("POST /api/gallery/verify-password", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when no password is provided", async () => {
    const req = mockRequest({});
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Password required");
  });

  it("returns 400 when password is an empty string", async () => {
    const req = mockRequest({ password: "" });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe("Password required");
  });

  it("returns 401 when password does not match any gallery", async () => {
    const mockPayload = {
      find: vi.fn().mockResolvedValue({ docs: [] }),
    };
    mockedGetPayload.mockResolvedValue(mockPayload as unknown as Awaited<ReturnType<typeof getPayload>>);

    const req = mockRequest({ password: "wrongpassword" });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.error).toBe("Invalid password");
  });

  it("returns 200 with collectionName and images when password matches", async () => {
    const mockDocs = [
      {
        collectionName: "Smith Wedding",
        title: "First Dance",
        image: { url: "/uploads/first-dance.jpg", kind: "image" },
      },
      {
        collectionName: "Smith Wedding",
        title: "Cake Cutting",
        image: { url: "/uploads/cake.jpg", kind: "image" },
      },
    ];

    const mockPayload = {
      find: vi.fn().mockResolvedValue({ docs: mockDocs }),
    };
    mockedGetPayload.mockResolvedValue(mockPayload as unknown as Awaited<ReturnType<typeof getPayload>>);

    const req = mockRequest({ password: "smith2024" });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.collectionName).toBe("Smith Wedding");
    expect(data.images).toEqual([
      { src: "/uploads/first-dance.jpg", alt: "First Dance", kind: "image" },
      { src: "/uploads/cake.jpg", alt: "Cake Cutting", kind: "image" },
    ]);
  });

  it("filters out images with no src url", async () => {
    const mockDocs = [
      {
        collectionName: "Event Gallery",
        title: "Good Image",
        image: { url: "/uploads/good.jpg", kind: "image" },
      },
      {
        collectionName: "Event Gallery",
        title: "No URL Image",
        image: { url: "", kind: "image" },
      },
      {
        collectionName: "Event Gallery",
        title: "Null Image",
        image: null,
      },
    ];

    const mockPayload = {
      find: vi.fn().mockResolvedValue({ docs: mockDocs }),
    };
    mockedGetPayload.mockResolvedValue(mockPayload as unknown as Awaited<ReturnType<typeof getPayload>>);

    const req = mockRequest({ password: "event2024" });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.images).toHaveLength(1);
    expect(data.images[0].src).toBe("/uploads/good.jpg");
  });

  it("returns 500 on server error when payload throws", async () => {
    mockedGetPayload.mockRejectedValue(new Error("Database connection failed"));

    const req = mockRequest({ password: "anypassword" });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe("Server error");
  });

  it("calls payload.find with correct collection and query parameters", async () => {
    const mockPayload = {
      find: vi.fn().mockResolvedValue({ docs: [] }),
    };
    mockedGetPayload.mockResolvedValue(mockPayload as unknown as Awaited<ReturnType<typeof getPayload>>);

    const req = mockRequest({ password: "test123" });
    await POST(req);

    expect(mockPayload.find).toHaveBeenCalledWith({
      collection: "gallery-images",
      where: { category: { equals: "password" }, password: { equals: "test123" } },
      limit: 100,
      depth: 2,
    });
  });

  it("defaults collectionName to 'Gallery' when doc has no collectionName", async () => {
    const mockDocs = [
      {
        title: "Photo",
        image: { url: "/uploads/photo.jpg", kind: "image" },
      },
    ];

    const mockPayload = {
      find: vi.fn().mockResolvedValue({ docs: mockDocs }),
    };
    mockedGetPayload.mockResolvedValue(mockPayload as unknown as Awaited<ReturnType<typeof getPayload>>);

    const req = mockRequest({ password: "secret" });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.collectionName).toBe("Gallery");
  });
});
